import { type NextRequest, NextResponse } from "next/server";

/**
 * Le miniature delle news passano da qui invece di essere caricate dal browser.
 *
 * Non e' un vezzo tecnico: l'informativa privacy dichiara che il browser di chi
 * legge non contatta nessun sito terzo, e un tag <img> puntato al CDN di una
 * testata lo smentirebbe — quel server vedrebbe indirizzo IP, browser e pagina
 * di provenienza di ogni lettore. Facendo il giro dal nostro server, la fonte
 * vede una richiesta sola, la nostra, e nessuno dei nostri.
 *
 * Un proxy aperto pero' e' un problema in se': chiunque potrebbe usarlo per
 * scaricare qualunque cosa a nostro nome, o per bussare a indirizzi interni.
 * Per questo passa solo l'elenco chiuso di domini qui sotto, e solo se quello
 * che torna indietro e' davvero un'immagine.
 */

/**
 * Da dove accettiamo miniature.
 *
 * Sono i domini delle fonti e le reti di distribuzione che usano. L'elenco si
 * confronta sul suffisso, cosi' "cdn-images-1.medium.com" entra da "medium.com"
 * ma "medium.com.attaccante.example" no: il confronto e' sul punto davanti.
 * Una fonte che non e' in elenco non rompe niente — resta senza immagine.
 */
const DOMINI = [
  "medium.com",
  "nngroup.com",
  "smashingmagazine.com",
  "smashing.media",
  "alistapart.com",
  "gov.uk",
  "intercom.com",
  "shopify.com",
  "figma.com",
  "webflow.com",
  "uxdesign.cc",
];

function dominioAmmesso(host: string): boolean {
  return DOMINI.some((d) => host === d || host.endsWith(`.${d}`));
}

export async function GET(request: NextRequest) {
  const indirizzo = request.nextUrl.searchParams.get("u");
  if (!indirizzo) return new NextResponse("manca l'indirizzo", { status: 400 });

  let url: URL;
  try {
    url = new URL(indirizzo);
  } catch {
    return new NextResponse("indirizzo non valido", { status: 400 });
  }

  if (url.protocol !== "https:" || !dominioAmmesso(url.hostname)) {
    return new NextResponse("dominio non ammesso", { status: 403 });
  }

  try {
    const risposta = await fetch(url, {
      headers: { "User-Agent": "TraineeUX/1.0 (+https://trainee-ux.vercel.app)" },
      // Le miniature non cambiano mai: si tengono un giorno.
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(6000),
    });

    const tipo = risposta.headers.get("content-type") ?? "";
    if (!risposta.ok || !tipo.startsWith("image/")) {
      return new NextResponse("non e' un'immagine", { status: 404 });
    }

    return new NextResponse(risposta.body, {
      headers: {
        "Content-Type": tipo,
        // Un giorno nel browser, una settimana nella cache di rete: le
        // miniature sono immutabili e non vale la pena richiederle.
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    });
  } catch {
    return new NextResponse("non raggiungibile", { status: 404 });
  }
}
