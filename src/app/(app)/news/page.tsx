import Link from "next/link";
import { FEED_SOURCES, TOPIC_LABEL, fetchNews, formatDate } from "@/lib/news";
import { PageHeader, Pill } from "@/components/ui";

export const revalidate = 3600;

const TOPICS = [...new Set(FEED_SOURCES.map((s) => s.topic))];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const { items, failed } = await fetchNews();
  const filtered = topic ? items.filter((i) => i.topic === topic) : items;

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="News"
        title="Cosa si muove nel settore"
        subtitle="Aggregato in tempo reale dalle fonti che vale la pena leggere: ricerca applicata, design system, accessibilità e prodotti AI. Aggiornato ogni ora."
      />

      <nav aria-label="Filtra per argomento" className="mb-5">
        <ul className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          <li>
            <FilterLink href="/news" active={!topic} label="Tutto" />
          </li>
          {TOPICS.map((t) => (
            <li key={t}>
              <FilterLink
                href={`/news?topic=${t}`}
                active={topic === t}
                label={TOPIC_LABEL[t]}
              />
            </li>
          ))}
          <li>
            <FilterLink href="/aziende" active={false} label="Aziende ›" />
          </li>
        </ul>
      </nav>

      {filtered.length === 0 ? (
        <div className="card-light p-8 text-center">
          <p className="font-bold">Nessun articolo disponibile ora</p>
          <p className="mt-2 text-sm text-ink-muted">
            Le fonti non hanno risposto. Riprova tra qualche minuto — nel frattempo
            puoi guardare le{" "}
            <Link href="/aziende" className="font-semibold underline">
              schede aziende
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-light block p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Pill tone="dark">{item.sourceName}</Pill>
                  <Pill>{TOPIC_LABEL[item.topic]}</Pill>
                  {item.publishedAt ? (
                    <span className="text-xs font-semibold text-ink-muted">
                      {formatDate(item.publishedAt)}
                    </span>
                  ) : null}
                </div>
                <h2 className="text-[17px] font-bold leading-snug">{item.title}</h2>
                {item.summary ? (
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">
                    {item.summary}
                  </p>
                ) : null}
                <p className="mt-3 text-[13px] font-semibold text-ink-muted">
                  Apri su {new URL(item.link).hostname.replace("www.", "")} ↗
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}

      {failed.length > 0 ? (
        <p className="mt-6 text-[13px] text-ink-muted">
          Fonti non raggiungibili in questo momento: {failed.join(", ")}. Il resto del
          feed è aggiornato.
        </p>
      ) : null}
    </div>
  );
}

function FilterLink({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`inline-block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-ink text-white" : "bg-white text-ink-muted hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
