/**
 * La targhetta di un'azienda.
 *
 * Non è il logo vero, ed è una scelta e non una scorciatoia. L'informativa
 * dichiara che il browser di chi legge non contatta nessun sito terzo, quindi
 * un logo andrebbe impacchettato qui dentro invece che chiesto al CDN
 * dell'azienda; e ridisegnarlo a occhio significherebbe mostrare come marchio
 * di una società reale una cosa che quel marchio non è. Un monogramma non
 * finge di essere niente.
 *
 * Serve comunque allo scopo per cui un logo starebbe qui: dare a ogni card un
 * appiglio da riconoscere scorrendo, invece di dieci blocchi di testo che
 * cominciano tutti uguali.
 *
 * Per sostituirli con i loghi veri basta questo file: si mettono gli SVG in
 * public/loghi/ e si rimpiazza lo span con un'immagine. Le card non cambiano.
 */

/**
 * Le lettere, scelte a mano e non ricavate dal nome.
 *
 * Tre aziende su dieci cominciano per S — Stripe, Satispay, Shopify — e prese
 * dall'iniziale sarebbero state tre targhette identiche, cioè il contrario di
 * quello che servono a fare. Dove l'iniziale basta a distinguere resta una
 * lettera sola, che si legge meglio.
 */
const MARCHI: Record<string, string> = {
  linear: "L",
  figma: "F",
  stripe: "St",
  nngroup: "NN",
  satispay: "Sa",
  "bending-spoons": "BS",
  intercom: "In",
  "gov-uk": "GOV",
  shopify: "Sh",
  anthropic: "A",
};

export function MarchioAzienda({ id, name }: { id: string; name: string }) {
  const marchio = MARCHI[id] ?? name.slice(0, 1).toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/[0.04] font-extrabold tracking-tight"
    >
      {/* La misura scende con la lunghezza: "GOV" a corpo pieno toccherebbe i
          bordi del riquadro, e tre lettere strette non si leggono meglio di
          due larghe. */}
      <span className={marchio.length >= 3 ? "text-[13px]" : "text-[17px]"}>
        {marchio}
      </span>
    </span>
  );
}
