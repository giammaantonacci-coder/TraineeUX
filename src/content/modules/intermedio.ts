import type { Module } from "@/lib/types";

export const intermedioModules: Module[] = [
  {
    id: "euristiche-avanzate",
    level: "intermedio",
    title: "Euristiche e leggi UX, applicate",
    tagline:
      "Smetti di citare Nielsen a memoria: usa le euristiche come strumento diagnostico.",
    accent: "mint",
    minutes: 45,
    outcomes: [
      "Distinguere un problema di usabilità reale da una preferenza estetica",
      "Applicare Fitts, Hick, Miller e Tesler a decisioni concrete di layout",
      "Prioritizzare i difetti per severità invece che per fastidio personale",
    ],
    capabilities: [
      {
        claim:
          "Puoi fare una valutazione euristica di un prodotto in 90 minuti e uscirne con una lista prioritizzata per severità, non con una lista della spesa.",
        signal:
          "Un mid segnala problemi. Un senior li ordina per costo di business e propone il primo da risolvere.",
      },
      {
        claim:
          "Puoi difendere una scelta di layout in riunione dicendo perché funziona, non che 'ti piace di più'.",
        signal:
          "Chi porta un principio in una discussione soggettiva sposta la conversazione dal gusto al merito.",
      },
      {
        claim:
          "Puoi riconoscere quando la complessità va spostata sul sistema invece che sull'utente (legge di Tesler).",
        signal:
          "È la differenza tra semplificare l'interfaccia e semplificare davvero il lavoro dell'utente.",
      },
    ],
    gapCost:
      "Senza questo, le tue critique suonano come opinioni. In riunione perdi contro chiunque abbia un'opinione più forte o un titolo più alto, e il prodotto peggiora per motivi politici.",
    lessons: [
      {
        id: "oltre-nielsen",
        title: "Le 10 euristiche come griglia diagnostica",
        body: [
          "Le euristiche di Nielsen non sono regole di design: sono una griglia per trovare problemi in fretta. Il valore non sta nel conoscerle, sta nel saperle usare come lente ripetibile mentre attraversi un flusso.",
          "Il metodo che funziona: attraversi il flusso come farebbe un utente reale, con un compito preciso ('compra un biglietto per due persone'), e a ogni schermata ti chiedi solo tre cose.",
          "— L'utente capisce dove si trova e cosa sta succedendo? (visibilità dello stato)",
          "— L'utente può tornare indietro o annullare senza danni? (controllo e libertà)",
          "— Il sistema parla la lingua dell'utente o quella del database? (match col mondo reale)",
          "Il resto delle euristiche serve nel secondo passaggio. Nel primo, queste tre trovano l'80% dei difetti gravi.",
          "La parte che quasi nessuno fa bene è la severità. Un difetto vale in base a: frequenza (quanti utenti lo incontrano), impatto (quanto li blocca), persistenza (si impara a conviverci o dà fastidio ogni volta). Tre assi, non 'grave/non grave'.",
        ],
        source: "Nielsen Norman Group — Severity Ratings for Usability Problems",
      },
      {
        id: "leggi-ux",
        title: "Le leggi che predicono il comportamento",
        body: [
          "Le euristiche descrivono, le leggi predicono. Sono più utili perché ti fanno anticipare il problema invece di trovarlo dopo.",
          "— Legge di Fitts: il tempo per raggiungere un bersaglio dipende da distanza e dimensione. Conseguenza pratica: i bersagli distruttivi vanno lontani e piccoli, quelli frequenti vicini e grandi. Il bordo dello schermo è infinitamente 'grande' perché il cursore ci si ferma contro.",
          "— Legge di Hick: il tempo di decisione cresce col logaritmo delle opzioni. Attenzione: cresce col logaritmo, non linearmente. Spezzare 12 opzioni in 3 menù da 4 non è automaticamente meglio — aggiungi passi di navigazione. Vale solo se il raggruppamento ha senso per l'utente.",
          "— Legge di Miller: il famoso 7±2 riguarda la memoria di lavoro immediata, non il numero di voci in un menù. Citarla per giustificare 'massimo 7 elementi nella nav' è un errore diffuso.",
          "— Legge di Tesler (conservazione della complessità): ogni processo ha una complessità irriducibile. La domanda non è 'come la elimino' ma 'chi se la prende: l'utente, il designer o l'ingegnere?'. Il design maturo la sposta verso il sistema.",
          "— Legge di Jakob: gli utenti passano la maggior parte del tempo su altri siti. Le convenzioni non sono pigrizia, sono capitale cognitivo già pagato da qualcun altro.",
          "— Effetto peak-end: di un'esperienza si ricorda il picco emotivo e la fine. Un flusso mediocre con una conferma eccellente viene ricordato meglio di un flusso buono che finisce nel vuoto.",
        ],
        source: "Laws of UX — Jon Yablonski",
      },
      {
        id: "quando-rompere",
        title: "Quando rompere una convenzione",
        body: [
          "Rompere una convenzione ha un costo certo (l'utente deve reimparare) e un beneficio incerto. Vale la pena solo se il beneficio è grande e misurabile.",
          "Tre condizioni da soddisfare tutte e tre: la convenzione esistente causa un problema documentato; la tua alternativa è testabile; hai un modo per accorgerti se stai peggiorando le cose (una metrica guardrail).",
          "Se ne soddisfi due su tre, stai facendo design d'autore, non design di prodotto. Può andare bene — ma sappi di cosa si tratta e dillo apertamente al team.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "euristiche-quiz",
        title: "Diagnosi rapida",
        description: "Cinque situazioni. Riconosci il principio che stai violando.",
        minutes: 6,
        questions: [
          {
            id: "q1",
            prompt:
              "In un gestore di file, 'Elimina definitivamente' è largo, colorato e a 12px da 'Salva'. Qual è la lettura precisa del difetto?",
            options: [
              {
                id: "a",
                label:
                  "Viola Hick: due azioni adiacenti allungano il tempo di decisione",
              },
              {
                id: "b",
                label:
                  "Viola Fitts: un'azione irreversibile è colpibile quanto quella utile",
              },
              {
                id: "c",
                label:
                  "Viola Miller: due pulsanti simili saturano la memoria di lavoro",
              },
              {
                id: "d",
                label:
                  "Non è un difetto: il dialogo di conferma copre il rischio residuo",
              },
            ],
            correctId: "b",
            explanation:
              "Fitts lega dimensione e distanza alla probabilità di colpire un bersaglio: applicata al design difensivo, dice che un'azione irreversibile va resa deliberatamente più costosa da raggiungere. Hick (a) riguarda il numero di alternative, non la loro vicinanza. Miller (c) riguarda quanti elementi si tengono a mente, e qui non c'è niente da ricordare. La (d) è la trappola più insidiosa perché è quasi vera: il dialogo esiste, ma dopo la terza volta si chiude in automatico — la cura reale è rendere l'azione annullabile, non chiedere conferma.",
          },
          {
            id: "q2",
            prompt:
              "Il PM vuole ridurre il menù da 9 a 5 voci 'perché Miller dice massimo 7'. Cosa rispondi?",
            options: [
              {
                id: "a",
                label:
                  "Ha ragione: oltre sette elementi la memoria di lavoro si satura",
              },
              {
                id: "b",
                label:
                  "Miller riguarda la memoria, non un menù sempre rileggibile",
              },
              {
                id: "c",
                label:
                  "Meglio tre voci: Hick premia sempre il numero minimo di scelte",
              },
              {
                id: "d",
                label:
                  "Il numero conta solo su mobile, dove lo spazio è più stretto",
              },
            ],
            correctId: "b",
            explanation:
              "Il 7±2 di Miller (1956) descrive quanti elementi si trattengono nella memoria di lavoro. Un menù persistente non impegna la memoria: è lì da leggere. La (a) ripete l'errore diffuso. La (c) sbaglia su Hick, che dice che il tempo di decisione cresce col logaritmo delle opzioni — quindi spezzare 9 voci in tre menù da tre aggiunge passi di navigazione e spesso peggiora. La (d) confonde un vincolo di spazio con un vincolo cognitivo. Ridurre le voci può essere giusto, ma per corrispondenza col modello mentale, verificabile con un tree test.",
          },
          {
            id: "q3",
            prompt:
              "Un'iscrizione in 5 passi ha completamento alto, ma gli utenti la descrivono come 'faticosa'. L'ultimo passo è una schermata bianca con 'Fatto'. Intervento a maggior valore?",
            options: [
              {
                id: "a",
                label: "Accorpare i campi per scendere da cinque passi a tre",
              },
              {
                id: "b",
                label: "Lavorare sulla chiusura, perché è la fine che si ricorda",
              },
              {
                id: "c",
                label: "Aggiungere una barra di avanzamento con i passi numerati",
              },
              {
                id: "d",
                label: "Spostare i campi facoltativi a dopo la prima iscrizione",
              },
            ],
            correctId: "b",
            explanation:
              "Il dato dice che il flusso funziona: il problema è il ricordo, non l'efficienza. Kahneman e Redelmeier hanno mostrato che la valutazione retrospettiva dipende dal picco e dalla fine, quasi non dalla durata — è il 'duration neglect'. Per questo (a) e (d), che accorciano, curano un sintomo che non c'è, e (a) rischia di peggiorare la densità percepita. La (c) è la risposta che quasi tutti danno: informa sul progresso ma non tocca il finale, che qui è vuoto. Una chiusura che riconosce lo sforzo e mostra il primo valore ottenuto costa poco e cambia il ricordo.",
          },
          {
            id: "q4",
            prompt:
              "Un configuratore assicurativo ha 14 variabili interdipendenti, tutte obbligatorie per legge. Il capo dice 'semplificalo'. Cosa fai, secondo Tesler?",
            options: [
              {
                id: "a",
                label: "Sposti le variabili avanzate dentro una sezione a soffietto",
              },
              {
                id: "b",
                label: "Precompili con default derivati dai dati che già possiedi",
              },
              {
                id: "c",
                label: "Dividi in quattordici schermate con una domanda ciascuna",
              },
              {
                id: "d",
                label: "Riduci a sei variabili e calcoli le altre per stima",
              },
            ],
            correctId: "b",
            explanation:
              "La legge di Tesler dice che la complessità non si elimina, si sposta: la domanda è chi se la prende. La (a) la lascia sull'utente, solo meno visibile. La (c) la aumenta, aggiungendo navigazione a parità di campi. La (d) è la più tentatrice e la più pericolosa: con vincoli di legge, stimare significa produrre un preventivo non valido. I default intelligenti spostano il lavoro sul sistema, che indovina, e lasciano all'utente solo il correggere — che costa molto meno del compilare. È lo stesso principio dell'autocompletamento degli indirizzi.",
          },
          {
            id: "q5",
            prompt:
              "Due difetti: (A) icona di export ambigua, trovata al secondo tentativo, usata dal 60% ogni settimana. (B) la cancellazione account si blocca al terzo passo, la usa lo 0,5%. Quale prioritizzi?",
            options: [
              {
                id: "a",
                label: "A, perché la frequenza settimanale moltiplica il fastidio",
              },
              {
                id: "b",
                label: "B, perché blocca un compito senza alternative ed è un obbligo",
              },
              {
                id: "c",
                label: "A, perché tocca centoventi volte più utenti ogni settimana",
              },
              {
                id: "d",
                label: "Pari: una vince per frequenza, l'altra per gravità del blocco",
              },
            ],
            correctId: "b",
            explanation:
              "Frequenza, impatto e persistenza contano, ma una regola sta sopra: un blocco che impedisce di portare a termine un compito senza alcuna alternativa ha gravità massima a prescindere da quanti lo incontrano. Qui si somma il diritto alla cancellazione del GDPR, quindi è anche esposizione legale. Le (a) e (c) applicano correttamente due assi reali al caso sbagliato: il difetto A è attrito da secondo tentativo, non un muro. La (d) sembra equilibrata e in pratica non decide — ed è così che i difetti gravi delle code lunghe restano aperti per anni.",
          }
        ],
      },
      {
        type: "critique",
        id: "euristiche-critique-checkout",
        title: "Critique: checkout di un e-commerce",
        description:
          "Guarda lo schermo con la lente delle euristiche. Seleziona solo i difetti reali: i distrattori costano punti.",
        minutes: 10,
        mockId: "checkout",
        lens: "Euristiche di usabilità e leggi UX",
        context:
          "Checkout di un e-commerce di elettronica. Compito dell'utente: completare un ordine da 899 €. Il tasso di abbandono su questa schermata è del 34%, contro una mediana di settore intorno al 20%.",
        issues: [
          {
            id: "i1",
            label:
              "Il totale mostrato in cima cambia rispetto a quello del carrello per via delle spese di spedizione, ma il salto non è spiegato",
            isReal: true,
            severity: "alta",
            explanation:
              "I costi a sorpresa sono la prima causa di abbandono del carrello in tutte le rilevazioni note (Baymard: ~48% degli abbandoni). Non è solo un problema di trasparenza: viola la visibilità dello stato del sistema, perché il totale cambia senza che l'utente capisca la causa.",
          },
          {
            id: "i2",
            label:
              "Il campo CVV non spiega dove si trova sulla carta e non ha maschera di input",
            isReal: true,
            severity: "media",
            explanation:
              "Match col mondo reale: 'CVV' è gergo bancario. Le carte AmEx lo hanno di 4 cifre sul fronte, le altre di 3 sul retro. Senza un aiuto contestuale l'utente deve ricordarselo, e ogni errore in un form di pagamento aumenta l'ansia in un momento già ad alta pressione.",
          },
          {
            id: "i3",
            label:
              "Il pulsante 'Paga ora' è affiancato a 'Svuota carrello' della stessa dimensione e a 12px di distanza",
            isReal: true,
            severity: "alta",
            explanation:
              "Fitts applicata male: un'azione distruttiva e irreversibile è resa facile da colpire quanto l'azione primaria. Su mobile, con un pollice, la probabilità di errore è concreta. La regola è: azioni distruttive lontane, piccole, e possibilmente reversibili.",
          },
          {
            id: "i4",
            label:
              "Non c'è modo di tornare al carrello per modificare le quantità senza ricominciare",
            isReal: true,
            severity: "alta",
            explanation:
              "Controllo e libertà dell'utente: manca l'uscita di emergenza. Nei checkout è la causa classica di abbandono 'silenzioso' — l'utente esce per verificare qualcosa e non rientra. La soluzione standard è un riepilogo modificabile in linea.",
          },
          {
            id: "i5",
            label:
              "Il form usa un layout a colonna singola invece di affiancare i campi correlati",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore. La colonna singola è la scelta corretta e supportata dai dati: riduce gli errori di percorso oculare e funziona identica su mobile. Affiancare i campi è l'errore, non il contrario. Le uniche eccezioni ragionevoli sono coppie strettamente legate come città/CAP e scadenza/CVV.",
          },
          {
            id: "i6",
            label:
              "Le etichette dei campi sono sopra i campi invece che come placeholder interni",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore, ed è l'inverso della verità. Le etichette sopra il campo sono lo standard corretto: i placeholder che fanno da etichetta spariscono quando l'utente digita, distruggono la possibilità di rileggere e ricontrollare, e falliscono con gli screen reader. Se hai selezionato questo, stai scambiando una moda per un principio.",
          },
          {
            id: "i7",
            label:
              "Il messaggio di errore compare in cima alla pagina, lontano dal campo che l'ha generato",
            isReal: true,
            severity: "media",
            explanation:
              "Aiutare a riconoscere e recuperare dagli errori: l'errore va posizionato accanto alla sua causa. Su mobile, un errore in cima a un form lungo è invisibile — l'utente vede il pulsante che non funziona e non capisce perché. Il pattern corretto è: sommario in cima con link ancorati, più errore in linea su ogni campo.",
          },
        ],
      },
      {
        type: "scenario",
        id: "euristiche-scenario-convenzione",
        title: "Scenario: la navigazione che il fondatore vuole reinventare",
        description:
          "Tre decisioni. Ogni scelta ha una conseguenza — la vedrai solo alla fine.",
        minutes: 8,
        setup:
          "Sei il designer di prodotto di una startup B2B SaaS da 40 persone. Il fondatore, che ha un background da designer, torna da una conferenza e propone di sostituire la navigazione laterale standard con un menù radiale attivato da un gesto. Sostiene che 'ci distinguerà e ridurrà i click'. Il team di sviluppo ha stimato tre settimane. Il rinnovo dei contratti enterprise è tra due mesi.",
        steps: [
          {
            id: "s1",
            situation:
              "Sei in riunione, il fondatore ha appena finito di presentare. Tutti guardano te.",
            question: "Come apri?",
            options: [
              {
                id: "a",
                label:
                  "Spieghi che viola la legge di Jakob e che gli utenti si aspettano una nav laterale",
                score: 1,
                outcome:
                  "Hai ragione nel merito ma hai aperto con un 'no' teorico contro l'idea del fondatore davanti al team. Lui risponde che Jakob descrive la media, non i prodotti che cambiano le cose. La discussione diventa un braccio di ferro tra citazioni.",
              },
              {
                id: "b",
                label:
                  "Chiedi quale problema il menù radiale risolve, e come sapremo se l'ha risolto",
                score: 3,
                outcome:
                  "La domanda sposta la conversazione dalla soluzione al problema, senza mettere nessuno in difesa. Emerge che il vero fastidio del fondatore è che la nav ha 11 voci e 'sembra disordinata'. Il problema reale è la struttura dell'informazione, non il meccanismo di navigazione.",
              },
              {
                id: "c",
                label:
                  "Dici che si può fare e proponi di prototiparlo, per non bloccare l'entusiasmo",
                score: 1,
                outcome:
                  "Il team parte. Tre settimane dopo il prototipo esiste, il fondatore ci si è affezionato pubblicamente, e ora dire di no costa il triplo. Hai comprato pace a breve e un problema più grande a medio.",
              },
              {
                id: "d",
                label:
                  "Proponi di rimandare la discussione dopo il rinnovo dei contratti enterprise",
                score: 2,
                outcome:
                  "Tatticamente sensato — protegge il momento critico — ma non risolvi nulla: la proposta tornerà identica tra due mesi, e nel frattempo non hai imparato niente sul problema che la generava.",
              },
            ],
            debrief:
              "La mossa più forte in una discussione su una soluzione imposta dall'alto quasi mai è opporsi alla soluzione. È risalire al problema. Chi chiede 'quale problema risolve e come lo misuriamo' non sta ostruendo: sta facendo il lavoro che nessun altro sta facendo, e lo fa senza costringere nessuno a ritirarsi pubblicamente.",
          },
          {
            id: "s2",
            situation:
              "Emerge che il problema reale è che la navigazione ha 11 voci cresciute per accumulo e nessuno sa più dove stiano le cose. Hai due settimane prima della prossima revisione.",
            question: "Cosa fai in queste due settimane?",
            options: [
              {
                id: "a",
                label:
                  "Riorganizzi la nav in base alla tua analisi e presenti la nuova struttura",
                score: 1,
                outcome:
                  "Hai prodotto una struttura ragionevole, ma è la tua opinione contro quella del fondatore. Senza dati, in stanza vince chi ha più potere — e non sei tu.",
              },
              {
                id: "b",
                label:
                  "Fai un tree test su 40 utenti con 6 compiti reali, più un card sort su 15",
                score: 3,
                outcome:
                  "In otto giorni hai numeri: il tasso di successo sui compiti è del 52%, con due voci che raccolgono da sole il 70% dei fallimenti perché usano gergo interno. Ora la discussione non è più tra due gusti: c'è un dato che nessuno può liquidare.",
              },
              {
                id: "c",
                label:
                  "Prepari un documento con le best practice di navigazione dei competitor",
                score: 1,
                outcome:
                  "Un benchmark è materiale di supporto, non evidenza. Il fondatore risponderà — legittimamente — che copiare i competitor è esattamente ciò che vuole evitare.",
              },
              {
                id: "d",
                label:
                  "Intervisti 5 clienti enterprise sulle loro difficoltà nell'uso del prodotto",
                score: 2,
                outcome:
                  "Utile e ricco di contesto, ma qualitativo: ti dà racconti, non un tasso di successo. Contro un'opinione forte, cinque aneddoti valgono poco. Ottimo però come complemento del test.",
              },
            ],
            debrief:
              "Tree test e card sort sono economici, veloci, remoti e producono numeri difendibili. È la ricerca con il miglior rapporto tra costo e potere argomentativo che un designer abbia a disposizione. La regola operativa: quando una discussione è bloccata su due opinioni, la mossa vincente è generare il dato più economico che le distingue.",
          },
          {
            id: "s3",
            situation:
              "I dati sono chiari: il problema è la tassonomia, non il meccanismo. Il fondatore però resta convinto che il menù radiale 'sarebbe comunque più bello' e vuole almeno provarlo.",
            question: "Come chiudi?",
            options: [
              {
                id: "a",
                label:
                  "Prima la tassonomia con la nav attuale, misuri, e poi riapri il meccanismo",
                score: 3,
                outcome:
                  "Nessuno perde la faccia, il problema reale viene risolto per primo, e la proposta del fondatore non è respinta ma messa in coda con una condizione oggettiva. Dopo il rilascio il tasso di successo sale al 84% e il tema del menù radiale non viene più sollevato: era un sintomo, non un desiderio.",
              },
              {
                id: "b",
                label:
                  "Dici che i dati parlano chiaro e che il menù radiale non si farà mai",
                score: 0,
                outcome:
                  "Hai vinto la discussione e perso un pezzo di rapporto. Il fondatore ha imparato che portarti un'idea significa essere corretto con i dati davanti al team. La prossima volta non te la porta: la dà direttamente agli sviluppatori.",
              },
              {
                id: "c",
                label:
                  "Accetti un test A/B fra nav laterale riorganizzata e menù radiale",
                score: 2,
                outcome:
                  "Metodologicamente onesto, ma costoso: significa costruire comunque il menù radiale, e su un B2B con pochi utenti attivi non raggiungerai la potenza statistica in tempi utili. Rischi un risultato non conclusivo che riapre tutto.",
              },
              {
                id: "d",
                label:
                  "Fai entrambe: riorganizzi la tassonomia e aggiungi il radiale come opzione",
                score: 1,
                outcome:
                  "Hai creato due navigazioni da mantenere per sempre, e una preferenza che il 2% attiverà. Il debito di manutenzione è permanente, il beneficio è marginale. È il compromesso che sembra diplomatico e costa per anni.",
              },
            ],
            debrief:
              "Il risultato migliore non è avere ragione: è che il problema venga risolto e che la persona che aveva torto resti disponibile a portarti la prossima idea. 'Prima questo, misuriamo, poi riapriamo' è una formula che funziona perché non chiude nulla — sposta soltanto l'ordine, e l'ordine giusto quasi sempre rende la seconda domanda irrilevante.",
          },
        ],
      },
    ],
  },
  {
    id: "architettura-informativa",
    level: "intermedio",
    title: "Architettura informativa e navigazione",
    tagline:
      "La struttura è il 70% dell'usabilità di un prodotto complesso — ed è invisibile finché non è sbagliata.",
    accent: "sky",
    minutes: 55,
    outcomes: [
      "Costruire una tassonomia partendo dal modello mentale, non dall'organigramma",
      "Scegliere tra tree test, card sort e analisi dei log in base alla domanda",
      "Progettare navigazione, ricerca e filtri come un sistema unico",
    ],
    capabilities: [
      {
        claim:
          "Puoi eseguire e leggere un tree test, e trasformarne i risultati in una proposta di ristrutturazione difendibile davanti a chi ha creato la struttura attuale.",
        signal:
          "È il metodo che trasforma una discussione politica sull'organizzazione dei contenuti in un problema con una risposta.",
      },
      {
        claim:
          "Puoi diagnosticare se un problema di 'non trovo le cose' si risolve con la navigazione, con la ricerca, con le etichette o con i filtri — quattro cure diverse per lo stesso sintomo.",
        signal:
          "Chi confonde i quattro rifà la navigazione ogni 18 mesi senza mai risolvere.",
      },
      {
        claim:
          "Puoi tenere insieme la struttura di un prodotto che cresce, invece di subire l'accumulo di voci che nessuno osa togliere.",
        signal: "È il lavoro che distingue chi cura un prodotto da chi aggiunge schermate.",
      },
    ],
    gapCost:
      "Senza questo, ogni nuova funzionalità si attacca dove capita. Dopo due anni la navigazione ha 14 voci, la ricerca è l'unico modo per trovare qualcosa, e la ristrutturazione costa sei mesi.",
    lessons: [
      {
        id: "modelli-mentali",
        title: "Organizzare per l'utente, non per l'azienda",
        body: [
          "La causa numero uno delle architetture informative fallite è che rispecchiano l'organigramma di chi le ha costruite. Le voci di menù corrispondono ai team, non ai compiti. È la legge di Conway applicata all'interfaccia.",
          "Il test rapido: prendi le etichette della tua navigazione e chiediti se un utente le userebbe parlando al telefono con un amico. 'Vai in Gestione Anagrafiche' — nessuno parla così. 'Vai dove ci sono i tuoi clienti' — questa sì.",
          "Gli schemi di organizzazione possibili sono pochi ed è utile sceglierli consapevolmente: per argomento, per compito, per pubblico, per metafora, alfabetico, cronologico. Nei prodotti digitali funzionano quasi sempre per compito o per pubblico. L'organizzazione per argomento è il default pigro dei siti istituzionali.",
          "Attenzione all'ambiguità: molte cose appartengono legittimamente a più categorie. La soluzione non è trovare la categoria 'giusta' — non esiste — ma decidere se il tuo sistema ammette collocazioni multiple e dove sta la fonte canonica.",
        ],
        source: "Information Architecture — Rosenfeld, Morville, Arango (4a ed.)",
      },
      {
        id: "metodi-ia",
        title: "Card sort, tree test, log: tre domande diverse",
        body: [
          "— Card sort aperto: dai all'utente le carte (i contenuti) e gli chiedi di raggrupparle e nominare i gruppi. Risponde a: come raggruppa la gente queste cose? Serve quando devi generare una struttura. 15-20 partecipanti bastano.",
          "— Card sort chiuso: le categorie le dai tu, l'utente ci mette dentro le carte. Risponde a: la mia struttura regge? Serve per validare.",
          "— Tree test: mostri solo la struttura testuale, senza interfaccia, e dai compiti ('dove andresti per cambiare il metodo di pagamento?'). Risponde a: la gente trova le cose? È il metodo più sottovalutato e più utile: isola la struttura dal design visivo. 30-50 partecipanti danno numeri stabili.",
          "— Analisi dei log di ricerca interna: risponde a: cosa cerca la gente e con che parole? È l'unica fonte gratuita e già disponibile. Le query a zero risultati sono una lista di regali: ti dicono esattamente cosa la gente si aspetta e non trova.",
          "L'errore tipico è fare un card sort quando la domanda era di tree test. Se hai già una struttura e vuoi sapere se funziona, non chiedere alla gente di ricostruirla da zero: chiedile di usarla.",
        ],
        source: "Optimal Workshop / Measuring the User Experience — Tullis & Albert",
      },
      {
        id: "nav-ricerca-filtri",
        title: "Navigazione, ricerca e filtri sono lo stesso sistema",
        body: [
          "Sono tre strategie di accesso alla stessa informazione, e vanno progettate insieme perché coprono comportamenti diversi.",
          "— La navigazione serve a chi non sa cosa cerca ma sa cosa gli serve. Insegna il dominio: la sua funzione secondaria, spesso più importante, è comunicare cosa esiste nel prodotto.",
          "— La ricerca serve a chi sa esattamente cosa cerca. Se la ricerca è l'unico modo per trovare le cose, l'architettura ha fallito: hai delegato la struttura all'utente.",
          "— I filtri (navigazione a faccette) servono a chi ha un'idea vaga e la restringe per esplorazione. Sono il pattern giusto quando gli oggetti hanno molti attributi indipendenti — cataloghi, tabelle, cataloghi di dati.",
          "Regola pratica per le faccette: mostra il conteggio dei risultati per ogni valore, non permettere mai combinazioni che portano a zero risultati (o spiega subito come uscirne), e rendi i filtri attivi visibili e rimuovibili uno per uno. La maggior parte dei filtri rotti fallisce su questi tre punti.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "ia-quiz",
        title: "Scegliere il metodo giusto",
        description: "Cinque situazioni reali, un metodo appropriato ciascuna.",
        minutes: 6,
        questions: [
          {
            id: "q1",
            prompt:
              "Il prodotto ha una nav a 9 voci che il team sospetta non funzioni, ma nessuno sa dove sia il problema. Due settimane, nessun incentivo per i partecipanti. Da cosa parti?",
            options: [
              {
                id: "a",
                label: "Card sort aperto su venti utenti, per far emergere i gruppi",
              },
              {
                id: "b",
                label: "Tree test remoto su quaranta utenti con sei compiti reali",
              },
              {
                id: "c",
                label: "Cinque interviste in profondità sull'uso quotidiano",
              },
              {
                id: "d",
                label: "Test di usabilità moderato su un prototipo navigabile",
              },
            ],
            correctId: "b",
            explanation:
              "La domanda è diagnostica su una struttura che esiste già, e il tree test è l'unico metodo che per ogni compito restituisce tasso di successo, percorso seguito e punto esatto di abbandono. Il card sort (a) genera struttura, non la diagnostica: è il metodo giusto per la domanda sbagliata. Le interviste (c) danno racconti, non tassi. Il test moderato (d) è il distrattore più forte perché è un metodo eccellente, ma mescola struttura e design visivo: se il compito fallisce non sai a quale dei due attribuirlo.",
          },
          {
            id: "q2",
            prompt:
              "Nel tree test il compito 'trova come esportare i dati fiscali' ha successo del 38%, e il 45% passa da 'Impostazioni' prima di trovarlo sotto 'Report'. Come agisci?",
            options: [
              {
                id: "a",
                label: "Sposti la voce sotto Impostazioni, dove la gente la cerca",
              },
              {
                id: "b",
                label: "Verifichi se Report falla anche su altri compiti del test",
              },
              {
                id: "c",
                label: "Accetti il 38%: per un compito raro è una soglia normale",
              },
              {
                id: "d",
                label: "Ripeti il test con più partecipanti per confermare il dato",
              },
            ],
            correctId: "b",
            explanation:
              "Il percorso di primo click è il dato più prezioso del tree test, e la (a) lo usa nel modo più naturale e più sbagliato: spostare una voce sulla base di un solo compito rompe la struttura per aggiustare un caso. Il pattern su tutti i compiti dice quale delle due cure serve — un puntatore da Impostazioni se Report falla solo qui, un'etichetta nuova se falla dappertutto. La (c) confonde rarità con accettabilità. La (d) è il modo più elegante di rinviare: quaranta partecipanti danno già numeri stabili.",
          },
          {
            id: "q3",
            prompt:
              "Le query a zero risultati sono dominate da 'fattura', 'fatture', 'invoice', mentre nel prodotto la funzione si chiama 'Documenti contabili'. Qual è la conclusione più solida?",
            options: [
              {
                id: "a",
                label: "Aggiungere i sinonimi al motore di ricerca e chiudere qui",
              },
              {
                id: "b",
                label: "Cambiare l'etichetta: quella è la parola del dominio",
              },
              {
                id: "c",
                label: "Gli utenti cercano una funzione che il prodotto non ha",
              },
              {
                id: "d",
                label: "Il motore sbaglia la riduzione delle parole alla radice",
              },
            ],
            correctId: "b",
            explanation:
              "La (a) è il distrattore più difficile perché non è falsa: i sinonimi vanno aggiunti, e subito. È incompleta, e questa è la differenza che conta — tratta la ricerca come pezza di un'architettura sbagliata, mentre il segnale vero è che l'etichetta del prodotto non è la parola che la gente usa. La (c) è smentita dal fatto che la funzione esiste. La (d) è una spiegazione tecnica plausibile applicata all'osservazione sbagliata: lo stemming confonde 'fattura' con 'fatture', non con 'documenti contabili'.",
          },
          {
            id: "q4",
            prompt:
              "Un catalogo B2B ha 8.000 prodotti con 12 attributi ciascuno, e gli utenti dicono 'non trovo quello che cerco'. Cosa progetti per primo?",
            options: [
              {
                id: "a",
                label: "Una gerarchia di categorie più profonda e più specifica",
              },
              {
                id: "b",
                label: "Faccette con conteggi e filtri attivi rimuovibili a uno a uno",
              },
              {
                id: "c",
                label: "Una ricerca con completamento automatico sui nomi prodotto",
              },
              {
                id: "d",
                label: "Una home con i più venduti e le categorie più visitate",
              },
            ],
            correctId: "b",
            explanation:
              "Ottomila oggetti con dodici attributi indipendenti è la definizione da manuale del problema che le faccette risolvono: nessuna gerarchia singola può servire tutti i modi in cui la gente restringe. La (a) è la reazione istintiva e obbliga a scegliere un solo asse — per compatibilità o per tipo, mai entrambi. La (c) aiuta chi conosce già il nome, che non è il caso descritto. La (d) serve la scoperta, non la ricerca di un ricambio compatibile: risolve il problema di un altro utente.",
          },
          {
            id: "q5",
            prompt:
              "Il capo del Marketing chiede che 'Novità' sia la prima voce di menù perché è il contenuto su cui investe. I dati dicono che riceve il 2% dei click. Qual è la risposta più efficace?",
            options: [
              {
                id: "a",
                label: "Accettare: è una richiesta legittima di un'area interna",
              },
              {
                id: "b",
                label: "Mostrare che la nav non è la leva giusta, e portare l'alternativa",
              },
              {
                id: "c",
                label: "Rifiutare citando il 2% di click, che è un dato oggettivo",
              },
              {
                id: "d",
                label: "Portare la decisione al livello superiore e farla arbitrare",
              },
            ],
            correctId: "b",
            explanation:
              "La navigazione principale è uno spazio a somma zero: ogni promozione è una retrocessione. La (c) è la risposta che sembra più professionale ed è la peggiore sul lungo periodo: vince l'argomento e crea un avversario stabile. La (d) spende l'autorità di qualcun altro su un problema tuo, e ti toglie il tavolo. La (a) cede senza servire nemmeno il suo obiettivo. La mossa efficace riconosce l'obiettivo — più attenzione al contenuto — e sposta la conversazione sullo strumento: la nav la guardano quelli che sanno già cosa vogliono.",
          }
        ],
      },
      {
        type: "critique",
        id: "ia-critique-filtri",
        title: "Critique: catalogo con filtri",
        description:
          "Una lista di risultati filtrata. Cerca i difetti di architettura e di sistema di accesso.",
        minutes: 10,
        mockId: "ricerca-filtri",
        lens: "Architettura informativa, ricerca e navigazione a faccette",
        context:
          "Catalogo di un marketplace B2B di componenti industriali, 8.000 SKU. L'utente tipo è un ufficio acquisti che cerca un ricambio compatibile. Il 61% delle sessioni usa i filtri; il 22% termina con zero risultati.",
        issues: [
          {
            id: "i1",
            label:
              "I filtri non mostrano il numero di risultati per ciascun valore prima della selezione",
            isReal: true,
            severity: "alta",
            explanation:
              "Senza i conteggi l'utente filtra alla cieca e finisce nei vicoli ciechi a zero risultati — esattamente il 22% osservato. I conteggi trasformano il filtro da scommessa a decisione informata e sono il singolo intervento a più alto impatto su una navigazione a faccette.",
          },
          {
            id: "i2",
            label:
              "Quando una combinazione dà zero risultati, la pagina è vuota e non offre modo di tornare indietro se non ricaricando",
            isReal: true,
            severity: "alta",
            explanation:
              "Lo stato a zero risultati è uno stato di progettazione, non un errore. Deve dire cosa ha causato lo zero, quale filtro rimuovere per tornare a risultati, e proporre l'alternativa più vicina. Una pagina vuota in un flusso di acquisto è una sessione persa.",
          },
          {
            id: "i3",
            label:
              "I filtri attivi non sono visibili come gruppo rimuovibile: per capire cosa è selezionato bisogna scorrere la colonna",
            isReal: true,
            severity: "media",
            explanation:
              "Il pattern standard sono i chip dei filtri attivi in testa ai risultati, rimuovibili uno per uno più un 'azzera tutto'. Senza, l'utente perde traccia del proprio stato — è di nuovo visibilità dello stato del sistema, applicata a una faccetta.",
          },
          {
            id: "i4",
            label:
              "La categoria 'Componentistica generale' contiene il 40% del catalogo",
            isReal: true,
            severity: "media",
            explanation:
              "Una categoria contenitore che raccoglie tutto ciò che non si sapeva dove mettere è il sintomo classico di tassonomia costruita per accumulo. Non aiuta a restringere, e nasconde il fatto che serve un asse di classificazione diverso (probabilmente per compatibilità o per applicazione, non per tipo).",
          },
          {
            id: "i5",
            label:
              "L'ordinamento predefinito è per rilevanza invece che per prezzo crescente",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore. La rilevanza è il default corretto per una ricerca; il prezzo crescente come default premia i prodotti economici indipendentemente dalla pertinenza, ed è dannoso in un contesto B2B dove la compatibilità conta più del costo. Il problema semmai sarebbe non poter cambiare ordinamento.",
          },
          {
            id: "i6",
            label: "I filtri sono nella colonna sinistra invece che in cima",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore: entrambe le collocazioni sono valide e supportate. La colonna sinistra è la convenzione per cataloghi con molte faccette su desktop; i filtri in cima funzionano quando le faccette sono poche. Nessuna delle due è un difetto in sé.",
          },
          {
            id: "i7",
            label:
              "La ricerca testuale ignora i codici prodotto con trattini: 'AB-1200' non trova 'AB1200'",
            isReal: true,
            severity: "alta",
            explanation:
              "In un contesto B2B di ricambi, la ricerca per codice è il percorso più frequente e più ad alto intento: chi cerca un codice esatto sta per comprare. Una normalizzazione mancante su trattini e spazi è un difetto tecnico banale con impatto commerciale diretto, e va trovato nei log delle query a zero risultati.",
          },
        ],
      },
      {
        type: "brief",
        id: "ia-brief-ristrutturazione",
        title: "Brief a tempo: ristrutturare una nav cresciuta male",
        description:
          "25 minuti. Scrivi la tua proposta, poi confrontala con la rubrica e con la risposta esperta.",
        minutes: 25,
        brief:
          "Un gestionale per studi medici ha una navigazione principale con 13 voci, aggiunte una per volta in quattro anni: Dashboard, Pazienti, Agenda, Prestazioni, Fatturazione, Documenti contabili, Magazzino, Report, Statistiche, Comunicazioni, Anagrafiche, Impostazioni, Novità. Un tree test su 45 utenti dà un tasso di successo medio del 49%. I compiti peggiori: 'trova la fattura di un paziente' (31%), 'controlla quante visite hai fatto questo mese' (28%), 'aggiungi un nuovo medico allo studio' (34%). I log di ricerca mostrano che 'fattura', 'incasso' e 'quante visite' sono tra le prime dieci query. Il team teme che una ristrutturazione confonda gli utenti storici, che rappresentano l'80% del fatturato.",
        constraints: [
          "Non puoi rimuovere funzionalità, solo riorganizzarle e rinominarle",
          "La migrazione deve essere gestibile senza rieducare 4.000 studi",
          "Hai un solo ciclo di rilascio (6 settimane) prima della stagione di picco",
        ],
        deliverables: [
          "La nuova struttura di primo livello, con le voci e cosa contiene ciascuna",
          "La logica di raggruppamento che hai scelto e perché quella",
          "Come gestisci le tre voci più ambigue del set attuale",
          "Il piano di transizione per gli utenti storici",
          "Cosa misuri per sapere se ha funzionato",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Schema di organizzazione dichiarato",
            description:
              "Hai scelto esplicitamente un asse (per compito, per oggetto, per pubblico) e lo hai applicato in modo coerente?",
            excellent:
              "Due punti se dichiari l'asse, spieghi perché batte le alternative in questo dominio, e la struttura lo rispetta senza eccezioni non giustificate. Un punto se la struttura è ragionevole ma l'asse è implicito.",
          },
          {
            id: "r2",
            criterion: "Uso delle evidenze fornite",
            description:
              "Hai collegato le tue scelte ai fallimenti specifici del tree test e alle query di ricerca?",
            excellent:
              "Due punti se ogni scelta importante cita il dato che la giustifica, incluso il vocabolario ('fattura' non 'documento contabile'). Un punto se citi i dati genericamente.",
          },
          {
            id: "r3",
            criterion: "Gestione dell'ambiguità",
            description:
              "Come tratti gli oggetti che appartengono legittimamente a più categorie (es. una fattura è sia di un paziente sia della contabilità)?",
            excellent:
              "Due punti se ammetti collocazioni multiple con una fonte canonica dichiarata, o se giustifichi la scelta di una sola collocazione. Un punto se scegli una collocazione senza affrontare il problema.",
          },
          {
            id: "r4",
            criterion: "Piano di transizione",
            description:
              "Hai un piano concreto che protegge gli utenti storici senza congelare la struttura per sempre?",
            excellent:
              "Due punti se il piano è graduale, reversibile e ha un criterio d'uscita. Un punto se prevedi solo comunicazione o un tour di onboarding.",
          },
          {
            id: "r5",
            criterion: "Misurazione",
            description:
              "Hai definito la metrica di successo e almeno un guardrail che ti fa fermare?",
            excellent:
              "Due punti se riporti il tree test post-rilascio come confronto diretto e definisci un guardrail su un comportamento a rischio (ticket di supporto, uso della ricerca). Un punto se citi metriche generiche.",
          },
        ],
        expertAnswer: [
          "**Asse scelto: per oggetto di lavoro, con le azioni annidate sotto l'oggetto.** In un gestionale medico gli utenti pensano per entità ('il paziente Rossi', 'la giornata di giovedì'), non per funzione ('fatturazione'). Le tredici voci attuali mescolano tre assi diversi — oggetti (Pazienti, Magazzino), funzioni (Fatturazione, Comunicazioni) e formati di output (Report, Statistiche) — ed è questa mescolanza, più del numero, a produrre il 49%.",
          "**Struttura proposta, 5 voci:** Agenda (calendario, prestazioni erogate, sale) · Pazienti (anagrafica, cartelle, documenti e fatture del paziente, comunicazioni verso di lui) · Amministrazione (fatture emesse e ricevute, incassi, magazzino, listini) · Andamento (ex Report + Statistiche unificati) · Studio (medici, sedi, utenti, impostazioni, novità).",
          "**Perché risolve i tre compiti falliti.** 'Trova la fattura di un paziente' al 31% fallisce perché l'oggetto sta in due posti concorrenti (Fatturazione e Documenti contabili) e in nessuno dei due c'è il paziente: nella nuova struttura la fattura è raggiungibile dal paziente — che è il percorso mentale — ed è canonicamente in Amministrazione. 'Quante visite ho fatto' al 28% fallisce per la coppia Report/Statistiche, una distinzione che esiste solo per chi ha scritto il software: unificarle in Andamento elimina la scelta. 'Aggiungi un medico' al 34% fallisce perché 'Anagrafiche' è gergo interno che per l'utente significa pazienti: spostare la gestione delle persone dello studio sotto Studio la mette dove si cerca.",
          "**Vocabolario.** 'Documenti contabili' diventa 'Fatture' perché è la parola dei log. 'Prestazioni' resta perché è il termine tecnico corretto del dominio sanitario e gli utenti lo usano davvero — cambiare gergo giusto in linguaggio semplificato è un errore altrettanto comune del contrario.",
          "**Ambiguità.** La fattura vive in due posti con una regola dichiarata: la fonte canonica è Amministrazione (dove si gestiscono ciclo di vita, stati, invio a SDI), mentre sotto Pazienti compare in sola lettura come storico. Questa distinzione — canonico vs. riferimento — è ciò che permette collocazioni multiple senza che la struttura diventi indeterminata.",
          "**Transizione in tre fasi, dentro le sei settimane.** Fase 1 (settimana 1-2): rilascio della nuova struttura come opzione attivabile, con la vecchia come default e un invito non bloccante. Fase 2 (settimana 3-4): inversione del default con un ritorno alla vecchia sempre disponibile e un banner che mostra la mappa vecchio→nuovo. Fase 3 (settimana 5-6): rimozione della vecchia, con reindirizzamenti permanenti da tutti gli URL precedenti e la ricerca che accetta i vecchi nomi come sinonimi per sempre. Il criterio d'uscita da ogni fase è dichiarato prima: si procede se i ticket sulla navigazione restano sotto il doppio della baseline.",
          "**Misurazione.** Primaria: ripetizione dello stesso tree test con gli stessi sei compiti a quattro settimane dal rilascio, obiettivo 75% medio e nessun compito sotto il 60%. Secondaria: quota di sessioni che usano la ricerca per raggiungere una funzione (deve scendere: se la gente cerca invece di navigare, la struttura non ha risolto). Guardrail: volume di ticket etichettati 'non trovo', e tasso di ritorno alla vecchia navigazione durante la fase 2 — se supera il 15%, ci si ferma e si indaga prima di procedere.",
          "**Nota sul rischio politico.** 'Novità' finisce sotto Studio, cioè retrocede. È una scelta che va comunicata prima al proprietario di quel contenuto, con l'alternativa già pronta: promozione contestuale dentro Agenda, dove l'utente entra ogni mattina. Presentare una retrocessione senza portare un'alternativa è il modo più affidabile di far deragliare una ristrutturazione corretta.",
        ],
      },
    ],
  },
  {
    id: "stati-e-microcopy",
    level: "intermedio",
    title: "Stati, errori e microcopy",
    tagline:
      "Il prodotto vive negli stati intermedi. Il design che li ignora è una demo, non un prodotto.",
    accent: "blush",
    minutes: 40,
    outcomes: [
      "Mappare tutti gli stati di un'interfaccia prima di disegnarne uno",
      "Scrivere messaggi di errore che dicono cosa fare, non cosa è andato storto",
      "Progettare stati vuoti che insegnano invece di scusarsi",
    ],
    capabilities: [
      {
        claim:
          "Puoi consegnare una specifica di componente che gli sviluppatori non devono interpretare: ogni stato, ogni transizione, ogni caso limite documentato.",
        signal:
          "È il motivo per cui alcuni designer generano metà dei bug degli altri a parità di complessità.",
      },
      {
        claim:
          "Puoi riscrivere il microcopy di un flusso critico e ottenere miglioramenti di conversione senza toccare il layout.",
        signal:
          "È l'intervento con il miglior rapporto tra costo di sviluppo e impatto misurabile che esista.",
      },
      {
        claim:
          "Puoi trasformare lo stato vuoto di una funzione nuova nel suo miglior strumento di adozione.",
        signal: "Chi progetta gli stati vuoti pensa all'utente del primo giorno, non alla demo.",
      },
    ],
    gapCost:
      "Senza questo, consegni schermate perfette che in produzione diventano irriconoscibili: testi troncati, caricamenti che saltano, errori scritti dal backend. Gli sviluppatori decidono al posto tuo, e decidono male perché non è il loro mestiere.",
    lessons: [
      {
        id: "mappa-stati",
        title: "Gli stati che esistono sempre",
        body: [
          "Ogni componente che mostra dati ha almeno cinque stati, e disegnarne uno solo è il difetto più comune nelle consegne dei designer mid.",
          "— Vuoto per la prima volta: l'utente non ha ancora creato nulla. È un'opportunità di onboarding, non un errore.",
          "— Vuoto per risultato: c'era un filtro o una ricerca e non ha prodotto nulla. Serve la causa e la via d'uscita.",
          "— In caricamento: ha bisogno di skeleton se sotto il secondo, di indicatore di progresso se sopra. Sotto i 100ms non serve niente: mostrare uno spinner per 80ms peggiora la percezione.",
          "— Parziale/degradato: alcuni dati sono arrivati, altri no. È lo stato che nessuno disegna e che in produzione capita ogni giorno.",
          "— Errore: distinguere errore recuperabile (riprova) da irrecuperabile (cambia strada) da errore di permessi (non è un errore, è una regola).",
          "A questi si aggiungono, per gli elementi interattivi: default, hover, focus, attivo, disabilitato, selezionato, in caricamento, con errore. Il focus è quello che salta più spesso ed è l'unico obbligatorio per legge in molti contesti.",
          "Un caso limite che vale da solo metà dei bug di layout: il contenuto lungo. Un nome di 60 caratteri, un importo a sette cifre, una traduzione in tedesco che è il 40% più lunga dell'italiano. Se non l'hai disegnato, qualcuno lo troncherà a caso.",
        ],
      },
      {
        id: "errori-utili",
        title: "Anatomia di un errore utile",
        body: [
          "Un messaggio di errore ha tre lavori, in quest'ordine: dire cosa è successo in modo che l'utente riconosca la situazione, dire cosa fare adesso, e non far sentire stupido chi legge.",
          "La maggior parte degli errori in produzione ne fa solo uno, e male: descrive lo stato interno del sistema. 'Errore 422: entità non processabile' fa zero su tre.",
          "— Cattivo: 'Password non valida'. Cosa non è valido? — Buono: 'La password deve avere almeno 8 caratteri e un numero'. Meglio ancora: mostrare i requisiti prima che l'utente digiti, e validare in tempo reale in positivo.",
          "— Cattivo: 'Si è verificato un errore'. — Buono: 'Non siamo riusciti a salvare le modifiche. Le abbiamo tenute da parte: riprova tra poco o scaricale come bozza.' Dice cosa è successo, cosa non è andato perso, e due strade.",
          "Regola della responsabilità: quando è colpa del sistema, il sistema si prende la colpa in modo esplicito. Quando è un input dell'utente, il testo è neutro e non accusatorio — mai 'hai sbagliato'.",
          "Prevenzione batte messaggistica. Un campo che accetta il numero di carta con o senza spazi elimina un intero messaggio di errore. La domanda giusta davanti a ogni errore è: perché questo errore può esistere?",
        ],
        source: "Writing is Designing — Metts & Welfle",
      },
      {
        id: "microcopy",
        title: "Microcopy: le parole sono interfaccia",
        body: [
          "Il testo di un pulsante è il componente più cliccato del prodotto e quello con meno tempo di design dedicato.",
          "— I pulsanti dicono cosa succede, non cosa sono: 'Invia la richiesta' invece di 'OK', 'Elimina 3 file' invece di 'Conferma'. L'etichetta deve reggere anche se letta fuori contesto, perché con gli screen reader spesso lo è.",
          "— Nei dialoghi di conferma, entrambe le opzioni devono essere azioni esplicite. 'Vuoi uscire senza salvare? [Annulla] [OK]' è ambiguo: annullare cosa, l'uscita o il salvataggio? Meglio: '[Continua a modificare] [Esci senza salvare]'.",
          "— La voce cambia con la posta in gioco. Un tono giocoso nello stato vuoto va benissimo; lo stesso tono in un errore di pagamento fallito è irritante. La regola: più alto lo stress dell'utente, più asciutto il testo.",
          "— Attenzione ai numeri: 'Ultimi 3 posti!' funziona solo se è vero. Il falso senso di urgenza è un dark pattern e in UE è sanzionabile ai sensi della direttiva sulle pratiche commerciali sleali.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "stati-quiz",
        title: "Stati e parole",
        description: "Cinque decisioni su stati, errori e testo.",
        minutes: 6,
        questions: [
          {
            id: "q1",
            prompt:
              "Un'API risponde in media in 250ms, ma nel 5% dei casi impiega 4 secondi. Cosa progetti?",
            options: [
              {
                id: "a",
                label: "Uno spinner sempre visibile, per coerenza fra le schermate",
              },
              {
                id: "b",
                label: "Niente sotto 400ms, skeleton fino a un secondo, poi messaggio",
              },
              {
                id: "c",
                label: "Un caricamento ottimistico con dati di esempio al posto dei veri",
              },
              {
                id: "d",
                label: "Una barra di avanzamento indeterminata dal primo istante",
              },
            ],
            correctId: "b",
            explanation:
              "Sotto i 400ms circa l'attesa è percepita come istantanea, e un indicatore la fa sembrare più lenta perché ci porta l'attenzione: è l'errore che (a) e (d) condividono, con la (a) che aggiunge il costo di apparire su tutte le schermate veloci. Lo skeleton nella fascia intermedia comunica struttura e previene lo spostamento del layout. La (c) mostra all'utente dati falsi. Il dettaglio che distingue una risposta da mid da una da senior: si progetta per la coda lenta del 5%, non per la mediana.",
          },
          {
            id: "q2",
            prompt:
              "Quale messaggio è progettato meglio, per un pagamento rifiutato dalla banca?",
            options: [
              {
                id: "a",
                label: "'Pagamento rifiutato dalla banca. Errore 402: non completato.'",
              },
              {
                id: "b",
                label: "'La banca ha rifiutato. Non abbiamo addebitato nulla: usa un'altra carta.'",
              },
              {
                id: "c",
                label: "'Ops! Qualcosa è andato storto. Riprova, dovrebbe funzionare.'",
              },
              {
                id: "d",
                label: "'Non è stato possibile completare. Verifica i dati e riprova.'",
              },
            ],
            correctId: "b",
            explanation:
              "Un errore utile dice cosa è successo, cosa fare adesso, e non fa sentire stupido chi legge. La (b) aggiunge la cosa che conta di più in un pagamento: rimuove la paura peggiore, l'addebito doppio. La (a) descrive lo stato interno del sistema. La (c) usa un tono giocoso nel momento di massimo stress. La (d) è il distrattore più insidioso perché è educata, chiara e grammaticalmente perfetta: manda l'utente a controllare dati che sono corretti, e cercare un errore che non esiste è peggio che non dire niente.",
          },
          {
            id: "q3",
            prompt:
              "Stai progettando lo stato vuoto della sezione 'Report' in un prodotto B2B appena installato. Qual è l'obiettivo principale di quello schermo?",
            options: [
              {
                id: "a",
                label: "Comunicare con chiarezza che non ci sono ancora dati",
              },
              {
                id: "b",
                label: "Portare alla prima azione che genera dati, mostrando l'esito",
              },
              {
                id: "c",
                label: "Mettere un'illustrazione che alleggerisca il senso di vuoto",
              },
              {
                id: "d",
                label: "Offrire un collegamento alla documentazione e ai video",
              },
            ],
            correctId: "b",
            explanation:
              "È lo schermo di onboarding più visto e meno progettato del prodotto, e l'utente ci arriva già motivato: ha cliccato lì di proposito. La (a) gli comunica un'informazione che ha già sotto gli occhi. La (d) delega l'apprendimento a un altro posto, e chi è in un prodotto nuovo raramente esce per leggere. La (c) è la risposta di chi tratta lo stato vuoto come un problema estetico invece che come un passaggio del percorso. Il pattern che funziona è anteprima realistica più una sola azione primaria per arrivarci.",
          },
          {
            id: "q4",
            prompt:
              "Un dialogo chiede 'Vuoi annullare l'iscrizione?' con i pulsanti [Annulla] [OK]. Qual è il difetto più grave?",
            options: [
              {
                id: "a",
                label: "'OK' è generico e non descrive l'azione che verrà eseguita",
              },
              {
                id: "b",
                label: "'Annulla' collide col verbo dell'azione: il dialogo è indecidibile",
              },
              {
                id: "c",
                label: "Manca l'icona di avvertimento su un'azione distruttiva",
              },
              {
                id: "d",
                label: "I pulsanti sono nell'ordine sbagliato per questa piattaforma",
              },
            ],
            correctId: "b",
            explanation:
              "La (a) è vera, ed è per questo il distrattore migliore del set: si ferma un passo prima. Anche sostituendo 'OK' con un'etichetta descrittiva, 'Annulla' resterebbe ambiguo — annulla l'iscrizione o annulla il dialogo? La collisione semantica rende il dialogo indecidibile a prescindere dall'altro pulsante, e su un'azione distruttiva produce disiscrizioni non volute. La cura è rendere entrambe le opzioni esplicite e diverse: '[Resta iscritto] [Disiscrivimi]'. La (c) e la (d) sono rifiniture su un difetto strutturale.",
          },
          {
            id: "q5",
            prompt:
              "Il backend restituisce a volte errori grezzi tipo 'null constraint violation on user_ref'. Il team dice che rifarli tutti costa troppo. Cosa proponi?",
            options: [
              {
                id: "a",
                label: "Accettare il limite e documentarlo nelle note di rilascio",
              },
              {
                id: "b",
                label: "Un fallback unico più i dieci errori più frequenti nei log",
              },
              {
                id: "c",
                label: "Nascondere il dettaglio e mostrare sempre un generico 'Errore'",
              },
              {
                id: "d",
                label: "Mostrare l'errore tecnico in una sezione 'dettagli' richiudibile",
              },
            ],
            correctId: "b",
            explanation:
              "In produzione gli errori si distribuiscono a coda lunga: pochi tipi coprono la maggior parte degli eventi. Chiedere di riscriverli tutti è una richiesta che verrà rifiutata; chiederne dieci, con i numeri dei log in mano, è una richiesta che passa. La (c) peggiora la situazione, perché toglie all'utente anche l'unico indizio che aveva. La (d) sembra un compromesso trasparente e in realtà scarica sull'utente la traduzione. La (a) rinuncia senza aver provato la leva più economica disponibile.",
          }
        ],
      },
      {
        type: "critique",
        id: "stati-critique-notifiche",
        title: "Critique: impostazioni notifiche",
        description:
          "Guarda gli stati, il feedback e le parole. Ignora l'estetica: qui conta il comportamento.",
        minutes: 9,
        mockId: "settings-notifiche",
        lens: "Stati, feedback e microcopy",
        context:
          "Schermata impostazioni notifiche di un'app di gestione progetti. Il supporto riceve molte segnalazioni del tipo 'ho disattivato le notifiche ma continuo a riceverle'.",
        issues: [
          {
            id: "i1",
            label:
              "Le modifiche si salvano automaticamente ma non c'è nessuna conferma visibile del salvataggio",
            isReal: true,
            severity: "alta",
            explanation:
              "È la causa più probabile delle segnalazioni. Senza conferma, l'utente non sa se il cambiamento è stato registrato: molti riattivano e ridisattivano, alcuni escono convinti di non aver salvato. Un salvataggio automatico ha bisogno di uno stato visibile — anche solo 'Salvato' accanto al controllo per qualche secondo.",
          },
          {
            id: "i2",
            label:
              "Non c'è nessuno stato di errore: se il salvataggio fallisce, l'interruttore resta nella posizione nuova",
            isReal: true,
            severity: "alta",
            explanation:
              "Aggiornamento ottimistico senza gestione del fallimento: l'interfaccia mente. L'utente vede 'disattivato', il server ha 'attivato', e le notifiche continuano ad arrivare — esattamente il reclamo riportato. Un aggiornamento ottimistico è legittimo solo se prevede il ripristino visibile e un messaggio in caso di errore.",
          },
          {
            id: "i3",
            label:
              "L'etichetta 'Notifiche intelligenti' non spiega cosa faccia il sistema né quando invierà qualcosa",
            isReal: true,
            severity: "media",
            explanation:
              "Un'etichetta che nomina la tecnologia invece del comportamento lascia l'utente senza modello mentale. Non può prevedere l'effetto della propria scelta, e su un'impostazione questo è disabilitante. Il testo di supporto deve dire cosa succede in concreto: quali eventi, con quale frequenza.",
          },
          {
            id: "i4",
            label:
              "Disattivando 'Tutte le notifiche' i singoli interruttori restano attivi e cliccabili, senza indicare che non hanno più effetto",
            isReal: true,
            severity: "media",
            explanation:
              "Una dipendenza fra controlli non rappresentata. Gli interruttori figli vanno disabilitati visivamente e via attributo, con una spiegazione della causa. Lasciarli attivi crea la convinzione — corretta dal punto di vista di ciò che si vede — che le impostazioni fini siano ancora in vigore.",
          },
          {
            id: "i5",
            label:
              "Gli interruttori usano il verde per 'attivo' invece di un colore neutro",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore. Il verde per lo stato attivo è una convenzione consolidata e non è un difetto. Un problema di colore esisterebbe se il colore fosse l'unico indicatore dello stato (per i daltonici serve anche la posizione del pallino, che c'è).",
          },
          {
            id: "i6",
            label:
              "La pagina non ha uno stato di caricamento: al primo accesso gli interruttori appaiono tutti spenti e poi saltano nella posizione reale",
            isReal: true,
            severity: "alta",
            explanation:
              "Uno stato iniziale falso è peggio di un caricamento visibile: l'utente che agisce nella finestra sbagliata combatte con l'interfaccia, e chi guarda e va via porta con sé un'informazione errata. Serve uno skeleton, o controlli disabilitati finché non arriva lo stato reale.",
          },
          {
            id: "i7",
            label:
              "Il testo di aiuto è sotto ogni impostazione invece che in un tooltip",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore, ed è l'inverso: il testo sempre visibile è preferibile al tooltip, che è invisibile su touch, richiede un'azione per essere scoperto e viene saltato da chi ne avrebbe più bisogno. Se il testo è breve e importante, sta bene dov'è.",
          },
        ],
      },
      {
        type: "brief",
        id: "stati-brief-errore",
        title: "Brief a tempo: il flusso che fallisce a metà",
        description: "20 minuti. Progetta il comportamento, non lo schermo.",
        minutes: 20,
        brief:
          "Un'app di dichiarazione dei redditi permette di caricare documenti e li elabora con OCR. Il flusso: l'utente carica fino a 30 file, il sistema li elabora uno per uno (2-15 secondi ciascuno), estrae i dati e li mostra per la verifica. Problemi reali riportati: alcuni file falliscono l'OCR (illeggibili, formato non supportato, oltre 20MB); l'elaborazione totale può superare i 5 minuti; gli utenti chiudono la scheda a metà; su mobile la connessione cade; il 30% dei dati estratti richiede correzione manuale. Attualmente esiste solo uno spinner con scritto 'Elaborazione in corso...' e, se qualcosa fallisce, un alert 'Errore nel caricamento'.",
        constraints: [
          "Il tempo di elaborazione per file non è riducibile: è un vincolo del motore OCR",
          "Il periodo di picco è marzo-giugno, con carico 20 volte superiore",
          "Molti utenti sono over 55 e usano il prodotto una volta l'anno",
        ],
        deliverables: [
          "La mappa completa degli stati del flusso, inclusi quelli parziali",
          "Il testo esatto dei messaggi per almeno tre situazioni di fallimento diverse",
          "Come gestisci l'abbandono a metà e il ritorno dell'utente",
          "Cosa mostri durante un'attesa di 5 minuti",
          "Cosa proponi di cambiare a monte per far esistere meno errori",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Completezza della mappa degli stati",
            description:
              "Hai coperto vuoto, caricamento, parziale, errore per singolo file, errore globale, e il ritorno dopo l'abbandono?",
            excellent:
              "Due punti se lo stato parziale (alcuni file ok, altri no) è trattato come stato di prima classe con azioni proprie. Un punto se copri solo caricamento ed errore.",
          },
          {
            id: "r2",
            criterion: "Qualità dei messaggi",
            description:
              "I testi dicono cosa è successo, cosa non è andato perso e cosa fare adesso, con un tono adatto allo stress?",
            excellent:
              "Due punti se distingui i tre fallimenti per causa e azione, e se rassicuri esplicitamente sul lavoro già fatto. Un punto se i messaggi sono chiari ma generici.",
          },
          {
            id: "r3",
            criterion: "Gestione dell'attesa lunga",
            description:
              "L'utente sa a che punto è, quanto manca, e può fare altro nel frattempo?",
            excellent:
              "Due punti se il progresso è per file (non globale indeterminato), l'elaborazione continua se l'utente esce, e prevedi una notifica al termine. Un punto se mostri solo una barra di progresso.",
          },
          {
            id: "r4",
            criterion: "Prevenzione a monte",
            description:
              "Hai proposto modi per far esistere meno errori invece di comunicarli meglio?",
            excellent:
              "Due punti se proponi validazione prima del caricamento (formato, dimensione, qualità immagine) con feedback immediato. Un punto se citi la prevenzione senza dettagliarla.",
          },
          {
            id: "r5",
            criterion: "Adattamento al contesto d'uso",
            description:
              "Hai tenuto conto dell'utente annuale over 55, del mobile instabile e del picco di marzo?",
            excellent:
              "Due punti se almeno due scelte derivano esplicitamente da questi vincoli. Un punto se li citi senza che influenzino il design.",
          },
        ],
        expertAnswer: [
          "**Il ribaltamento del problema.** Il flusso attuale tratta 30 file come una transazione unica che riesce o fallisce. È il modello sbagliato: sono 30 transazioni indipendenti. Ogni scelta che segue discende da qui.",
          "**Prima del caricamento — dove si vincono i punti.** Validazione lato client immediata su formato e dimensione: il file da 25MB viene rifiutato prima di partire, con l'azione già pronta ('questo file supera i 20MB — possiamo comprimerlo per te?'). Per le foto scattate col telefono, un controllo di sfocatura e luminosità con un avviso non bloccante prima dell'invio ('questa foto è mossa, l'OCR potrebbe non leggerla — vuoi rifarla?'). Ogni errore prevenuto qui è un errore che non dovrai scrivere bene dopo, e con utenti annuali over 55 la differenza è tra completare e chiamare il supporto.",
          "**Durante — la lista è l'interfaccia.** Niente spinner globale: una lista di file, ognuno con il proprio stato (in coda / in elaborazione / completato con anteprima dei dati estratti / non riuscito con causa e azione). Il progresso è 'file 7 di 30', che è informazione vera, contro una barra indeterminata che non lo è. I file completati sono verificabili subito, mentre gli altri procedono: a cinque minuti di attesa non si chiede a nessuno di stare fermo a guardare. Stima del tempo residuo solo se calcolata sui file già fatti, con un intervallo ('circa 2-3 minuti') e mai un conto alla rovescia preciso che poi sbaglia.",
          "**L'elaborazione non appartiene alla scheda del browser.** Continua lato server. Chiudere la finestra non annulla nulla, e questo va detto esplicitamente nell'interfaccia ('puoi chiudere questa pagina, ti avvisiamo quando è pronto') con notifica via email al termine — con l'utente annuale, l'email è il canale che funziona davvero. Al rientro, il flusso riprende esattamente da dov'era, con i completati già verificabili.",
          "**Tre messaggi, tre cause, tre azioni diverse.** File illeggibile: 'Non siamo riusciti a leggere *CUD_2024.jpg*: l'immagine è troppo sfocata. Gli altri 29 file sono a posto. Puoi ricaricarlo con una foto più nitida, oppure inserire i dati a mano — ci vogliono 2 minuti.' Formato non supportato: 'Il file *modello.pages* non è tra i formati che leggiamo (PDF, JPG, PNG, HEIC). Se ce l'hai in PDF, caricalo pure: gli altri file sono già stati elaborati.' Connessione caduta a metà: 'Connessione persa. I 12 file già caricati sono al sicuro sul nostro server e l'elaborazione continua. Riprendiamo appena torni online.' Il denominatore comune è che ogni messaggio dice cosa non è andato perso — è la prima domanda dell'utente, ed è l'unica a cui l'errore attuale non risponde.",
          "**Non è mai un alert.** Un file fallito è uno stato nella riga di quel file, non un'interruzione modale del flusso. Un alert globale su un fallimento parziale è il modo più efficace per far credere all'utente di aver perso tutto.",
          "**Fine del flusso: il vero problema non è l'errore.** Il 30% dei dati estratti va corretto a mano, quindi la verifica non è un passaggio accessorio ma il cuore del prodotto. Ordinare i campi per confidenza dell'OCR — prima quelli incerti, evidenziati, con l'immagine originale affiancata — trasforma una revisione di 30 documenti in una revisione di 15 campi dubbi. È l'intervento con più impatto di tutta questa risposta, e non riguarda gli errori.",
          "**Picco di marzo.** Con carico 20 volte superiore i tempi peggiorano. La coda va comunicata onestamente ('in questo periodo l'elaborazione richiede qualche minuto in più') invece di lasciar credere che il prodotto sia rotto: l'attesa spiegata è tollerata, l'attesa muta produce ticket. E la stima residua va calcolata sui tempi correnti, non su quelli di gennaio.",
        ],
      },
    ],
  },
];
