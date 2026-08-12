import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { origineRichiesta } from "@/lib/origine";

/**
 * Atterraggio del link di conferma inviato via email da Supabase.
 * Verifica il token e porta l'utente dentro l'app.
 *
 * L'indirizzo di ritorno non si ricava dall'URL della richiesta: dietro il
 * proxy quello e' l'host interno, e il redirect finirebbe su un indirizzo che
 * dal telefono non esiste.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = await origineRichiesta();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/benvenuto?errore=link-non-valido`);
}
