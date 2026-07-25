import type { Exercise, ExerciseType } from "./types";

/**
 * Etichette e utilità pure. Questo file non importa mai i contenuti dei moduli:
 * viene usato anche dai componenti client, e le soluzioni degli esercizi non
 * devono finire nel bundle del browser.
 */

export const EXERCISE_TYPE_LABEL: Record<ExerciseType, string> = {
  quiz: "Quiz",
  critique: "Critique",
  scenario: "Scenario",
  brief: "Brief a tempo",
};

export const EXERCISE_TYPE_DESCRIPTION: Record<ExerciseType, string> = {
  quiz: "Domande secche su principi e metodo",
  critique: "Trova i difetti reali in uno schermo",
  scenario: "Decisioni con conseguenze",
  brief: "Scrivi la tua risposta, poi confrontala",
};

/** Punteggio massimo ottenibile in un esercizio, in punti grezzi. */
export function maxScoreFor(exercise: Exercise): number {
  switch (exercise.type) {
    case "quiz":
      return exercise.questions.length;
    case "critique":
      return exercise.issues.length;
    case "scenario":
      return exercise.steps.reduce(
        (sum, s) => sum + Math.max(...s.options.map((o) => o.score)),
        0,
      );
    case "brief":
      return exercise.rubric.length * 2;
  }
}

/** Messaggio di sintesi adatto al punteggio: incoraggiante ma onesto. */
export function verdict(scorePct: number): { title: string; body: string } {
  if (scorePct >= 90)
    return {
      title: "Padronanza",
      body: "Questo livello di precisione è quello che ti si aspetta da un profilo senior sul tema. Passa al modulo successivo.",
    };
  if (scorePct >= 70)
    return {
      title: "Solido",
      body: "Hai il controllo del tema. Rileggi le spiegazioni degli errori: è lì che sta la differenza tra sapere e saper decidere sotto pressione.",
    };
  if (scorePct >= 45)
    return {
      title: "In costruzione",
      body: "Le basi ci sono, il giudizio nei casi ambigui no. Rifai l'esercizio tra qualche giorno: la ripetizione distanziata funziona molto meglio di rifarlo subito.",
    };
  return {
    title: "Da riprendere",
    body: "Torna alle lezioni del modulo prima di riprovare. Un punteggio basso su un tema significa che serve il concetto, non più tentativi.",
  };
}
