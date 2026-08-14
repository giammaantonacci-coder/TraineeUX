"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Bity } from "@/components/Bity";
import { CartolinaCard } from "@/components/Cartolina";
import { Pill } from "@/components/ui";
import { FlameIcon } from "@/components/icons";
import { CARTOLINE_AL_GIORNO, cartolineSbloccate } from "@/content/regali";
import { levelMeta } from "@/lib/progression";
import type { RigaClassifica } from "@/lib/amici";
import { mandaCartolina, rimuoviAmico } from "@/app/(app)/amici/actions";

/**
 * La classifica del giro, e il pannello che si apre toccando un amico.
 *
 * Il pannello è uno solo per tutta la lista: le azioni che riguardano un amico
 * — mandargli una cartolina, toglierlo — sono le stesse per chiunque, e
 * ripetere lo stesso riquadro dentro ogni riga significherebbe montarne uno
 * per amico per tenerne aperto al massimo uno.
 */
export function GiroAmici({
  righe,
  xp,
  mandateOggi,
}: {
  righe: RigaClassifica[];
  /** I miei XP: decidono quali cartoline posso mandare. */
  xp: number;
  mandateOggi: number;
}) {
  const [scelto, setScelto] = useState<RigaClassifica | null>(null);

  return (
    <>
      <ol className="space-y-2">
        {righe.map((r) => (
          <li key={r.utente}>
            {r.sonoIo ? (
              <RigaCorpo riga={r} />
            ) : (
              <button
                type="button"
                onClick={() => setScelto(r)}
                aria-label={`${r.nome}, apri le azioni`}
                className="tappable block w-full text-left"
              >
                <RigaCorpo riga={r} />
              </button>
            )}
          </li>
        ))}
      </ol>

      <PannelloAmico
        amico={scelto}
        xp={xp}
        mandateOggi={mandateOggi}
        chiudi={() => setScelto(null)}
      />
    </>
  );
}

function RigaCorpo({ riga }: { riga: RigaClassifica }) {
  const scuro = riga.sonoIo;
  return (
    <div
      className={`flex items-center gap-3 rounded-[22px] p-3.5 ${
        scuro
          ? "card-dark"
          : "card-light active:bg-black/[0.02]"
      }`}
    >
      {/* La posizione è a larghezza fissa e in cifre tabellari: senza, la
          colonna dei nomi si sposta di qualche pixel passando da 9 a 10. */}
      <span
        className={`w-6 shrink-0 text-center text-[15px] font-extrabold tabular-nums ${
          scuro ? "text-white/60" : "text-ink-muted"
        }`}
      >
        {riga.posizione}
      </span>
      <Bity level={riga.livello} size={40} alive={false} className="shrink-0" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className={`truncate font-bold ${scuro ? "text-white" : ""}`}>
            {riga.nome}
          </span>
          {riga.sonoIo ? (
            <Pill size="sm" className="shrink-0 bg-white/15 text-white">
              tu
            </Pill>
          ) : null}
        </span>
        {/* La serie è una fiamma e un numero, non "12 giorni di serie".
            Scritta per esteso accanto a "Lead / Principal" — il nome di
            livello più lungo — la riga finiva troncata proprio sul numero,
            cioè sull'unica parte che cambia da un amico all'altro. */}
        <span
          className={`flex items-center gap-1 text-[13px] ${scuro ? "text-white/60" : "text-ink-muted"}`}
        >
          <span className="truncate">{levelMeta(riga.livello).name}</span>
          {riga.serie > 0 ? (
            <span className="flex shrink-0 items-center gap-0.5">
              <span aria-hidden="true">·</span>
              <FlameIcon className="h-3.5 w-3.5" />
              <span className="tabular-nums">{riga.serie}</span>
              <span className="sr-only">giorni di serie</span>
            </span>
          ) : null}
        </span>
      </span>
      <span className="shrink-0 text-right">
        <span
          className={`block text-[17px] font-extrabold leading-none tabular-nums ${
            scuro ? "text-white" : ""
          }`}
        >
          {riga.xpSettimana}
        </span>
        <span
          className={`mt-1 block text-[10px] font-semibold leading-none ${
            scuro ? "text-white/50" : "text-ink-muted"
          }`}
        >
          XP
        </span>
      </span>
    </div>
  );
}

/**
 * Il pannello di un amico.
 *
 * È un <dialog> nativo: la tendina scura, la chiusura con Esc e la trappola
 * del fuoco arrivano dal browser, e non c'è motivo di riscriverle. Il fuoco
 * iniziale va sul contenuto e non sul primo bottone, o all'apertura si
 * vedrebbe un anello attorno alla X.
 */
