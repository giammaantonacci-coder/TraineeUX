"use client";

import { useEffect } from "react";
import { registraDispositivo } from "@/app/notifiche/actions";
import { inBase64Url } from "@/lib/push/config";

/**
 * Tiene allineato l'indirizzo push del dispositivo con quello nel database.
 *
 * La riconciliazione esisteva già, ma viveva dentro le impostazioni delle
 * notifiche, cioè su Profilo: una schermata che chi usa l'app apre una volta e
 * poi più. Quando iOS ha rigenerato l'iscrizione, il database è rimasto con
 * l'indirizzo vecchio per giorni, e nessuno dei due lati poteva accorgersene —
 * il servizio di Apple accetta gli invii verso un indirizzo morto senza
 * segnalare niente, quindi dal server ogni consegna risultava riuscita mentre
 * sul telefono non arrivava nulla. Non c'era un errore da nessuna parte: solo
 * un indirizzo scaduto e nessun momento in cui qualcuno lo rileggesse.
 *
 * Qui il controllo avviene all'apertura dell'app, ovunque si entri. È tutto
 * locale tranne la scrittura, e la scrittura parte solo se c'è davvero
 * un'iscrizione viva: senza permesso non si può fare nulla in silenzio, perché
 * ottenerlo richiede un tocco, e quel caso lo dichiara la schermata Profilo.
 */

const FATTO = "traineeux:push-riconciliato";

export function RiconciliaPush() {
  useEffect(() => {
    // Una volta per sessione: l'indirizzo non cambia mentre l'app è aperta, e
    // ripetere la scrittura a ogni navigazione sarebbe traffico e basta.
    try {
      if (sessionStorage.getItem(FATTO)) return;
    } catch {
      // Modalità private restrittive: si procede, al massimo si riscrive.
    }

    if (!("serviceWorker" in navigator) || !("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    (async () => {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        // Nessuna registrazione o nessuna iscrizione: non c'è niente da
        // riallineare, e crearne una qui sarebbe una decisione presa al posto
        // di chi usa l'app.
        const iscrizione = await reg?.pushManager.getSubscription();
        if (!iscrizione) return;

        const r = await registraDispositivo({
          endpoint: iscrizione.endpoint,
          p256dh: inBase64Url(iscrizione.getKey("p256dh")),
          auth: inBase64Url(iscrizione.getKey("auth")),
        });
        if (r.ok) {
          try {
            sessionStorage.setItem(FATTO, "1");
          } catch {
            // Senza memoria di sessione si ripete: è innocuo.
          }
        }
      } catch {
        // Silenzio voluto: non è un'azione richiesta da chi guarda, e un
        // messaggio d'errore all'apertura non sarebbe collegabile a nulla.
      }
    })();
  }, []);

  return null;
}
