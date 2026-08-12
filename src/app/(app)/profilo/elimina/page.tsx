import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/data";
import { EliminaAccount } from "@/components/EliminaAccount";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Elimina account" };

export default async function EliminaAccountPage() {
  const user = await requireUser();
  if (!user) redirect("/benvenuto");

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Account"
        title="Elimina il tuo account"
        subtitle="Da qui l'account e tutto quello che ci sta dentro vengono cancellati dai nostri sistemi. Non c'è un cestino da cui recuperarli."
      />

      <div className="card-light p-5">
        <h2 className="text-base font-bold">Cosa sparisce</h2>
        {/* L'elenco per esteso, non "i tuoi dati": chi decide di andarsene ha
            diritto di sapere cosa perde prima, non di scoprirlo dopo. */}
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink-muted marker:text-ink/25">
          <li>Email e credenziali di accesso.</li>
          <li>Nome, XP, grado e serie giornaliera.</li>
          <li>Tutti i tentativi svolti, con le risposte scritte e i punteggi.</li>
          <li>I progressi sui moduli e i badge ottenuti.</li>
          <li>Le preferenze delle notifiche e i dispositivi collegati.</li>
          <li>Le notifiche ricevute.</li>
        </ul>

        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
          I contenuti del percorso — moduli, esercizi, news — non sono tuoi e
          restano dove sono: quello che se ne va è il tuo passaggio dentro di
          essi. Se un giorno tornassi, ripartiresti da zero con un account nuovo.
        </p>

        <EliminaAccount />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-muted">
        Hai cambiato idea?{" "}
        <Link href="/profilo" className="font-bold text-ink underline">
          Torna al profilo
        </Link>
        . Se volevi solo smettere di ricevere i promemoria, li spegni da lì senza
        perdere niente.
      </p>
    </div>
  );
}
