import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { origineRichiesta } from "@/lib/origine";

/**
 * Ritorno da Google e da Apple.
 *
 * Il provider non ci manda una sessione: ci manda un codice usa e getta, che
 * qui viene scambiato con Supabase. Lo scambio deve avvenire sul server,
 * perche' e' quello che scrive i cookie di sessione — se lo facesse il browser,
 * le schermate rese dal server continuerebbero a non vedere nessuno collegato.
 *
 * Chi annulla dalla schermata del provider torna anche lui qui, ma con un
 * errore al posto del codice: non e' un guasto, e' un ripensamento, e va
 * riportato dove si era.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = await origineRichiesta();
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  // Due esiti diversi arrivano dallo stesso posto. "access_denied" e' la
  // persona che ha premuto Annulla sulla schermata del provider; qualunque
  // altro codice e' un guasto — provider non configurato, indirizzo di ritorno
  // non in elenco, chiave scaduta — e non va raccontato come un ripensamento,
  // perche' chi legge riproverebbe all'infinito credendo di aver sbagliato.
  const errore = searchParams.get("error");
  if (errore) {
    const annullato =
      errore === "access_denied" || searchParams.get("error_code") === "access_denied";
    return NextResponse.redirect(
      `${origin}/benvenuto?errore=${annullato ? "accesso-annullato" : "accesso-fallito"}`,
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/benvenuto?errore=accesso-fallito`);
}
