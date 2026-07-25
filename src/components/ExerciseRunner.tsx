"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { submitExercise, type SubmitResult } from "@/app/actions";
import type { ExerciseAnswer, PublicExercise } from "@/lib/grading";
import type { Capability } from "@/lib/types";
import { MASTERY_THRESHOLD } from "@/lib/progression";
import { badgeById } from "@/content/badges";
import { EXERCISE_TYPE_LABEL, verdict } from "@/lib/labels";
import { ACCENT_BG, Pill, ProgressBar, Prose, ScoreRing, renderInline } from "@/components/ui";
import { Mock } from "@/components/mocks";

type Phase = "intro" | "run" | "done";

export function ExerciseRunner({
  moduleId,
  moduleTitle,
  moduleAccent,
  levelName,
  maxXp,
  capabilities,
  exercise,
}: {
  moduleId: string;
  moduleTitle: string;
  moduleAccent: string;
  levelName: string;
  maxXp: number;
  capabilities: Capability[];
  exercise: PublicExercise;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef<number>(0);
  const resultRef = useRef<HTMLDivElement>(null);

  // Risposte, una forma per tipo
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [selfScores, setSelfScores] = useState<Record<string, number>>({});
  const [briefStage, setBriefStage] = useState<"write" | "assess">("write");

  useEffect(() => {
    if (phase === "done" && resultRef.current) {
      // Il punteggio è in cima al risultato: senza riportare lo scroll a zero
      // si atterra a metà pagina e non si vede mai come è andata.
      window.scrollTo({ top: 0 });
      resultRef.current.focus({ preventScroll: true });
    }
  }, [phase]);

  const complete = useMemo(() => {
    switch (exercise.type) {
      case "quiz":
        return exercise.questions.every((q) => choices[q.id]);
      case "critique":
        return true; // anche "nessun difetto" è una risposta
      case "scenario":
        return exercise.steps.every((s) => choices[s.id]);
      case "brief":
        return exercise.rubric.every((r) => selfScores[r.id] !== undefined);
    }
  }, [exercise, choices, selfScores]);

  function begin() {
    startedAt.current = Date.now();
    setPhase("run");
  }

  function send() {
    let answer: ExerciseAnswer;
    switch (exercise.type) {
      case "quiz":
        answer = { type: "quiz", choices };
        break;
      case "critique":
        answer = { type: "critique", selected };
        break;
      case "scenario":
        answer = { type: "scenario", choices };
        break;
      case "brief":
        answer = { type: "brief", text, selfScores };
        break;
    }

    const duration = Math.round((Date.now() - startedAt.current) / 1000);
    setError(null);
    startTransition(async () => {
      const res = await submitExercise(moduleId, exercise.id, answer, duration);
      if (!res.ok) {
        setError(res.error ?? "Qualcosa è andato storto. Riprova.");
        return;
      }
      setResult(res);
      setPhase("done");
    });
  }

  function retry() {
    setResult(null);
    setChoices({});
    setSelected([]);
    setText("");
    setSelfScores({});
    setBriefStage("write");
    setPhase("intro");
    window.scrollTo({ top: 0 });
  }

  /* ------------------------------ INTRO ------------------------------ */
  if (phase === "intro") {
    return (
      <div>
        <header className={`rounded-[28px] ${ACCENT_BG[moduleAccent]} p-6 md:p-8`}>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="dark">{EXERCISE_TYPE_LABEL[exercise.type]}</Pill>
            <Pill className="bg-white/60">{levelName}</Pill>
            <Pill className="bg-white/60">{exercise.minutes} min</Pill>
            <Pill className="bg-white/60">fino a {maxXp} XP</Pill>
          </div>
          <h1 className="mt-4 text-[26px] font-extrabold leading-tight tracking-tight md:text-3xl">
            {exercise.title}
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/80">
            {exercise.description}
          </p>
        </header>

        <div className="card-light mt-4 p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
            Come funziona
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed">
            {INSTRUCTIONS[exercise.type]}
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
            Le soluzioni non sono nella pagina: la correzione avviene sul server
            quando consegni. Non c&apos;è modo di sbirciare, ed è voluto.
          </p>
          <button
            type="button"
            onClick={begin}
            className="mt-5 w-full rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white sm:w-auto"
          >
            Inizia l&apos;esercizio
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------ RESULT ------------------------------ */
  if (phase === "done" && result?.grade) {
    const grade = result.grade;
    const v = verdict(grade.scorePct);
    const mastered = grade.scorePct >= MASTERY_THRESHOLD;
    const newBadges = (result.newBadgeIds ?? [])
      .map((id) => badgeById(id))
      .filter((b): b is NonNullable<typeof b> => Boolean(b));

    return (
      <div ref={resultRef} tabIndex={-1} className="outline-none">
        <div className="card-dark p-6 md:p-8">
          <div className="flex items-center justify-between gap-5">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                {v.title}
              </p>
              <p className="mt-1 text-2xl font-extrabold">
                {grade.score} / {grade.maxScore} punti
              </p>
            </div>
            <ScoreRing value={grade.scorePct} size={76} />
          </div>
          {/* A tutta larghezza: accanto all'anello, su telefono, si riduceva a
              una colonna da sette righe. */}
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
            {v.body}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
            <Pill tone="mint">+{result.xpAwarded} XP</Pill>
            <Pill className="bg-white/10 text-white">{result.totalXp} XP totali</Pill>
            <Pill className="bg-white/10 text-white">🔥 serie di {result.streak}</Pill>
          </div>
        </div>

        {newBadges.length > 0 ? (
          <section className="mt-4">
            <h2 className="mb-2 text-lg font-bold tracking-tight">Nuovi premi</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {newBadges.map((b) => (
                <li key={b.id} className="card-light flex items-center gap-3 p-4">
                  <span aria-hidden="true" className="text-2xl">
                    {b.emoji}
                  </span>
                  <span>
                    <span className="block font-bold">{b.name}</span>
                    <span className="block text-[13px] text-ink-muted">
                      {b.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-6">
          <h2 className="mb-1 text-lg font-bold tracking-tight">
            Con queste nozioni, cosa potresti fare
          </h2>
          <p className="mb-3 text-sm text-ink-muted">
            {mastered
              ? "Hai superato la soglia di padronanza: queste capacità sono ora attive nel tuo profilo."
              : `Sei al ${grade.scorePct}%. Sopra il ${MASTERY_THRESHOLD}% queste capacità si attivano nel profilo — ecco cosa ti stai giocando.`}
          </p>
          <ul className="space-y-3">
            {capabilities.map((c, i) => (
              <li key={i} className="card-light p-5">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      mastered ? "bg-mint text-ink" : "bg-black/5 text-ink-muted"
                    }`}
                  >
                    {mastered ? "✓" : "○"}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold leading-relaxed">{c.claim}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                      <span className="font-semibold text-ink">Perché conta: </span>
                      {c.signal}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold tracking-tight">
            Correzione, riga per riga
          </h2>
          <ul className="space-y-3">
            {grade.lines.map((line) => (
              <li
                key={line.id}
                className={`card-light border-l-4 p-5 ${
                  line.correct
                    ? "border-l-mint-deep"
                    : line.points > 0
                      ? "border-l-butter"
                      : "border-l-blush-deep"
                }`}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <p className="text-[15px] font-bold leading-snug">{line.heading}</p>
                  <span className="shrink-0 rounded-full bg-black/5 px-2.5 py-1 text-xs font-bold">
                    {line.points}/{line.maxPoints}
                  </span>
                </div>
                {line.given ? (
                  <p className="text-[14px] leading-relaxed text-ink-muted">
                    <span className="font-semibold text-ink">La tua risposta: </span>
                    {line.given}
                  </p>
                ) : null}
                {line.expected ? (
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                    <span className="font-semibold text-ink">
                      {grade.type === "scenario" ? "Scelta migliore: " : "Corretto: "}
                    </span>
                    {line.expected}
                  </p>
                ) : null}
                <p className="mt-3 border-t border-black/5 pt-3 text-[14px] leading-relaxed">
                  {line.explanation}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {grade.reveal ? (
          <section className="mt-6">
            <h2 className="mb-1 text-lg font-bold tracking-tight">La risposta esperta</h2>
            <p className="mb-3 text-sm text-ink-muted">
              Non è &ldquo;la&rdquo; risposta giusta: è una risposta forte. Confrontala con la
              tua e cerca le decisioni che non avevi considerato.
            </p>
            <div className="card-light p-5 md:p-6">
              <Prose paragraphs={grade.reveal} />
            </div>
            {text.trim() ? (
              <details className="card-light mt-3 p-5">
                <summary className="cursor-pointer font-bold">La tua risposta</summary>
                <p className="mt-3 whitespace-pre-wrap border-t border-black/5 pt-3 text-[15px] leading-relaxed">
                  {text}
                </p>
              </details>
            ) : null}
          </section>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={retry}
            className="rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white"
          >
            Rifai l&apos;esercizio
          </button>
          <Link
            href={`/percorso/${moduleId}`}
            className="rounded-full bg-white px-6 py-3.5 text-sm font-bold shadow-sm"
          >
            Torna a {moduleTitle}
          </Link>
          <Link
            href="/oggi"
            className="rounded-full px-6 py-3.5 text-sm font-bold text-ink-muted hover:text-ink"
          >
            Cosa fare adesso
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------ RUN ------------------------------ */
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">
          {exercise.title}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {moduleTitle} · {EXERCISE_TYPE_LABEL[exercise.type]}
        </p>
      </div>

      {exercise.type === "quiz" ? (
        <ol className="space-y-4">
          {exercise.questions.map((q, i) => (
            <li key={q.id} className="card-light p-5">
              <fieldset>
                <legend className="mb-3 text-[15px] font-bold leading-snug">
                  <span className="mr-2 text-ink-muted">{i + 1}.</span>
                  {q.prompt}
                </legend>
                <div className="space-y-2">
                  {q.options.map((o) => (
                    <Choice
                      key={o.id}
                      name={q.id}
                      value={o.id}
                      label={o.label}
                      checked={choices[q.id] === o.id}
                      onChange={() => setChoices((c) => ({ ...c, [q.id]: o.id }))}
                    />
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
      ) : null}

      {exercise.type === "critique" ? (
        <div className="space-y-5">
          <div className="card-light p-5">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
              Lente: {exercise.lens}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed">{exercise.context}</p>
          </div>

          <Mock id={exercise.mockId} />

          <div className="card-light p-5">
            <fieldset>
              <legend className="mb-1 text-[15px] font-bold">
                Quali di queste sono difetti reali?
              </legend>
              <p className="mb-4 text-[14px] text-ink-muted">
                Seleziona solo ciò che è davvero un problema. Ogni distrattore
                selezionato costa un punto, esattamente come un difetto mancato.
              </p>
              <div className="space-y-2">
                {exercise.issues.map((issue) => (
                  <Choice
                    key={issue.id}
                    type="checkbox"
                    name={issue.id}
                    value={issue.id}
                    label={issue.label}
                    checked={selected.includes(issue.id)}
                    onChange={() =>
                      setSelected((s) =>
                        s.includes(issue.id)
                          ? s.filter((x) => x !== issue.id)
                          : [...s, issue.id],
                      )
                    }
                  />
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      ) : null}

      {exercise.type === "scenario" ? (
        <div className="space-y-4">
          <div className="card-dark p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
              La situazione
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">
              {exercise.setup}
            </p>
          </div>
          <p className="text-[14px] text-ink-muted">
            Le conseguenze di ogni scelta le vedrai solo alla consegna. Decidi come
            decideresti davvero, non come pensi che voglia l&apos;esercizio.
          </p>
          <ol className="space-y-4">
            {exercise.steps.map((step, i) => (
              <li key={step.id} className="card-light p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                  Decisione {i + 1} di {exercise.steps.length}
                </p>
                <p className="mb-3 text-[15px] leading-relaxed">{step.situation}</p>
                <fieldset>
                  <legend className="mb-3 text-[15px] font-bold leading-snug">
                    {step.question}
                  </legend>
                  <div className="space-y-2">
                    {step.options.map((o) => (
                      <Choice
                        key={o.id}
                        name={step.id}
                        value={o.id}
                        label={o.label}
                        checked={choices[step.id] === o.id}
                        onChange={() => setChoices((c) => ({ ...c, [step.id]: o.id }))}
                      />
                    ))}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {exercise.type === "brief" ? (
        <div className="space-y-4">
          <div className="card-dark p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
              Il brief · {exercise.minutes} minuti
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">
              {exercise.brief}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="card-light p-5">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
                Vincoli
              </h2>
              <ul className="space-y-1.5">
                {exercise.constraints.map((c) => (
                  <li key={c} className="flex gap-2 text-[14px] leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-deep" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-light p-5">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
                Cosa consegnare
              </h2>
              <ul className="space-y-1.5">
                {exercise.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-[14px] leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-deep" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {briefStage === "write" ? (
            <div className="card-light p-5">
              <label htmlFor="brief-text" className="mb-2 block text-[15px] font-bold">
                La tua risposta
              </label>
              <p className="mb-3 text-[14px] text-ink-muted">
                Scrivi come scriveresti a un collega: punti, non prosa. Nessuno la
                legge tranne te — l&apos;autovalutazione arriva dopo, con la rubrica
                davanti.
              </p>
              <textarea
                id="brief-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={14}
                placeholder="1. …"
                className="w-full rounded-2xl border border-black/10 bg-white p-4 text-[15px] leading-relaxed focus:border-ink focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setBriefStage("assess");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={text.trim().length < 20}
                className="mt-4 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white disabled:opacity-40"
              >
                Ho finito, passa alla rubrica
              </button>
              {text.trim().length < 20 ? (
                <p className="mt-2 text-[13px] text-ink-muted">
                  Scrivi qualcosa prima di passare all&apos;autovalutazione.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="card-light p-5">
              <h2 className="text-[15px] font-bold">Autovalutazione</h2>
              <p className="mt-1 mb-4 text-[14px] leading-relaxed text-ink-muted">
                Rileggi quello che hai scritto e assegnati un punteggio per criterio.
                Sii severo: l&apos;autovalutazione generosa è l&apos;unico modo di
                rendere inutile questo esercizio.
              </p>
              <ul className="space-y-4">
                {exercise.rubric.map((r) => (
                  <li key={r.id} className="border-t border-black/5 pt-4 first:border-0 first:pt-0">
                    <p className="text-[15px] font-bold">{r.criterion}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      {r.description}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed">
                      {renderInline(r.excellent)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { v: 0, label: "0 — non l'ho fatto" },
                        { v: 1, label: "1 — parzialmente" },
                        { v: 2, label: "2 — pienamente" },
                      ].map((opt) => (
                        <button
                          key={opt.v}
                          type="button"
                          aria-pressed={selfScores[r.id] === opt.v}
                          onClick={() =>
                            setSelfScores((s) => ({ ...s, [r.id]: opt.v }))
                          }
                          className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                            selfScores[r.id] === opt.v
                              ? "bg-ink text-white"
                              : "bg-black/5 text-ink-muted hover:bg-black/10"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setBriefStage("write")}
                className="mt-4 text-sm font-semibold text-ink-muted underline"
              >
                Torna al testo
              </button>
            </div>
          )}
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="mt-5 rounded-2xl bg-blush/30 px-4 py-3 text-sm font-medium">
          {error}
        </p>
      ) : null}

      {!(exercise.type === "brief" && briefStage === "write") ? (
        <div className="sticky bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-30 mt-6 md:bottom-6">
          <div className="flex items-center gap-3 rounded-full bg-white p-2 pl-4 shadow-[0_2px_8px_rgba(15,17,23,0.08),0_16px_32px_-20px_rgba(15,17,23,0.6)]">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">
                {statusLabel(exercise, choices, selected, selfScores)}
              </p>
              {exercise.type !== "critique" ? (
                <ProgressBar
                  className="mt-1.5"
                  value={progressOf(exercise, choices, selfScores)}
                />
              ) : null}
            </div>
            <button
              type="button"
              onClick={send}
              disabled={!complete || pending}
              className="shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
            >
              {pending ? "Correggo…" : "Consegna"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Stato compatto per la barra di consegna: una riga, e dice qualcosa di vero. */
function statusLabel(
  exercise: PublicExercise,
  choices: Record<string, string>,
  selected: string[],
  selfScores: Record<string, number>,
): string {
  switch (exercise.type) {
    case "quiz": {
      const done = exercise.questions.filter((q) => choices[q.id]).length;
      return `${done} di ${exercise.questions.length} risposte`;
    }
    case "scenario": {
      const done = exercise.steps.filter((s) => choices[s.id]).length;
      return `${done} di ${exercise.steps.length} decisioni`;
    }
    case "brief": {
      const done = exercise.rubric.filter((r) => selfScores[r.id] !== undefined).length;
      return `${done} di ${exercise.rubric.length} criteri valutati`;
    }
    case "critique":
      return selected.length === 0
        ? "Nessun difetto segnalato"
        : `${selected.length} ${selected.length === 1 ? "difetto segnalato" : "difetti segnalati"}`;
  }
}

function progressOf(
  exercise: PublicExercise,
  choices: Record<string, string>,
  selfScores: Record<string, number>,
): number {
  switch (exercise.type) {
    case "quiz": {
      const done = exercise.questions.filter((q) => choices[q.id]).length;
      return (done / exercise.questions.length) * 100;
    }
    case "scenario": {
      const done = exercise.steps.filter((s) => choices[s.id]).length;
      return (done / exercise.steps.length) * 100;
    }
    case "brief": {
      const done = exercise.rubric.filter((r) => selfScores[r.id] !== undefined).length;
      return (done / exercise.rubric.length) * 100;
    }
    case "critique":
      return 100;
  }
}

function Choice({
  type = "radio",
  name,
  value,
  label,
  checked,
  onChange,
}: {
  type?: "radio" | "checkbox";
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-[15px] leading-relaxed transition-colors ${
        checked ? "border-ink bg-ink/5" : "border-black/10 hover:border-black/25"
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 shrink-0 accent-[#0f1117]"
      />
      <span>{label}</span>
    </label>
  );
}

const INSTRUCTIONS: Record<PublicExercise["type"], string> = {
  quiz:
    "Cinque domande a scelta singola. Una risposta è chiaramente la migliore, le altre sono plausibili: sono gli errori che si sentono davvero nelle riunioni. Alla consegna ricevi la spiegazione di ciascuna.",
  critique:
    "Osservi uno schermo reale con una lente precisa e scegli quali osservazioni sono difetti veri. Alcune sono distrattori: segnalarli costa quanto mancare un difetto reale, perché in una critique la credibilità si perde anche così.",
  scenario:
    "Una situazione professionale e una serie di decisioni. Ogni opzione ha una conseguenza, che vedrai solo alla fine insieme al debrief. Non ci sono opzioni assurde: sono tutte scelte che qualcuno fa davvero.",
  brief:
    "Un problema aperto da risolvere per iscritto entro il tempo indicato. Poi ti autovaluti con una rubrica dettagliata, e infine confronti la tua risposta con quella di un esperto.",
};
