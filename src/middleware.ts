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
     */
    "/((?!_next/static|_next/image|manifest.webmanifest|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)",
  ],
};
