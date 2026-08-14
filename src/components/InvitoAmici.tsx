"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { aggiungiAmico } from "@/app/(app)/amici/actions";

/**
 * Il proprio codice, e il modo per farlo arrivare a qualcuno.
 *
 * Il link porta a /amici?codice=…, non alla home: chi lo apre senza avere
 * l'app finisce sul benvenuto, ma il codice viaggia in un cookie e viene
 * ripreso appena dentro. Il tasto di sistema per condividere si usa solo dove
 * c'è — su desktop non esiste, e lì resta la copia negli appunti.
 */
export function IlTuoCodice({ codice, nome }: { codice: string; nome: string }) {
  const [fatto, setFatto] = useState<"link" | "codice" | null>(null);

  const link = () =>
    `${window.location.origin}/amici?codice=${encodeURIComponent(codice)}`;

  async function condividi() {
    const url = link();
    const testo = `${nome} ti invita su TraineeUX. Apri questo link e ci ritrovi già fra i suoi amici.`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "TraineeUX", text: testo, url });
        return;
      } catch {
        // Annullato, o rifiutato dal sistema: si ricade sugli appunti, che è
        // sempre meglio di un tocco che non produce niente.
      }
    }
    await copia(url, "link");
  }

  async function copia(testo: string, cosa: "link" | "codice") {
    try {
      await navigator.clipboard.writeText(testo);
      setFatto(cosa);
      setTimeout(() => setFatto(null), 2200);
    } catch {
      /* Appunti negati: il codice resta comunque scritto grande qui sopra. */
    }
  }

  return (
    <div>
      {/* Il codice è scritto per essere copiato a mano da uno schermo: cifre a
          larghezza fissa e spaziatura larga, perché a leggerlo si perde il
          segno. */}
      <button
        type="button"
        onClick={() => copia(codice, "codice")}
        className="tappable w-full rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3.5 text-center active:bg-white/[0.12]"
      >
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
          Il tuo codice
        </span>
        <span className="mt-1 block font-mono text-2xl font-extrabold tracking-[0.18em] text-white">
          {codice}
        </span>
        <span className="mt-1 block text-[11px] font-semibold text-white/50">
          {fatto === "codice" ? "Copiato" : "Tocca per copiarlo"}
        </span>
      </button>

      <button
        type="button"
        onClick={condividi}
        className="tappable mt-3 w-full rounded-full bg-white px-5 py-3.5 text-sm font-bold text-ink active:bg-white/90"
      >
        {fatto === "link" ? "Link copiato" : "Invita un amico"}
      </button>
    </div>
  );
}

/**
 * Il campo per entrare nel giro di qualcun altro.
 *
 * Accetta anche il link intero incollato: chi riceve un invito ha in mano
 * quello, e chiedergli di estrarne otto caratteri è chiedergli un lavoro che
 * possiamo fare noi.
 */
export function CampoCodice() {
  const [valore, setValore] = useState("");
  const [esito, setEsito] = useState<{ ok: boolean; testo: string } | null>(null);
  const [inCorso, avvia] = useTransition();

  function invia(e: React.FormEvent) {
    e.preventDefault();
    const grezzo = valore.trim();
    if (!grezzo) return;
    // Un link incollato: si tiene solo il codice.
    const daLink = grezzo.match(/codice=([A-Za-z0-9]+)/);
    const codice = daLink ? daLink[1] : grezzo;

    avvia(async () => {
      const r = await aggiungiAmico(codice);
      if (!r.ok) {
        setEsito({ ok: false, testo: r.errore ?? "Non ha funzionato." });
        return;
      }
      setValore("");
      setEsito({
        ok: true,
        testo: r.eraGiaAmico
          ? `${r.nome} era già nel tuo giro.`
          : `${r.nome} è entrato nel tuo giro.`,
      });
    });
  }

  return (
    <form onSubmit={invia}>
      <label htmlFor="codice-amico" className="block text-sm font-semibold">
        Hai il codice di un amico?
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="codice-amico"
          value={valore}
          onChange={(e) => setValore(e.target.value)}
          placeholder="Incolla codice o link"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-semibold placeholder:font-medium placeholder:text-ink-muted"
        />
        <button
          type="submit"
          disabled={inCorso || valore.trim().length === 0}
          className="tappable shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
        >
          {inCorso ? "Attendi" : "Aggiungi"}
        </button>
      </div>
      {esito ? (
        <p
          role="status"
          className={`mt-2 text-[13px] font-semibold ${esito.ok ? "text-ink" : "text-blush-deep"}`}
        >
          {esito.testo}
        </p>
      ) : null}
    </form>
  );
}

/**
 * L'invito appena arrivato.
 *
 * Compare in cima solo quando un codice è davvero in mano — dal link o dal
 * cookie sopravvissuto all'iscrizione — e sparisce appena si decide. Il
 * nome dell'altro non lo sappiamo prima di chiedere al database, quindi il
 * bottone non lo promette.
 */
export function ConfermaInvito({ codice }: { codice: string }) {
  const [esito, setEsito] = useState<{ ok: boolean; testo: string } | null>(null);
  const [chiusa, setChiusa] = useState(false);
  const [inCorso, avvia] = useTransition();
  const router = useRouter();

  if (chiusa) return null;

  return (
    <div className="mb-6 rounded-[28px] bg-mint p-5">
      {esito ? (
        <p role="status" className="text-[15px] font-bold leading-relaxed">
          {esito.testo}
        </p>
      ) : (
        <>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">
            Ti hanno invitato
          </p>
          <p className="mt-1 text-[17px] font-extrabold leading-snug">
            Qualcuno ti vuole nel suo giro
          </p>
          <p className="mt-1 font-mono text-sm font-bold tracking-[0.18em] text-ink/70">
            {codice}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              disabled={inCorso}
              onClick={() =>
                avvia(async () => {
                  const r = await aggiungiAmico(codice);
                  setEsito({
                    ok: r.ok,
                    testo: r.ok
                      ? r.eraGiaAmico
                        ? `${r.nome} era già nel tuo giro.`
                        : `Fatto: ${r.nome} è nel tuo giro.`
                      : (r.errore ?? "Non ha funzionato."),
                  });
                  // Il codice esce dall'indirizzo: restando lì, ricaricare la
                  // pagina o tornarci col tasto indietro riproporrebbe
                  // l'invito già accettato.
                  if (r.ok) router.replace("/amici");
                })
              }
              className="tappable rounded-full bg-ink px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              {inCorso ? "Attendi" : "Accetta"}
            </button>
            <button
              type="button"
              onClick={() => setChiusa(true)}
              className="tappable rounded-full px-4 py-3 text-sm font-bold text-ink/60"
            >
              No, grazie
            </button>
          </div>
        </>
      )}
    </div>
  );
}
