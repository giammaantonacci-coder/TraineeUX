import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./config";

/**
 * Il manifest è elencato anche qui, oltre che escluso dal matcher: è la risorsa
 * da cui iOS ricava display e scope dell'app installata, e se un domani il
 * matcher venisse riscritto, un suo redirect rimanderebbe l'app in Safari
 * senza che nulla nell'interfaccia lo faccia sospettare.
 */
const PUBLIC_PATHS = ["/login", "/auth", "/benvenuto", "/manifest.webmanifest"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // getClaims verifica il token localmente quando il progetto usa chiavi
  // asimmetriche, togliendo una chiamata di rete al server di autenticazione
  // da OGNI navigazione. Con le chiavi simmetriche ricade su una verifica
  // remota, quindi non è mai peggio di getUser.
  let user: { id: string } | null = null;
  // Distinguere "non ha una sessione" da "non sono riuscito a chiederlo" è
  // quello che evita di buttare fuori chi è dentro. Prima erano lo stesso
  // caso, quindi un singolo errore di rete verso Supabase mandava un utente
  // autenticato sulla pagina di accesso a metà navigazione.
  let verificaRiuscita = true;
  try {
    const { data } = await supabase.auth.getClaims();
    const sub = data?.claims?.sub;
    if (sub) user = { id: sub };
  } catch {
    verificaRiuscita = false;
  }

  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // Con la verifica fallita si lascia passare invece di rimbalzare: non è un
  // varco, perché la pagina rifà il controllo per conto suo e i dati restano
  // protetti dalle policy dentro Postgres, che il token lo valuta da sé.
  // Qui si decide solo dove mandare qualcuno, e sbagliare verso l'uscita
  // costa più che sbagliare verso l'interno.
  if (!user && !verificaRiuscita && !isPublic) {
    return supabaseResponse;
  }

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/benvenuto";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (user && (pathname === "/benvenuto" || pathname === "/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
