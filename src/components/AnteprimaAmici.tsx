import Link from "next/link";
import { Bity } from "@/components/Bity";
import { SectionTitle } from "@/components/ui";
import { cartolina } from "@/content/regali";
import { levelMeta } from "@/lib/progression";
import type { AnteprimaAmici as Dati, RigaClassifica } from "@/lib/amici";

/**
 * Il giro di amici visto dalla Home.
 *
 * Una card sola che cambia a seconda di cosa c'è da dire, in quest'ordine:
 * una cartolina appena arrivata batte la classifica, e la classifica batte
 * l'invito. È una gerarchia di notizie — la cartolina è successa adesso e
 * sparisce appena la guardi, la classifica è lo stato delle cose, l'invito è
 * quello che resta quando non c'è nessuno.
 *
 * Il posto è in fondo, sotto i consigli: la Home serve prima a decidere se
 * allenarsi oggi. Ma la posizione non cambia mai da una visita all'altra, ed
 * è quello che permette di ritrovarla senza cercarla.
 */
export function AnteprimaAmici({ dati }: { dati: Dati }) {
  const amici = dati.classifica.filter((r) => !r.sonoIo);

  if (dati.nuove > 0 && dati.ultima) return <Arrivata dati={dati} />;
  if (amici.length === 0) return <Invito />;
  return <MiniClassifica righe={dati.classifica} />;
}

/* ---- Una cartolina appena arrivata ---- */

const FONDO: Record<string, string> = {
  mint: "bg-mint",
  sky: "bg-sky",
  butter: "bg-butter",
  blush: "bg-blush",
  plum: "bg-plum",
};

