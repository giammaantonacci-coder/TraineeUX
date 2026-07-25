import Link from "next/link";
import type { ReactNode } from "react";

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
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "dark" | "mint" | "sky" | "blush" | "butter";
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
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function ScoreRing({
  value,
  size = 64,
  label,
}: {
  value: number;
  size?: number;
  label?: string;
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
          className="text-black/10"
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
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <h2 className="text-lg font-bold tracking-tight">{children}</h2>
      {action ? (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-semibold text-ink-muted hover:text-ink"
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
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-6">
      {eyebrow ? (
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-[28px] font-extrabold leading-tight tracking-tight md:text-4xl">
        {title}
      </h1>
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
