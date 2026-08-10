import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { leggiNotifiche, leggiPreferenze, segnaTutteLette } from "@/app/notifiche/actions";
import { requireUser } from "@/lib/data";
import { PageHeader } from "@/components/ui";
import { Bity } from "@/components/Bity";

export const metadata: Metadata = { title: "Notifiche" };

export default async function NotifichePage() {
  const user = await requireUser();
  if (!user) redirect("/benvenuto");

  // Il fuso serve a datare le notifiche. Questa pagina è renderizzata sul
  // server, che gira a UTC: senza, un promemoria ricevuto alle 14:00 italiane
  // veniva mostrato come "12:00", cioè un'ora a cui non è successo niente.
  const [notifiche, pref] = await Promise.all([leggiNotifiche(), leggiPreferenze()]);
  const fuso = pref?.timezone || "Europe/Rome";
  const daLeggere = notifiche.filter((n) => !n.read_at).length;

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Notifiche"
        bity={{ mood: daLeggere > 0 ? "curioso" : "felice", tint: "sky" }}
        title="Cosa ti sei perso"
        subtitle="Qui resta tutto quello che ti è stato notificato, anche se il telefono era spento o il permesso non era attivo."
      />

      {daLeggere > 0 ? (
        <form action={segnaTutteLette} className="mb-4">
          <button
            type="submit"
            className="tappable rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-bold active:bg-black/5"
          >
            Segna tutte come lette
          </button>
        </form>
      ) : null}

      {notifiche.length === 0 ? (
        <div className="card-light p-8 text-center">
          <Bity mood="assonnato" size={72} className="mx-auto mb-3" float />
          <p className="font-bold">Ancora nessuna notifica</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            Quando attivi i promemoria nel profilo, quello che ti viene inviato
            compare anche qui.
          </p>
          <Link
            href="/profilo"
            className="tappable mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white"
          >
            Vai alle impostazioni
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {notifiche.map((n) => (
            <li
              key={n.id}
              /* La barra a sinistra distingue il non letto senza affidarsi al
                 solo colore del testo, che a schermo chiaro si perde. */
              className={`card-light border-l-4 p-5 ${
                n.read_at ? "border-l-transparent opacity-70" : "border-l-sky-deep"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[15px] font-bold leading-snug">{n.title}</p>
                <span className="shrink-0 text-xs font-semibold text-ink-muted">
                  {quando(n.created_at, fuso)}
                </span>
              </div>
              <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                {n.body}
              </p>
              {n.href ? (
                /* -ml-3 recupera il padding: serve a portare il bersaglio
                   sopra i 24px di WCAG 2.5.8 senza rientrare il testo. */
                <Link
                  href={n.href}
                  className="tappable -ml-3 mt-2 inline-block rounded-full px-3 py-2 text-[14px] font-bold underline active:bg-black/5"
                >
                  Apri
                </Link>
              ) : null}
              {!n.read_at ? <span className="sr-only">Non letta</span> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Data leggibile e breve, nel fuso di chi legge.
 *
 * Il fuso va passato esplicitamente: qui si renderizza sul server, che gira a
 * UTC, e le funzioni di formattazione senza timeZone prendono quello. Il
 * promemoria delle 14:00 italiane risultava mandato alle 12:00, e anche il
 * confronto con "oggi" cambiava risultato nelle due ore a cavallo della
 * mezzanotte.
 */
function quando(iso: string, fuso: string): string {
  const d = new Date(iso);
  try {
    const giorno = (x: Date) =>
      new Intl.DateTimeFormat("it-IT", {
        timeZone: fuso,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(x);

    if (giorno(d) === giorno(new Date())) {
      return new Intl.DateTimeFormat("it-IT", {
        timeZone: fuso,
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    }
    return new Intl.DateTimeFormat("it-IT", {
      timeZone: fuso,
      day: "numeric",
      month: "short",
    }).format(d);
  } catch {
    // Un fuso non riconosciuto fa lanciare Intl: meglio una data approssimata
    // che una schermata che non si apre.
    return new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "short" }).format(d);
  }
}
