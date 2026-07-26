import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions";
import { EXERCISE_TYPE_LABEL, MODULES, TOTAL_EXERCISES } from "@/content";
import { BADGES } from "@/content/badges";
import {
  getProfileData,
  moduleBestPct,
  totalAttempts,
  totalExercisesDone,
} from "@/lib/data";
import { MASTERY_THRESHOLD, RANKS, levelMeta, rankForXp } from "@/lib/progression";
import { PageHeader, Pill, ProgressBar, ScoreRing } from "@/components/ui";

export const metadata: Metadata = { title: "Profilo" };

export default async function ProfiloPage() {
  const data = await getProfileData();
  if (!data) redirect("/benvenuto");

  const { profile, best, byType, badges } = data;
  const xp = profile?.xp ?? 0;
  const rank = rankForXp(xp);
  const earned = new Set(badges.map((b) => b.badge_id));

  const mastered = MODULES.filter(
    (m) => moduleBestPct(best, m.id) >= MASTERY_THRESHOLD,
  );

  const doneCount = totalExercisesDone(best);
  const capabilities = mastered.flatMap((m) =>
    m.capabilities.map((c) => ({ ...c, module: m })),
  );

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Profilo"
        title={profile?.display_name ?? data.email ?? "Il tuo profilo"}
        subtitle={data.email ?? undefined}
      />

      <section className="card-dark p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
              Grado
            </p>
            <p className="mt-1 text-3xl font-extrabold">{rank.current.name}</p>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/70">
              {rank.current.description}
            </p>
          </div>
          <p className="shrink-0 text-right">
            <span className="block text-3xl font-extrabold">{xp}</span>
            <span className="text-xs font-semibold text-white/50">XP</span>
          </p>
        </div>
        <div className="mt-5">
          <ProgressBar value={rank.progress} tone="light" />
          <p className="mt-2 text-xs font-medium text-white/60">
            {rank.next
              ? `${rank.next.minXp - xp} XP a ${rank.next.name}`
              : "Grado massimo raggiunto."}
          </p>
        </div>
        <ol className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {RANKS.map((r) => (
            <li key={r.id}>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  xp >= r.minXp ? "bg-white text-ink" : "bg-white/10 text-white/50"
                }`}
              >
                {r.name}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat value={`${doneCount}/${TOTAL_EXERCISES}`} label="esercizi svolti" />
        <Stat value={`${totalAttempts(best)}`} label="tentativi totali" />
        <Stat value={`${profile?.streak_count ?? 0}`} label="serie attuale" />
        <Stat value={`${profile?.longest_streak ?? 0}`} label="serie record" />
      </section>

      <section className="mt-8">
        <h2 className="mb-1 text-lg font-bold tracking-tight">
          Cosa sai fare, in concreto
        </h2>
        <p className="mb-4 text-sm text-ink-muted">
          Le capacità si attivano quando chiudi un modulo sopra il {MASTERY_THRESHOLD}%.
          Sono formulate come le scriveresti in un colloquio o in una valutazione:
          cose che sai fare, non cose che hai studiato.
        </p>
        {capabilities.length === 0 ? (
          <div className="card-light p-6 text-center">
            <p className="font-bold">Nessuna capacità sbloccata per ora</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Chiudi il tuo primo modulo sopra il {MASTERY_THRESHOLD}% e qui comparirà
              cosa quel modulo ti mette in condizione di fare.
            </p>
            <Link
              href="/percorso"
              className="mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white"
            >
              Vai al percorso
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {capabilities.map((c, i) => (
              <li key={i} className="card-light p-5">
                <Pill tone={c.module.accent}>{c.module.title}</Pill>
                <p className="mt-3 text-[15px] font-semibold leading-relaxed">
                  {c.claim}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                  <span className="font-semibold text-ink">Perché conta: </span>
                  {c.signal}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {byType.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold tracking-tight">
            Dove sei forte, dove no
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {byType.map((agg) => (
              <li
                key={agg.exercise_type}
                className="card-light flex items-center gap-4 p-5"
              >
                <ScoreRing value={agg.media_pct} size={56} />
                <div className="min-w-0">
                  <p className="font-bold">
                    {EXERCISE_TYPE_LABEL[agg.exercise_type]}
                  </p>
                  <p className="text-[13px] text-ink-muted">
                    media su {agg.tentativi}{" "}
                    {agg.tentativi === 1 ? "tentativo" : "tentativi"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="mb-1 text-lg font-bold tracking-tight">Premi</h2>
        <p className="mb-4 text-sm text-ink-muted">
          {earned.size} di {BADGES.length} sbloccati.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {BADGES.map((badge) => {
            const has = earned.has(badge.id);
            return (
              <li
                key={badge.id}
                className={`card-light flex items-center gap-3 p-4 ${has ? "" : "opacity-55"}`}
              >
                <span aria-hidden="true" className={`text-2xl ${has ? "" : "grayscale"}`}>
                  {badge.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold">{badge.name}</span>
                  <span className="block text-[13px] leading-snug text-ink-muted">
                    {badge.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {mastered.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold tracking-tight">Moduli padroneggiati</h2>
          <ul className="space-y-2">
            {mastered.map((m) => {
              const pct = moduleBestPct(best, m.id);
              return (
                <li key={m.id}>
                  <Link
                    href={`/percorso/${m.id}`}
                    className="card-light tappable flex items-center gap-4 p-4 active:bg-black/[0.02]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold">{m.title}</span>
                      <span className="block text-[13px] text-ink-muted">
                        {levelMeta(m.level).name}
                      </span>
                    </span>
                    <ScoreRing value={pct} size={44} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="mt-10 border-t border-black/10 pt-6">
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full bg-black/5 px-5 py-3 text-sm font-bold text-ink-muted hover:text-ink"
          >
            Esci dall&apos;account
          </button>
        </form>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-light p-4">
      <p className="text-xl font-extrabold">{value}</p>
      <p className="text-[12px] font-semibold leading-tight text-ink-muted">{label}</p>
    </div>
  );
}
