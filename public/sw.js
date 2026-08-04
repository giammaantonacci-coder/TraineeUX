/**
 * Service worker di TraineeUX.
 *
 * Fa una cosa sola: ricevere le notifiche push e aprirle. Nessuna cache e
 * nessun intercettamento delle richieste, di proposito — una cache sbagliata
 * qui servirebbe pagine vecchie senza che nulla nell'interfaccia lo faccia
 * sospettare, ed è un problema molto peggiore di quello che risolverebbe.
 */

self.addEventListener("install", () => {
  // Entra in servizio subito invece di aspettare la chiusura delle schede:
  // chi ha appena acceso le notifiche non deve riavviare l'app.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let dati = {};
  try {
    dati = event.data ? event.data.json() : {};
  } catch {
    // Un corpo non leggibile non deve far sparire la notifica: meglio un
    // avviso generico che nessun avviso.
  }

  const titolo = dati.title || "TraineeUX";
  const opzioni = {
    body: dati.body || "È il momento di allenarti.",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    // Un tag diverso ogni giorno, e renotify acceso.
    //
    // Prima il tag era la costante "promemoria" con renotify spento, e questo
    // è il motivo per cui i promemoria smettevano di farsi sentire: due
    // notifiche con lo stesso tag non convivono, la seconda prende il posto
    // della prima — e con renotify spento quel ricambio avviene in silenzio,
    // senza suono né banner. Bastava non aver cancellato il promemoria del
    // giorno prima dal centro notifiche perché tutti quelli successivi
    // arrivassero muti. Il server continuava a segnalare consegne riuscite,
    // perché dal suo lato lo erano.
    //
    // Il tag serviva a evitare che due avvisi si impilassero, ma di avvisi ne
    // parte uno al giorno: quel raggruppamento non ha mai avuto niente da
    // raggruppare.
    tag: dati.tag || `promemoria-${new Date().toISOString().slice(0, 10)}`,
    renotify: true,
    data: { href: dati.href || "/" },
  };

  event.waitUntil(self.registration.showNotification(titolo, opzioni));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const href = (event.notification.data && event.notification.data.href) || "/";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((finestre) => {
        // Se l'app è già aperta si porta in primo piano invece di aprirne una
        // seconda copia, che su telefono è la cosa più fastidiosa possibile.
        for (const f of finestre) {
          if (f.url.includes(self.location.origin)) {
            f.navigate(href).catch(() => {});
            return f.focus();
          }
        }
        return self.clients.openWindow(href);
      }),
  );
});
