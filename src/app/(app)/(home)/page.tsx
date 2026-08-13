import type { Metadata } from "next";
import { SchermataOggi } from "@/components/SchermataOggi";

/**
 * La schermata iniziale sta su "/" e non su "/oggi", e non è una preferenza.
 *
 * Su iOS l'app installata risultava autonoma per la strada storica (il meta
 * apple-mobile-web-app-capable) mentre il manifest veniva ignorato: misurato
 * dall'app installata, display-mode standalone era falso con navigator
 * .standalone vero. Senza manifest non c'è nessuno scope dichiarato, e il
 * confine lo decide l'indirizzo con cui l'app è stata salvata. Con "/" che
 * rimandava a "/oggi", quel salvataggio finiva su "/oggi" e ogni altra
 * sezione risultava fuori: si apriva nel browser interno invece che dentro
 * l'app. Servendo la schermata direttamente su "/", il confine diventa la
 * radice e tutto il sito ci sta dentro.
 */
export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return <SchermataOggi />;
}
