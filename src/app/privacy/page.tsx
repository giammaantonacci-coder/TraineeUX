import type { Metadata } from "next";
import { PaginaLegale, Sezione } from "@/components/legale";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description:
    "Quali dati raccoglie TraineeUX, perché, dove stanno e come si cancellano.",
};

/** Va cambiata quando cambia il testo, non a ogni rilascio dell'app. */
const AGGIORNATA = "12 agosto 2026";

const TITOLARE = "Giamma Antonacci";
const CONTATTO = "giamma.antonacci@gmail.com";

export default function PrivacyPage() {
  return (
    <PaginaLegale
      titolo="Informativa privacy"
      aggiornata={AGGIORNATA}
      intro={
        <>
          Questa pagina dice quali dati raccoglie TraineeUX, perché li
          raccoglie, dove finiscono e come si portano via. È scritta per essere
          letta, non per essere superata.
        </>
      }
    >
      <Sezione titolo="Chi tratta i dati">
        <p>
          Il titolare del trattamento è {TITOLARE}. Per qualunque domanda o
          richiesta l&apos;indirizzo è{" "}
          <a href={`mailto:${CONTATTO}`} className="font-bold text-ink underline">
            {CONTATTO}
          </a>
          .
        </p>
      </Sezione>

      <Sezione titolo="Cosa raccogliamo">
        <p>
          Solo quello che serve a far funzionare l&apos;allenamento. Nessun dato
          è chiesto &laquo;per statistica&raquo;.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-ink/25">
          <Voce cosa="Email e password">
            Servono ad accedere. La password non la vediamo mai in chiaro:
            arriva a Supabase Auth, che ne conserva solo l&apos;impronta
            crittografica.
          </Voce>
          <Voce cosa="Nome visualizzato">
            Quello che scrivi all&apos;iscrizione, usato per il saluto sulla
            schermata Home. Può essere un nome di fantasia.
          </Voce>
          <Voce cosa="Progressi">
            XP, grado, serie giornaliera e ultimo giorno di attività: sono il
            funzionamento stesso del percorso.
          </Voce>
          <Voce cosa="Tentativi">
            Per ogni esercizio svolto restano le risposte — comprese quelle
            scritte a mano nei brief — il punteggio e quanto ci hai messo. È ciò
            che permette di rivedere un esercizio e di calcolare la padronanza di
            un modulo.
          </Voce>
          <Voce cosa="Preferenze delle notifiche">
            Se le hai accese, a che ora le vuoi e in quale fuso orario ti trovi.
            Il fuso serve a mandare il promemoria alle diciannove tue, non alle
            diciannove del server.
          </Voce>
          <Voce cosa="Dispositivi per le notifiche">
            Quando accendi i promemoria, il browser genera un indirizzo di
            recapito e due chiavi. Non identificano te né il dispositivo: sono la
            casella a cui consegnare, e servono solo a questo.
          </Voce>
        </ul>
        <p className="mt-4">
          Non c&apos;è nessuno strumento di analisi, nessun tracciatore
          pubblicitario, nessun profilo commerciale. Non sappiamo che schermate
          guardi né per quanto: sappiamo cosa hai consegnato, perché
          l&apos;hai consegnato tu.
        </p>
      </Sezione>

      <Sezione titolo="Perché possiamo trattarli">
        <p>
          Email, password, nome, progressi e tentativi sono trattati per eseguire
          il servizio che hai chiesto iscrivendoti — la base giuridica è il
          contratto, articolo 6.1.b del GDPR. Le notifiche sono trattate sul tuo
          consenso, articolo 6.1.a: le accendi tu e le puoi spegnere quando vuoi
          dal Profilo, senza perdere nient&apos;altro.
        </p>
      </Sezione>

      <Sezione titolo="Dove stanno e chi li vede">
        <p>
          Il database e l&apos;autenticazione sono su{" "}
          <strong className="font-bold text-ink">Supabase</strong>, in una regione
          europea (Francoforte). L&apos;applicazione è ospitata su{" "}
          <strong className="font-bold text-ink">Vercel</strong>. Sono entrambi
          responsabili del trattamento: trattano i dati per conto nostro e non per
          conto proprio.
        </p>
        <p className="mt-3">
          Quando ti arriva un promemoria, il messaggio passa dal servizio di
          recapito del tuo browser — Apple, Google o Mozilla a seconda di cosa
          usi. È il meccanismo con cui funzionano tutte le notifiche del web, e
          non c&apos;è modo di evitarlo se non spegnendole.
        </p>
        <p className="mt-3">
          Nessuno vende, cede o scambia questi dati. Non esiste un terzo che li
          riceve per farci qualcosa di suo.
        </p>
      </Sezione>

      <Sezione titolo="Cosa succede nel tuo browser">
        <p>
          Ci sono cookie tecnici di sessione: sono quelli che ti tengono dentro
          fra una schermata e l&apos;altra, e senza non potresti restare
          collegato. Non ci sono cookie di profilazione, quindi non troverai una
          finestra che ti chiede il consenso: non c&apos;è niente da consentire.
        </p>
        <p className="mt-3">
          Mentre scrivi la risposta di un brief, la bozza resta nella memoria
          temporanea del browser per non perderla se chiudi per sbaglio. Non esce
          dal dispositivo finché non consegni, e si cancella da sola quando
          consegni.
        </p>
        <p className="mt-3">
          Le news arrivano da fonti esterne, ma è il nostro server a leggerle e a
          passartele già pronte. Il tuo browser non contatta nessun sito terzo,
          quindi quelle fonti non sanno che esisti.
        </p>
      </Sezione>

      <Sezione titolo="Per quanto tempo">
        <p>
          Finché l&apos;account esiste. Non c&apos;è una scadenza automatica,
          perché un percorso di allenamento ha senso proprio nel confronto con
          quello che hai fatto mesi prima. Quando elimini l&apos;account, tutto
          viene cancellato subito e in via definitiva.
        </p>
      </Sezione>

      <Sezione titolo="I tuoi diritti">
        <p>
          Puoi chiedere di accedere ai tuoi dati, correggerli, limitarne o opporti
          al trattamento, riceverli in forma leggibile da una macchina, e
          cancellarli. Per le prime scrivi all&apos;indirizzo qui sopra;
          l&apos;ultima la fai da solo, in qualunque momento, dal Profilo: nessuna
          richiesta da mandare, nessuna attesa. Hai anche il diritto di rivolgerti
          al Garante per la protezione dei dati personali.
        </p>
      </Sezione>

      <Sezione titolo="Età minima">
        <p>
          TraineeUX è pensato per chi lavora o studia nel design digitale e non è
          destinato a minori di sedici anni.
        </p>
      </Sezione>

      <Sezione titolo="Se questa informativa cambia">
        <p>
          La data in cima è quella dell&apos;ultima modifica. Se cambiassero i
          dati raccolti o le finalità, lo diremo dentro l&apos;app e non solo qui.
        </p>
      </Sezione>
    </PaginaLegale>
  );
}

function Voce({ cosa, children }: { cosa: string; children: React.ReactNode }) {
  return (
    <li>
      <strong className="font-bold text-ink">{cosa}.</strong> {children}
    </li>
  );
}
