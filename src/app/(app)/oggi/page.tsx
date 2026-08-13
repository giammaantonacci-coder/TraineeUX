import type { Metadata } from "next";
import { SchermataOggi } from "@/components/SchermataOggi";

/**
 * Stessa schermata di "/", tenuta viva di proposito.
 *
 * Le installazioni già sulla schermata home di qualcuno puntano a questo
 * indirizzo: un rimando verso "/" le manderebbe fuori dal loro confine
 * proprio all'avvio, cioè peggio di come stanno. Servendo qui lo stesso
 * contenuto continuano a funzionare come prima, e prendono il confine
 * corretto quando vengono reinstallate.
 */
export const metadata: Metadata = { title: "Home" };

export default function OggiPage() {
  return <SchermataOggi />;
}
