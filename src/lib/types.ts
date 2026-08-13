export type LevelId = "intermedio" | "avanzato" | "senior" | "lead" | "expert";

export type ExerciseType = "quiz" | "critique" | "scenario" | "brief";

export type Severity = "alta" | "media" | "bassa";

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctId: string;
  explanation: string;
}

export interface QuizExercise {
  type: "quiz";
  id: string;
  title: string;
  description: string;
  minutes: number;
  questions: QuizQuestion[];
}

export interface CritiqueIssue {
  id: string;
  label: string;
  /** true = è un difetto reale dello schermo, false = distrattore plausibile ma non è un problema */
  isReal: boolean;
  severity: Severity;
  explanation: string;
}

export interface CritiqueExercise {
  type: "critique";
  id: string;
  title: string;
  description: string;
  minutes: number;
  /** id del mock renderizzato in app (src/components/mocks) */
  mockId: string;
  /** la lente con cui guardare lo schermo in questo esercizio */
  lens: string;
  context: string;
  issues: CritiqueIssue[];
}

export interface ScenarioOption {
  id: string;
  label: string;
  /** 0-3: 3 = scelta migliore, 0 = scelta dannosa */
  score: number;
  outcome: string;
}

export interface ScenarioStep {
  id: string;
  situation: string;
  question: string;
  options: ScenarioOption[];
  debrief: string;
}

export interface ScenarioExercise {
  type: "scenario";
  id: string;
  title: string;
  description: string;
  minutes: number;
  setup: string;
  steps: ScenarioStep[];
}

export interface RubricCriterion {
  id: string;
  criterion: string;
  description: string;
  /** cosa distingue una risposta da 2 punti da una da 1 */
  excellent: string;
}

export interface BriefExercise {
  type: "brief";
  id: string;
  title: string;
  description: string;
  minutes: number;
  brief: string;
  constraints: string[];
  deliverables: string[];
  rubric: RubricCriterion[];
  expertAnswer: string[];
}

export type Exercise =
  | QuizExercise
  | CritiqueExercise
  | ScenarioExercise
  | BriefExercise;

export interface Capability {
  /** cosa sai fare concretamente padroneggiando il modulo */
  claim: string;
  /** il segnale di seniority che questo comportamento manda */
  signal: string;
}

export interface Lesson {
  id: string;
  title: string;
  /** paragrafi; le righe che iniziano con "— " diventano bullet */
  body: string[];
  /** riferimento reale su cui approfondire */
  source?: string;
}

export interface Module {
  id: string;
  level: LevelId;
  title: string;
  tagline: string;
  /** parola chiave per l'accento cromatico della card */
  accent: "mint" | "sky" | "blush" | "butter";
  minutes: number;
  outcomes: string[];
  capabilities: Capability[];
  /** cosa succede sul lavoro quando questa competenza manca */
  gapCost: string;
  lessons: Lesson[];
  exercises: Exercise[];
}

export interface LevelMeta {
  id: LevelId;
  name: string;
  subtitle: string;
  /** moltiplicatore XP: più alto il livello, più valgono gli esercizi */
  xpMultiplier: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  /** Il disegno sta in icone-premi.tsx, associato per id: qui non c'è più
   *  un'emoji, perché a disegnarla era il sistema operativo e non noi. */
}

export interface ProfileRow {
  id: string;
  display_name: string | null;
  xp: number;
  streak_count: number;
  longest_streak: number;
  last_active_date: string | null;
  created_at: string;
}

export interface ModuleProgressRow {
  user_id: string;
  module_id: string;
  exercises_completed: number;
  best_score_pct: number;
  last_score_pct: number;
  completed_at: string | null;
  updated_at: string;
}

export interface AttemptRow {
  id: string;
  module_id: string;
  exercise_id: string;
  exercise_type: ExerciseType;
  score: number;
  max_score: number;
  xp_awarded: number;
  created_at: string;
}

export interface BadgeRow {
  badge_id: string;
  earned_at: string;
}
