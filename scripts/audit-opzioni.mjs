/**
 * Controlla che la risposta corretta non si riconosca dalla lunghezza.
 *
 * È il difetto di costruzione più comune nei quiz: se l'opzione giusta è
 * sistematicamente la più lunga e dettagliata, si impara a riconoscere la
 * forma invece del contenuto e l'esercizio non insegna niente.
 *
 *   node --experimental-strip-types scripts/audit-opzioni.mjs
 *
 * Esce con codice 1 se il rapporto medio supera la soglia, così la
 * regressione si vede prima di arrivare in produzione.
 */
import { intermedioModules } from "../src/content/modules/intermedio.ts";
import { avanzatoModules } from "../src/content/modules/avanzato.ts";
import { seniorModules } from "../src/content/modules/senior.ts";
import { leadModules } from "../src/content/modules/lead.ts";
import { expertModules } from "../src/content/modules/expert.ts";

const SOGLIA_MEDIA = 1.25;
const SOGLIA_SINGOLA = 1.6;

const MODULES = [
  ...intermedioModules,
  ...avanzatoModules,
  ...seniorModules,
  ...leadModules,
  ...expertModules,
];

const media = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;

function rapporto(scelte, migliore) {
  const altre = scelte.filter((o) => o !== migliore);
  return migliore.label.length / media(altre.map((o) => o.label.length));
}

const fuoriNorma = [];
const rapportiQuiz = [];
const rapportiScenari = [];

for (const mod of MODULES) {
  for (const es of mod.exercises) {
    if (es.type === "quiz") {
      for (const q of es.questions) {
        const corretta = q.options.find((o) => o.id === q.correctId);
        const r = rapporto(q.options, corretta);
        rapportiQuiz.push(r);
        if (r > SOGLIA_SINGOLA) fuoriNorma.push(`quiz     ${es.id}/${q.id}  ${r.toFixed(2)}x`);
      }
    }
    if (es.type === "scenario") {
      for (const step of es.steps) {
        const migliore = step.options.reduce((a, b) => (b.score > a.score ? b : a));
        const r = rapporto(step.options, migliore);
        rapportiScenari.push(r);
        if (r > SOGLIA_SINGOLA)
          fuoriNorma.push(`scenario ${es.id}/${step.id}  ${r.toFixed(2)}x`);
      }
    }
  }
}

const mQuiz = media(rapportiQuiz);
const mScen = media(rapportiScenari);

console.log(`Quiz     ${rapportiQuiz.length} domande   rapporto medio ${mQuiz.toFixed(2)}x`);
console.log(`Scenari  ${rapportiScenari.length} decisioni  rapporto medio ${mScen.toFixed(2)}x`);
console.log(`Soglie: media ${SOGLIA_MEDIA}x · singola ${SOGLIA_SINGOLA}x`);

if (fuoriNorma.length > 0) {
  console.log(`\n${fuoriNorma.length} elementi oltre la soglia singola:`);
  fuoriNorma.forEach((r) => console.log("  " + r));
}

const falliti = [];
if (mQuiz > SOGLIA_MEDIA) falliti.push(`quiz a ${mQuiz.toFixed(2)}x`);
if (mScen > SOGLIA_MEDIA) falliti.push(`scenari a ${mScen.toFixed(2)}x`);

if (falliti.length > 0) {
  console.error(`\nFALLITO: ${falliti.join(", ")} — la lunghezza rivela la risposta.`);
  process.exit(1);
}
console.log("\nOK: la lunghezza non rivela la risposta.");
