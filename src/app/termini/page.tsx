import Link from "next/link";
import type { Metadata } from "next";
import { PaginaLegale, Sezione } from "@/components/legale";

export const metadata: Metadata = {
  title: "Termini di servizio",
  description:
    "Le regole d'uso di TraineeUX: account, contenuti, cosa promettiamo e cosa no.",
};

const AGGIORNATI = "12 agosto 2026";
const TITOLARE = "Giamma Antonacci";
const CONTATTO = "giamma.antonacci@gmail.com";

export default function TerminiPage() {
  return (
    <PaginaLegale
      titolo="Termini di servizio"
      aggiornata={AGGIORNATI}
      intro={
        <>
          Queste sono le regole d&apos;uso di TraineeUX. Usando l&apos;app le
          accetti. Sono poche e scritte in italiano corrente: se una regola ha
          bisogno di un avvocato per essere capita, il problema è la regola.
        </>
      }
    >
      <Sezione titolo="Che cos'è TraineeUX">
        <p>
          Un percorso di allenamento in UX e product design: moduli, esercizi
          con correzione, progressi e una rassegna di notizie del settore. È
          gestito da {TITOLARE} ed è oggi gratuito e in prova. Non è una scuola
          accreditata, non rilascia titoli e non è una consulenza professionale:
          quello che leggi qui dentro è materiale didattico e resta una
          posizione, per quanto argomentata, non una verità certificata.
        </p>
      </Sezione>

      <Sezione titolo="Il tuo account">
        <p>
          Serve un account per allenarsi, perché i progressi sono legati a te.
          Vale un account per persona: le credenziali non si prestano, e non
          perché sia vietato per principio — è che i progressi di due persone
          sullo stesso account non dicono più niente a nessuna delle due.
        </p>
        <p className="mt-3">
          Sei responsabile di quello che succede con le tue credenziali. Se
          entri con Google o con Apple, valgono anche le condizioni di quei
          servizi per la parte di accesso.
        </p>
        <p className="mt-3">
          L&apos;app è pensata per chi lavora o studia nel design digitale e non
          è destinata a minori di sedici anni.
        </p>
      </Sezione>

      <Sezione titolo="I contenuti del percorso">
        <p>
          Moduli, esercizi, rubriche di valutazione e risposte esperte sono
          nostri. Puoi usarli per allenarti, quanto vuoi e per sempre, ma non
          copiarli, ripubblicarli, rivenderli né usarli per costruire un
          servizio concorrente o per addestrare un modello.
        </p>
        <p className="mt-3">
          Le news rimandano a fonti esterne: quei contenuti sono di chi li ha
          scritti, noi mostriamo titolo e collegamento.
        </p>
      </Sezione>

      <Sezione titolo="Quello che scrivi tu">
        <p>
          Le risposte che scrivi negli esercizi restano tue. Le conserviamo per
          mostrarti i tuoi progressi e per farti rivedere un esercizio, e non le
          usiamo per altro: non le pubblichiamo, non le passiamo a nessuno, non
          le usiamo per addestrare modelli. Se elimini l&apos;account
          spariscono con lui.
        </p>
      </Sezione>

      <Sezione titolo="Uso corretto">
        <p>
          Niente tentativi di aggirare l&apos;accesso o di leggere dati che non
          sono tuoi, niente raccolta automatica dei contenuti, niente carichi
          fatti apposta per mettere in difficoltà il servizio. Se succede,
          possiamo sospendere o chiudere l&apos;account — avvisando, tranne
          quando l&apos;attesa peggiorerebbe le cose.
        </p>
      </Sezione>

      <Sezione titolo="Cosa promettiamo, e cosa no">
        <p>
          TraineeUX è in sviluppo: schermate, esercizi e punteggi cambiano, e a
          volte può non essere raggiungibile. Facciamo il possibile perché
          funzioni e perché i tuoi progressi non si perdano, ma il servizio è
          offerto così com&apos;è, senza garanzia di disponibilità continua.
        </p>
        <p className="mt-3">
          Soprattutto: allenarsi qui non garantisce un lavoro, una promozione né
          un risultato in un colloquio. Le decisioni che prendi sul tuo lavoro
          restano tue, e la responsabilità di quelle decisioni pure.
        </p>
      </Sezione>

      <Sezione titolo="Chiudere">
        <p>
          Puoi eliminare l&apos;account quando vuoi dal Profilo, senza chiedere
          niente a nessuno: la cancellazione è immediata e definitiva. Trovi
          l&apos;elenco di cosa viene cancellato nell&apos;
          <Link href="/privacy" className="font-bold text-ink underline">
            informativa privacy
          </Link>
          .
        </p>
        <p className="mt-3">
          Dalla nostra parte, possiamo interrompere il servizio: se accadesse,
          lo diremmo in anticipo dentro l&apos;app e ti lasceremmo il tempo di
          portare via quello che ti interessa.
        </p>
      </Sezione>

      <Sezione titolo="Se questi termini cambiano">
        <p>
          La data in cima è quella dell&apos;ultima modifica. I cambiamenti che
          contano — non le correzioni di forma — li annunciamo dentro
          l&apos;app. Continuare a usarla dopo l&apos;annuncio vuol dire
          accettarli; se non ti stanno bene, puoi eliminare l&apos;account.
        </p>
      </Sezione>

      <Sezione titolo="Legge applicabile e contatti">
        <p>
          Si applica la legge italiana. Se sei un consumatore, restano validi i
          diritti che la legge ti riconosce e il foro del tuo luogo di
          residenza. Per qualunque cosa:{" "}
          <a href={`mailto:${CONTATTO}`} className="font-bold text-ink underline">
            {CONTATTO}
          </a>
          .
        </p>
      </Sezione>
    </PaginaLegale>
  );
}
