import { AuthPanel } from "@/components/AuthPanel";
import type { Metadata } from "next";
import { MODULES, TOTAL_EXERCISES } from "@/content";
import { LEVELS } from "@/lib/progression";

export const metadata: Metadata = { title: "Benvenuto" };

export default function BenvenutoPage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-5xl px-4 py-8 md:px-6 md:py-14">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-12">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
            TraineeUX
          </p>
          <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Allenati sul giudizio,
            <br />
            non sulle schermate.
          </h1>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-muted">
            Un percorso di UX e product design che parte da un livello intermedio e
            arriva a moduli da senior, lead ed expert. Niente teoria da ripetere: casi
            reali, decisioni con conseguenze, e il confronto tra la tua risposta e
            quella di chi quel problema l&apos;ha già affrontato.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-3">
            <Stat value={`${MODULES.length}`} label="moduli" />
            <Stat value={`${TOTAL_EXERCISES}`} label="esercizi" />
            <Stat value={`${LEVELS.length}`} label="livelli" />
          </dl>

          <div className="mt-8 space-y-3">
            {LEVELS.map((level, i) => (
              <div
                key={level.id}
                className="flex items-center gap-3 rounded-3xl bg-surface-muted p-3.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{level.name}</p>
                  <p className="text-[13px] leading-snug text-ink-muted">
                    {level.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Feature
              title="Quattro modi di allenarti"
              body="Quiz secchi, critique di interfacce reali, scenari con conseguenze, brief a tempo con rubrica di autovalutazione."
            />
            <Feature
              title="Progressi e premi"
              body="XP per esercizio, serie giornaliera, badge e gradi da Praticante a Expert."
            />
            <Feature
              title="Capacità sbloccate"
              body="Per ogni modulo padroneggiato vedi cosa puoi fare in concreto sul lavoro, e che segnale di seniority manda."
            />
            <Feature
              title="News e aziende"
              body="Feed aggiornato dalle fonti che contano e schede sulle aziende del settore, con come ci si entra."
            />
          </div>
        </div>

        <div className="md:sticky md:top-14">
          <AuthPanel />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-dark px-4 py-3">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-2xl font-extrabold">{value}</span>
        <span className="text-xs font-semibold text-white/60">{label}</span>
      </dd>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="card-light p-4">
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