function PannelloAmico({
  amico,
  xp,
  mandateOggi,
  chiudi,
}: {
  amico: RigaClassifica | null;
  xp: number;
  mandateOggi: number;
  chiudi: () => void;
}) {
  const scheda = useRef<HTMLDialogElement>(null);
  const [esito, setEsito] = useState<{ ok: boolean; testo: string } | null>(null);
  const [mandate, setMandate] = useState(mandateOggi);
  const [inCorso, avvia] = useTransition();

  useEffect(() => {
    const d = scheda.current;
    if (!d) return;
    if (amico && !d.open) d.showModal();
    if (!amico && d.open) d.close();
  }, [amico]);

  // Cambiando amico si riparte puliti: il messaggio dell'invio precedente non
  // deve comparire sopra la faccia di qualcun altro.
  useEffect(() => setEsito(null), [amico?.utente]);
  useEffect(() => setMandate(mandateOggi), [mandateOggi]);

  const sbloccate = cartolineSbloccate(xp);
  const restano = Math.max(0, CARTOLINE_AL_GIORNO - mandate);

  return (
    <dialog
      ref={scheda}
      onClose={chiudi}
      onClick={(e) => {
        // Il click sulla tendina arriva al dialog stesso, non ai figli.
        if (e.target === scheda.current) chiudi();
      }}
      className="fixed inset-x-4 inset-y-9 m-auto h-fit max-h-[calc(100dvh-4.5rem)] max-w-[32rem] overflow-y-auto rounded-[28px] border-0 bg-canvas p-0 text-ink shadow-[0_24px_60px_-20px_rgba(15,17,23,0.45)] backdrop:bg-ink/45"
    >
      {amico ? (
        <div autoFocus tabIndex={-1} className="p-5 outline-none">
          <div className="flex items-start gap-3">
            <Bity level={amico.livello} size={52} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-extrabold leading-tight">{amico.nome}</p>
              <p className="text-[13px] text-ink-muted">
                {levelMeta(amico.livello).name}
                <span aria-hidden="true"> · </span>
                {amico.moduliPadroneggiati}{" "}
                {amico.moduliPadroneggiati === 1 ? "modulo" : "moduli"} padroneggiati
              </p>
            </div>
            <button
              type="button"
              onClick={chiudi}
              aria-label="Chiudi"
              className="tappable -mr-1 -mt-1 shrink-0 rounded-full p-2 text-ink-muted"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <dl className="mt-4 flex gap-6 border-y border-black/[0.07] py-3.5">
            <Numero valore={amico.xpSettimana} etichetta="XP questa settimana" />
            <Numero valore={amico.xp} etichetta="XP in tutto" />
            <Numero valore={amico.serie} etichetta="giorni di serie" />
          </dl>

          <h3 className="mt-5 text-[15px] font-bold">Mandagli una cartolina</h3>
          <p className="mt-0.5 text-[13px] text-ink-muted">
            {restano === 0
              ? "Per oggi le hai finite. Ne torni ad avere cinque domani."
              : `Ne restano ${restano} per oggi.`}
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {sbloccate.map((c) => (
              <button
                key={c.id}
                type="button"
                disabled={inCorso || restano === 0}
                onClick={() =>
                  avvia(async () => {
                    const r = await mandaCartolina(amico.utente, c.id);
                    if (r.ok) {
                      setMandate((n) => n + 1);
                      setEsito({ ok: true, testo: `«${c.nome}» è partita.` });
                    } else {
                      setEsito({ ok: false, testo: r.errore ?? "Non è partita." });
                    }
                  })
                }
                className="tappable text-left disabled:opacity-40"
              >
                <CartolinaCard cartolina={c} compatta />
              </button>
            ))}
          </div>

          {esito ? (
            <p
              role="status"
              className={`mt-3 text-[13px] font-semibold ${esito.ok ? "text-ink" : "text-blush-deep"}`}
            >
              {esito.testo}
            </p>
          ) : null}

          <ToglieAmico amico={amico} finito={chiudi} />
        </div>
      ) : null}
    </dialog>
  );
}

function Numero({ valore, etichetta }: { valore: number; etichetta: string }) {
  return (
    <div>
      <dd className="text-xl font-extrabold leading-none tabular-nums">{valore}</dd>
      <dt className="mt-1 text-[11px] font-semibold leading-tight text-ink-muted">
        {etichetta}
      </dt>
    </div>
  );
}

/**
 * Togliere qualcuno dal giro chiede una conferma, e la chiede sul posto.
 *
 * È un'azione che sparisce da tutte e due le parti e che non si annulla, ma
 * non merita una finestra sopra un'altra finestra: il bottone si trasforma
 * nella domanda, e la risposta sta dov'era il bottone.
 */
function ToglieAmico({ amico, finito }: { amico: RigaClassifica; finito: () => void }) {
  const [chiede, setChiede] = useState(false);
  const [inCorso, avvia] = useTransition();

  useEffect(() => setChiede(false), [amico.utente]);

  if (!chiede) {
    return (
      <button
        type="button"
        onClick={() => setChiede(true)}
        className="tappable mt-5 w-full rounded-full border border-black/10 px-4 py-3 text-[13px] font-bold text-ink-muted"
      >
        Togli dal giro
      </button>
    );
  }

  return (
    <div className="mt-5 rounded-2xl bg-black/[0.03] p-3.5">
      <p className="text-[13px] font-semibold leading-snug">
        Togli {amico.nome}? Sparirà dalla classifica di tutti e due.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={inCorso}
          onClick={() =>
            avvia(async () => {
              await rimuoviAmico(amico.utente);
              finito();
            })
          }
          className="tappable rounded-full bg-ink px-4 py-2.5 text-[13px] font-bold text-white disabled:opacity-50"
        >
          {inCorso ? "Attendi" : "Sì, togli"}
        </button>
        <button
          type="button"
          onClick={() => setChiede(false)}
          className="tappable rounded-full px-4 py-2.5 text-[13px] font-bold text-ink-muted"
        >
          Annulla
        </button>
      </div>
    </div>
  );
}
