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
    /* Il fondo lascia posto ai pulsanti che galleggiano: senza, l'ultima riga
       di ogni passo finirebbe sotto di loro una volta arrivati in fondo. */
    <div className="mx-auto w-full max-w-xl px-4 pb-28 pt-6 md:max-w-2xl md:py-10 md:pb-32">
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

      <div>
        <h2 ref={titoloRef} tabIndex={-1} className="sr-only">
          {passo.titolo} — passo {i + 1} di {passi.length}
        </h2>
        {/* La chiave rimonta il ramo a ogni passo: senza, React riusa i nodi e
            l'animazione di entrata non riparte. */}
        <div key={passo.id} className="animate-rise">
          {passo.contenuto}
        </div>
      </div>

      {/* Chi ha gia' un account non deve attraversare la presentazione per
          rientrare: qui ci si arriva anche a sessione scaduta, e in quel caso
          tre schermate di spiegazioni sono tre ostacoli. Sta in fondo al
          contenuto e scorre con lui: e' una via di fuga, non un comando che
          deve stare sempre sotto il pollice. */}
      {ultimo ? null : (
        <button
          type="button"
          onClick={() => setI(passi.length - 1)}
          className="mt-8 block w-full py-1 text-center text-[13px] font-semibold text-ink-muted underline underline-offset-2"
        >
          Ho già un account, accedi
        </button>
      )}

      {/* I due comandi galleggiano sul contenuto, senza fascia e senza
          sfumatura sotto. Il velo bianco serviva a staccarli da quello che
          scorre dietro; tolto quello, il distacco lo fanno la forma tonda e
          l'ombra, che e' come si comportano i pulsanti mobili ovunque.
          Sono fissi rispetto alla finestra e non alla pagina: restano
          raggiungibili col pollice anche a meta' di una schermata lunga. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 pb-[max(env(safe-area-inset-bottom),1rem)] md:max-w-2xl">
          {i > 0 ? (
            <button
              type="button"
              onClick={() => setI(i - 1)}
              aria-label="Torna al passo precedente"
              className="tappable pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white text-xl font-bold shadow-[0_8px_24px_rgba(15,17,23,0.16)] active:bg-black/5"
            >
              <span aria-hidden="true">‹</span>
            </button>
          ) : (
            /* Segnaposto: senza, al primo passo il pulsante Avanti scivolerebbe
               a sinistra e tornerebbe a destra al secondo. */
            <span aria-hidden="true" className="h-14 w-14" />
          )}

          {ultimo ? null : (
            <button
              type="button"
              onClick={() => setI(i + 1)}
              aria-label="Vai al passo successivo"
              className="tappable pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-2xl font-bold text-white shadow-[0_10px_30px_rgba(15,17,23,0.28)]"
            >
              <span aria-hidden="true">›</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
