import Link from "next/link";
import { redirect } from "next/navigation";
import {
  EXERCISE_TYPE_LABEL,
  MODULES,
} from "@/content";
import {
  bestPctPerExercise,
  getProgressData,
  moduleBestPct,
  highestLevelReached,
  totalExercisesDone,
} from "@/lib/data";
import { LEVEL_ORDER, MASTERY_THRESHOLD, levelMeta, rankForXp } from "@/lib/progression";
import { ACCENT_BG, Pill, ProgressBar, SectionTitle } from "@/components/ui";
import { Bity, type BityMood } from "@/components/Bity";
import { ExerciseIcon } from "@/components/icons";
import { ModuloIcon } from "@/components/icone-moduli";
import { nomeDiBattesimo } from "@/lib/labels";
import type { Exercise, Module } from "@/lib/types";

export async function SchermataOggi() {
  const data = await getProgressData();
  if (!data) redirect("/benvenuto");

  const { profile, best } = data;
  const xp = profile?.xp ?? 0;
  const streak = profile?.streak_count ?? 0;
  const name = nomeDiBattesimo(
    profile?.display_name ?? data.email?.split("@")[0] ?? "designer",
  );
  const rank = rankForXp(xp);
  const bestPct = bestPctPerExercise(best);
  const doneCount = totalExercisesDone(best);
  const reachedLevel = highestLevelReached(best);

  const suggestions = buildSuggestions(bestPct, best.length === 0);
  const [primary, ...rest] = suggestions;

  return (
    <div className="animate-rise">
      {/* Il saluto e Bity sulla stessa riga, il resto sotto a tutta larghezza.
          La campanella non sta più qui: le notifiche si raggiungono dal
          profilo, dove stanno anche le loro impostazioni.
          Il margine negativo porta Bity a filo del margine destro: il suo
          riquadro è 56 ma la palla ne occupa il 70% centrato, quindi senza
          compenso resterebbe rientrata rispetto alle card sotto.
          I tre pixel di discesa sono un allineamento ottico: "items-center"
          incolonna i riquadri, ma l'inchiostro del nome non è centrato nel
          suo — sotto la linea di base ci sono le discendenti, sopra no — e
          senza compenso la palla risultava più alta della parola. Misurati
          sull'inchiostro vero, non sulla riga di testo. */}
      <header className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="min-w-0 text-2xl font-extrabold tracking-tight md:text-3xl">
            Ciao, {name}
          </h1>
          <Bity
            mood={saluto(doneCount, streak)}
            level={reachedLevel}
            size={56}
            float
            className="-mr-2 shrink-0 translate-y-[3px]"
          />
        </div>

        <p className="mt-1 text-sm leading-snug text-ink-muted">
          {streak > 0
            ? "Non spezzare la serie oggi."
            : "Un esercizio oggi vale più di cinque domenica prossima."}
        </p>
        {streak > 0 ? (
          <Link
            href="/profilo"
            className="tappable mt-2 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold active:bg-black/5"
          >
            <span aria-hidden="true">🔥</span>
            <span aria-hidden="true">
              {streak} {streak === 1 ? "giorno" : "giorni"}
            </span>
            <span className="sr-only">
              Serie di {streak} {streak === 1 ? "giorno" : "giorni"}. Vai al profilo.
            </span>
          </Link>
        ) : null}
      </header>

      {/* Versione breve. La stessa card sul profilo portava, identiche, la
          descrizione del grado e i tre numeri in fondo: una schermata li
          ripeteva all'altra senza aggiungere niente.
          Qui resta quello che serve ad aprire l'app e decidere se allenarsi
          oggi — a che punto sei e quanto manca al passo dopo. Il resoconto sta
          nel profilo, che è la schermata dove si va apposta per guardarlo. */}
      <section className="card-dark mb-6 p-5 md:p-6">
        {/* items-start e non items-baseline.
            Allineando le linee di base, "320" — grande tre volte l'occhiello
            accanto — svettava sopra di esso e apriva a sinistra una fascia
            vuota alta quindici pixel: lo spazio che serviva a lui e che
            all'altra colonna non serviva. Partendo dall'alto le due colonne
            cominciano insieme e quella fascia sparisce.
            leading-none sul numero perché la sua riga smetta di essere più
            alta del glifo: senza, il numero resterebbe comunque un paio di
            pixel più in basso dell'occhiello. */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
              Grado attuale
            </p>
            <p className="mt-1 text-2xl font-extrabold">{rank.current.name}</p>
          </div>
          {/* Numero e unità sono due blocchi, non un blocco e un testo in
              linea: così si appoggiano allo stesso bordo destro invece che
              a due bordi calcolati in modi diversi. */}
          <div className="shrink-0 text-right">
            {/* Due pixel e mezzo di scarto misurati sull'inchiostro, non sulla
                riga: a interlinea nulla il numero comincia sopra il bordo del
                suo blocco, l'occhiello accanto no. Senza questo compenso il
                numero resta appena più alto, cioè il difetto di prima in
                piccolo. */}
            <span className="mt-[2.5px] block text-3xl font-extrabold leading-none">
              {xp}
            </span>
            <span className="mt-1.5 block text-xs font-semibold leading-none text-white/50">
              XP
            </span>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar value={rank.progress} tone="light" />
          <p className="mt-2 text-xs font-medium text-white/60">
            {rank.next
              ? `${rank.next.minXp - xp} XP a ${rank.next.name}`
              : "Hai raggiunto il grado più alto."}
          </p>
        </div>

      </section>

      {primary ? (
        <section className="mb-8">
          {/* "Riprendi" presuppone che ci sia qualcosa da riprendere: al primo
              accesso non c'è, e l'invito suonava come il riferimento a un
              passato che non esiste. */}
          <SectionTitle>
            {doneCount === 0 ? "Comincia da qui" : "Riprendi da qui"}
          </SectionTitle>
          <SuggestionCard suggestion={primary} featured />
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="mb-8">
          <SectionTitle action={{ href: "/percorso", label: "Tutto il percorso" }}>
            {doneCount === 0 ? "Poi questi" : "Consigliati per te"}
          </SectionTitle>
          <ul className="space-y-3">
            {rest.map((s) => (
              <li key={`${s.module.id}/${s.exercise.id}`}>
                <SuggestionCard suggestion={s} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <SectionTitle action={{ href: "/percorso", label: "Vedi tutti" }}>
          I tuoi livelli
        </SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {LEVEL_ORDER.map((levelId) => {
            const meta = levelMeta(levelId);
            const modules = MODULES.filter((m) => m.level === levelId);
            const mastered = modules.filter(
              (m) => moduleBestPct(best, m.id) >= MASTERY_THRESHOLD,
            ).length;
            const pct = Math.round((mastered / modules.length) * 100);
            return (
              <Link
                key={levelId}
                href={`/percorso#${levelId}`}
                className="card-light tappable block p-4 hover:-translate-y-0.5 active:bg-black/[0.02]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-bold">{meta.name}</p>
                  <span className="text-xs font-semibold text-ink-muted">
                    {mastered}/{modules.length}
                  </span>
                </div>
                <p className="mt-1 mb-3 text-[13px] leading-snug text-ink-muted">
                  {meta.subtitle}
                </p>
                <ProgressBar value={pct} tone="mint" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/**
 * L'umore del saluto. Non aggiunge informazione che non ci sia già scritta:
 * la ripete in un canale che si legge prima delle parole.
 */
function saluto(svolti: number, serie: number): BityMood {
  if (svolti === 0) return "curioso";
  if (serie >= 7) return "esulta";
  if (serie > 0) return "felice";
  return "assonnato";
}

interface Suggestion {
  module: Module;
  exercise: Exercise;
  reason: string;
  bestPct: number | null;
}

/**
 * Ordine dei consigli: prima ciò che è stato iniziato e non finito, poi ciò che
 * è andato male e va ripreso, poi il prossimo passo nuovo del percorso.
 */
function buildSuggestions(
  bestPct: Map<string, number>,
  isNewUser: boolean,
): Suggestion[] {
  const untouched: Suggestion[] = [];
  const inProgress: Suggestion[] = [];
  const toRedo: Suggestion[] = [];

  for (const mod of MODULES) {
    const moduleTouched = mod.exercises.some((e) =>
      bestPct.has(`${mod.id}/${e.id}`),
    );
    for (const exercise of mod.exercises) {
      const pct = bestPct.get(`${mod.id}/${exercise.id}`) ?? null;
      if (pct === null) {
        const suggestion: Suggestion = {
          module: mod,
          exercise,
          reason: moduleTouched
            ? "Ti manca questo per chiudere il modulo"
            : "Prossimo passo del percorso",
          bestPct: null,
        };
        (moduleTouched ? inProgress : untouched).push(suggestion);
      } else if (pct < MASTERY_THRESHOLD) {
        toRedo.push({
          module: mod,
          exercise,
          reason: `Chiuso al ${pct}%: sotto la soglia di padronanza`,
          bestPct: pct,
        });
      }
    }
  }

  if (isNewUser) return untouched.slice(0, 4);
  return [...inProgress, ...toRedo, ...untouched].slice(0, 4);
}

function SuggestionCard({
  suggestion,
  featured = false,
}: {
  suggestion: Suggestion;
  featured?: boolean;
}) {
  const { module: mod, exercise, reason } = suggestion;
  const href = `/allenamento/${mod.id}/${exercise.id}`;

  if (featured) {
    return (
      <Link
        href={href}
        className={`block rounded-[28px] ${ACCENT_BG[mod.accent]} tappable p-5 hover:-translate-y-0.5 md:p-6`}
      >
        {/* L'icona del modulo in linea con i tag, non sopra: sono entrambi
            etichette di inquadramento — che modulo, che tipo, che livello,
            quanto dura — e su due righe separate occupavano il doppio dello
            spazio per dire cose dello stesso rango.
            Su fondo colorato sta in un riquadro bianco, perche' il tratto
            scuro sul pastello perderebbe stacco. Il riquadro e' piu' piccolo
            di quello nel percorso: qui divide la riga con tre pillole, e a 44
            pixel le spingeva a capo gia' con "Lead / Principal". */}
        {/* Icona a sinistra, tag a destra, titolo sotto a tutta larghezza e a
            corpo pieno. L'icona non divide piu' la riga con il titolo: li'
            gli toglieva larghezza e lo mandava a capo prima, e per farcela
            stare avevo dovuto rimpicciolire il titolo — cioe' indebolire la
            cosa che si legge per fare posto a quella che accompagna.
            I tag si allineano a destra anche quando vanno a capo, cosi' le
            righe restano appoggiate allo stesso bordo. */}
        <div className="flex items-center justify-between gap-3">
          <span
            aria-hidden="true"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-white/70"
          >
            <ModuloIcon moduleId={mod.id} className="h-7 w-7" />
          </span>
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
            <Pill tone="dark">{EXERCISE_TYPE_LABEL[exercise.type]}</Pill>
            <Pill className="bg-white/60">{levelMeta(mod.level).name}</Pill>
            <Pill className="bg-white/60">{exercise.minutes} min</Pill>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-extrabold leading-tight md:text-2xl">
          {exercise.title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-ink/70">{mod.title}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/80">
          {exercise.description}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white">
          {reason.startsWith("Chiuso") ? "Riprova" : "Inizia"} ›
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="card-light tappable flex items-center gap-4 p-4 hover:-translate-y-0.5 active:bg-black/[0.02]"
    >
      <span
        aria-hidden="true"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${ACCENT_BG[mod.accent]}`}
      >
        <ExerciseIcon type={exercise.type} className="h-[22px] w-[22px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold">{exercise.title}</span>
        {/* Qui il modulo si nomina invece di disegnarsi. L'icona nel riquadro
            resta quella del tipo di esercizio, perche' da questa card si e' a
            un tocco dal cominciare e conta sapere che lavoro sara'; il modulo
            e' contesto, e in parole si legge senza doverlo decifrare. Prima
            c'era la descrizione del tipo, che l'icona accanto gia' diceva. */}
        <span className="block truncate text-[13px] text-ink-muted">
          {mod.title} · {exercise.minutes} min
        </span>
        <span className="mt-1 block truncate text-[12px] font-semibold text-ink-muted">
          {reason}
        </span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-ink-muted">
        ›
      </span>
    </Link>
  );
}
