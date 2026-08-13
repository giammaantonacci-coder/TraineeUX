import Link from "next/link";
import type { ReactNode } from "react";
import { Bity } from "@/components/Bity";

/**
 * L'impaginazione delle due pagine legali.
 *
 * Privacy e termini si citano a vicenda e si leggono di seguito: se avessero
 * due impaginazioni diverse sembrerebbero presi da due posti diversi, che su
 * un testo che deve risultare affidabile e' esattamente il segnale sbagliato.
 *
 * Stanno fuori dal guscio dell'app — niente navigazione in fondo, niente
 * fascia di stato — perche' si aprono anche da chi un account non ce l'ha.
 */
export function PaginaLegale({
  titolo,
  aggiornata,
  intro,
  children,
}: {
  titolo: string;
  aggiornata: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-2xl px-4 py-8 md:px-6 md:py-14">
      <div className="mb-8 flex items-center gap-2.5">
        <Bity size={40} label="Bity, la mascotte di TraineeUX" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
          TraineeUX
        </p>
      </div>

      <h1 className="text-[32px] font-extrabold leading-[1.08] tracking-tight md:text-4xl">
        {titolo}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        Aggiornati al {aggiornata}. {intro}
      </p>

      {children}

      <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t border-black/10 pt-6 text-sm">
        <Link href="/" className="font-bold text-ink underline">
          Torna all&apos;app
        </Link>
        <Link href="/privacy" className="text-ink-muted underline">
          Informativa privacy
        </Link>
        <Link href="/termini" className="text-ink-muted underline">
          Termini di servizio
        </Link>
      </div>
    </div>
  );
}

export function Sezione({
  titolo,
  children,
}: {
  titolo: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-extrabold tracking-tight">{titolo}</h2>
      <div className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        {children}
      </div>
    </section>
  );
}
