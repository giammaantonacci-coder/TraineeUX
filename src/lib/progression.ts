import type { ExerciseType, LevelId, LevelMeta } from "./types";

export const LEVELS: LevelMeta[] = [
  {
    id: "intermedio",
    name: "Intermedio",
    subtitle: "Le fondamenta che un mid deve avere automatiche",
    xpMultiplier: 1,
  },
  {
    id: "avanzato",
    name: "Avanzato",
    subtitle: "Sistemi, ricerca e accessibilità: smetti di disegnare schermate",
    xpMultiplier: 1.25,
  },
  {
    id: "senior",
    name: "Senior",
    subtitle: "Metriche, strategia e influenza sugli altri",
    xpMultiplier: 1.55,
  },
  {
    id: "lead",
    name: "Lead / Principal",
    subtitle: "Scalare persone, piattaforme e decisioni pluriennali",
    xpMultiplier: 1.9,
  },
  {
    id: "expert",
    name: "Expert",
    subtitle: "Etica, AI e problemi senza precedenti a cui riferirsi",
    xpMultiplier: 2.3,
  },
];

export const LEVEL_ORDER: LevelId[] = LEVELS.map((l) => l.id);

export function levelMeta(id: LevelId): LevelMeta {
  return LEVELS.find((l) => l.id === id) ?? LEVELS[0];
}

/** XP di base per tipo di esercizio, prima del moltiplicatore di livello. */
export const BASE_XP: Record<ExerciseType, number> = {
  quiz: 40,
  critique: 75,
  scenario: 85,
  brief: 110,
};

/**
 * XP assegnati. Anche un tentativo debole vale qualcosa (25% del massimo):
 * l'obiettivo è tornare domani, non punire chi sbaglia.
 */
export function xpForAttempt(
  type: ExerciseType,
  level: LevelId,
  scorePct: number,
): number {
  const max = BASE_XP[type] * levelMeta(level).xpMultiplier;
  const earned = max * (0.25 + 0.75 * (scorePct / 100));
  return Math.round(earned);
}

export interface Rank {
  id: string;
  name: string;
  minXp: number;
  description: string;
}

export const RANKS: Rank[] = [
  {
    id: "praticante",
    name: "Praticante",
    minXp: 0,
    description: "Conosci gli strumenti, stai costruendo il giudizio.",
  },
  {
    id: "designer",
    name: "Designer",
    minXp: 400,
    description: "Risolvi bene problemi già inquadrati da altri.",
  },
  {
    id: "senior",
    name: "Senior",
    minXp: 1200,
    description: "Inquadri tu il problema e difendi le scelte con i dati.",
  },
  {
    id: "lead",
    name: "Lead",
    minXp: 2600,
    description: "Il tuo impatto passa dal lavoro degli altri.",
  },
  {
    id: "principal",
    name: "Principal",
    minXp: 4500,
    description: "Decidi su orizzonti che nessuno ti ha ancora chiesto.",
  },
  {
    id: "expert",
    name: "Expert",
    minXp: 7000,
    description: "Definisci la pratica, non solo il prodotto.",
  },
];

export function rankForXp(xp: number): { current: Rank; next: Rank | null; progress: number } {
  let current = RANKS[0];
  for (const r of RANKS) if (xp >= r.minXp) current = r;
  const idx = RANKS.indexOf(current);
  const next = RANKS[idx + 1] ?? null;
  const progress = next
    ? Math.min(100, Math.round(((xp - current.minXp) / (next.minXp - current.minXp)) * 100))
    : 100;
  return { current, next, progress };
}

/**
 * Soglia di padronanza. Sotto questa percentuale il modulo risulta "provato"
 * ma non "padroneggiato": è ciò che sblocca le capacità nel profilo.
 */
export const MASTERY_THRESHOLD = 70;
