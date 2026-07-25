import type { Exercise, ExerciseType, Severity } from "./types";
import { maxScoreFor } from "./labels";

/* ------------------------------------------------------------------ */
/* Proiezione pubblica: quello che il client può vedere PRIMA di        */
/* rispondere. Le soluzioni non lasciano mai il server finché           */
/* l'esercizio non è stato consegnato.                                  */
/* ------------------------------------------------------------------ */

export interface PublicQuiz {
  type: "quiz";
  id: string;
  title: string;
  description: string;
  minutes: number;
  questions: { id: string; prompt: string; options: { id: string; label: string }[] }[];
}

export interface PublicCritique {
  type: "critique";
  id: string;
  title: string;
  description: string;
  minutes: number;
  mockId: string;
  lens: string;
  context: string;
  issues: { id: string; label: string }[];
}

export interface PublicScenario {
  type: "scenario";
  id: string;
  title: string;
  description: string;
  minutes: number;
  setup: string;
  steps: {
    id: string;
    situation: string;
    question: string;
    options: { id: string; label: string }[];
  }[];
}

export interface PublicBrief {
  type: "brief";
  id: string;
  title: string;
  description: string;
  minutes: number;
  brief: string;
  constraints: string[];
  deliverables: string[];
  rubric: { id: string; criterion: string; description: string; excellent: string }[];
}

export type PublicExercise = PublicQuiz | PublicCritique | PublicScenario | PublicBrief;

export function toPublicExercise(exercise: Exercise): PublicExercise {
  switch (exercise.type) {
    case "quiz":
      return {
        type: "quiz",
        id: exercise.id,
        title: exercise.title,
        description: exercise.description,
        minutes: exercise.minutes,
        questions: exercise.questions.map((q) => ({
          id: q.id,
          prompt: q.prompt,
          options: q.options.map((o) => ({ id: o.id, label: o.label })),
        })),
      };
    case "critique":
      return {
        type: "critique",
        id: exercise.id,
        title: exercise.title,
        description: exercise.description,
        minutes: exercise.minutes,
        mockId: exercise.mockId,
        lens: exercise.lens,
        context: exercise.context,
        issues: exercise.issues.map((i) => ({ id: i.id, label: i.label })),
      };
    case "scenario":
      return {
        type: "scenario",
        id: exercise.id,
        title: exercise.title,
        description: exercise.description,
        minutes: exercise.minutes,
        setup: exercise.setup,
        steps: exercise.steps.map((s) => ({
          id: s.id,
          situation: s.situation,
          question: s.question,
          options: s.options.map((o) => ({ id: o.id, label: o.label })),
        })),
      };
    case "brief":
      return {
        type: "brief",
        id: exercise.id,
        title: exercise.title,
        description: exercise.description,
        minutes: exercise.minutes,
        brief: exercise.brief,
        constraints: exercise.constraints,
        deliverables: exercise.deliverables,
        rubric: exercise.rubric,
      };
  }
}

/* ------------------------------------------------------------------ */
/* Risposte e correzione                                               */
/* ------------------------------------------------------------------ */

export type QuizAnswer = { type: "quiz"; choices: Record<string, string> };
export type CritiqueAnswer = { type: "critique"; selected: string[] };
export type ScenarioAnswer = { type: "scenario"; choices: Record<string, string> };
export type BriefAnswer = {
  type: "brief";
  text: string;
  selfScores: Record<string, number>;
};

export type ExerciseAnswer =
  | QuizAnswer
  | CritiqueAnswer
  | ScenarioAnswer
  | BriefAnswer;

export interface FeedbackLine {
  id: string;
  /** l'affermazione o la domanda a cui si riferisce */
  heading: string;
  /** cosa ha risposto l'utente, in chiaro */
  given?: string;
  /** la risposta corretta o la scelta migliore */
  expected?: string;
  correct: boolean;
  /** quanti punti valeva questa riga */
  points: number;
  maxPoints: number;
  explanation: string;
  severity?: Severity;
}

export interface GradeResult {
  score: number;
  maxScore: number;
  scorePct: number;
  type: ExerciseType;
  lines: FeedbackLine[];
  /** contenuto integrale rivelato dopo la consegna (risposta esperta, debrief) */
  reveal?: string[];
}

export function gradeExercise(exercise: Exercise, answer: ExerciseAnswer): GradeResult {
  const maxScore = maxScoreFor(exercise);
  let score = 0;
  const lines: FeedbackLine[] = [];
  let reveal: string[] | undefined;

  if (exercise.type === "quiz" && answer.type === "quiz") {
    for (const q of exercise.questions) {
      const givenId = answer.choices[q.id];
      const correct = givenId === q.correctId;
      if (correct) score += 1;
      lines.push({
        id: q.id,
        heading: q.prompt,
        given: q.options.find((o) => o.id === givenId)?.label ?? "Nessuna risposta",
        expected: q.options.find((o) => o.id === q.correctId)?.label,
        correct,
        points: correct ? 1 : 0,
        maxPoints: 1,
        explanation: q.explanation,
      });
    }
  }

  if (exercise.type === "critique" && answer.type === "critique") {
    const selected = new Set(answer.selected);
    for (const issue of exercise.issues) {
      const picked = selected.has(issue.id);
      const correct = picked === issue.isReal;
      if (correct) score += 1;
      lines.push({
        id: issue.id,
        heading: issue.label,
        given: picked ? "Segnalato come difetto" : "Non segnalato",
        expected: issue.isReal
          ? `Difetto reale — severità ${issue.severity}`
          : "Distrattore: non è un difetto",
        correct,
        points: correct ? 1 : 0,
        maxPoints: 1,
        explanation: issue.explanation,
        severity: issue.severity,
      });
    }
  }

  if (exercise.type === "scenario" && answer.type === "scenario") {
    for (const step of exercise.steps) {
      const givenId = answer.choices[step.id];
      const chosen = step.options.find((o) => o.id === givenId);
      const best = [...step.options].sort((a, b) => b.score - a.score)[0];
      const stepMax = best.score;
      const points = chosen?.score ?? 0;
      score += points;
      lines.push({
        id: step.id,
        heading: step.question,
        given: chosen ? `${chosen.label} — ${chosen.outcome}` : "Nessuna scelta",
        expected:
          chosen && chosen.id === best.id
            ? undefined
            : `${best.label} — ${best.outcome}`,
        correct: points === stepMax,
        points,
        maxPoints: stepMax,
        explanation: step.debrief,
      });
    }
  }

  if (exercise.type === "brief" && answer.type === "brief") {
    for (const criterion of exercise.rubric) {
      const raw = Number(answer.selfScores[criterion.id] ?? 0);
      const points = Math.max(0, Math.min(2, Math.round(raw)));
      score += points;
      lines.push({
        id: criterion.id,
        heading: criterion.criterion,
        given: `Autovalutazione: ${points}/2`,
        correct: points === 2,
        points,
        maxPoints: 2,
        explanation: criterion.excellent,
      });
    }
    reveal = exercise.expertAnswer;
  }

  const scorePct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return { score, maxScore, scorePct, type: exercise.type, lines, reveal };
}

export { verdict } from "./labels";
