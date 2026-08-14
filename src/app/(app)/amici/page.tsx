import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { anteprimaInvito, getDatiAmici } from "@/lib/amici";
import { COOKIE_INVITO, FORMA_CODICE } from "@/lib/invito";
import { nomeDiBattesimo } from "@/lib/labels";
import { CARTOLINE, cartolina, cartolineSbloccate, prossimaCartolina } from "@/content/regali";
import { PageHeader, SectionTitle } from "@/components/ui";
import { Bity } from "@/components/Bity";
import { CartolinaCard, CartolinaChiusa } from "@/components/Cartolina";
import { GiroAmici } from "@/components/GiroAmici";
import { CampoCodice, ConfermaInvito, IlTuoCodice } from "@/components/InvitoAmici";
import { SegnaCartolineViste } from "@/components/SegnaCartolineViste";

export const metadata: Metadata = { title: "Amici" };

export default async function AmiciPage({
  searchParams,
}: {
  searchParams: Promise<{ codice?: string }>;
}) {
  const [dati, params, barattolo] = await Promise.all([
    getDatiAmici(),
    searchParams,
    cookies(),
  ]);
  if (!dati) redirect("/benvenuto");

  // Il codice può arrivare dall'indirizzo — chi aveva già l'app — o dal cookie
  // lasciato dal middleware, che è il caso di chi si è iscritto proprio per
  // rispondere a un invito.
  const grezzo = params.codice ?? barattolo.get(COOKIE_INVITO)?.value ?? null;
  const invito = grezzo && FORMA_CODICE.test(grezzo) ? grezzo.toUpperCase() : null;

  // Chi c'è dietro il codice si chiede adesso, non al momento di accettare:
  // la domanda va fatta con un nome dentro.
  const chi = invito ? await anteprimaInvito(invito) : null;

  const io = dati.classifica.find((r) => r.sonoIo);
  const amici = dati.classifica.filter((r) => !r.sonoIo);
  const nuove = dati.ricevute.filter((r) => !r.visto).length;

  const sbloccate = cartolineSbloccate(dati.xp);
  const prossima = prossimaCartolina(dati.xp);

  return (
    <div className="animate-rise">
      <SegnaCartolineViste quante={nuove} />

      <PageHeader
        eyebrow="Amici"
        title="Il tuo giro"
        bity={{ mood: amici.length === 0 ? "curioso" : "felice", level: io?.livello }}
        subtitle={
          amici.length === 0
            ? "Studiare da soli funziona finché non smetti. Chiama qualcuno: vedete a che punto siete, vi rincorrete in classifica e vi mandate una cartolina quando serve."
            : `Sei ${io?.posizione}° su ${dati.classifica.length} questa settimana. Riparte ogni lunedì.`
        }
      />

      {invito ? <ConfermaInvito codice={invito} chi={chi} /> : null}

      {/* Senza amici l'invito è la schermata; con amici è una card fra le
          altre, sotto la cosa per cui si è tornati. */}
      {amici.length === 0 ? (
        <section className="card-dark p-6">
          <Bity mood="curioso" size={72} float className="mx-auto" />
          <h2 className="mt-3 text-center text-xl font-extrabold">
            Qui non c&apos;è ancora nessuno
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-center text-[15px] leading-relaxed text-white/70">
            Manda il tuo codice a chi vuoi nel giro. Appena entra, comparite
            tutti e due in classifica.
          </p>
          <div className="mx-auto mt-5 max-w-sm">
            {dati.codice ? (
              <IlTuoCodice
                codice={dati.codice}
                nome={nomeDiBattesimo(io?.nome ?? "Un amico")}
              />
            ) : null}
          </div>
        </section>
      ) : (
        <section>
          <SectionTitle>Classifica della settimana</SectionTitle>
          <GiroAmici righe={dati.classifica} xp={dati.xp} mandateOggi={dati.mandateOggi} />
          <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
            Contano gli XP guadagnati da lunedì. Tocca un amico per mandargli
            una cartolina.
          </p>
        </section>
      )}

      {dati.ricevute.length > 0 ? (
        <section className="mt-8">
          <SectionTitle>
            {nuove > 0 ? `Arrivate (${nuove} nuove)` : "La tua bacheca"}
          </SectionTitle>
          <ul className="space-y-2.5">
            {dati.ricevute.slice(0, 12).map((r) => {
              const c = cartolina(r.giftId);
              if (!c) return null;
              return (
                <li key={r.id}>
                  <CartolinaCard cartolina={c} mittente={r.daNome} quando={quando(r.quando)} />
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="mt-8">
        <SectionTitle>Le tue cartoline</SectionTitle>
        <p className="mb-3 text-sm leading-relaxed text-ink-muted">
          Si aprono con gli XP e non si consumano: quando una è tua, resta tua.
          {prossima ? (
            <>
              {" "}
              La prossima è <strong className="font-semibold">{prossima.nome}</strong>, fra{" "}
              {prossima.minXp - dati.xp} XP.
            </>
          ) : (
            " Le hai sbloccate tutte."
          )}
        </p>
        <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {CARTOLINE.map((c) => (
            <li key={c.id}>
              {sbloccate.some((s) => s.id === c.id) ? (
                <CartolinaCard cartolina={c} compatta />
              ) : (
                <CartolinaChiusa cartolina={c} xp={dati.xp} />
              )}
            </li>
          ))}
        </ul>
        {amici.length === 0 ? (
          <p className="mt-3 text-[13px] text-ink-muted">
            Per mandarne una serve almeno un amico nel giro.
          </p>
        ) : null}
      </section>

      <section className="card-light mt-8 p-5">
        <CampoCodice />
        {amici.length > 0 && dati.codice ? (
          <div className="mt-5 border-t border-black/[0.07] pt-5">
            <p className="text-sm font-semibold">Porta qualcun altro nel giro</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
              Manda il tuo codice: vi ritrovate in classifica insieme.
            </p>
            <div className="mt-3 rounded-[22px] bg-ink p-4">
              <IlTuoCodice
                codice={dati.codice}
                nome={nomeDiBattesimo(io?.nome ?? "Un amico")}
              />
            </div>
          </div>
        ) : null}
      </section>

      <p className="mt-8 text-[13px] leading-relaxed text-ink-muted">
        Di te un amico vede il nome, il livello, gli XP e la serie. Nient&apos;altro:
        non le risposte, non i punteggi dei singoli esercizi.{" "}
        <Link href="/privacy" className="font-semibold underline">
          Informativa privacy
        </Link>
        .
      </p>
    </div>
  );
}

/** Data breve per la bacheca. Il fuso è quello di chi legge, non del server. */
function quando(iso: string): string {
  const d = new Date(iso);
  const giorni = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (giorni <= 0) return "oggi";
  if (giorni === 1) return "ieri";
  if (giorni < 7) return `${giorni} giorni fa`;
  // Mese per esteso: abbreviato, "5 ago" si legge come un "5 fa" in inglese.
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "long" });
}
