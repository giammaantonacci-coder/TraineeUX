import Link from "next/link";
import type { ReactNode } from "react";
import { Bity, type BityMood, type BityTint } from "@/components/Bity";
import type { LevelId } from "@/lib/types";

export const ACCENT_BG: Record<string, string> = {
  mint: "bg-mint",
  sky: "bg-sky",
  blush: "bg-blush",
  butter: "bg-butter",
};

export const ACCENT_TEXT: Record<string, string> = {
  mint: "text-mint-deep",
  sky: "text-sky-deep",
  blush: "text-blush-deep",
  butter: "text-ink",
};

export function Pill({
  children,
  tone = "neutral",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "dark" | "mint" | "sky" | "blush" | "butter";
  /** "sm" dove le pillole dividono la riga con qualcos'altro. */
  size?: "md" | "sm";
  className?: string;
}) {
  const tones = {
    neutral: "bg-black/5 text-ink-muted",
    dark: "bg-ink text-white",
    mint: "bg-mint text-ink",
    sky: "bg-sky text-ink",
    blush: "bg-blush text-ink",
    butter: "bg-butter text-ink",
  };
  // Corpo e imbottitura stanno qui e non in una classe passata da fuori: due
  // utility di font-size sullo stesso elemento le risolve l'ordine del foglio
  // di stile, non l'ordine in cui sono scritte, quindi una sovrascrittura
  // dall'esterno vince o perde a seconda di come Tailwind emette le regole.
  const sizes = {
    md: "px-3 py-1 text-xs",
    sm: "px-2.5 py-[3px] text-[11px]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizes[size]} ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function ScoreRing({
  value,
  size = 64,
  label,
  onDark = false,
}: {
  value: number;
  size?: number;
  label?: string;
  /** Su fondo scuro la traccia nera sparisce: a punteggio zero restava un
   *  numero sospeso senza cerchio attorno. */
  onDark?: boolean;
}) {
  const stroke = size >= 56 ? 7 : 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `${clamped} per cento`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className={onDark ? "text-white/20" : "text-black/10"}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={
            clamped >= 70 ? "text-mint-deep" : clamped >= 45 ? "text-butter" : "text-blush-deep"
          }
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-bold"
        style={{ fontSize: size / 4 }}
      >
        {clamped}
        <span className="text-[0.6em] font-semibold">%</span>
      </span>
    </div>
  );
}

export function ProgressBar({
  value,
  className = "",
  tone = "dark",
}: {
  value: number;
  className?: string;
  tone?: "dark" | "mint" | "light";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const fill =
    tone === "mint" ? "bg-mint-deep" : tone === "light" ? "bg-white" : "bg-ink";
  const track = tone === "light" ? "bg-white/25" : "bg-black/10";
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full ${track} ${className}`}>
      <div
        className={`h-full rounded-full ${fill} transition-[width] duration-500`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">
      <h2 className="text-lg font-bold tracking-tight">{children}</h2>
      {action ? (
        /* -mr-2 recupera il padding: serve a portare il bersaglio tattile
           sopra i 24px richiesti da WCAG 2.5.8 senza spostare il testo. */
        <Link
          href={action.href}
          className="-mr-2 shrink-0 rounded-full px-2 py-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink active:bg-black/5"
        >
          {action.label} ›
        </Link>
      ) : null}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  bity,
  bityLabel,
  azione,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Bity accanto all'occhiello: la sua espressione dice a colpo d'occhio
   *  come sta andando questa sezione. Omettila e l'intestazione resta nuda. */
  bity?: { mood?: BityMood; tint?: BityTint; level?: LevelId; lente?: boolean };
  /** Da passare solo dove il colore di Bity porta informazione che non è
   *  scritta altrove nella pagina; senza, resta decorativa e muta. */
  bityLabel?: string;
  /** Comando in fondo alla riga del titolo, appoggiato al margine destro.
   *  Serve a una sezione che ha una sua azione ricorrente — la campanella sul
   *  profilo — senza costringere ogni pagina a rifarsi l'intestazione. */
  azione?: ReactNode;
}) {
  return (
    <header className="mb-6">
      {/* Bity sopra il testo e non accanto.
          Accanto rientrava occhiello e titolo di una cinquantina di pixel,
          mentre il sottotitolo sotto restava al margine: nella stessa
          intestazione convivevano due allineamenti a sinistra diversi. Sopra,
          invece, tutto il testo comincia dove comincia il resto della pagina,
          e Bity resta la cosa piu' a sinistra di tutte. */}
      {bity ? (
        <Bity
          mood={bity.mood}
          tint={bity.tint}
          level={bity.level}
          lente={bity.lente}
          /* seed scelto per non cadere sullo stesso ritardo delle Bity
             di livello nel percorso, che usano gli indici da 1 a 5 */
          size={44}
          seed={9}
          label={bityLabel}
          className="mb-2 block"
        />
      ) : null}
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight md:text-4xl">
            {title}
          </h1>
        </div>
        {azione ? <div className="shrink-0">{azione}</div> : null}
      </div>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-3">
      {paragraphs.map((p, i) =>
        p.startsWith("— ") ? (
          <p key={i} className="flex gap-2.5 pl-1 text-[15px] leading-relaxed">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
            <span>{renderInline(p.slice(2))}</span>
          </p>
        ) : (
          <p key={i} className="text-[15px] leading-relaxed">
            {renderInline(p)}
          </p>
        ),
      )}
    </div>
  );
}

/** Grassetto con **testo** e corsivo con *testo*, senza dipendenze markdown. */
export function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}


/* ------------------------------------------------------------------ */
/* Scheletri di caricamento                                            */
/*                                                                     */
/* Ogni schermata interroga Supabase: senza uno stato di attesa il      */
/* tocco non produce nulla per qualche centinaio di millisecondi. Lo    */
/* scheletro riproduce la forma della pagina, così l'arrivo dei dati    */
/* non sposta il layout.                                               */
/* ------------------------------------------------------------------ */

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-full bg-black/[0.07] ${className}`}
    />
  );
}

export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-light p-5">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-5 w-3/4 rounded-lg" />
      <div className="mt-3 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={`h-3 ${i === lines - 1 ? "w-1/2" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}

/**
 * Involucro con l'annuncio di caricamento per chi usa uno screen reader.
 *
 * Bity aspetta insieme a chi guarda, nella stessa posizione in cui comparirà
 * poi nell'intestazione: quando i dati arrivano non salta da nessuna parte,
 * cambia solo espressione. È il momento in cui la mascotte serve di più,
 * perché è l'unico in cui non c'è altro da guardare.
 */
export function LoadingShell({ children }: { children: ReactNode }) {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Caricamento in corso</span>
      <div className="mb-4 flex items-center gap-3">
        <Bity mood="pensieroso" size={44} float className="shrink-0" />
        <Skeleton className="h-3 w-28" />
      </div>
      {children}
    </div>
  );
}
