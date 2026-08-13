import Link from "next/link";
import type { Metadata } from "next";
import { COMPANIES } from "@/content/companies";
import { PageHeader, Pill } from "@/components/ui";
import { ExternalIcon } from "@/components/icons";
import { MarchioAzienda } from "@/components/marchi-aziende";

export const metadata: Metadata = { title: "Aziende" };

export default function AziendePage() {
  return (
    <div className="animate-rise">
      <Link
        href="/news"
        className="tappable -ml-2 mb-3 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold text-ink-muted hover:text-ink active:bg-black/5"
      >
        ‹ News
      </Link>

      <PageHeader
        eyebrow="Aziende"
        title="Chi lavora bene, e cosa si impara guardandole"
        subtitle="Non una classifica: un elenco di posti da cui prendere metodo. Per ciascuna, cosa fa, cosa insegna il suo modo di lavorare, e come ci si entra davvero."
      />

      <ul className="space-y-4">
        {COMPANIES.map((company) => (
          <li key={company.id} className="card-light p-5 md:p-6">
            {/* Targhetta a sinistra, nome e categoria a destra: la stessa
                disposizione dell'intestazione di un modulo, dove l'icona apre
                la riga e le etichette la seguono. */}
            <div className="flex items-center gap-3">
              <MarchioAzienda id={company.id} name={company.name} />
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight">{company.name}</h2>
                <Pill>{company.category}</Pill>
              </div>
            </div>

            <p className="mt-2 text-[15px] leading-relaxed">{company.what}</p>

            <div className="mt-4 rounded-2xl bg-mint/25 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                Cosa si impara
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed">{company.designSignal}</p>
            </div>

            <div className="mt-3 rounded-2xl bg-black/[0.03] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                Come ci si entra
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed">{company.howToEnter}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
              <a
                href={company.site}
                target="_blank"
                rel="noopener noreferrer"
                className="tappable inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-white"
              >
                Sito
                <ExternalIcon className="h-4 w-4 shrink-0" />
                <span className="sr-only"> — si apre in una nuova finestra</span>
              </a>
              {company.blog ? (
                <a
                  href={company.blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tappable inline-flex items-center gap-1.5 rounded-full bg-black/5 px-4 py-2"
                >
                  {company.blog.label}
                  <ExternalIcon className="h-4 w-4 shrink-0" />
                  <span className="sr-only"> — si apre in una nuova finestra</span>
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
