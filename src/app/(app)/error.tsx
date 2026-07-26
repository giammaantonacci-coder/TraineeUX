"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Bity } from "@/components/Bity";

/**
 * Stato di errore progettato, non la schermata predefinita di Next.
 * Dice cosa è successo, cosa non è andato perso e offre due strade: è la
 * stessa anatomia che il modulo "Stati, errori e microcopy" pretende.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg py-10 text-center">
      <Bity mood="spiacente" tint="blush" size={80} className="mx-auto" />
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
        Questa schermata non si è caricata
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
        I tuoi progressi sono al sicuro: XP, punteggi e serie sono salvati sul
        server, non in questa pagina. Riprova — se succede di nuovo, torna alla
        home e riparti da lì.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-transform active:scale-[0.97]"
        >
          Riprova
        </button>
        <Link
          href="/oggi"
          className="rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-bold transition-transform active:scale-[0.97]"
        >
          Torna a Oggi
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-6 text-xs text-ink-muted">
          Codice per la diagnosi: <code className="font-mono">{error.digest}</code>
        </p>
      ) : null}
    </div>
  );
}
