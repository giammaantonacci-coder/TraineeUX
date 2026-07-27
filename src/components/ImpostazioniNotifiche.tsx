"use client";

import { useEffect, useState, useTransition } from "react";
import {
  dimenticaDispositivo,
  registraDispositivo,
  salvaPreferenze,
  type PrefNotifiche,
} from "@/app/notifiche/actions";
import { VAPID_PUBLIC_KEY, chiaveApplicazione, inBase64Url } from "@/lib/push/config";

/**
 * Un interruttore e un'ora.
 *
 * Accendere costa tre passaggi che possono fallire ognuno per conto suo:
 * registrare il service worker, ottenere il permesso dal sistema, iscriversi
 * al servizio di push. Vanno distinti nel messaggio, perché "non ha
 * funzionato" non dice a nessuno cosa fare dopo — e su iPhone la causa più
 * probabile non è un errore ma un requisito: la app deve stare sulla
 * schermata home, non in Safari.
 */

type Stato =
  | "verifico"
  | "pronto"
  | "nonSupportato"
  | "servePwa"
  | "permessoNegato";

export function ImpostazioniNotifiche({ iniziali }: { iniziali: PrefNotifiche }) {
  const [pref, setPref] = useState(iniziali);
  const [stato, setStato] = useState<Stato>("verifico");
  const [errore, setErrore] = useState<string | null>(null);
  const [salvataggio, avvia] = useTransition();

  useEffect(() => {
    const supportato =
      "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;

    if (!supportato) {
      // Su iPhone l'assenza di PushManager fuori dall'app installata è la
      // regola, non un guasto: va detto così invece che come un errore.
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const installata =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as { standalone?: boolean }).standalone === true;
      setStato(iOS && !installata ? "servePwa" : "nonSupportato");
      return;
    }
    if (Notification.permission === "denied") {
      setStato("permessoNegato");
      return;
    }
    setStato("pronto");

    // Riconciliazione: la preferenza vive nel database, l'iscrizione sul
    // dispositivo. Reinstallando l'app la seconda sparisce e la prima resta
    // accesa, e i promemoria smetterebbero di arrivare senza che niente lo
    // dica. Qui l'iscrizione viene ricreata in silenzio.
    if (!iniziali.enabled || Notification.permission !== "granted") return;
    (async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        await navigator.serviceWorker.ready;
        const esistente = await reg.pushManager.getSubscription();
        const iscrizione =
          esistente ??
          (await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: chiaveApplicazione(VAPID_PUBLIC_KEY) as BufferSource,
          }));
        await registraDispositivo({
          endpoint: iscrizione.endpoint,
          p256dh: inBase64Url(iscrizione.getKey("p256dh")),
          auth: inBase64Url(iscrizione.getKey("auth")),
        });
      } catch {
        // Silenzio voluto: non è un'azione richiesta da chi guarda, e un
        // messaggio d'errore su una schermata appena aperta non sarebbe
        // collegabile a nulla che abbia fatto.
      }
    })();
  }, [iniziali.enabled]);

  function scriviPreferenze(nuove: PrefNotifiche) {
    setPref(nuove);
    avvia(async () => {
      const r = await salvaPreferenze(nuove);
      if (!r.ok) setErrore(r.error ?? "Non siamo riusciti a salvare.");
    });
  }

  async function accendi() {
    setErrore(null);
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const permesso = await Notification.requestPermission();
      if (permesso !== "granted") {
        setStato(permesso === "denied" ? "permessoNegato" : "pronto");
        return;
      }

      // Se c'è già un'iscrizione la si riusa: chiederne una seconda sullo
      // stesso dispositivo genera un endpoint nuovo e ne lascia uno morto.
      const iscrizione =
        (await reg.pushManager.getSubscription()) ??
        (await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: chiaveApplicazione(VAPID_PUBLIC_KEY) as BufferSource,
        }));

      const r = await registraDispositivo({
        endpoint: iscrizione.endpoint,
        p256dh: inBase64Url(iscrizione.getKey("p256dh")),
        auth: inBase64Url(iscrizione.getKey("auth")),
      });
      if (!r.ok) {
        setErrore(r.error ?? "Non siamo riusciti a registrare il dispositivo.");
        return;
      }

      scriviPreferenze({
        ...pref,
        enabled: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || pref.timezone,
      });
    } catch (e) {
      setErrore(
        e instanceof Error
          ? `Attivazione non riuscita: ${e.message}`
          : "Attivazione non riuscita.",
      );
    }
  }

  async function spegni() {
    setErrore(null);
    scriviPreferenze({ ...pref, enabled: false });
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      const iscrizione = await reg?.pushManager.getSubscription();
      if (iscrizione) {
        await dimenticaDispositivo(iscrizione.endpoint);
        await iscrizione.unsubscribe();
      }
    } catch {
      // La preferenza è già a spento: il servizio non invierà comunque nulla,
      // anche se la pulizia dell'iscrizione non riesce.
    }
  }

  if (stato === "verifico") {
    return <div className="card-light h-32 animate-pulse" aria-hidden="true" />;
  }

  return (
    <div className="card-light p-5">
      <h3 className="text-[15px] font-bold">Promemoria di allenamento</h3>
      <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
        Un solo avviso al giorno, all&apos;ora che scegli, e solo se non ti sei
        ancora allenato. Se ti sei già allenato, quel giorno non arriva niente.
      </p>

      {stato === "servePwa" ? (
        <p className="mt-4 rounded-2xl bg-butter/40 px-4 py-3 text-[14px] leading-relaxed">
          Su iPhone le notifiche funzionano solo con l&apos;app aggiunta alla
          schermata home. Aprila dall&apos;icona invece che da Safari e torna qui.
        </p>
      ) : null}

      {stato === "nonSupportato" ? (
        <p className="mt-4 rounded-2xl bg-black/5 px-4 py-3 text-[14px] leading-relaxed">
          Questo browser non supporta le notifiche push. I promemoria restano
          comunque nel centro notifiche dentro l&apos;app.
        </p>
      ) : null}

      {stato === "permessoNegato" ? (
        <p className="mt-4 rounded-2xl bg-blush/30 px-4 py-3 text-[14px] leading-relaxed">
          Hai negato il permesso alle notifiche. Da qui non è più richiedibile:
          va riattivato nelle impostazioni del telefono, alla voce di questa app.
        </p>
      ) : null}

      {stato === "pronto" ? (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[15px] font-semibold" id="etichetta-promemoria">
              {pref.enabled ? "Attivi" : "Disattivati"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={pref.enabled}
              aria-labelledby="etichetta-promemoria"
              disabled={salvataggio}
              onClick={() => (pref.enabled ? spegni() : accendi())}
              className={`relative h-8 w-14 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
                pref.enabled ? "bg-mint-deep" : "bg-black/15"
              }`}
            >
              {/* left-1 ancorato: senza, la posizione statica dentro il
                  pulsante faceva da base alla traslazione e il pomello
                  finiva fuori dal binario. */}
              <span
                aria-hidden="true"
                className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                  pref.enabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {pref.enabled ? (
            <div className="border-t border-black/5 pt-4">
              <label
                htmlFor="ora-promemoria"
                className="block text-[14px] font-semibold"
              >
                A che ora
              </label>
              <select
                id="ora-promemoria"
                value={pref.hour}
                disabled={salvataggio}
                onChange={(e) =>
                  scriviPreferenze({ ...pref, hour: Number(e.target.value) })
                }
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[15px] font-semibold focus:border-ink focus:outline-none"
              >
                {Array.from({ length: 24 }, (_, h) => (
                  <option key={h} value={h}>
                    {String(h).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
              <p className="mt-2 text-[13px] text-ink-muted">
                Ora locale del tuo fuso ({pref.timezone}).
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {errore ? (
        <p role="alert" className="mt-4 text-[14px] font-medium text-blush-deep">
          {errore}
        </p>
      ) : null}
    </div>
  );
}
