import { XMLParser } from "fast-xml-parser";

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  topic: "ux" | "prodotto" | "sistemi" | "accessibilita" | "ai" | "industria";
}

export const FEED_SOURCES: FeedSource[] = [
  {
    id: "nngroup",
    name: "Nielsen Norman Group",
    url: "https://www.nngroup.com/feed/rss/",
    topic: "ux",
  },
  {
    id: "smashing",
    name: "Smashing Magazine",
    url: "https://www.smashingmagazine.com/feed/",
    topic: "ux",
  },
  {
    id: "uxcollective",
    name: "UX Collective",
    url: "https://uxdesign.cc/feed",
    topic: "ux",
  },
  {
    id: "alistapart",
    name: "A List Apart",
    url: "https://alistapart.com/main/feed/",
    topic: "sistemi",
  },
  {
    id: "gds",
    name: "GOV.UK — GDS",
    url: "https://gds.blog.gov.uk/feed/",
    topic: "accessibilita",
  },
  {
    id: "intercom",
    name: "Intercom",
    url: "https://www.intercom.com/blog/feed/",
    topic: "ai",
  },
  {
    id: "shopifyux",
    name: "Shopify UX",
    url: "https://ux.shopify.com/feed",
    topic: "sistemi",
  },
  {
    id: "figma",
    name: "Figma",
    url: "https://www.figma.com/blog/feed.xml",
    topic: "industria",
  },
];

export const TOPIC_LABEL: Record<FeedSource["topic"], string> = {
  ux: "UX & ricerca",
  prodotto: "Prodotto",
  sistemi: "Design system",
  accessibilita: "Accessibilità",
  ai: "AI",
  industria: "Industria",
};

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  summary: string;
  publishedAt: string | null;
  sourceId: string;
  sourceName: string;
  topic: FeedSource["topic"];
}

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(input: string, max = 220): string {
  if (input.length <= max) return input;
  return input.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function textOf(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object" && "#text" in value) {
    return String((value as { "#text": unknown })["#text"] ?? "");
  }
  return "";
}

function linkOf(value: unknown): string {
  if (typeof value === "string") return value;
  const arr = asArray(value as Record<string, unknown> | Record<string, unknown>[]);
  for (const entry of arr) {
    if (typeof entry === "string") return entry;
    if (entry && typeof entry === "object") {
      const rel = entry["@_rel"];
      const href = entry["@_href"];
      if (href && (!rel || rel === "alternate")) return String(href);
    }
  }
  const first = arr[0];
  if (first && typeof first === "object" && "@_href" in first) {
    return String(first["@_href"]);
  }
  return "";
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

async function fetchSource(source: FeedSource): Promise<NewsItem[]> {
  try {
    const res = await fetch(source.url, {
      headers: {
        "User-Agent": "TraineeUX/1.0 (+https://traineeux.vercel.app)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
      },
      // I feed cambiano lentamente: una cache di un'ora è abbondante
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const parsed = parser.parse(xml) as Record<string, unknown>;

    const rss = parsed.rss as { channel?: { item?: unknown } } | undefined;
    const feed = parsed.feed as { entry?: unknown } | undefined;

    const channelItems = asArray(rss?.channel?.item as unknown[] | undefined);
    const atomEntries = asArray(feed?.entry as unknown[] | undefined);
    const rawItems = channelItems.length > 0 ? channelItems : atomEntries;

    return rawItems.slice(0, 12).map((raw, index) => {
      const item = raw as Record<string, unknown>;
      const title = stripHtml(textOf(item.title)) || "Senza titolo";
      const link = linkOf(item.link) || textOf(item.id) || source.url;
      const rawSummary =
        textOf(item.description) ||
        textOf(item.summary) ||
        textOf((item["content:encoded"] as string) ?? "") ||
        textOf(item.content);
      const published =
        textOf(item.pubDate) || textOf(item.published) || textOf(item.updated) || "";
      const date = published ? new Date(published) : null;

      return {
        id: `${source.id}-${index}-${link}`,
        title,
        link,
        summary: truncate(stripHtml(rawSummary)),
        publishedAt: date && !Number.isNaN(date.getTime()) ? date.toISOString() : null,
        sourceId: source.id,
        sourceName: source.name,
        topic: source.topic,
      } satisfies NewsItem;
    });
  } catch {
    // Una fonte irraggiungibile non deve rompere la pagina
    return [];
  }
}

export async function fetchNews(): Promise<{ items: NewsItem[]; failed: string[] }> {
  const results = await Promise.all(
    FEED_SOURCES.map(async (source) => ({
      source,
      items: await fetchSource(source),
    })),
  );

  const failed = results.filter((r) => r.items.length === 0).map((r) => r.source.name);
  const items = results
    .flatMap((r) => r.items)
    .sort((a, b) => {
      if (!a.publishedAt) return 1;
      if (!b.publishedAt) return -1;
      return b.publishedAt.localeCompare(a.publishedAt);
    });

  return { items, failed };
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const now = Date.now();
  const days = Math.floor((now - date.getTime()) / 86_400_000);
  if (days <= 0) return "oggi";
  if (days === 1) return "ieri";
  if (days < 7) return `${days} giorni fa`;
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  });
}