function Arrivata({ dati }: { dati: Dati }) {
  const c = cartolina(dati.ultima!.giftId);
  if (!c) return null;
  const altre = dati.nuove - 1;

  return (
    <section>
      <SectionTitle>Il tuo giro</SectionTitle>
      <Link
        href="/amici"
        className={`tappable block rounded-[28px] p-5 text-ink hover:-translate-y-0.5 ${FONDO[c.tint] ?? "bg-mint"}`}
      >
        <div className="flex items-center gap-4">
          {/* Il francobollo bianco: il corpo di Bity è della stessa tinta
              della cartolina, e senza il rettangolo chiaro sotto sparirebbe
              dentro il colore. */}
          <span className="inline-flex shrink-0 items-center justify-center rounded-[16px] bg-white p-2 shadow-[0_1px_2px_rgba(15,17,23,0.08)]">
            <Bity tint={c.tint} mood={c.mood} size={48} pop />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">
              {dati.nuove === 1 ? "Ti è arrivata" : `Te ne sono arrivate ${dati.nuove}`}
            </p>
            <p className="mt-1 text-[17px] font-extrabold leading-snug">
              «{c.nome}» da {dati.ultima!.daNome}
            </p>
            <p className="mt-1 text-[13px] font-semibold text-ink/60">
              {altre === 0
                ? "Aprila ›"
                : altre === 1
                  ? "E un'altra. Aprile ›"
                  : `E altre ${altre}. Aprile ›`}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}

/* ---- I primi, e il mio posto ---- */

/**
 * Le righe da mostrare: i primi tre, e il proprio posto se sta più giù.
 *
 * Tre e non cinque perché in Home questa è un'anteprima e non la classifica:
 * chi comanda, e dove sei tu rispetto a lui. Se sei già fra i primi tre non
 * si aggiunge niente — la riga tua c'è già, e ripeterla sarebbe la stessa
 * persona due volte.
 */
function daMostrare(righe: RigaClassifica[]): {
  testa: RigaClassifica[];
  io: RigaClassifica | null;
} {
  const testa = righe.slice(0, 3);
  const io = righe.find((r) => r.sonoIo) ?? null;
  return { testa, io: io && !testa.includes(io) ? io : null };
}

function MiniClassifica({ righe }: { righe: RigaClassifica[] }) {
  const { testa, io } = daMostrare(righe);
  const mio = righe.find((r) => r.sonoIo);

  return (
    <section>
      <SectionTitle action={{ href: "/amici", label: "Il giro" }}>
        Classifica della settimana
      </SectionTitle>
      <Link
        href="/amici"
        className="card-light tappable block p-2.5 hover:-translate-y-0.5 active:bg-black/[0.02]"
      >
        <ol>
          {testa.map((r) => (
            <li key={r.utente}>
              <Riga riga={r} />
            </li>
          ))}
          {io ? (
            <>
              {/* Il salto è disegnato, non sottinteso: senza, la mia riga in
                  quarta posizione sembrerebbe la quarta della classifica
                  invece che un pezzo staccato. */}
              <li aria-hidden="true" className="flex justify-center py-1">
                <span className="text-[13px] font-bold leading-none tracking-[0.2em] text-ink-muted">
                  ···
                </span>
              </li>
              <li>
                <Riga riga={io} />
              </li>
            </>
          ) : null}
        </ol>
      </Link>
      {mio ? (
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-muted">
          {frase(mio, righe)}
        </p>
      ) : null}
    </section>
  );
}

/**
 * La riga sotto la classifica: quanto manca a chi ti sta davanti.
 *
 * È l'unica cosa che il numero da solo non dice, ed è quella che fa tornare a
 * guardare. Chi è primo non ha nessuno davanti, quindi gli si dice cos'ha
 * dietro — che è la stessa informazione dall'altro lato.
 */
function frase(io: RigaClassifica, righe: RigaClassifica[]): string {
  const i = righe.indexOf(io);
  if (righe.length < 2) return "Sei da solo nel giro per ora.";

  if (i === 0) {
    const secondo = righe[1];
    const stacco = io.xpSettimana - secondo.xpSettimana;
    return stacco === 0
      ? `Sei primo a pari merito con ${secondo.nome}.`
      : `Sei primo, con ${stacco} XP di vantaggio su ${secondo.nome}.`;
  }

  const davanti = righe[i - 1];
  const mancano = davanti.xpSettimana - io.xpSettimana;
  return mancano === 0
    ? `Sei appaiato a ${davanti.nome}: il prossimo esercizio decide.`
    : `${mancano} XP e passi ${davanti.nome}.`;
}

function Riga({ riga }: { riga: RigaClassifica }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[20px] px-3 py-2.5 ${
        riga.sonoIo ? "bg-ink text-white" : ""
      }`}
    >
      <span
        className={`w-5 shrink-0 text-center text-[14px] font-extrabold tabular-nums ${
          riga.sonoIo ? "text-white/60" : "text-ink-muted"
        }`}
      >
        {riga.posizione}
      </span>
      <Bity level={riga.livello} size={32} alive={false} className="shrink-0" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-bold">
          {riga.sonoIo ? "Tu" : riga.nome}
        </span>
        <span
          className={`block truncate text-[12px] ${riga.sonoIo ? "text-white/55" : "text-ink-muted"}`}
        >
          {levelMeta(riga.livello).name}
        </span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-[15px] font-extrabold leading-none tabular-nums">
          {riga.xpSettimana}
        </span>
        <span
          className={`mt-0.5 block text-[10px] font-semibold leading-none ${
            riga.sonoIo ? "text-white/50" : "text-ink-muted"
          }`}
        >
          XP
        </span>
      </span>
    </div>
  );
}

/* ---- Nessuno nel giro ---- */

function Invito() {
  return (
    <section>
      <SectionTitle>Il tuo giro</SectionTitle>
      <Link
        href="/amici"
        className="card-light tappable flex items-center gap-4 p-5 hover:-translate-y-0.5 active:bg-black/[0.02]"
      >
        <Bity mood="curioso" size={48} float className="shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block font-bold">Non c&apos;è ancora nessuno</span>
          <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">
            Invita qualcuno: vedete a che punto siete e vi rincorrete in
            classifica.
          </span>
        </span>
        <span aria-hidden="true" className="shrink-0 text-ink-muted">
          ›
        </span>
      </Link>
    </section>
  );
}
