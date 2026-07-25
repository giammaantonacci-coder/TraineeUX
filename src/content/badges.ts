import type { AttemptRow, Badge, ModuleProgressRow } from "@/lib/types";
import { MASTERY_THRESHOLD } from "@/lib/progression";

export const BADGES: Badge[] = [
  {
    id: "primo-passo",
    name: "Primo passo",
    description: "Hai completato il tuo primo esercizio.",
    emoji: "🌱",
  },
  {
    id: "occhio-critico",
    name: "Occhio critico",
    description: "5 critique completate: inizi a vedere i difetti prima degli altri.",
    emoji: "🔍",
  },
  {
    id: "decisore",
    name: "Decisore",
    description: "5 scenari risolti con almeno il 70%.",
    emoji: "🧭",
  },
  {
    id: "penna-veloce",
    name: "Penna veloce",
    description: "3 brief a tempo consegnati.",
    emoji: "✍️",
  },
  {
    id: "perfezione",
    name: "Punteggio pieno",
    description: "Un esercizio chiuso al 100%.",
    emoji: "💯",
  },
  {
    id: "streak-7",
    name: "Sette giorni",
    description: "Una settimana di allenamento senza saltare un giorno.",
    emoji: "🔥",
  },
  {
    id: "streak-30",
    name: "Trenta giorni",
    description: "Un mese di costanza. Qui la competenza diventa abitudine.",
    emoji: "🏔️",
  },
  {
    id: "modulo-padroneggiato",
    name: "Padronanza",
    description: "Primo modulo chiuso sopra il 70%.",
    emoji: "🎯",
  },
  {
    id: "livello-avanzato",
    name: "Oltre le basi",
    description: "Tutti i moduli del livello Intermedio padroneggiati.",
    emoji: "🚀",
  },
  {
    id: "livello-senior",
    name: "Mentalità senior",
    description: "Tutti i moduli del livello Senior padroneggiati.",
    emoji: "👑",
  },
  {
    id: "ricercatore",
    name: "Metodo",
    description: "Almeno un esercizio in 8 moduli diversi.",
    emoji: "🧪",
  },
  {
    id: "maratoneta",
    name: "Maratoneta",
    description: "50 esercizi completati in totale.",
    emoji: "🏅",
  },
];

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

interface BadgeContext {
  attempts: Pick<AttemptRow, "exercise_type" | "score" | "max_score" | "module_id">[];
  progress: ModuleProgressRow[];
  streak: number;
  /** id dei moduli del livello Intermedio / Senior, per i badge di livello */
  intermedioModuleIds: string[];
  seniorModuleIds: string[];
}

/** Ricalcola da zero l'elenco dei badge meritati. Idempotente. */
export function earnedBadgeIds(ctx: BadgeContext): string[] {
  const { attempts, progress, streak } = ctx;
  const earned = new Set<string>();
  const pct = (a: { score: number; max_score: number }) =>
    a.max_score > 0 ? (a.score / a.max_score) * 100 : 0;

  if (attempts.length >= 1) earned.add("primo-passo");
  if (attempts.filter((a) => a.exercise_type === "critique").length >= 5)
    earned.add("occhio-critico");
  if (attempts.filter((a) => a.exercise_type === "scenario" && pct(a) >= 70).length >= 5)
    earned.add("decisore");
  if (attempts.filter((a) => a.exercise_type === "brief").length >= 3)
    earned.add("penna-veloce");
  if (attempts.some((a) => pct(a) >= 100)) earned.add("perfezione");
  if (streak >= 7) earned.add("streak-7");
  if (streak >= 30) earned.add("streak-30");
  if (attempts.length >= 50) earned.add("maratoneta");

  const mastered = progress.filter((p) => p.best_score_pct >= MASTERY_THRESHOLD);
  if (mastered.length >= 1) earned.add("modulo-padroneggiato");

  const masteredIds = new Set(mastered.map((p) => p.module_id));
  if (
    ctx.intermedioModuleIds.length > 0 &&
    ctx.intermedioModuleIds.every((id) => masteredIds.has(id))
  )
    earned.add("livello-avanzato");
  if (
    ctx.seniorModuleIds.length > 0 &&
    ctx.seniorModuleIds.every((id) => masteredIds.has(id))
  )
    earned.add("livello-senior");

  if (new Set(attempts.map((a) => a.module_id)).size >= 8) earned.add("ricercatore");

  return [...earned];
}
