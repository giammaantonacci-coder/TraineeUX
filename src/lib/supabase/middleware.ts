import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./config";

const PUBLIC_PATHS = ["/login", "/auth", "/benvenuto"];

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
  // Se Supabase è irraggiungibile il sito non deve cadere: si degrada a
  // "non autenticato" e le pagine pubbliche continuano a funzionare.
  let user: { id: string } | null = null;
  try {
    const { data } = await supabase.auth.getClaims();
    const sub = data?.claims?.sub;
    if (sub) user = { id: sub };
  } catch {
    user = null;
  }

  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/benvenuto";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (user && (pathname === "/benvenuto" || pathname === "/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/oggi";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
