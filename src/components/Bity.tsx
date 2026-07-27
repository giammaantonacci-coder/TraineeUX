import type { LevelId } from "@/lib/types";

/**
 * Bity, la mascotte dell'app.
 *
 * È disegnata in SVG e non caricata come immagine: compare in molti punti e in
 * molte varianti, e un'immagine per combinazione sarebbe una richiesta di rete
 * ciascuna. Così è markup, arriva con la pagina, scala senza sfocare ed eredita
 * il tema.
 *
 * Nessun "use client": sono forme e animazioni CSS, niente stato.
 */

export type BityMood =
  | "felice"
  | "curioso"
  | "esulta"
  | "pensieroso"
  | "spiacente"
  | "assonnato";

export type BityTint = "mint" | "sky" | "butter" | "blush" | "plum";

/** Ogni livello ha la sua tinta: il colore di Bity dice a che punto sei. */
export const BITY_TINT_BY_LEVEL: Record<LevelId, BityTint> = {
  intermedio: "sky",
  avanzato: "mint",
  senior: "butter",
  lead: "blush",
  expert: "plum",
};

const TINTS: Record<BityTint, { base: string; deep: string }> = {
  mint: { base: "#9fe7c7", deep: "#6fd4a8" },
  sky: { base: "#a8ddf0", deep: "#6cc7e8" },
  butter: { base: "#ffe3a3", deep: "#f5c76a" },
  blush: { base: "#ffb6dc", deep: "#ff8ec9" },
  plum: { base: "#cbb8f7", deep: "#a98ceb" },
};

const INK = "#0f1117";

type Eyes = "aperti" | "spalancati" | "felici" | "chiusi" | "laterali" | "bassi";
type Mouth = "sorriso" | "cerchietto" | "aperta" | "linea" | "incerta" | "riposo";
type Brows = "alzato" | "preoccupate";

interface Face {
  /** deformazione del corpo: scala orizzontale, verticale, spostamento in basso */
  squash: [number, number, number];
  eyes: Eyes;
  mouth: Mouth;
  brows?: Brows;
  sparkles?: boolean;
}

/**
 * Il corpo si deforma con l'umore: è quello che rende un cerchio un personaggio
 * invece di un bollino. Schiacciato quando esulta o riposa, teso quando è
 * incuriosito.
 */
const FACES: Record<BityMood, Face> = {
  felice: { squash: [1, 1, 0], eyes: "aperti", mouth: "sorriso" },
  curioso: {
    squash: [0.975, 1.035, -1],
    eyes: "spalancati",
    mouth: "cerchietto",
    brows: "alzato",
  },
  esulta: {
    squash: [1.065, 0.935, 3],
    eyes: "felici",
    mouth: "aperta",
    sparkles: true,
  },
  pensieroso: { squash: [1, 1, 0], eyes: "laterali", mouth: "linea" },
  spiacente: {
    squash: [1.035, 0.96, 2],
    eyes: "bassi",
    mouth: "incerta",
    brows: "preoccupate",
  },
  assonnato: { squash: [1.05, 0.93, 4], eyes: "chiusi", mouth: "riposo" },
};

export function Bity({
  mood = "felice",
  tint = "mint",
  level,
  size = 96,
  float = false,
  pop = false,
  alive = true,
  seed = 0,
  label,
  className = "",
}: {
  mood?: BityMood;
  tint?: BityTint;
  /** se presente vince su tint: Bity prende il colore del livello */
  level?: LevelId;
  size?: number;
  /** galleggiamento lento e continuo */
  float?: boolean;
  /** comparsa a molla, per i momenti di premio */
  pop?: boolean;
  /** respiro e battito di palpebre. Si spegne dove Bity è un pittogramma. */
  alive?: boolean;
  /** sfasa respiro e palpebre: più Bity nella stessa schermata non devono
   *  battere le palpebre all'unisono, che è la cosa che le fa sembrare finte */
  seed?: number;
  /** nome accessibile. Senza, Bity è decorativa e sparisce agli screen reader. */
  label?: string;
  className?: string;
}) {
  const { base, deep } = TINTS[level ? BITY_TINT_BY_LEVEL[level] : tint];
  const face = FACES[mood];
  const [sx, sy, ty] = face.squash;

  const motion = [float ? "animate-bity-float" : "", pop ? "animate-bity-pop" : ""]
    .filter(Boolean)
    .join(" ");

  // Occhi chiusi o ad arco non hanno palpebre da chiudere.
  const battePalpebre =
    alive && (face.eyes === "aperti" || face.eyes === "spalancati" || face.eyes === "laterali" || face.eyes === "bassi");
  const ritardo = `${((seed * 1.37) % 4.6).toFixed(2)}s`;

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`${motion} ${className}`}
      /* Il ruolo cambia con l'uso: se non ha un nome è ornamento e va nascosta,
         altrimenti raddoppia ogni testo che le sta accanto. */
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {/* Ombra di contatto: resta a terra mentre il corpo si schiaccia sopra */}
      <ellipse cx="60" cy="108" rx="27" ry="4.5" fill={INK} opacity="0.06" />
      <ellipse cx="60" cy="108" rx="18" ry="3" fill={INK} opacity="0.05" />

      {face.sparkles ? <Sparkles color={deep} /> : null}

      {/* Due gruppi annidati e non uno: la deformazione dell'umore sta
          nell'attributo transform, il respiro in una animazione CSS. Sullo
          stesso elemento la seconda cancellerebbe la prima. */}
      <g transform={`translate(60 ${62 + ty}) scale(${sx} ${sy}) translate(-60 -62)`}>
        <g
          className={alive ? "bity-respiro" : undefined}
          style={alive ? { animationDelay: ritardo } : undefined}
        >
          {/* Volume in tre strati invece di un gradiente: il lato in ombra è il
              corpo scuro che sporge da sotto quello chiaro, spostato in alto a
              sinistra verso la luce. */}
          <ellipse cx="60" cy="62" rx="42" ry="41" fill={deep} />
          <ellipse cx="57.5" cy="59" rx="39.5" ry="38.5" fill={base} />
          <ellipse
            cx="45"
            cy="43"
            rx="14"
            ry="9.5"
            fill="#ffffff"
            opacity="0.45"
            transform="rotate(-28 45 43)"
          />
          <circle cx="64" cy="34" r="2.6" fill="#ffffff" opacity="0.32" />

          {face.brows ? <Brows kind={face.brows} /> : null}
          <g
            className={battePalpebre ? "bity-occhio" : undefined}
            style={battePalpebre ? { animationDelay: ritardo } : undefined}
          >
            <Eye cx={47} cy={60} kind={face.eyes} />
          </g>
          <g
            className={battePalpebre ? "bity-occhio" : undefined}
            style={battePalpebre ? { animationDelay: ritardo } : undefined}
          >
            <Eye cx={73} cy={60} kind={face.eyes} />
          </g>
          <Mouth kind={face.mouth} />
        </g>
      </g>
    </svg>
  );
}

