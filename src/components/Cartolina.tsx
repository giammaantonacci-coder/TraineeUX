import { Bity } from "@/components/Bity";
import type { Cartolina } from "@/content/regali";

const FONDO: Record<string, string> = {
  mint: "bg-mint",
  sky: "bg-sky",
  butter: "bg-butter",
  blush: "bg-blush",
  plum: "bg-plum",
};

/**
 * Una cartolina.
 *
 * Bity sta su un francobollo bianco e non appoggiata al fondo: il corpo di
 * Bity è della stessa tinta della cartolina, quindi senza quel rettangolo
 * chiaro sotto sparirebbe dentro il colore. È anche il motivo per cui la
 * forma funziona: una cartolina ha un francobollo, e questo è il posto dove
 * uno se lo aspetta.
 */
export function CartolinaCard({
  cartolina,
  mittente,
  quando,
  compatta = false,
  className = "",
}: {
  cartolina: Cartolina;
  /** Chi l'ha mandata. Senza, è una cartolina in mano tua, non ricevuta. */
  mittente?: string;
  quando?: string;
  /** Nella griglia da mandare: francobollo e nome, senza la frase. */
  compatta?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`h-full rounded-[22px] p-4 text-ink ${FONDO[cartolina.tint] ?? "bg-mint"} ${className}`}
    >
      <div
        className={
          compatta
            ? "flex h-full flex-col items-center text-center"
            : "flex items-start gap-3.5"
        }
      >
        <span className="inline-flex shrink-0 items-center justify-center rounded-[14px] bg-white p-1.5 shadow-[0_1px_2px_rgba(15,17,23,0.08)]">
          <Bity
            tint={cartolina.tint}
            mood={cartolina.mood}
            size={compatta ? 38 : 46}
            alive={false}
          />
        </span>
        <div className={compatta ? "mt-2 min-w-0" : "min-w-0 flex-1"}>
          <p className={`font-extrabold leading-tight ${compatta ? "text-[13px]" : ""}`}>
            {cartolina.nome}
          </p>
          {compatta ? null : (
            <p className="mt-1 text-[14px] leading-relaxed text-ink/75">{cartolina.frase}</p>
          )}
          {mittente ? (
            <p className="mt-2.5 text-[12px] font-semibold text-ink/60">
              da {mittente}
              {quando ? <span aria-hidden="true"> · </span> : null}
              {quando}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/**
 * Una cartolina ancora chiusa.
 *
 * Resta al suo posto nella griglia invece di sparire: vedere quali arrivano
 * dopo è metà del motivo per continuare, e una casella vuota non lo dice.
 */
export function CartolinaChiusa({ cartolina, xp }: { cartolina: Cartolina; xp: number }) {
  return (
    <div className="flex h-full flex-col items-center rounded-[22px] border border-dashed border-black/15 bg-black/[0.02] p-4 text-center">
      <span className="inline-flex items-center justify-center rounded-[14px] bg-black/[0.04] p-1.5">
        <Bity tint={cartolina.tint} mood={cartolina.mood} size={38} alive={false} className="opacity-25" />
      </span>
      <p className="mt-2 text-[13px] font-extrabold leading-tight text-ink-muted">
        {cartolina.nome}
      </p>
      <p className="mt-0.5 text-[11px] font-semibold text-ink-muted">
        fra {cartolina.minXp - xp} XP
      </p>
    </div>
  );
}
