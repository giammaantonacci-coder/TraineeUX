"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  image: string | null;
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
        <>
          {/* Il primo articolo grande, gli altri in riga.
              Prima erano venti card identiche una sotto l'altra: nessuna
              gerarchia, quindi niente da guardare per primo e niente che
              distinguesse "appena uscito" da "di sei giorni fa". La novita' e'
              la cosa che si viene a cercare qui, quindi e' la sola che merita
              spazio. */}
          <ArticoloInEvidenza a={filtrati[0]} />
          {filtrati.length > 1 ? (
            <ul className="mt-3 space-y-2">
              {filtrati.slice(1).map((a) => (
                <li key={a.id}>
                  <RigaArticolo a={a} />
                </li>
              ))}
            </ul>
          ) : null}
        </>
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

/**
 * L'articolo piu' recente.
 *
 * Con la miniatura quando il feed ne dichiara una, senza quando no: e' il caso
 * normale, non un ripiego da compensare con un riquadro grigio. Le proporzioni
 * sono fisse, cosi' la pagina non sobbalza mentre l'immagine arriva.
 */
function ArticoloInEvidenza({ a }: { a: Articolo }) {
  return (
    <a
      href={a.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card-light tappable block overflow-hidden hover:-translate-y-0.5 active:bg-black/[0.02]"
    >
      {a.image ? (
        /* Le proporzioni sono fissate dal contenitore e l'immagine lo riempie:
           l'altezza e' nota prima che l'immagine arrivi, quindi la pagina non
           sobbalza a meta' lettura. */
        <div className="relative aspect-[16/9] w-full bg-surface-muted">
          <Image
            src={`/immagine?u=${encodeURIComponent(a.image)}`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Pill tone="dark">{a.sourceName}</Pill>
          <Pill>{a.topicLabel}</Pill>
          {a.data ? (
            <span className="text-xs font-semibold text-ink-muted">{a.data}</span>
          ) : null}
        </div>
        <h2 className="text-[21px] font-extrabold leading-tight">{a.title}</h2>
        {a.summary ? (
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{a.summary}</p>
        ) : null}
        <p className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted">
          Apri su {a.host}
          <ExternalIcon className="h-[15px] w-[15px] shrink-0" />
          <span className="sr-only"> — si apre in una nuova finestra</span>
        </p>
      </div>
    </a>
  );
}

/**
 * Tutti gli altri.
 *
 * Titolo e provenienza, niente sommario: da qui si decide se aprire, e per
 * quella decisione bastano il titolo e chi l'ha scritto. La miniatura sta a
 * destra e sparisce se non c'e', senza lasciare il buco.
 */
function RigaArticolo({ a }: { a: Articolo }) {
  return (
    <a
      href={a.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card-light tappable flex items-center gap-3 p-3.5 hover:-translate-y-0.5 active:bg-black/[0.02]"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-bold leading-snug">{a.title}</span>
        <span className="mt-1 block text-[12px] font-semibold text-ink-muted">
          {a.sourceName}
          {a.data ? ` · ${a.data}` : ""}
        </span>
      </span>
      {a.image ? (
        <Image
          src={`/immagine?u=${encodeURIComponent(a.image)}`}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-xl bg-surface-muted object-cover"
        />
      ) : null}
      <ExternalIcon className="h-4 w-4 shrink-0 text-ink-muted" />
      <span className="sr-only">Si apre in una nuova finestra</span>
    </a>
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
