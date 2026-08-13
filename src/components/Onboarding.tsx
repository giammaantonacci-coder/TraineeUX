"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface Passo {
  id: string;
  /** Il titolo del passo, letto dagli screen reader all'arrivo. */
  titolo: string;
  contenuto: ReactNode;
}

/**
 * L'onboarding in quattro schermate.
 *
 * I contenuti arrivano gia' resi dal server. E' la ragione per cui questo
 * componente riceve dei ReactNode invece di leggersi MODULES e LEVELS da se':
 * importare i contenuti qui dentro vorrebbe dire spedire al browser l'intero
 * archivio degli esercizi — domande, risposte e soluzioni comprese — per
 * mostrare dodici titoli.
 *
 * Lo stato non sta nell'indirizzo. Il tasto indietro del telefono, su una
 * schermata che si apre a sessione scaduta, deve riportare da dove si veniva:
 * se ogni passo fosse una voce di cronologia, per uscire di qui servirebbero
 * quattro indietro. La navigazione fra i passi ha i suoi pulsanti, visibili.
 */
export function Onboarding({
  passi,
  partiDa = 0,
}: {
  passi: Passo[];
  /** L'errore di un accesso fallito riporta qui: si riparte dall'accesso. */
  partiDa?: number;
}) {
  const [i, setI] = useState(Math.min(partiDa, passi.length - 1));
  const titoloRef = useRef<HTMLHeadingElement>(null);
  const primoRender = useRef(true);

  // Cambiare passo non ricarica la pagina, quindi chi usa uno screen reader non
  // riceverebbe nessun annuncio: senza questo, il contenuto cambia in silenzio.
  useEffect(() => {
    if (primoRender.current) {
      primoRender.current = false;
      return;
    }
    titoloRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [i]);

  const passo = passi[i];
  const ultimo = i === passi.length - 1;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 py-6 md:max-w-2xl md:py-10">
      {/* La barra: un segmento per passo, non una barra continua. Con quattro
          tappe il riempimento progressivo direbbe "sei a poco piu' di meta'"
          quando invece sei "al terzo di quattro", che e' un'informazione piu'
          precisa e piu' rassicurante. */}
      <div className="mb-6 flex items-center gap-3">
        <ol className="flex flex-1 gap-1.5" aria-hidden="true">
          {passi.map((p, n) => (
            <li
              key={p.id}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                n <= i ? "bg-ink" : "bg-black/10"
              }`}
            />
          ))}
        </ol>
        <p className="shrink-0 text-xs font-bold tabular-nums text-ink-muted">
          {i + 1} di {passi.length}
        </p>
      </div>

      <div className="flex-1">
        <h2 ref={titoloRef} tabIndex={-1} className="sr-only">
          {passo.titolo} — passo {i + 1} di {passi.length}
        </h2>
        {/* La chiave rimonta il ramo a ogni passo: senza, React riusa i nodi e
            l'animazione di entrata non riparte. */}
        <div key={passo.id} className="animate-rise">
          {passo.contenuto}
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 mt-8 bg-gradient-to-t from-surface via-surface to-transparent px-4 pb-2 pt-6">
        <div className="flex items-center gap-3">
          {i > 0 ? (
            <button
              type="button"
              onClick={() => setI(i - 1)}
              className="tappable shrink-0 rounded-full border border-black/10 bg-white px-5 py-3.5 text-sm font-bold active:bg-black/5"
            >
              <span aria-hidden="true">‹</span> Indietro
            </button>
          ) : null}

          {ultimo ? null : (
            <button
              type="button"
              onClick={() => setI(i + 1)}
              className="tappable flex-1 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white"
            >
              Avanti <span aria-hidden="true">›</span>
            </button>
          )}
        </div>

        {/* Chi ha gia' un account non deve attraversare la presentazione per
            rientrare: qui ci si arriva anche a sessione scaduta, e in quel caso
            tre schermate di spiegazioni sono tre ostacoli. */}
        {ultimo ? null : (
          <button
            type="button"
            onClick={() => setI(passi.length - 1)}
            className="mt-3 block w-full py-1 text-center text-[13px] font-semibold text-ink-muted underline underline-offset-2"
          >
            Ho già un account, accedi
          </button>
        )}
      </div>
    </div>
  );
}
