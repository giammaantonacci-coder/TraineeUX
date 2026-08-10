import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Tutte le rotte tranne asset statici e immagini.
     *
     * manifest.webmanifest deve stare fuori: il browser lo scarica senza
     * cookie (la specifica impone credentials "omit" salvo crossorigin
     * esplicito), quindi qui dentro risultava sempre senza sessione e il
     * guardiano rispondeva 307 verso /benvenuto. iOS riceveva HTML al posto
     * del manifest, non trovava piu' display "standalone" ne' lo scope, e
     * ogni sezione diversa dalla schermata iniziale se ne andava in Safari.
     *
     * sw.js sta fuori per lo stesso motivo, con un guasto diverso in fondo.
     * Il browser lo riscarica per conto suo per vedere se e' cambiato, e quel
     * controllo puo' capitare a sessione scaduta: riceverebbe la pagina di
     * benvenuto al posto del codice, l'aggiornamento fallirebbe e le
     * notifiche smetterebbero di arrivare senza un errore da nessuna parte.
     * Non estendo l'elenco delle estensioni a ".js" perche' li' dentro
     * finirebbero anche le rotte che finiscono per caso in quel modo: meglio
     * nominare il file, che e' uno solo.
     */
    "/((?!_next/static|_next/image|manifest.webmanifest|sw.js|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)",
  ],
};
