import type { Module } from "@/lib/types";

export const seniorModules: Module[] = [
  {
    id: "metriche-esperimenti",
    level: "senior",
    title: "Metriche ed esperimenti",
    tagline:
      "Chi non sceglie la metrica si fa scegliere la roadmap da chi la sceglie.",
    accent: "sky",
    minutes: 55,
    outcomes: [
      "Costruire un albero di metriche che collega il tuo lavoro al risultato di business",
      "Leggere un test A/B senza cadere nelle trappole statistiche più comuni",
      "Riconoscere quando una metrica sta per essere ottimizzata contro l'utente",
    ],
    capabilities: [
      {
        claim:
          "Puoi entrare in una riunione di roadmap con una metrica primaria, un guardrail e una soglia dichiarate, invece che con una proposta di design.",
        signal:
          "È il momento in cui smetti di ricevere requisiti e inizi a negoziare obiettivi.",
      },
      {
        claim:
          "Puoi contestare un risultato di test A/B su basi tecniche corrette — potenza, durata, peeking, effetto novità — senza fare la figura di chi rema contro.",
        signal:
          "Metà dei test rilasciati nelle aziende non regge un esame metodologico. Saperlo dire è un valore raro.",
      },
      {
        claim:
          "Puoi prevedere come una metrica verrà aggirata prima che accada, e progettare il guardrail che lo impedisce.",
        signal:
          "La legge di Goodhart non è un aforisma da conferenze: è la descrizione di cosa succede al tuo prodotto tra sei mesi.",
      },
    ],
    gapCost:
      "Senza questo, il tuo lavoro viene valutato con metriche scelte da altri, spesso di superficie. Ottimizzi il click e perdi la ritenzione, e non hai gli strumenti per accorgertene o per spiegarlo.",
    lessons: [
      {
        id: "albero-metriche",
        title: "Dall'obiettivo di business al segnale che puoi muovere",
        body: [
          "Il problema con 'aumentare il fatturato' è che nessuna decisione di design lo muove direttamente. Il problema con 'aumentare i click sul pulsante' è che muoverlo non significa niente. L'albero delle metriche collega i due estremi.",
          "Struttura: metrica di business (ricavo ricorrente, margine) ← metriche di prodotto (attivazione, ritenzione, frequenza d'uso) ← metriche di comportamento (completamento di un compito, tempo per il primo valore) ← segnali di interfaccia (tasso di errore su un form, abbandono di un passo).",
          "Il tuo lavoro muove i segnali di interfaccia. La domanda che devi saper reggere è: perché credi che muovendo questo si muova quello sopra? Se non hai una risposta, stai ottimizzando alla cieca.",
          "Il framework HEART (Happiness, Engagement, Adoption, Retention, Task success) è utile per non dimenticare dimensioni intere, ma vale poco se non lo accoppi al metodo goals-signals-metrics: per ogni dimensione, qual è l'obiettivo, quale comportamento osservabile lo segnala, come lo misuro.",
          "Attenzione all'engagement come obiettivo. Più tempo speso è un buon segnale per un social, pessimo per uno strumento di produttività. La metrica giusta per un prodotto che fa risparmiare tempo è il tempo che l'utente non passa dentro.",
        ],
        source: "Google HEART framework — Rodden, Hutchinson, Fu",
      },
      {
        id: "leggere-test",
        title: "Leggere un test A/B senza farsi ingannare",
        body: [
          "— Potenza e dimensione dell'effetto: prima di partire devi sapere quale effetto minimo ti interessa rilevare. Un test dimensionato per rilevare +10% non dirà nulla di utile su un effetto reale del +2%: il risultato non significativo non è prova di assenza di effetto.",
          "— Peeking: guardare i risultati ogni giorno e fermarsi quando p < 0,05 gonfia il tasso reale di falsi positivi ben oltre il 5% nominale. Servono durata fissata in anticipo o metodi sequenziali progettati per lo sguardo continuo.",
          "— Confronti multipli: se testi 20 varianti a p < 0,05, in media una risulterà 'vincente' per puro caso. Servono correzioni (Bonferroni, Benjamini-Hochberg) o un'ipotesi primaria dichiarata prima.",
          "— Effetto novità e effetto primacy: un cambiamento visibile produce un picco iniziale che rientra, o un calo iniziale che risale. Un test di 3 giorni su un cambio di navigazione misura la sorpresa, non il valore. Regola: almeno due settimane, e guardare la coorte dei nuovi utenti separatamente da quella degli esistenti.",
          "— Significatività statistica non è rilevanza pratica: con un milione di utenti, un +0,1% è significativo e irrilevante. La domanda è sempre: quanto è grande l'effetto, e vale il costo di mantenerlo?",
          "— Il test non risponde al perché. Un A/B ti dice quale variante vince, mai per quale ragione. Senza il qualitativo affiancato, non puoi generalizzare l'apprendimento al prossimo problema.",
        ],
        source: "Trustworthy Online Controlled Experiments — Kohavi, Tang, Xu",
      },
      {
        id: "goodhart",
        title: "Quando la metrica diventa il bersaglio",
        body: [
          "La legge di Goodhart: quando una misura diventa un obiettivo, cessa di essere una buona misura. Nei prodotti digitali si manifesta in modo prevedibile e osservabile.",
          "Esempi concreti: ottimizzare il tasso di apertura delle notifiche produce titoli ingannevoli; ottimizzare il tempo in app produce infinite scroll e interruzioni; ottimizzare la riduzione dei ticket di supporto produce assistenza nascosta; ottimizzare la velocità di completamento di un modulo produce campi rimossi che servivano.",
          "La difesa strutturale è la coppia metrica primaria + guardrail. Il guardrail è una metrica che non deve peggiorare, e che rappresenta l'interesse dell'utente o la salute a lungo termine: se ottimizzi il completamento dell'onboarding, il guardrail è la ritenzione a 30 giorni della coorte.",
          "La seconda difesa è temporale: molte metriche di superficie migliorano subito e si pagano dopo. La domanda da porre a ogni proposta è 'e tra sei mesi?'. Se non sai rispondere, il guardrail va a sei mesi.",
          "La terza è controintuitiva: dichiarare in anticipo cosa ti farebbe considerare fallito un esperimento. Chi non lo fa trova sempre, a posteriori, una metrica che è migliorata.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "metriche-quiz",
        title: "Leggere i numeri",
        description: "Cinque situazioni in cui il numero dice meno di quanto sembra.",
        minutes: 7,
        questions: [
          {
            id: "q1",
            prompt:
              "Il team ha rimosso due campi dalla registrazione: iscrizioni completate +18%. Il PM vuole rimuoverne altri due. Cosa dici?",
            options: [
              {
                id: "a",
                label: "Procediamo: il dato è netto e la direzione è confermata",
              },
              {
                id: "b",
                label: "Prima il guardrail a valle: ritenzione e attivazione della coorte",
              },
              {
                id: "c",
                label: "Serve un test più lungo per consolidare quel diciotto per cento",
              },
              {
                id: "d",
                label: "Rimuoviamone uno solo, per limitare il rischio a metà",
              },
            ],
            correctId: "b",
            explanation:
              "Ridurre l'attrito in ingresso aumenta quasi sempre il volume e quasi sempre abbassa la qualità della coorte: si toglie il campo 'dimensione azienda', le iscrizioni salgono, e tre mesi dopo la conversione a pagamento crolla. La (c) è il distrattore metodologicamente educato: allunga un test sulla metrica sbagliata, quindi produce più certezza su una domanda che non conta. La (d) dimezza il passo e non aggiunge conoscenza. Il numero da guardare non è quanti entrano, ma quanti restano e valgono.",
          },
          {
            id: "q2",
            prompt:
              "Un test su 20 varianti di una schermata trova una vincente con p = 0,03. Quanto ti fidi?",
            options: [
              {
                id: "a",
                label: "Molto: il valore è sotto la soglia convenzionale dello 0,05",
              },
              {
                id: "b",
                label: "Poco: con venti confronti un falso positivo è più probabile che no",
              },
              {
                id: "c",
                label: "Abbastanza, se il campione per variante è sufficientemente ampio",
              },
              {
                id: "d",
                label: "Dipende dalla dimensione dell'effetto, non dal valore di p",
              },
            ],
            correctId: "b",
            explanation:
              "Con venti test indipendenti a soglia 0,05 la probabilità di almeno un falso positivo è 1 − 0,95²⁰, circa il 64%: trovarne uno è più probabile che non trovarlo. La (c) è il distrattore più insidioso perché la potenza per variante è un requisito reale, e non c'entra niente con questo problema: il campione grande rende preciso ogni singolo test e non corregge la molteplicità. La (d) sposta su un tema vero e diverso. La difesa è la correzione per confronti multipli, o la replica indipendente della sola vincente.",
          },
          {
            id: "q3",
            prompt:
              "Il nuovo design della home ha −8% di click sul contenuto in evidenza e +15% di sessioni con almeno due azioni completate. Come lo presenti?",
            options: [
              {
                id: "a",
                label: "Come esito misto, che richiede altre analisi prima di decidere",
              },
              {
                id: "b",
                label: "Positivo se la gerarchia delle metriche era dichiarata prima",
              },
              {
                id: "c",
                label: "Positivo: il completamento di azioni vale più del semplice click",
              },
              {
                id: "d",
                label: "Negativo: un calo dell'otto per cento va spiegato comunque",
              },
            ],
            correctId: "b",
            explanation:
              "Nel merito la (c) ha ragione, e per questo è il distrattore che seleziona: il completamento di azioni è quasi certamente la metrica migliore. Ma se la gerarchia non era dichiarata prima del test, scegliere dopo quella che ha vinto è HARKing — costruire l'ipotesi conoscendo il risultato — e anche quando la conclusione è giusta erode la credibilità di tutti i tuoi risultati futuri. La differenza fra la (b) e la (c) non è la conclusione: è se hai il diritto di trarla.",
          },
          {
            id: "q4",
            prompt:
              "Il capo chiede: 'quanto vale in euro il redesign che proponi?'. Non hai dati diretti. Qual è la risposta più solida?",
            options: [
              {
                id: "a",
                label: "Che il valore del design non è riducibile a una cifra in euro",
              },
              {
                id: "b",
                label: "Una stima con le assunzioni esplicite, più il test che le verifica",
              },
              {
                id: "c",
                label: "Un confronto con casi di settore su redesign comparabili",
              },
              {
                id: "d",
                label: "Rinvii la stima a dopo la ricerca, quando avrai i numeri veri",
              },
            ],
            correctId: "b",
            explanation:
              "Una stima con assunzioni esplicite non è una previsione: è un modello che chiunque può contestare pezzo per pezzo, ed è questo a renderla utile — sposta il disaccordo da 'ci credo o no' a 'quale assunzione contesti'. La (a) è la risposta che esclude il design dalle stanze dove si allocano risorse. La (c) è debole perché ogni prodotto è diverso e chi decide lo sa. La (d) sembra rigorosa e in pratica cede il turno: la decisione di budget si prende adesso, non dopo.",
          },
          {
            id: "q5",
            prompt:
              "Il team propone di ottimizzare il 'tempo medio in app' per una suite di produttività. Cosa segnali?",
            options: [
              {
                id: "a",
                label: "Niente: più tempo speso segnala più valore percepito dal cliente",
              },
              {
                id: "b",
                label: "Per uno strumento il tempo è un costo: conta l'esito per tempo",
              },
              {
                id: "c",
                label: "Che va segmentato per tipo di utente prima di fissare l'obiettivo",
              },
              {
                id: "d",
                label: "Che va accoppiato a un indice di soddisfazione tipo NPS",
              },
            ],
            correctId: "b",
            explanation:
              "È l'errore di importare una metrica da un modello di business diverso: per un prodotto pubblicitario il tempo è il ricavo, per uno strumento a abbonamento che promette efficienza è ciò da cui l'utente vuole essere liberato. La (c) e la (d) sono entrambe buone pratiche applicate alla metrica sbagliata: segmentare o affiancare un indice di soddisfazione non cambia il fatto che l'obiettivo punta nella direzione opposta al valore. Ottimizzare il tempo in app su una suite di produttività porta, per gradi e senza cattive intenzioni, a rendere le cose più lente.",
          }
        ],
      },
      {
        type: "scenario",
        id: "metriche-scenario-guardrail",
        title: "Scenario: il numero che sale mentre il prodotto peggiora",
        description: "Tre decisioni su una metrica che sta portando fuori strada.",
        minutes: 9,
        setup:
          "Sei senior product designer su un'app di apprendimento linguistico. Sei mesi fa il team crescita ha adottato come metrica nord 'sessioni giornaliere per utente attivo'. Da allora sono state introdotte: notifiche più frequenti, una serie di 'streak' con perdita a mezzanotte, e lezioni spezzate in unità più brevi. La metrica è passata da 1,8 a 3,1 sessioni. Nello stesso periodo: la ritenzione a 90 giorni è scesa dal 31% al 24%, le disinstallazioni dopo la rottura di uno streak sono aumentate, e le recensioni negative citano 'ansia' e 'pressione'. Il team crescita presenta i risultati come un successo. La riunione trimestrale è tra una settimana.",
        steps: [
          {
            id: "s1",
            situation:
              "Devi decidere come intervenire. Il team crescita ha raggiunto formalmente l'obiettivo che gli era stato dato.",
            question: "Qual è la tua prima mossa?",
            options: [
              {
                id: "a",
                label:
                  "Presenti i dati di ritenzione e le recensioni per mostrare il danno",
                score: 1,
                outcome:
                  "Hai ragione sui fatti e hai attaccato pubblicamente un team che ha fatto il lavoro che gli era stato assegnato. La riunione diventa una difesa reciproca, e la conclusione più probabile è 'servono più dati'. Il vero responsabile — l'obiettivo mal formulato — resta invisibile.",
              },
              {
                id: "b",
                label:
                  "Parli prima col lead crescita: l'obiettivo è mal formulato, non è colpa loro",
                score: 3,
                outcome:
                  "Il lead conosceva già in parte il segnale sulla ritenzione ma non aveva mandato per agirci. Diventa un alleato: siete due team che chiedono insieme un obiettivo migliore, invece di due team in conflitto. È una posizione molto più difficile da respingere.",
              },
              {
                id: "c",
                label:
                  "Proponi di rimuovere gli streak, che sono la causa più evidente del danno",
                score: 1,
                outcome:
                  "Attacchi la soluzione più visibile senza toccare il sistema di incentivi che l'ha prodotta. Anche se ottenessi la rimozione — improbabile, visti i numeri — il prossimo trimestre produrrebbe un meccanismo equivalente.",
              },
              {
                id: "d",
                label:
                  "Avvii uno studio qualitativo sugli utenti che hanno disinstallato l'app",
                score: 2,
                outcome:
                  "Ottima ricerca, tempi sbagliati: richiede settimane e la riunione è tra sette giorni. Ottimo come secondo passo per consolidare, debole come prima mossa in una finestra decisionale che si sta chiudendo.",
              },
            ],
            debrief:
              "Quando una metrica produce comportamenti dannosi, la colpa è quasi sempre di chi l'ha scelta, non di chi l'ha inseguita. Attaccare l'esecutore è l'errore politico più comune e più costoso: crea un nemico che avrebbe potuto essere il tuo miglior alleato, perché è la persona che ha più dati e più credibilità sul tema.",
          },
          {
            id: "s2",
            situation:
              "Insieme al lead crescita dovete proporre alla direzione un obiettivo alternativo.",
            question: "Cosa proponete?",
            options: [
              {
                id: "a",
                label: "Sostituire la metrica nord con la ritenzione a novanta giorni",
                score: 2,
                outcome:
                  "Direzionalmente corretto ma operativamente debole: la ritenzione a 90 giorni ha un ciclo di feedback di tre mesi, e nessun team può guidare il lavoro settimanale con un segnale così lento. Rischia di essere accettata e poi silenziosamente ignorata.",
              },
              {
                id: "b",
                label:
                  "Tieni le sessioni come metrica operativa, con guardrail sulla ritenzione",
                score: 3,
                outcome:
                  "Il team crescita conserva un segnale veloce su cui iterare, e il guardrail impedisce che il segnale veloce venga comprato a scapito di quello lento. La direzione accetta perché non le state chiedendo di rinunciare a nulla, solo di aggiungere un limite. Due mesi dopo il guardrail blocca una proposta di notifiche notturne: il meccanismo funziona.",
              },
              {
                id: "c",
                label:
                  "Proporre una metrica composita che pesa sessioni, ritenzione e soddisfazione",
                score: 1,
                outcome:
                  "Le metriche composite sembrano equilibrate e sono ingovernabili: nessuno sa quale leva muove il numero, e quando scende nessuno sa cosa fare. Il team perde il segnale operativo senza guadagnare protezione reale.",
              },
              {
                id: "d",
                label:
                  "Proporre 'lezioni completate a settimana' come nuova metrica nord",
                score: 3,
                outcome:
                  "Metrica eccellente: è un'unità di valore reale per l'utente, ha un ciclo di feedback rapido, ed è molto più difficile da gonfiare artificialmente rispetto alle sessioni. Se accompagnata dallo stesso guardrail sulla ritenzione, è la soluzione più solida di tutte.",
              },
            ],
            debrief:
              "Una buona metrica operativa ha tre proprietà: si muove in fretta (ciclo di feedback breve), rappresenta valore reale per l'utente (difficile da gonfiare senza produrre valore), ed è accoppiata a un guardrail lento che ne impedisce l'abuso. Sostituire una metrica veloce con una lenta senza sostituto operativo è un errore comune: il team resta senza volante.",
          },
          {
            id: "s3",
            situation:
              "La proposta è accettata. La direzione chiede: 'cosa facciamo con gli streak? Rimuoverli farà scendere le sessioni.'",
            question: "Cosa rispondi?",
            options: [
              {
                id: "a",
                label:
                  "Non rimuoverli: togli la perdita a mezzanotte e aggiungi i recuperi",
                score: 3,
                outcome:
                  "Il meccanismo funziona — l'abitudine è reale e utile — ed è la punizione a produrre il danno. Dopo la modifica: le sessioni scendono del 6%, la ritenzione a 90 giorni risale al 29% in quattro mesi, e le recensioni che citano ansia si dimezzano. Il costo è piccolo e circoscritto, il beneficio è strutturale.",
              },
              { id: "b", label: "Rimuoverli del tutto: sono la causa evidente del danno misurato", score: 1, outcome: "Butti via un meccanismo di formazione dell'abitudine che, senza la componente punitiva, ha evidenza solida a supporto. Le sessioni crollano, il team crescita perde fiducia nel nuovo modello di obiettivi, e il prossimo cambiamento sarà molto più difficile da ottenere." },
              {
                id: "c",
                label: "Mantenerli come sono e compensare il danno da un'altra parte",
                score: 0,
                outcome:
                  "Hai ottenuto un guardrail e non lo usi sul caso più evidente. Il messaggio implicito al team è che il guardrail è ornamentale, e da quel momento lo sarà davvero.",
              },
              {
                id: "d",
                label:
                  "Renderli opzionali, con attivazione volontaria da parte dell'utente",
                score: 2,
                outcome:
                  "Rispettoso e difendibile, ma l'adesione volontaria a un meccanismo motivazionale è bassissima: nella pratica equivale quasi a rimuoverlo, con in più il costo di mantenere due percorsi.",
              },
            ],
            debrief:
              "Quasi mai un meccanismo è dannoso in blocco. Gli streak funzionano perché rendono visibile la costanza; danneggiano perché puniscono l'interruzione con la perdita totale. Separare la componente che produce valore da quella che produce danno è quasi sempre possibile, e quasi sempre più efficace che togliere o lasciare.",
          },
        ],
      },
      {
        type: "brief",
        id: "metriche-brief-piano",
        title: "Brief a tempo: definire il successo prima di progettare",
        description: "20 minuti. Nessun mockup: solo il modello di misurazione.",
        minutes: 20,
        brief:
          "Un'azienda di software gestionale per ristoranti vuole ridurre il tempo di apprendimento del prodotto. Oggi un nuovo ristorante impiega in media 3 settimane prima di usare il sistema autonomamente, e in quel periodo genera in media 7 ticket di supporto. Il 18% dei clienti abbandona entro i primi 60 giorni, e le interviste di uscita citano quasi sempre la difficoltà iniziale. La direzione ha approvato un progetto di ridisegno dell'onboarding e ti chiede di definire come misureremo se ha funzionato — prima di iniziare a progettare.",
        constraints: [
          "I dati di prodotto esistono, quelli di supporto sono in un sistema separato",
          "Il ciclo di vendita è lungo: i risultati sull'abbandono a 60 giorni arrivano tardi",
          "La stagionalità della ristorazione è forte (estate e dicembre molto diverse)",
        ],
        deliverables: [
          "La metrica primaria, con definizione operativa precisa",
          "Due o tre metriche secondarie e almeno due guardrail",
          "Come gestisci il ritardo tra intervento e risultato",
          "Il disegno sperimentale che proponi, con durata e requisiti",
          "Cosa dichiari in anticipo che ti farebbe considerare fallito il progetto",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Definizione operativa della metrica primaria",
            description:
              "La metrica è definita in modo che due persone diverse la calcolino uguale?",
            excellent:
              "Due punti se definisci esattamente cosa conta come 'uso autonomo' con eventi osservabili e una finestra temporale. Un punto se resti su un concetto generico come 'tempo di apprendimento'.",
          },
          {
            id: "r2",
            criterion: "Guardrail sensati",
            description:
              "Hai previsto i modi in cui la metrica primaria può migliorare mentre il prodotto peggiora?",
            excellent:
              "Due punti se i guardrail coprono almeno la qualità della configurazione iniziale e un effetto a valle (errori operativi, abbandono). Un punto se citi guardrail generici.",
          },
          {
            id: "r3",
            criterion: "Gestione del ritardo del segnale",
            description:
              "Hai una metrica intermedia che si muove presto e che è predittiva di quella lenta?",
            excellent:
              "Due punti se proponi un indicatore anticipatore e dichiari come ne verificherai la correlazione con l'esito lento. Un punto se riconosci il problema senza risolverlo.",
          },
          {
            id: "r4",
            criterion: "Disegno sperimentale realistico",
            description:
              "Il disegno tiene conto di volumi bassi, stagionalità e unità di randomizzazione?",
            excellent:
              "Due punti se randomizzi per account (non per utente), affronti la potenza statistica con volumi bassi, e neutralizzi la stagionalità. Un punto se proponi un A/B generico.",
          },
          {
            id: "r5",
            criterion: "Criterio di fallimento dichiarato",
            description: "Hai scritto prima cosa considereresti un fallimento?",
            excellent:
              "Due punti se dichiari soglie numeriche di successo e di fallimento e cosa faresti in ciascun caso. Un punto se dichiari solo l'obiettivo positivo.",
          },
        ],
        expertAnswer: [
          "**Metrica primaria: tempo al primo servizio completo autonomo.** Definizione operativa precisa, perché 'usare autonomamente' non è misurabile: giorni tra l'attivazione dell'account e il primo servizio (turno di apertura-chiusura) in cui il ristorante registra almeno 20 ordini, chiude la cassa e non apre ticket di supporto nelle 24 ore successive. Ogni pezzo di questa definizione serve: il volume esclude i test, la chiusura cassa dimostra il ciclo completo, l'assenza di ticket è ciò che distingue 'ce l'ha fatta' da 'ce l'ha fatta con qualcuno al telefono'.",
          "**Perché non 'numero di ticket'.** È la metrica che tutti scelgono ed è pericolosa: si riduce nascondendo l'assistenza, e un cliente che non chiede aiuto perché ha rinunciato conta come successo. Resta una metrica secondaria utile, mai primaria.",
          "**Secondarie:** ticket nei primi 30 giorni (volume e categoria — la categoria dice dove intervenire), percentuale di funzioni chiave configurate entro 7 giorni (menù, tavoli, listini, stampanti), e quota di personale del ristorante che ha effettuato almeno un accesso — perché nella ristorazione l'adozione fallisce quasi sempre a livello di staff, non di titolare.",
          "**Guardrail, e sono quelli che contano.** Primo: qualità della configurazione a 30 giorni (percentuale di menù completi, prezzi corretti, reparti configurati). Un onboarding che accorcia i tempi facendo saltare passaggi produce ristoranti operativi con dati sbagliati, e il costo si manifesta un mese dopo come errori in cassa. Secondo: abbandono a 60 e a 180 giorni, per intercettare il caso in cui abbiamo accelerato l'ingresso di clienti che poi non restano. Terzo, meno ovvio: tempo medio di risoluzione dei ticket che comunque arrivano — se l'onboarding rimuove le domande facili, la media sale per composizione, e va saputo prima di leggerlo come peggioramento.",
          "**Il problema del ritardo.** L'abbandono a 60 giorni è il risultato che conta e arriva troppo tardi per guidare le iterazioni. La soluzione è un indicatore anticipatore validato: analizzo i dati storici per trovare quale comportamento nei primi 14 giorni predice meglio la sopravvivenza a 60. Nella maggior parte dei prodotti simili è una soglia di completezza della configurazione combinata con il numero di utenti attivi distinti. Una volta identificata e verificata la correlazione sullo storico, quella soglia diventa la metrica operativa settimanale, con il controllo a 60 giorni come verifica trimestrale che la relazione regga ancora.",
          "**Disegno sperimentale.** Randomizzazione per account, non per utente: gli utenti di uno stesso ristorante si parlano e si aiutano, e randomizzarli separatamente contamina i gruppi. Con volumi di nuovi clienti bassi — probabilmente decine al mese — un A/B classico non raggiungerà la potenza necessaria in tempi utili: propongo un disegno a introduzione scaglionata (stepped-wedge) su coorti settimanali, che usa ogni coorte come controllo di sé stessa nel tempo e neutralizza la stagionalità meglio di un confronto tra periodi diversi. Durata minima 12 settimane, con analisi per coorte di ingresso. Se il volume lo permettesse, un A/B su 8 settimane resterebbe preferibile per semplicità di lettura.",
          "**Stagionalità.** Un ristorante che apre a giugno ha un percorso di apprendimento diverso da uno che apre a gennaio. Ogni confronto va fatto tra coorti dello stesso periodo o con l'aggiustamento esplicito per mese di ingresso. È il tipo di errore che produce risultati spettacolari e falsi.",
          "**Criteri dichiarati prima.** Successo: mediana del tempo al primo servizio autonomo sotto i 10 giorni (da ~21), senza peggioramento dei guardrail oltre il 5%. Fallimento: nessun miglioramento della mediana oltre il 15%, oppure qualsiasi peggioramento della qualità di configurazione oltre il 10% — e in quest'ultimo caso si ferma anche se la metrica primaria è migliorata. Esito ambiguo (miglioramento sotto il 15%): si tiene la nuova versione e si sposta l'attenzione dai primi giorni alla formazione dello staff, che i dati secondari avranno nel frattempo indicato come il vero collo di bottiglia.",
          "**Una nota sul mestiere.** Definire tutto questo prima di progettare cambia cosa progetterò. Sapendo che il guardrail è la qualità della configurazione, non proporrò di saltare passaggi; sapendo che l'adozione dello staff è un segnale secondario, progetterò per il cameriere e non solo per il titolare. Le metriche scelte in anticipo non servono a valutare il design: servono a orientarlo.",
        ],
      },
    ],
  },
  {
    id: "strategia-prodotto",
    level: "senior",
    title: "Strategia di prodotto per designer",
    tagline:
      "Il design senior non risponde alla domanda 'come lo facciamo': risponde a 'perché questo e non altro'.",
    accent: "mint",
    minutes: 60,
    outcomes: [
      "Formulare un problema in termini di opportunità invece che di soluzione",
      "Usare JTBD e opportunity solution tree senza trasformarli in rituali vuoti",
      "Dire di no a una funzione portando un'alternativa migliore, non solo un'obiezione",
    ],
    capabilities: [
      {
        claim:
          "Puoi trasformare una richiesta di funzionalità in una discussione sull'esito desiderato, e far uscire il team con un problema meglio definito di quando è entrato.",
        signal:
          "È il comportamento più citato nelle valutazioni che promuovono un designer a senior.",
      },
      {
        claim:
          "Puoi costruire e difendere una roadmap di design che mostra perché una cosa viene prima di un'altra, con un ragionamento che regge alle domande del CFO.",
        signal:
          "Chi non sa argomentare la sequenza riceve la sequenza da qualcun altro.",
      },
      {
        claim:
          "Puoi riconoscere quando un'azienda sta risolvendo un problema che non ha, e dirlo in modo che qualcuno ascolti.",
        signal:
          "È la competenza che salva anni di lavoro e che quasi nessuno esercita perché è socialmente costosa.",
      },
    ],
    gapCost:
      "Senza questo resti un esecutore molto bravo. Vieni chiamato quando le decisioni sono già prese, e il tuo lavoro migliore viene sprecato su problemi che non contavano.",
    lessons: [
      {
        id: "jtbd",
        title: "Jobs to be Done, senza il culto",
        body: [
          "L'idea utile di JTBD è una sola: la gente non compra un prodotto, assume un prodotto per fare un progresso in una situazione. La situazione conta più delle caratteristiche demografiche.",
          "La conseguenza pratica: i tuoi concorrenti non sono chi fa un prodotto simile al tuo, ma tutto ciò che la gente usa oggi per ottenere lo stesso progresso — inclusi fogli di calcolo, WhatsApp, e il non fare nulla. Il non fare nulla è il concorrente più forte e quello che nessuno mette nelle analisi competitive.",
          "Le forze del progresso, il modello più operativo del filone: spinta della situazione attuale (cosa non funziona oggi), attrazione della nuova soluzione (cosa promette), ansia del cambiamento (cosa temo), inerzia dell'abitudine (cosa perdo). Le prime due sono le uniche su cui il marketing lavora; le seconde due sono dove il design fa la differenza — e sono anche il motivo per cui un prodotto migliore perde contro uno peggiore già installato.",
          "L'errore da evitare: trasformare JTBD in un formato di frasi ('quando... voglio... così posso...') compilato in una riunione senza aver parlato con nessuno. Il valore sta nelle interviste su decisioni d'acquisto reali e recenti, ricostruite in ordine cronologico fino al momento in cui la persona ha iniziato a cercare una soluzione.",
        ],
        source: "Competing Against Luck — Christensen / When Coffee & Kale Compete — Alan Klement",
      },
      {
        id: "opportunity-tree",
        title: "Opportunity solution tree: struttura per non perdersi",
        body: [
          "Struttura: un esito desiderato in cima (misurabile), sotto le opportunità (bisogni, difficoltà, desideri emersi dalla ricerca), sotto le soluzioni per ciascuna opportunità, sotto gli esperimenti per ciascuna soluzione.",
          "Il valore non è l'albero: è la disciplina di non passare a una soluzione senza avere l'opportunità sopra, e di non passare a un'opportunità senza avere l'esito sopra. È un vincolo di tracciabilità che rende visibile il lavoro che non serve a niente.",
          "La regola che cambia le riunioni: quando qualcuno propone una funzione, la domanda non è 'è una buona idea?' ma 'a quale opportunità risponde?'. Se l'opportunità non è nell'albero, o la ricerca l'ha mancata o la funzione risolve un problema di qualcun altro (spesso interno).",
          "Confrontare soluzioni all'interno della stessa opportunità è produttivo. Confrontare soluzioni che rispondono a opportunità diverse è un confronto tra mele e pere che si risolve per anzianità di chi parla — ed è ciò che succede nella maggior parte delle riunioni di prioritizzazione.",
          "L'albero è anche uno strumento politico: rende visibile che scegliere una soluzione significa non sceglierne altre, e sposta la discussione dal merito della singola idea al costo opportunità. È la conversazione che i team evitano ed è l'unica che conta.",
        ],
        source: "Continuous Discovery Habits — Teresa Torres",
      },
      {
        id: "dire-no",
        title: "L'arte di dire no con una proposta migliore",
        body: [
          "Un no senza alternativa è una posizione, non un contributo. Un no con un'alternativa è strategia.",
          "La struttura che funziona: riconosci l'obiettivo dietro la richiesta (quasi sempre legittimo), mostra perché la soluzione proposta lo serve male, porta l'alternativa che lo serve meglio, e dichiara come verificare chi ha ragione.",
          "Chi chiede una funzione ha quasi sempre un problema reale e una soluzione sbagliata. Attaccare la soluzione senza riconoscere il problema fa sentire l'altro non ascoltato, e chi non si sente ascoltato non cambia idea — porta la richiesta altrove.",
          "Il costo di ogni sì va reso esplicito, e non è il costo di sviluppo: è il costo permanente di manutenzione, la complessità aggiunta a ogni schermata successiva, e le cose che non faremo. 'Possiamo farlo, e significa rinunciare a X nel trimestre: va bene?' è una frase che sposta la decisione su chi ha l'autorità di prenderla, senza che tu debba dire no.",
          "Ci sono casi in cui il no è definitivo e va detto chiaramente: quando la richiesta danneggia gli utenti, quando è illegale, quando distrugge la fiducia. In quei casi ammorbidire è un errore. Distinguere questi casi da quelli negoziabili è metà della competenza.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "strategia-quiz",
        title: "Inquadrare il problema",
        description: "Cinque situazioni in cui la domanda conta più della risposta.",
        minutes: 7,
        questions: [
          {
            id: "q1",
            prompt:
              "Il maggiore cliente enterprise, il 12% del fatturato, chiede una reportistica personalizzata. Qual è l'approccio migliore?",
            options: [
              {
                id: "a",
                label: "Costruirla: un cliente da dodici per cento non si mette in coda",
              },
              {
                id: "b",
                label: "Capire quale decisione serve, e quanti altri hanno lo stesso bisogno",
              },
              {
                id: "c",
                label: "Rifiutare: il prodotto non si piega alle richieste di un cliente",
              },
              {
                id: "d",
                label: "Offrirla come servizio professionale a pagamento, fuori dal prodotto",
              },
            ],
            correctId: "b",
            explanation:
              "La richiesta di un report è quasi sempre l'ombra di una decisione che qualcuno deve prendere ogni settimana, e scoprire quale porta spesso a una soluzione più semplice: un avviso, una soglia, un export che esiste già. La (d) è il distrattore più professionale del set, e salta lo stesso passaggio della (a): decide il come prima di aver capito il cosa, e ti impegna a mantenere una soluzione dedicata per anni. La domanda 'quanti altri hanno lo stesso bisogno sotto' è ciò che distingue una funzione di prodotto da una commessa.",
          },
          {
            id: "q2",
            prompt:
              "In una sessione di prioritizzazione il team confronta 'migliorare la ricerca' e 'aggiungere le notifiche push'. Qual è il problema di questo confronto?",
            options: [
              {
                id: "a",
                label: "Mancano le stime di sforzo per rendere comparabili le due voci",
              },
              {
                id: "b",
                label: "Sono soluzioni a bisogni diversi: manca l'opportunità a monte",
              },
              {
                id: "c",
                label: "Manca il dato di impatto atteso su una metrica condivisa",
              },
              {
                id: "d",
                label: "Vanno confrontate con un punteggio strutturato tipo RICE",
              },
            ],
            correctId: "b",
            explanation:
              "Il difetto è strutturale e i punteggi non lo curano. La (d) è il distrattore più forte perché RICE è uno strumento serio: applicato a soluzioni non comparabili produce numeri precisi su una domanda mal posta, con l'effetto collaterale di far sembrare oggettiva una scelta arbitraria. La (a) e la (c) aggiungono colonne alla stessa tabella sbagliata. Risalire alle opportunità permette la domanda a cui la ricerca può rispondere: quale bisogno pesa di più sull'esito che vogliamo.",
          },
          {
            id: "q3",
            prompt:
              "Stai conducendo interviste Jobs to be Done. Quale domanda produce l'informazione più utile?",
            options: [
              {
                id: "a",
                label: "'Cosa ti piacerebbe che il prodotto facesse e oggi non fa?'",
              },
              {
                id: "b",
                label: "'Il giorno in cui hai iniziato a cercare, cosa era successo?'",
              },
              {
                id: "c",
                label: "'Quali sono i problemi principali che incontri nel tuo lavoro?'",
              },
              {
                id: "d",
                label: "'Come valuti il nostro prodotto su una scala da uno a dieci?'",
              },
            ],
            correctId: "b",
            explanation:
              "L'evento scatenante è il cuore del metodo: la gente non cerca una soluzione perché ha un problema — coi problemi convive per anni — ma perché è successo qualcosa che l'ha reso insostenibile in quel momento. La (c) è il distrattore che sembra più ricco e produce l'elenco dei fastidi cronici, cioè esattamente quelli con cui l'utente ha imparato a convivere. La (a) chiede una soluzione a chi ha il problema. La (d) misura un sentimento e non spiega niente.",
          },
          {
            id: "q4",
            prompt:
              "Il CEO annuncia che il prodotto avrà un assistente AI 'perché tutti ce l'hanno'. Non c'è evidenza di un bisogno. Come procedi?",
            options: [
              {
                id: "a",
                label: "Esegui: è una decisione strategica che non ti compete discutere",
              },
              {
                id: "b",
                label: "Accetti la direzione e negozi a quale compito lento si applica",
              },
              {
                id: "c",
                label: "Presenti i dati d'uso che mostrano l'assenza di domanda",
              },
              {
                id: "d",
                label: "Proponi di attendere che il mercato chiarisca le aspettative",
              },
            ],
            correctId: "b",
            explanation:
              "Certe direzioni non sono negoziabili e a volte sono giuste per ragioni che non stanno nei dati d'uso: posizionamento, aspettative del mercato, raccolta di capitale. La (c) è la risposta che si sente più solida e che ti esclude dalla conversazione, perché combatte la decisione invece dell'esecuzione. La (d) chiede al CEO di rinunciare al vantaggio di muoversi prima. Il come è quasi sempre aperto, e ancorare l'assistente a un compito reale, lento e frequente è ciò che separa una funzione dimostrativa da una che la gente usa.",
          },
          {
            id: "q5",
            prompt:
              "Devi convincere il team a non costruire una funzione richiesta da molti utenti. Qual è l'argomento più forte?",
            options: [
              {
                id: "a",
                label: "Che gli utenti conoscono i problemi ma non le soluzioni giuste",
              },
              {
                id: "b",
                label: "Un'alternativa che serve lo stesso bisogno, più il costo del sì",
              },
              {
                id: "c",
                label: "Che la funzione non rientra nella visione di prodotto dichiarata",
              },
              {
                id: "d",
                label: "Che i concorrenti che l'hanno fatta non ne hanno tratto beneficio",
              },
            ],
            correctId: "b",
            explanation:
              "La (a) è il distrattore migliore perché è quasi vera, ed è la versione educata di 'gli utenti non sanno cosa vogliono': come argomento in stanza suona condiscendente e non porta nulla di costruibile. La (c) funziona solo se la visione è condivisa e specifica, altrimenti è un no elegante. La (d) invita a un confronto che non controlli. L'argomento che regge unisce un'alternativa concreta al costo reale del sì, che non è il tempo di sviluppo ma la complessità permanente aggiunta a tutto ciò che verrà dopo.",
          }
        ],
      },
      {
        type: "scenario",
        id: "strategia-scenario-roadmap",
        title: "Scenario: la roadmap che non regge",
        description: "Tre decisioni su come cambiare una direzione già annunciata.",
        minutes: 9,
        setup:
          "Sei lead designer di un prodotto B2B per la gestione delle spese aziendali. La roadmap del prossimo semestre, già annunciata ai clienti, contiene tre progetti grandi: integrazione con 5 nuovi ERP, un modulo di analisi predittiva, e il ridisegno dell'app mobile. La tua ricerca degli ultimi due mesi mostra che l'80% dell'insoddisfazione dei clienti si concentra su un punto che non è in roadmap: la riconciliazione delle ricevute, che richiede in media 6 ore a settimana per l'amministrazione e genera il 70% dei ticket. Il VP Product ha costruito la roadmap sulle richieste del team vendite.",
        steps: [
          {
            id: "s1",
            situation:
              "Hai i dati. La roadmap è già stata comunicata ai clienti.",
            question: "Come apri la conversazione con il VP Product?",
            options: [
              {
                id: "a",
                label:
                  "Presenti la ricerca e proponi di sostituire l'analisi predittiva con la riconciliazione",
                score: 1,
                outcome:
                  "Metti il VP davanti a un cambio di piano annunciato senza avergli dato modo di elaborare, e senza aver capito perché l'analisi predittiva era lì. Scoprirai dopo che era stata promessa a due clienti in fase di rinnovo. La proposta viene respinta e la ricerca perde credibilità.",
              },
              {
                id: "b",
                label:
                  "Chiedi prima come è nata la roadmap e quali impegni esistono su ciascuna voce",
                score: 3,
                outcome:
                  "Scopri che l'integrazione ERP ha un contratto firmato, l'analisi predittiva è una promessa verbale a due clienti in rinnovo, e il ridisegno mobile non ha impegni esterni: era in lista perché 'l'app fa pena'. Solo ora sai dove c'è spazio, e la conversazione non è mai diventata un conflitto.",
              },
              {
                id: "c",
                label:
                  "Porti i dati direttamente al comitato di prodotto, dove ci sono anche vendite e supporto",
                score: 0,
                outcome:
                  "Scavalcare il VP con dati che contraddicono la sua roadmap è un danno relazionale che dura anni, indipendentemente dal fatto che tu abbia ragione. Anche se ottieni il cambiamento, hai speso tutto il capitale che ti serviva per il prossimo.",
              },
              {
                id: "d",
                label:
                  "Continui a raccogliere dati per rafforzare il caso, prima di parlarne",
                score: 1,
                outcome:
                  "L'evidenza è già sufficiente e il tempo lavora contro: ogni settimana il team si impegna di più sui progetti in corso e il costo del cambiamento sale. Rimandare una conversazione difficile la rende più difficile.",
              },
            ],
            debrief:
              "Prima di proporre un cambio di piano bisogna sapere cosa tiene in piedi il piano attuale. Le voci di una roadmap non hanno tutte lo stesso vincolo: alcune sono contratti, altre promesse, altre abitudini. Solo la terza categoria è realmente negoziabile, e scoprirlo chiedendo costa una conversazione — scoprirlo proponendo costa la proposta.",
          },
          {
            id: "s2",
            situation:
              "Il VP è interessato ma cauto: 'la riconciliazione è un problema noto, ma non è ciò che i clienti chiedono in fase di vendita.'",
            question: "Come rispondi a questa obiezione?",
            options: [
              {
                id: "a",
                label:
                  "Che in vendita si valutano le funzioni, al rinnovo il tempo che si perde",
                score: 3,
                outcome:
                  "L'obiezione è corretta e la tua risposta la incorpora invece di negarla. Il dato mostra che gli account con più di 5 ore settimanali di riconciliazione rinnovano al 71%, gli altri all'89%. In un'azienda ad abbonamento, il rinnovo è il numero che il VP deve difendere davanti al board.",
              },
              {
                id: "b",
                label:
                  "Che il team vendite non rappresenta la voce degli utenti reali",
                score: 0,
                outcome:
                  "Vero in parte e pessima politica: contrapponi due funzioni aziendali e ti guadagni un avversario permanente in una funzione che ha molta più influenza della tua sulle decisioni di roadmap.",
              },
              {
                id: "c",
                label:
                  "Proponi di intervistare i clienti in fase di rinnovo per confermare",
                score: 2,
                outcome:
                  "Metodologicamente valido e lento. L'evidenza per rispondere probabilmente esiste già nei dati di rinnovo e nei ticket: cercarla lì costa un pomeriggio invece di tre settimane.",
              },
              {
                id: "d",
                label:
                  "Proponi di affrontare la riconciliazione nel semestre successivo",
                score: 1,
                outcome:
                  "Il compromesso che sembra ragionevole e che rimanda il problema di sei mesi, durante i quali la roadmap successiva verrà costruita esattamente come questa. Non hai cambiato il meccanismo che ha prodotto il problema.",
              },
            ],
            debrief:
              "Ciò che i clienti chiedono prima di comprare e ciò che li fa restare sono due insiemi diversi, e le aziende che costruiscono solo sul primo hanno acquisizione sana e ritenzione malata. Portare il legame con il rinnovo traduce un problema di esperienza nella lingua in cui si prendono le decisioni di allocazione.",
          },
          {
            id: "s3",
            situation:
              "Il VP accetta di sostituire il ridisegno mobile con la riconciliazione. Chiede: 'come lo diciamo ai clienti a cui avevamo annunciato il mobile?'",
            question: "Cosa proponi?",
            options: [
              {
                id: "a",
                label:
                  "Comunicare il cambio con i dati, e cosa ci guadagnano i clienti",
                score: 3,
                outcome:
                  "I clienti reagiscono meglio del previsto: la maggior parte non ricordava l'annuncio mobile, e chi lo ricordava riconosce il problema della riconciliazione come più urgente. Comunicare un cambio di priorità con la ragione esplicita costruisce fiducia invece di consumarla.",
              },
              {
                id: "b",
                label:
                  "Non comunicarlo: raramente i clienti seguono la roadmap nel dettaglio",
                score: 0,
                outcome:
                  "Funziona finché qualcuno non chiede. Quando succede — e succede sempre con il cliente peggiore nel momento peggiore — il danno di fiducia è molto superiore al costo della comunicazione che hai evitato.",
              },
              {
                id: "c",
                label:
                  "Fare entrambi in scala ridotta, per non smentire l'annuncio dato",
                score: 1,
                outcome:
                  "Due progetti a metà consegnati male. È la risposta che evita la conversazione difficile e la paga in qualità su entrambi i fronti.",
              },
              {
                id: "d",
                label:
                  "Chiedere al team vendite di gestire la comunicazione caso per caso",
                score: 2,
                outcome:
                  "Pratico e comune, ma produce messaggi diversi a clienti diversi e scarica su vendite una decisione di prodotto che non hanno preso. Meglio di tacere, peggio di una comunicazione chiara e uniforme.",
              },
            ],
            debrief:
              "Cambiare una roadmap annunciata è normale e i clienti lo sanno. Ciò che erode la fiducia non è il cambiamento: è scoprirlo per caso. Una comunicazione che spiega la ragione, mostra che la decisione nasce dall'ascolto e collega il nuovo lavoro al beneficio già promesso, è quasi sempre accolta meglio di quanto il team teme.",
          },
        ],
      },
      {
        type: "brief",
        id: "strategia-brief-riformulazione",
        title: "Brief a tempo: riformulare una richiesta",
        description: "20 minuti. Ti arriva una soluzione. Restituisci un problema.",
        minutes: 20,
        brief:
          "Sei il senior designer di una piattaforma di e-learning aziendale (le aziende comprano corsi per i dipendenti). Il capo del customer success ti scrive: «I clienti chiedono una dashboard per l'HR con più grafici. Vogliono vedere chi ha completato cosa, con filtri per reparto, e poter esportare tutto in Excel. Tre clienti grossi l'hanno chiesta questo mese. Possiamo averla per il prossimo trimestre?» Sai, da dati tuoi, che: la dashboard attuale ha un utilizzo settimanale del 9% tra i responsabili HR; l'export in Excel esistente viene usato dal 34% ed è la funzione più usata dell'area amministrativa; il tasso di completamento dei corsi assegnati è del 41% ed è la lamentela numero uno nelle chiamate di rinnovo.",
        constraints: [
          "Non puoi fare nuova ricerca prima di rispondere: hai due giorni",
          "I tre clienti citati valgono insieme il 15% del fatturato",
          "Il capo del customer success è un alleato importante, non un ostacolo",
        ],
        deliverables: [
          "La tua ipotesi su quale problema reale c'è dietro la richiesta",
          "Le domande esatte che poni per verificarla, e a chi",
          "Cosa proponi come alternativa, se l'ipotesi regge",
          "Come formuli la risposta al capo del customer success",
          "Cosa fai se, verificata, l'ipotesi si rivela sbagliata",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Lettura dei dati disponibili",
            description:
              "Hai notato che i dati d'uso contraddicono la richiesta e ne hai tratto un'ipotesi?",
            excellent:
              "Due punti se colleghi il 9% di uso della dashboard al fatto che più grafici probabilmente non risolvono nulla, e usi il dato sul completamento come indizio del problema vero. Un punto se citi i dati senza collegarli.",
          },
          {
            id: "r2",
            criterion: "Qualità dell'ipotesi",
            description:
              "L'ipotesi riguarda un esito che l'HR deve ottenere, non una funzionalità?",
            excellent:
              "Due punti se l'ipotesi è formulata come progresso desiderato ('l'HR deve far completare i corsi e dimostrarlo a qualcuno') e spieghi a chi risponde l'HR. Un punto se resta a livello di funzionalità.",
          },
          {
            id: "r3",
            criterion: "Domande di verifica",
            description:
              "Le domande sono sul comportamento passato e concreto, non su preferenze?",
            excellent:
              "Due punti se chiedi cosa hanno fatto l'ultima volta, cosa fanno con l'export oggi, e quale decisione prendono con quei dati. Un punto se chiedi cosa vorrebbero.",
          },
          {
            id: "r4",
            criterion: "Alternativa concreta",
            description:
              "Porti una proposta che serve lo stesso obiettivo meglio, non solo un'obiezione?",
            excellent:
              "Due punti se l'alternativa affronta il completamento (la causa) invece della visibilità (il sintomo) e mostra come serve anche l'esigenza dichiarata. Un punto se l'alternativa è vaga.",
          },
          {
            id: "r5",
            criterion: "Gestione della relazione",
            description:
              "La risposta mantiene l'alleanza e non fa sentire il collega non ascoltato?",
            excellent:
              "Due punti se riconosci esplicitamente la validità della richiesta, non chiudi la porta alla dashboard, e coinvolgi il collega nella verifica. Un punto se la risposta è corretta ma unilaterale.",
          },
        ],
        expertAnswer: [
          "**Ipotesi.** L'HR non vuole grafici: vuole che i corsi vengano completati, e deve dimostrare a qualcuno — di solito la direzione o un ente certificatore — che l'investimento in formazione ha prodotto un risultato. La richiesta di dashboard nasce dal fatto che con il 41% di completamento la conversazione interna è imbarazzante, e la reazione naturale di chi deve giustificarsi è chiedere più visibilità sul problema. Ma vedere meglio un numero basso non lo alza.",
          "**Il dato che sostiene l'ipotesi.** Il 9% di uso settimanale della dashboard attuale contro il 34% dell'export dice due cose. Primo: la dashboard non è dove l'HR lavora, quindi aggiungerci grafici produrrà un 9% con più grafici. Secondo, più interessante: se un terzo esporta in Excel, il lavoro vero avviene fuori dal nostro prodotto. Vale la pena scoprire cosa fanno in quel foglio — quasi sempre è la ricostruzione di chi va sollecitato, cioè un'attività operativa, non un'analisi.",
          "**Le domande, ai tre clienti che hanno chiesto, con il collega presente.** Una: «L'ultima volta che hai esportato i dati in Excel, cosa hai fatto con quel file?» — è la domanda che rivela il compito reale meglio di qualsiasi altra. Due: «Chi ti chiede questi numeri, quando, e cosa succede se sono bassi?» — mappa la pressione a monte, che è la vera fonte della richiesta. Tre: «Cosa hai fatto l'ultima volta che un reparto era molto indietro?» — comportamento passato concreto, non intenzione. Quattro: «Se domani il completamento fosse al 90%, ti servirebbe ancora questa dashboard?» — la domanda che verifica se la visibilità è il fine o il mezzo. Sono quattro domande, mezz'ora a cliente, si fanno in due giorni.",
          "**L'alternativa, se l'ipotesi regge.** Il problema è il completamento, e il completamento non si risolve nell'area HR: si risolve dal lato dipendente (perché i corsi assegnati restano lì) e con l'automazione del sollecito, che oggi l'HR fa a mano dopo aver esportato in Excel. Proposta in tre parti: solleciti automatici configurabili per reparto e scadenza — che elimina il lavoro manuale che genera l'export; un riepilogo periodico via email al responsabile HR con i reparti in ritardo e l'azione già pronta — che porta l'informazione dove l'HR lavora davvero, invece di aspettare che entri in una dashboard; e il miglioramento dell'export esistente (più campi, pianificabile), che è la funzione già amata e costa poco.",
          "**Come la formulo al collega.** «La richiesta ha senso e i tre clienti hanno ragione ad alzare la mano. Prima di costruirla vorrei capire una cosa che mi lascia perplesso: la dashboard attuale la usa il 9% e l'export il 34%. Il sospetto è che il lavoro vero lo facciano in Excel e che ci stiano chiedendo grafici perché il numero che devono mostrare è basso. Se è così, più grafici non li aiuta. Ti va di fare insieme quattro domande ai tre clienti questa settimana? Se ho torto, la dashboard la mettiamo in roadmap e la facciamo bene; se ho ragione, gli portiamo qualcosa che risolve il problema per cui li stanno strigliando.»",
          "**Perché funziona.** Non dice no, non rimanda, propone un'azione congiunta a costo di una settimana, e dichiara in anticipo cosa farà se l'ipotesi cade. Il collega non deve difendere la richiesta perché non è stata attaccata, e viene coinvolto nella scoperta invece che nel verdetto.",
          "**Se l'ipotesi si rivela sbagliata** — per esempio se i tre clienti hanno un obbligo di reportistica di conformità con requisiti specifici, il che è del tutto plausibile in settori regolamentati — allora la dashboard è la risposta giusta, e le domande mi avranno detto esattamente quali grafici servono e a chi vanno mostrati. Avrò speso una settimana e costruirò la cosa giusta invece di una collezione di grafici plausibili. In entrambi gli esiti la settimana è ben spesa, ed è questo che rende la proposta facile da accettare.",
          "**La cosa da non fare.** Rispondere «i dati dicono che nessuno usa la dashboard, quindi non la facciamo». È vero, è insufficiente, e insegna al customer success che portare una richiesta al design significa ricevere una lezione. La prossima richiesta prenderà un'altra strada, e sarà una strada senza di te.",
        ],
      },
    ],
  },
  {
    id: "influenza-e-critique",
    level: "senior",
    title: "Influenza, critique e stakeholder",
    tagline:
      "Il design migliore che non viene costruito vale zero. La capacità di farlo accadere è parte del mestiere.",
    accent: "blush",
    minutes: 50,
    outcomes: [
      "Facilitare una critique che produce decisioni invece di opinioni",
      "Presentare il lavoro adattando il livello alla platea senza svenderlo",
      "Gestire il feedback di chi ha più potere e meno contesto di te",
    ],
    capabilities: [
      {
        claim:
          "Puoi condurre una critique in cui le persone criticano il lavoro rispetto a un obiettivo dichiarato, invece di esprimere preferenze — e uscirne con decisioni annotate.",
        signal:
          "È la competenza che rende un team di design collettivamente più bravo dei suoi membri.",
      },
      {
        claim:
          "Puoi presentare a un dirigente in cinque minuti mostrando la decisione da prendere, non il processo che hai fatto.",
        signal:
          "Chi presenta il proprio processo a un dirigente riceve feedback sul processo.",
      },
      {
        claim:
          "Puoi trasformare un feedback vago ('non mi convince') in un requisito verificabile senza mettere in difficoltà chi te l'ha dato.",
        signal:
          "È il momento in cui smetti di subire i commenti e inizi a usarli.",
      },
    ],
    gapCost:
      "Senza questo, il tuo lavoro migliore muore nelle riunioni. Ti ritrovi a implementare la seconda idea migliore perché non hai saputo difendere la prima, e col tempo smetti di proporla.",
    lessons: [
      {
        id: "critique",
        title: "Facilitare una critique che funziona",
        body: [
          "Una critique non è un'approvazione né una raccolta di opinioni. È un esame collettivo di un lavoro rispetto a obiettivi dichiarati, e senza gli obiettivi dichiarati degenera sempre.",
          "Struttura minima: chi presenta apre con contesto, obiettivo e vincoli, e dichiara su cosa vuole feedback e su cosa no. Poi mostra. Poi il gruppo fa domande di chiarimento (solo domande, niente giudizi). Solo dopo arriva il feedback, e chi presenta ascolta senza difendersi. Alla fine, chi presenta riassume cosa ha sentito e cosa farà.",
          "Le regole che fanno la differenza: il feedback si formula come osservazione più ragionamento ('quando ho visto X mi sono aspettato Y perché Z'), non come istruzione ('metti il pulsante a destra'). Chi presenta non difende durante il feedback — difendersi chiude il flusso e insegna agli altri a tacere.",
          "Il ruolo del facilitatore è impedire due derive: la discussione di soluzioni prima che il problema sia condiviso, e il feedback da parte della persona più anziana come prima voce — che ancora tutte le successive.",
          "Cosa fare con il feedback contraddittorio: non è un problema da risolvere in riunione. Chi presenta lo annota, decide dopo, e comunica cosa ha deciso e perché. La critique dà informazioni, non decide: la decisione resta di chi ha la responsabilità del lavoro.",
        ],
        source: "Discussing Design — Connor & Irizarry",
      },
      {
        id: "presentare",
        title: "Presentare in base a chi ascolta",
        body: [
          "Lo stesso lavoro va raccontato in tre modi diversi, e usare quello sbagliato è il modo più comune di perdere una decisione già vinta sul merito.",
          "— Al team di design: processo, alternative scartate, dettagli. Qui il ragionamento è il contenuto.",
          "— Al team di prodotto e sviluppo: problema, soluzione, casi limite, impatto sul lavoro. Qui contano i vincoli e ciò che cambia per loro.",
          "— Alla direzione: la decisione da prendere, le opzioni con le conseguenze, la raccomandazione, i rischi. Il processo non interessa e mostrarlo suggerisce insicurezza. Se hai cinque minuti, il primo minuto contiene già la raccomandazione.",
          "Regola generale: apri con ciò che chi ascolta deve decidere o sapere, non con come ci sei arrivato. Il percorso è materiale di supporto per le domande, non la narrazione principale.",
          "Mostrare alternative è potente ma va dosato: presentare tre opzioni equivalenti scarica su chi ascolta una decisione che dovresti aver preso tu. Presentane una raccomandata e cita le altre come scartate, con la ragione. Se davvero servono tre opzioni aperte, dillo esplicitamente e spiega perché la scelta non è tua.",
        ],
      },
      {
        id: "feedback-potere",
        title: "Il feedback di chi ha potere",
        body: [
          "Il feedback vago da parte di chi decide è il rischio professionale numero uno del design. 'Non mi convince', 'manca qualcosa', 'facciamolo più pulito' non sono commenti su cui si può agire, e implementarli alla lettera produce lavoro peggiore.",
          "La tecnica: tradurre in una domanda che riapre il contesto, senza contraddire. 'Interessante — mi aiuti a capire cosa ti aspettavi di vedere qui?' oppure 'Quale parte ti sembra più a rischio rispetto all'obiettivo X?'. Riporta la conversazione sull'obiettivo dichiarato, che è l'unico terreno su cui il tuo lavoro può essere giudicato.",
          "Quando il feedback è una direttiva sbagliata e la persona ha l'autorità per imporla, la sequenza è: capisci il problema sottostante, proponi l'alternativa che lo risolve, e se la direttiva resta, esegui dichiarando il rischio per iscritto e proponendo come misurarlo. Eseguire una decisione con cui non concordi, dopo aver espresso il dissenso, è comportamento professionale — non è resa.",
          "Il capitale relazionale funziona come un conto: si accumula consegnando bene e si spende sui disaccordi. Chi lo spende su ogni dettaglio non ne ha quando serve. La domanda da farsi prima di ogni battaglia è: se vinco questa, cosa cambia davvero per l'utente?",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "influenza-quiz",
        title: "Situazioni di stanza",
        description: "Cinque momenti in cui la risposta giusta non è la più diretta.",
        minutes: 7,
        questions: [
          {
            id: "q1",
            prompt:
              "In una critique il design director interviene per primo con un'opinione forte. Sei il facilitatore. Cosa fai?",
            options: [
              {
                id: "a",
                label: "Lo lasci parlare: è la persona con più esperienza in stanza",
              },
              {
                id: "b",
                label: "Ringrazi, annoti a vista, e riporti la parola al gruppo",
              },
              {
                id: "c",
                label: "Interrompi ricordando al gruppo le regole della critique",
              },
              {
                id: "d",
                label: "Chiedi a chi presenta di rispondere subito nel merito",
              },
            ],
            correctId: "b",
            explanation:
              "L'ancoraggio è un effetto documentato e forte: la prima opinione autorevole restringe ciò che gli altri diranno, e le voci junior si allineano o tacciono. La (c) è tecnicamente corretta e socialmente costosa davanti al gruppo: hai ragione e hai speso capitale per averla. La (d) mette chi presenta in difesa proprio nel momento in cui dovrebbe ascoltare. La parte che fa funzionare la (b) è 'a vista': annotare visibilmente è ciò che rende accettabile il rinvio, invece di sembrare che tu stia ignorando il commento.",
          },
          {
            id: "q2",
            prompt:
              "Hai 5 minuti con il CEO per presentare la nuova onboarding. Cosa metti nel primo minuto?",
            options: [
              {
                id: "a",
                label: "Il contesto: i dati sul problema e la ricerca che hai svolto",
              },
              {
                id: "b",
                label: "La raccomandazione, l'effetto atteso e cosa ti serve da lui",
              },
              {
                id: "c",
                label: "Una dimostrazione dal vivo del prototipo navigabile",
              },
              {
                id: "d",
                label: "Le tre opzioni valutate, con i rispettivi compromessi",
              },
            ],
            correctId: "b",
            explanation:
              "Chi ha cinque minuti e trenta riunioni al giorno deve sapere subito cosa fare con l'informazione. La (a) è la struttura corretta per un pubblico che ha tempo e la peggiore per chi non ne ha: il rischio concreto è che al minuto quattro, quando arriva la richiesta, l'attenzione sia altrove. La (d) è il distrattore che sembra più rispettoso e scarica su di lui una decisione che dovresti aver preso tu. La (c) mostra come funziona a chi deve decidere se farlo. Il contesto si tiene pronto per le domande.",
          },
          {
            id: "q3",
            prompt:
              "Un dirigente dice: 'questa schermata non mi convince, sembra confusa'. Qual è la risposta migliore?",
            options: [
              {
                id: "a",
                label: "'Su cosa in particolare? Il layout oppure i contenuti?'",
              },
              {
                id: "b",
                label: "'Cosa ti aspetteresti di poter fare per primo, aprendola?'",
              },
              {
                id: "c",
                label: "'Abbiamo testato questa versione e ha funzionato bene'",
              },
              {
                id: "d",
                label: "'Posso mostrarti il ragionamento dietro questa struttura'",
              },
            ],
            correctId: "b",
            explanation:
              "La (b) riporta la persona nel compito dell'utente, che è il terreno su cui il design si valuta, e produce quasi sempre un'informazione utilizzabile che quel dirigente possiede e tu no. La (a) è meglio di niente e resta nel registro dell'opinione: ti fa scegliere fra due categorie tue. La (d) sposta la conversazione sul tuo processo, che non è ciò che lo ha lasciato perplesso. La (c) mette la sua percezione in competizione coi tuoi dati e chiude la conversazione, anche quando i dati ti danno ragione.",
          },
          {
            id: "q4",
            prompt:
              "Il VP impone una scelta che secondo te danneggerà la conversione. Hai già argomentato e perso. Cosa fai?",
            options: [
              {
                id: "a",
                label: "Esegui senza commenti: la decisione è sua e va rispettata",
              },
              {
                id: "b",
                label: "Esegui e registri il rischio con metrica e data, concordate",
              },
              {
                id: "c",
                label: "Esegui e documenti il tuo dissenso al tuo responsabile",
              },
              {
                id: "d",
                label: "Rifiuti di lavorarci, per coerenza professionale con i dati",
              },
            ],
            correctId: "b",
            explanation:
              "La differenza fra la (b) e la (c) è tutta qui: la prima registra un rischio, la seconda si costruisce un alibi. La forma conta — neutra, orientata alla verifica, e concordata con lui, non depositata altrove. Se il rischio si materializza, la conversazione successiva parte da una previsione condivisa invece che da un conflitto; se non si materializza, hai imparato qualcosa e non hai perso nulla. La (d) è appropriata per questioni etiche o legali, non per un disaccordo di merito.",
          },
          {
            id: "q5",
            prompt:
              "Un designer junior riceve in critique quindici commenti contraddittori e ne esce paralizzato. Cosa avresti dovuto fare come facilitatore?",
            options: [
              {
                id: "a",
                label: "Limitare il numero di commenti che ciascuno può portare",
              },
              {
                id: "b",
                label: "Far dichiarare il perimetro all'inizio e sintetizzare alla fine",
              },
              {
                id: "c",
                label: "Far votare il gruppo sui commenti più importanti da tenere",
              },
              {
                id: "d",
                label: "Invitare meno persone, per ridurre il volume di feedback",
              },
            ],
            correctId: "b",
            explanation:
              "La paralisi nasce da due assenze: nessun perimetro dichiarato all'inizio e nessuna sintesi alla fine. Il perimetro rende legittimo scartare ciò che è fuori tema; la sintesi trasforma quindici voci in tre temi e restituisce a chi presenta l'autorità sulla decisione. La (c) fa l'opposto ed è il distrattore più dannoso: trasforma la critique in un organo deliberante, mentre il suo compito è informare. La (a) e la (d) riducono il volume e non l'ambiguità: quindici commenti su un perimetro chiaro non paralizzano nessuno.",
          }
        ],
      },
      {
        type: "scenario",
        id: "influenza-scenario-riunione",
        title: "Scenario: la presentazione che va storta",
        description: "Tre decisioni in una riunione che sta scivolando.",
        minutes: 8,
        setup:
          "Sei senior designer. Presenti a un comitato di sette persone (CEO, CTO, VP Sales, VP Product, due PM, il tuo design director) il ridisegno del flusso di attivazione, frutto di due mesi di lavoro e tre round di test con gli utenti. Hai 20 minuti. Al minuto sei, mentre stai ancora mostrando il contesto, il VP Sales interrompe: «Scusa, ma perché abbiamo tolto il campo del codice promozionale? Le vendite lo usano per chiudere i contratti.» Non l'avete tolto: si è spostato in un passaggio successivo, e questo lo mostrerai al minuto dodici.",
        steps: [
          {
            id: "s1",
            situation:
              "Sette persone ti guardano. Hai 14 minuti rimanenti e il filo si è rotto.",
            question: "Come rispondi?",
            options: [
              {
                id: "a",
                label:
                  "«Non l'abbiamo tolto, si è spostato: te lo mostro tra poco» e riprendi da dove eri",
                score: 1,
                outcome:
                  "Tecnicamente corretto e comunicativamente debole: il VP Sales resta con la preoccupazione aperta per sei minuti e smetterà di ascoltare per prepararsi a riprendere il punto. Ha anche appena imparato che interrompere non serve.",
              },
              {
                id: "b",
                label:
                  "«Buona domanda, te la mostro subito» e salti alla schermata, poi torni",
                score: 3,
                outcome:
                  "Trenta secondi e la preoccupazione è chiusa. Hai mostrato che sei preparato, che il tema era già stato considerato, e hai guadagnato l'attenzione del VP Sales per il resto della presentazione. Il riordino della sequenza costa meno di quanto costi un ascoltatore ostile.",
              },
              {
                id: "c",
                label:
                  "«Preferirei rispondere alla fine, per non perdere il filo del discorso»",
                score: 0,
                outcome:
                  "Hai chiesto alla persona che controlla il canale di vendita di aspettare. Formalmente ragionevole, socialmente costoso: la domanda tornerà alla fine con più energia e meno benevolenza.",
              },
              {
                id: "d",
                label:
                  "Chiedi al VP Product di rispondere, dato che era coinvolto nella decisione",
                score: 1,
                outcome:
                  "Deleghi la difesa del tuo lavoro. Anche se la risposta è corretta, hai comunicato di non essere il proprietario della decisione — e la prossima domanda difficile andrà direttamente a lui.",
              },
            ],
            debrief:
              "Una domanda anticipata non è un'interruzione: è un'informazione su cosa interessa davvero alla stanza. La struttura della presentazione serve te, non loro. Riordinarla al volo per chiudere una preoccupazione appena emerge è quasi sempre la scelta migliore, e nelle presentazioni brevi è la differenza tra essere ascoltati e recitare.",
          },
          {
            id: "s2",
            situation:
              "Minuto quattordici. Il CEO dice: «In generale mi sembra tutto molto pulito, ma sento che manca energia. Non trasmette entusiasmo.»",
            question: "Come gestisci?",
            options: [
              {
                id: "a",
                label:
                  "«Cosa dovrebbe provare chi finisce questo flusso? Su quello posso lavorare»",
                score: 3,
                outcome:
                  "Trasformi un commento estetico in un requisito di esperienza discutibile. Il CEO risponde: «Dovrebbe sentire di aver fatto la scelta giusta.» Ora hai un obiettivo verificabile, e scopri che la sua preoccupazione riguardava la schermata finale — che nella tua versione è la più asciutta di tutte, e lui ha ragione.",
              },
              {
                id: "b",
                label: "«Possiamo lavorare sulle animazioni e sul colore per dare più energia»",
                score: 1,
                outcome:
                  "Hai accettato la diagnosi e proposto la cura senza sapere qual è il problema. Farai due giri di modifiche visive su un commento che, si scoprirà, riguardava tutt'altro.",
              },
              {
                id: "c",
                label:
                  "«L'obiettivo è ridurre l'abbandono, e i test danno meglio la versione asciutta»",
                score: 1,
                outcome:
                  "Difesa corretta nel merito che contrappone i tuoi dati alla sua sensazione davanti a sei persone. Anche vincendo, hai insegnato al CEO che dare feedback al design significa ricevere una controargomentazione.",
              },
              {
                id: "d",
                label: "«Prendo nota, ci lavoro e ti mostro una versione alternativa domani»",
                score: 2,
                outcome:
                  "Sicuro e neutro, ma esci dalla stanza senza aver capito cosa devi cambiare. La versione alternativa sarà un tentativo alla cieca, e ci sarà un secondo giro.",
              },
            ],
            debrief:
              "'Manca energia' non è un commento visivo travestito: è quasi sempre un'aspettativa emotiva non soddisfatta che chi la esprime non sa nominare. La domanda che chiede cosa la persona vorrebbe far provare all'utente traduce l'impressione in un obiettivo — e spesso rivela un problema reale che i test, focalizzati sul completamento, non erano attrezzati a rilevare.",
          },
          {
            id: "s3",
            situation:
              "Fine riunione. Sono emerse otto richieste diverse, alcune in conflitto tra loro. Nessuno ha preso una decisione esplicita.",
            question: "Cosa fai nell'ora successiva?",
            options: [
              {
                id: "a",
                label:
                  "Mandi un riepilogo: cosa farò, cosa no e perché, e cosa resta da decidere",
                score: 3,
                outcome:
                  "Il riepilogo diventa il documento di riferimento. Due richieste in conflitto vengono risolte via email dai diretti interessati in un giorno, e le tre non accolte non tornano più perché la ragione era scritta. Chi scrive la sintesi decide cosa è stato deciso.",
              },
              {
                id: "b",
                label:
                  "Aspetti qualche giorno per far decantare e vedere quali richieste tornano davvero",
                score: 1,
                outcome:
                  "Alcune svaniranno, altre si consolideranno come 'il CEO ha detto che...' in versioni distorte che circolano senza di te. Hai perso il controllo della narrazione nel momento in cui era più facile tenerlo.",
              },
              {
                id: "c",
                label:
                  "Fissi incontri individuali con chi ha dato i feedback più in conflitto",
                score: 2,
                outcome:
                  "Efficace ma lento e costoso, e non produce un documento condiviso. Ottimo come passo successivo per i due conflitti veri, debole come unica azione.",
              },
              {
                id: "d",
                label:
                  "Implementi tutto ciò che è compatibile e presenti una nuova versione",
                score: 0,
                outcome:
                  "Il design per accumulo di richieste è il modo più affidabile di produrre qualcosa che non piace a nessuno, incluse le persone che hanno fatto le richieste.",
              },
            ],
            debrief:
              "Il potere reale in un'organizzazione sta spesso in chi scrive la sintesi. Un riepilogo mandato entro un'ora, che distingue cosa farai da cosa non farai con la ragione, e che nomina esplicitamente le decisioni aperte con un responsabile e una data, converte una riunione dispersiva in un piano. È l'ora meglio spesa dell'intera settimana.",
          },
        ],
      },
      {
        type: "brief",
        id: "influenza-brief-critique",
        title: "Brief a tempo: rimettere in piedi le critique",
        description: "20 minuti. Un rituale rotto da riprogettare.",
        minutes: 20,
        brief:
          "Sei entrato tre mesi fa come senior designer in un team di 9 designer distribuiti su 4 team di prodotto. La critique settimanale (un'ora, tutti presenti, chiunque può portare lavoro) è considerata da tutti una perdita di tempo: la partecipazione è calata a 4-5 persone, chi presenta esce con feedback contraddittori, i designer junior non parlano mai, e il design director — presente a metà delle sessioni — tende a dare l'ultima parola su tutto, il che ha portato gli altri a considerare la critique una revisione di approvazione. Due designer hanno smesso di portare lavoro e mostrano le cose direttamente al director in privato. Il tuo manager ti chiede di sistemarla.",
        constraints: [
          "Non puoi cambiare il ruolo o il comportamento del director per via gerarchica",
          "Il team è distribuito su tre fusi orari con 2 ore di sovrapposizione",
          "Nessuno vuole più riunioni",
        ],
        deliverables: [
          "La tua diagnosi: quali sono i problemi distinti (non uno solo)",
          "Il nuovo formato che proponi, in dettaglio operativo",
          "Come affronti il problema del director senza scontro gerarchico",
          "Come fai partecipare i junior",
          "Come misuri se il cambiamento ha funzionato",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Diagnosi differenziata",
            description:
              "Hai separato i problemi distinti invece di trattarli come un unico malfunzionamento?",
            excellent:
              "Due punti se distingui almeno tre cause indipendenti (assenza di perimetro, confusione tra critique e approvazione, dinamica di potere, formato inadatto ai fusi). Un punto se identifichi una causa sola.",
          },
          {
            id: "r2",
            criterion: "Formato operativo",
            description:
              "Il nuovo formato è descritto in modo che qualcuno possa eseguirlo domani?",
            excellent:
              "Due punti se specifichi durata, ruoli, sequenza dei momenti e cosa si scrive. Un punto se descrivi principi senza procedura.",
          },
          {
            id: "r3",
            criterion: "Gestione della dinamica di potere",
            description:
              "Affronti il comportamento del director in modo praticabile senza conflitto aperto?",
            excellent:
              "Due punti se usi un cambiamento strutturale (ordine di parola, ruolo assegnato, separazione tra critique e approvazione) invece di una richiesta personale. Un punto se prevedi solo una conversazione privata.",
          },
          {
            id: "r4",
            criterion: "Partecipazione dei junior",
            description:
              "Rendi sicuro e facile intervenire per chi ha meno potere?",
            excellent:
              "Due punti se prevedi meccanismi concreti (giro di parola invertito, feedback scritto prima di quello orale, ruoli a rotazione). Un punto se auspichi genericamente più partecipazione.",
          },
          {
            id: "r5",
            criterion: "Misurazione",
            description: "Sai come capire se ha funzionato, oltre alla sensazione generale?",
            excellent:
              "Due punti se proponi indicatori osservabili (quanti portano lavoro, quanti parlano, quante decisioni annotate, revisioni private residue). Un punto se ti affidi a un sondaggio di gradimento.",
          },
        ],
        expertAnswer: [
          "**Diagnosi: quattro problemi distinti, non uno.** Primo, confusione di scopo: la critique è diventata un'approvazione, e nessuno porta volentieri lavoro incerto a un'approvazione — per questo restano solo i lavori già finiti, che sono i meno utili da criticare. Secondo, assenza di perimetro: senza dichiarare su cosa serve feedback, ogni sessione produce commenti su tutto e i contraddittori sono inevitabili. Terzo, dinamica di potere: la presenza intermittente del director con diritto di ultima parola rende razionale saltare la riunione e andare direttamente da lui — i due designer che lo fanno si comportano in modo ottimale rispetto agli incentivi che esistono. Quarto, formato inadatto: un'ora con nove persone su tre fusi produce un pubblico, non un gruppo di lavoro.",
          "**La separazione che risolve metà dei problemi.** Due rituali diversi con nomi diversi. La *critique* è per lavoro in corso, non decide nulla, il director non ha voto perché non c'è nulla da votare. La *review* è per lavoro pronto, decide, ed è dove il director esercita legittimamente la sua autorità — in un incontro separato, breve, con chi serve. Finché i due sono la stessa riunione, ogni intervento del director sarà letto come verdetto, che lui lo intenda o no.",
          "**Formato della critique: 45 minuti, due lavori, non più.** Cinque minuti a testa di contesto — obiettivo, vincoli, e la frase obbligatoria «oggi mi serve feedback su ___, non su ___». Cinque minuti di sole domande di chiarimento, con il facilitatore che blocca i giudizi mascherati da domande («non pensi che sarebbe meglio...?»). Sette minuti di feedback nella forma osservazione + ragionamento. Tre minuti in cui chi presenta riassume cosa ha sentito e cosa farà. Il facilitatore ruota ogni settimana tra tutti i nove, director incluso.",
          "**Sui fusi orari.** Con due ore di sovrapposizione, il feedback scritto asincrono prima della sessione non è un ripiego: è un miglioramento. Ognuno scrive le proprie osservazioni in un documento condiviso 24 ore prima, senza vedere quelle degli altri. Questo elimina l'ancoraggio alla radice — nessuno può essere influenzato da un'opinione che non ha ancora letto — e la sessione dal vivo serve solo a discutere i punti in tensione. È anche il meccanismo che fa parlare i junior, senza dover chiedere a nessuno di essere più coraggioso.",
          "**Il director, senza scontro.** Non chiedo un cambiamento di comportamento: cambio la struttura in cui il comportamento avviene. Tre mosse. Il feedback scritto in anticipo mette il suo commento accanto agli altri invece che sopra. La rotazione del ruolo di facilitatore lo mette, una settimana su nove, nella posizione di chi protegge il processo. E la review separata gli dà un luogo esplicito dove decidere, il che rimuove la ragione per cui decideva nella critique. Gli presento tutto questo in privato prima, come proposta da validare: è la persona con più esperienza in stanza e ha molto da guadagnare da una critique che funziona.",
          "**I due designer che vanno in privato.** Non è un comportamento da correggere, è un sintomo da leggere: hanno trovato un percorso più efficiente verso la decisione. Quando la review esisterà come momento formale, quel percorso sarà legittimo e visibile. Nel frattempo li invito a portare in critique il lavoro *prima* di quello che mostrano al director — la fase in cui il feedback vale di più e in cui non c'è nulla da approvare.",
          "**Misurazione, a otto settimane.** Numero di designer distinti che hanno portato lavoro (baseline: probabilmente 3-4, obiettivo: tutti e nove almeno una volta). Numero di persone che hanno lasciato feedback scritto per sessione — indicatore diretto della partecipazione dei junior. Numero di sessioni chiuse con la sintesi scritta di chi presentava. E l'indicatore che conta più di tutti: quanti lavori arrivano alla review senza essere mai passati da una critique. Se resta alto, la separazione non ha funzionato e ho sbagliato diagnosi.",
          "**Una nota di metodo.** Non annuncio una riforma: propongo un esperimento di sei settimane con revisione dichiarata alla fine, e lo dico apertamente. Un rituale che le persone hanno già dichiarato inutile non si rilancia con l'autorità di chi è arrivato tre mesi fa — si rilancia rendendo reversibile la scommessa, così che accettarla costi poco a tutti.",
        ],
      },
    ],
  },
];
