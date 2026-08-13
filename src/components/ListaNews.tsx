"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pill } from "@/components/ui";
import { ExternalIcon } from "@/components/icons";

/**
 * Filtro e lista degli articoli.
 *
 * Prima il filtro era un link con l'argomento nell'URL: ogni tocco faceva
 * ripartire il render sul server e la pagina restava ferma per tutto il
 * viaggio, pur avendo già in pagina tutti gli articoli da filtrare. Qui è
 * stato locale, quindi il cambio è immediato.
 *
 * Riceve tutto pronto dal server — etichette, date, domini — perché il modulo
 * delle news trascina con sé un parser XML che nel pacchetto del browser non
 * deve finire.
 */

export interface Articolo {
  id: string;
  link: string;
  title: string;
  summary: string | null;
  sourceName: string;
  topic: string;
  topicLabel: string;
  data: string;
  host: string;
}

export function ListaNews({
  articoli,
  topics,
  failed,
}: {
  articoli: Articolo[];
  topics: { id: string; label: string }[];
  failed: string[];
}) {
  const [topic, setTopic] = useState<string | null>(null);

  // L'argomento nell'URL vale ancora come collegamento diretto: viene letto
  // dopo il primo render, così la pagina resta statica e il server non deve
  // sapere nulla del filtro.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t) setTopic(t);
  }, []);

  function scegli(t: string | null) {
    setTopic(t);
    // replaceState e non una navigazione: l'indirizzo resta onesto e
    // condivisibile senza che il filtro costi un viaggio al server.
    window.history.replaceState(null, "", t ? `/news?topic=${t}` : "/news");
  }

  const filtrati = topic ? articoli.filter((a) => a.topic === topic) : articoli;

  return (
    <>
      <nav aria-label="Filtra per argomento" className="mb-5">
        <ul className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          <li>
            <Filtro attivo={topic === null} onClick={() => scegli(null)} label="Tutto" />
          </li>
          {topics.map((t) => (
            <li key={t.id}>
              <Filtro
                attivo={topic === t.id}
                onClick={() => scegli(t.id)}
                label={t.label}
              />
            </li>
          ))}
          <li>
            <Link
              href="/aziende"
              className="inline-block whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink active:bg-black/5"
            >
              Aziende ›
            </Link>
          </li>
        </ul>
      </nav>

      {/* Il conteggio cambia senza che la pagina si ricarichi: senza regione
          live, chi usa uno screen reader non saprebbe che il filtro ha agito. */}
      <p aria-live="polite" className="sr-only">
        {filtrati.length}{" "}
        {filtrati.length === 1 ? "articolo mostrato" : "articoli mostrati"}
      </p>

      {filtrati.length === 0 ? (
        <div className="card-light p-8 text-center">
          <p className="font-bold">Nessun articolo per questo argomento</p>
          <p className="mt-2 text-sm text-ink-muted">
            Le fonti di questa categoria non hanno pubblicato di recente, oppure non
            hanno risposto.
          </p>
          {/* Pulsante pieno e non collegamento nel testo: in mezzo alla frase
              era alto venti pixel, sotto il minimo tattile di ventiquattro. */}
          <button
            type="button"
            onClick={() => scegli(null)}
            className="tappable mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white"
          >
            Mostra tutti gli argomenti
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtrati.map((a) => (
            <li key={a.id}>
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-light tappable block p-5 hover:-translate-y-0.5 active:bg-black/[0.02]"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Pill tone="dark">{a.sourceName}</Pill>
                  <Pill>{a.topicLabel}</Pill>
                  {a.data ? (
                    <span className="text-xs font-semibold text-ink-muted">{a.data}</span>
                  ) : null}
                </div>
                <h2 className="text-[17px] font-bold leading-snug">{a.title}</h2>
                {a.summary ? (
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">
                    {a.summary}
                  </p>
                ) : null}
                <p className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted">
                  Apri su {a.host}
                  <ExternalIcon className="h-[15px] w-[15px] shrink-0" />
                  <span className="sr-only"> — si apre in una nuova finestra</span>
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
    </>
  );
}

function Filtro({
  attivo,
  onClick,
  label,
}: {
  attivo: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={attivo}
      className={`tappable inline-block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        attivo
          ? "bg-ink text-white"
          : "border border-black/10 bg-white text-ink-muted hover:text-ink active:bg-black/5"
      }`}
    >
      {label}
    </button>
  );
}
