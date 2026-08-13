import type { Metadata } from "next";
import { FEED_SOURCES, TOPIC_LABEL, fetchNews, formatDate } from "@/lib/news";
import { PageHeader } from "@/components/ui";
import { ListaNews, type Articolo } from "@/components/ListaNews";

export const metadata: Metadata = { title: "News" };

/**
 * La pagina non legge più l'argomento dall'indirizzo, e questo la rende
 * statica: viene servita dalla cache invece di essere ricostruita a ogni
 * visita. Il filtro è passato al client, dove agisce su articoli già in
 * pagina e non costa nulla.
 */
export const revalidate = 3600;

const TOPICS = [...new Set(FEED_SOURCES.map((s) => s.topic))].map((t) => ({
  id: t,
  label: TOPIC_LABEL[t],
}));

export default async function NewsPage() {
  const { items, failed } = await fetchNews();

  // Tutto quello che serve a disegnare una scheda viene calcolato qui: al
  // client arrivano stringhe pronte, non il modulo delle news.
  const articoli: Articolo[] = items.map((i) => ({
    id: i.id,
    link: i.link,
    title: i.title,
    summary: i.summary,
    sourceName: i.sourceName,
    topic: i.topic,
    topicLabel: TOPIC_LABEL[i.topic],
    data: formatDate(i.publishedAt),
    host: dominio(i.link),
  }));

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="News"
        bity={{ mood: "curioso", tint: "sky", lente: true }}
        title="Cosa si muove nel settore"
        subtitle="Aggregato in tempo reale dalle fonti che vale la pena leggere: ricerca applicata, design system, accessibilità e prodotti AI. Aggiornato ogni ora."
      />
      <ListaNews articoli={articoli} topics={TOPICS} failed={failed} />
    </div>
  );
}

/** Un feed con un link malformato non deve far cadere l'intera pagina. */
function dominio(link: string): string {
  try {
    return new URL(link).hostname.replace("www.", "");
  } catch {
    return "la fonte";
  }
}
