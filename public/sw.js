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
    // Stesso tag per i promemoria: se ne arrivano due, il secondo sostituisce
    // il primo invece di impilarsi.
    tag: dati.tag || "promemoria",
    renotify: false,
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