function Eye({ cx, cy, kind }: { cx: number; cy: number; kind: Eyes }) {
  if (kind === "felici") {
    return (
      <path
        d={`M ${cx - 8} ${cy + 2} Q ${cx} ${cy - 7} ${cx + 8} ${cy + 2}`}
        stroke={INK}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
    );
  }

  if (kind === "chiusi") {
    return (
      <path
        d={`M ${cx - 7} ${cy - 1} Q ${cx} ${cy + 4} ${cx + 7} ${cy - 1}`}
        stroke={INK}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    );
  }

  const wide = kind === "spalancati";
  const rx = wide ? 9.4 : 8.4;
  const ry = wide ? 10.4 : 9.4;
  const pr = wide ? 4.2 : 4.7;
  const dx = kind === "laterali" ? 2.6 : 0;
  const dy = kind === "bassi" ? 2.6 : kind === "spalancati" ? -1 : 0;

  return (
    <>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#ffffff" />
      <circle cx={cx + dx} cy={cy + dy} r={pr} fill={INK} />
      <circle cx={cx + dx - 1.5} cy={cy + dy - 2} r="1.5" fill="#ffffff" opacity="0.9" />
    </>
  );
}

function Brows({ kind }: { kind: Brows }) {
  if (kind === "alzato") {
    return (
      <path
        d="M 66 43.5 Q 73 39 80 43.5"
        stroke={INK}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
    );
  }
  return (
    <>
      <path
        d="M 39 50 L 53 45.5"
        stroke={INK}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 81 50 L 67 45.5"
        stroke={INK}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function Mouth({ kind }: { kind: Mouth }) {
  switch (kind) {
    case "sorriso":
      return (
        <path
          d="M 51 79 Q 60 88.5 69 79"
          stroke={INK}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "cerchietto":
      return <ellipse cx="60" cy="82" rx="3.6" ry="4.2" fill={INK} />;
    case "aperta":
      /* Senza lingua: a 24px un dettaglio rosa di due pixel non si legge come
         lingua, si legge come un difetto di rendering. */
      return <path d="M 48 77 Q 60 94 72 77 Z" fill={INK} />;
    case "linea":
      return (
        <path
          d="M 54 84 L 66 80.5"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "incerta":
      return (
        <path
          d="M 52.5 84 Q 56.5 79.5 60 83.5 Q 63.5 87.5 67.5 83"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "riposo":
      return <ellipse cx="60" cy="83" rx="2.6" ry="3.2" fill={INK} />;
  }
}

/** Stelline dell'esultanza: fuori dal corpo, così non si deformano con lui. */
function Sparkles({ color }: { color: string }) {
  const star = (x: number, y: number, s: number) =>
    `M ${x} ${y - s} Q ${x} ${y} ${x + s} ${y} Q ${x} ${y} ${x} ${y + s} Q ${x} ${y} ${x - s} ${y} Q ${x} ${y} ${x} ${y - s} Z`;
  return (
    <g fill={color}>
      <path d={star(15, 40, 7)} opacity="0.75" />
      <path d={star(105, 50, 5.5)} opacity="0.6" />
      <path d={star(22, 88, 4.5)} opacity="0.5" />
    </g>
  );
}

/**
 * Reazione di Bity al punteggio. Le soglie seguono quelle già usate altrove
 * (padronanza al 70%, punteggio debole sotto il 45%) così l'espressione non
 * contraddice il colore dell'anello del punteggio accanto.
 */
export function moodForScore(pct: number): BityMood {
  if (pct >= 90) return "esulta";
  if (pct >= 70) return "felice";
  if (pct >= 45) return "pensieroso";
  return "spiacente";
}
