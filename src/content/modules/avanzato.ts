import type { Module } from "@/lib/types";

export const avanzatoModules: Module[] = [
  {
    id: "design-system",
    level: "avanzato",
    title: "Design system e token",
    tagline:
      "Un design system non è una libreria di componenti: è un accordo su come si prendono le decisioni.",
    accent: "sky",
    minutes: 55,
    outcomes: [
      "Distinguere token primitivi, semantici e di componente — e sapere quando servono",
      "Progettare l'API di un componente invece del suo aspetto",
      "Governare adozione, contributi e deprecazioni senza diventare un collo di bottiglia",
    ],
    capabilities: [
      {
        claim:
          "Puoi impostare una struttura di token che sopravvive a un rebrand e all'arrivo del tema scuro senza rifare i componenti.",
        signal:
          "È la differenza tra un design system che dura tre anni e uno che viene riscritto al primo cambio di brand.",
      },
      {
        claim:
          "Puoi progettare l'API di un componente ragionando su varianti, slot e stati, e parlare la stessa lingua degli sviluppatori nella stessa riunione.",
        signal:
          "Chi progetta API di componenti smette di consegnare pixel e inizia a consegnare vincoli.",
      },
      {
        claim:
          "Puoi decidere quando un pattern merita di entrare nel sistema e quando invece va lasciato locale — la decisione più sbagliata nei design system.",
        signal:
          "Astrarre troppo presto produce componenti con 14 proprietà booleane che nessuno usa.",
      },
    ],
    gapCost:
      "Senza questo, il design system diventa una galleria di componenti scollegata dal codice. Ogni team se ne fa una copia, il rebrand costa un anno e nessuno si fida più della libreria.",
    lessons: [
      {
        id: "token",
        title: "I tre livelli di token",
        body: [
          "I token sono decisioni di design con un nome. La struttura a tre livelli è ciò che rende un sistema modificabile invece che riscrivibile.",
          "— Primitivi (o globali): i valori grezzi. `blue-500: #2563eb`, `space-4: 16px`. Non hanno significato, sono la tavolozza. Un componente non dovrebbe mai usarli direttamente.",
          "— Semantici (o di alias): il significato nel contesto. `color-action-primary: {blue-500}`, `color-feedback-error: {red-600}`. Questo è il livello che rende possibile il tema scuro e il rebrand: cambi la mappatura, non i componenti.",
          "— Di componente: `button-primary-background: {color-action-primary}`. Utile solo quando un componente ha bisogno di deviare, o quando il sistema è grande abbastanza da giustificare l'indirezione. In un sistema piccolo è sovrastruttura.",
          "L'errore più costoso è nominare i token per aspetto invece che per ruolo. `color-blue-button` è una bomba a orologeria: il giorno in cui il pulsante primario diventa verde, il nome mente e nessuno osa cambiarlo.",
          "Regola di verifica: se puoi introdurre il tema scuro cambiando solo la mappatura dei semantici, la struttura regge. Se devi toccare i componenti, hai token nel posto sbagliato.",
        ],
        source: "Design Tokens Community Group — W3C",
      },
      {
        id: "api-componenti",
        title: "Progettare l'API, non l'aspetto",
        body: [
          "Un componente ha un'interfaccia pubblica esattamente come una funzione. Le decisioni di design sono decisioni di API.",
          "— Varianti: dimensioni chiuse e ortogonali (`variant`, `size`, `tone`). Se due proprietà non sono ortogonali — cioè esistono combinazioni senza senso — probabilmente sono un'unica proprietà con più valori.",
          "— Slot: le zone in cui chi usa il componente inserisce contenuto arbitrario. Servono a evitare l'esplosione combinatoria: invece di `hasIcon`, `iconPosition`, `iconColor`, uno slot `leading`.",
          "— Booleani: ogni booleano raddoppia i casi da testare. Tre booleani sono otto stati. Quando ne conti più di tre, quasi sempre stai nascondendo una variante.",
          "Il test dell'astrazione prematura: prima di aggiungere una proprietà al componente condiviso, conta quanti posti nel prodotto ne hanno bisogno davvero. Sotto tre, è una richiesta locale travestita da esigenza di sistema. La regola del tre è approssimativa ma salva sistemi interi.",
          "Il contrario dell'astrazione prematura non è la duplicazione infinita: è la duplicazione consapevole con una data di revisione. Duplicare due volte e astrarre alla terza è quasi sempre più economico che astrarre alla prima.",
        ],
      },
      {
        id: "governance",
        title: "Governance: il vero motivo per cui i sistemi muoiono",
        body: [
          "I design system non falliscono per problemi tecnici. Falliscono perché diventano un collo di bottiglia o perché nessuno li usa.",
          "Tre modelli di governance, con conseguenze diverse: centralizzato (un team possiede tutto — qualità alta, velocità bassa, coda infinita), federato (rappresentanti dei team prodotto contribuiscono con regole condivise — equilibrio migliore, richiede disciplina), a fioritura libera (chiunque aggiunge — velocità massima, entropia garantita).",
          "Il modello federato funziona se e solo se esistono tre cose: un percorso di contribuzione documentato con tempi dichiarati, un criterio esplicito di accettazione, e qualcuno con l'autorità di dire no.",
          "Misurare l'adozione è la parte che quasi nessuno fa: percentuale di componenti in produzione che vengono dal sistema, numero di 'detach' nei file di design, tempo medio di risposta a una richiesta di contributo. Senza questi numeri, un design system è un atto di fede finanziato da un budget che prima o poi qualcuno taglierà.",
          "Deprecare è una funzione, non un incidente. Ogni componente rimosso ha bisogno di: sostituto indicato, codemod o guida di migrazione, periodo di convivenza dichiarato, e una data di rimozione che viene rispettata. Un sistema che non sa deprecare accumula fino a diventare inservibile.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "ds-quiz",
        title: "Decisioni di sistema",
        description: "Cinque scelte che determinano se il sistema durerà.",
        minutes: 7,
        questions: [
          {
            id: "q1",
            prompt:
              "Ti chiedono il tema scuro. I componenti usano direttamente i token primitivi (gray-900, white). Qual è l'intervento corretto?",
            options: [
              {
                id: "a",
                label: "Aggiungere primitivi scuri e scegliere fra i due nei componenti",
              },
              {
                id: "b",
                label: "Introdurre lo strato semantico e rimappare i componenti su quello",
              },
              {
                id: "c",
                label: "Applicare un filtro di inversione a livello di applicazione",
              },
              {
                id: "d",
                label: "Duplicare i componenti in variante chiara e variante scura",
              },
            ],
            correctId: "b",
            explanation:
              "Il tema scuro è il test di stress che rivela se lo strato semantico esiste. La (a) è la più tentatrice perché sembra il cambiamento minimo: sparge la logica di tema in centinaia di punti e rende impossibile un terzo tema. La (c) rompe immagini, ombre e la semantica del colore. La (d) raddoppia il costo di ogni modifica futura, per sempre. La rimappatura semantica ha un costo iniziale una volta sola e rende gratuiti tutti i temi successivi: è la differenza fra pagare una volta e pagare ogni volta.",
          },
          {
            id: "q2",
            prompt:
              "Un Button ha accumulato isLoading, isDisabled, isFullWidth, hasIcon, iconOnly, isDestructive, isGhost, isSmall. Qual è la diagnosi?",
            options: [
              {
                id: "a",
                label: "È fisiologico: un pulsante ha molti casi d'uso legittimi",
              },
              {
                id: "b",
                label: "I booleani esclusivi sono varianti: vanno chiusi in enumerazioni",
              },
              {
                id: "c",
                label: "Va spezzato in Button, IconButton, LoadingButton, Destructive",
              },
              {
                id: "d",
                label: "Vanno raccolti in un solo oggetto di configurazione tipizzato",
              },
            ],
            correctId: "b",
            explanation:
              "Otto booleani sono 256 combinazioni nominali, quasi tutte prive di senso: isGhost e isDestructive insieme non significano niente. La (c) è il distrattore più forte perché i booleani spariscono davvero — ma il problema si sposta sulla scelta del componente giusto e la manutenzione si moltiplica per quattro. La (d) cambia la sintassi e non lo spazio degli stati: le combinazioni impossibili restano possibili. Riconoscere che un gruppo di booleani esclusivi è un'enumerazione è la correzione più frequente nelle API dei design system.",
          },
          {
            id: "q3",
            prompt:
              "Un team prodotto chiede di aggiungere al sistema una card con un layout che serve solo alla loro sezione. Cosa fai?",
            options: [
              {
                id: "a",
                label: "La aggiungi: le richieste dei team prodotto vanno servite",
              },
              {
                id: "b",
                label: "Resta locale, entra nei pattern emergenti, promossa al terzo caso",
              },
              {
                id: "c",
                label: "La rifiuti, perché il sistema deve restare piccolo e coerente",
              },
              {
                id: "d",
                label: "Aggiungi a Card una proprietà 'layout' con il loro caso dentro",
              },
            ],
            correctId: "b",
            explanation:
              "Un caso singolo non è un pattern, è un requisito: astrarlo ora significa progettare per un solo utente e scoprire al secondo che l'astrazione era sbagliata. La (d) è il distrattore che assomiglia più a buona ingegneria — serve la richiesta dentro il componente condiviso, ed è esattamente così che i componenti accumulano proprietà che usa un team solo. La (c) è un no che spinge il team ad aggirare il sistema. Il registro dei pattern emergenti è ciò che rende la (b) un 'non ancora' con un criterio, non un rifiuto.",
          },
          {
            id: "q4",
            prompt:
              "L'adozione del design system è ferma al 40% dopo un anno, e il team di sistema pensa che i team prodotto siano pigri. Come indaghi?",
            options: [
              {
                id: "a",
                label: "Rendi obbligatorio l'uso con un linter e la revisione del codice",
              },
              {
                id: "b",
                label: "Misuri dove il sistema viene aggirato, e perché, prima di agire",
              },
              {
                id: "c",
                label: "Fai formazione sui componenti disponibili e sulla documentazione",
              },
              {
                id: "d",
                label: "Aggiungi i componenti che mancano, prendendoli dal backlog",
              },
            ],
            correctId: "b",
            explanation:
              "La bassa adozione è un sintomo, e le due cause frequenti — copertura insufficiente e tempi di risposta lunghi — sono entrambe diagnosticabili dai dati che il sistema già produce. La (a) produce conformità di facciata, che è lo scenario peggiore: useranno il componente e lo sovrascriveranno con CSS locale, rendendo il problema invisibile. La (d) è ragionevole e parziale: il backlog riflette solo chi già partecipa, quindi non dice nulla sui cinque team silenziosi. La (c) presuppone che il problema sia la conoscenza.",
          },
          {
            id: "q5",
            prompt:
              "Devi deprecare il vecchio Modal in favore di Dialog: 60 punti d'uso in 8 team. Qual è il piano corretto?",
            options: [
              {
                id: "a",
                label: "Annunci, dai codemod e guida, marchi deprecato, fissi la data",
              },
              {
                id: "b",
                label: "Rimuovi Modal e lasci che gli otto team si adeguino al volo",
              },
              {
                id: "c",
                label: "Mantieni entrambi a tempo indeterminato per non rompere nulla",
              },
              {
                id: "d",
                label: "Rinomini Modal in Dialog conservando la stessa API pubblica",
              },
            ],
            correctId: "a",
            explanation:
              "Le due parti che vengono saltate più spesso sono il codemod e il rispetto della data. Senza automazione la migrazione compete con le priorità di prodotto di otto team e perde sempre; senza una data rispettata almeno una volta, ogni deprecazione successiva è trattabile. La (d) è il distrattore più subdolo perché sembra indolore: rinominare senza cambiare l'API lascia il vecchio comportamento sotto un nome nuovo, quindi paghi la migrazione e non incassi il beneficio. La (c) è la scelta gentile che uccide i sistemi per accumulo.",
          }
        ],
      },
      {
        type: "critique",
        id: "ds-critique-pricing",
        title: "Critique: pagina piani",
        description:
          "Guarda la coerenza sistemica: cosa in questo schermo non potrebbe esistere se ci fosse un design system sano?",
        minutes: 9,
        mockId: "pricing",
        lens: "Coerenza sistemica, token e gerarchia",
        context:
          "Pagina dei piani di un SaaS. È stata costruita da un team marketing con componenti propri, in parallelo al prodotto. Il team di design system ha chiesto una revisione prima del lancio.",
        issues: [
          {
            id: "i1",
            label:
              "I tre pulsanti di azione usano tre stili diversi senza che la differenza corrisponda a una gerarchia reale",
            isReal: true,
            severity: "alta",
            explanation:
              "Se lo stile del pulsante non mappa una gerarchia di azione (primaria/secondaria/terziaria), l'utente riceve un segnale visivo casuale. In un design system i pulsanti hanno varianti semantiche: usarne tre diverse su tre azioni equivalenti significa che qualcuno ha scelto per estetica.",
          },
          {
            id: "i2",
            label:
              "La spaziatura verticale tra le sezioni non segue la scala del sistema: ci sono valori come 22px e 37px",
            isReal: true,
            severity: "media",
            explanation:
              "Valori fuori scala sono la traccia inequivocabile di uno schermo costruito trascinando elementi. Il costo non è estetico: rende impossibile qualsiasi modifica sistemica alla densità, e ogni schermata successiva erediterà valori arbitrari diversi.",
          },
          {
            id: "i3",
            label:
              "Il piano 'Consigliato' è evidenziato con un colore che nel prodotto significa 'errore'",
            isReal: true,
            severity: "alta",
            explanation:
              "Collisione semantica sul colore. Se il rosso/arancio è il token di feedback negativo nel resto del prodotto, riusarlo per una promozione insegna all'utente che il colore non significa nulla — e distrugge la leggibilità degli errori veri. È il motivo per cui i token vanno nominati per ruolo.",
          },
          {
            id: "i4",
            label:
              "Le tre card dei piani hanno altezze diverse perché il contenuto non è allineato su una griglia comune",
            isReal: true,
            severity: "media",
            explanation:
              "In una tabella comparativa il confronto è il compito. Righe non allineate costringono a saltare avanti e indietro per confrontare la stessa caratteristica tra piani, aumentando il carico cognitivo proprio nel momento della decisione d'acquisto.",
          },
          {
            id: "i5",
            label:
              "I prezzi sono mostrati con la valuta prima del numero invece che dopo",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore. La posizione della valuta è una convenzione di localizzazione (in italiano si usa dopo, in inglese prima) e va gestita dalla formattazione locale, non è un difetto di design system. Se il prodotto è in italiano vale la pena sistemarlo, ma non è un problema di coerenza sistemica.",
          },
          {
            id: "i6",
            label:
              "La pagina usa un font diverso dal resto del prodotto per i titoli",
            isReal: true,
            severity: "media",
            explanation:
              "Una deviazione tipografica di marketing rispetto al prodotto è legittima solo se è una scelta di sistema dichiarata (esistono sistemi con una scala 'espressiva' per le pagine di acquisizione). Se non è dichiarata, è una frattura: l'utente attraversa un confine invisibile tra sito e prodotto e la fiducia ne risente nel momento peggiore.",
          },
          {
            id: "i7",
            label:
              "Le card dei piani hanno un raggio degli angoli di 12px mentre il prodotto usa 8px",
            isReal: true,
            severity: "bassa",
            explanation:
              "Preso da solo è un dettaglio trascurabile — e infatti la severità è bassa. Ma nel contesto degli altri difetti conferma il quadro: questa pagina non usa i token del sistema, li reinventa. È il tipo di segnale che vale come diagnosi, non come problema in sé.",
          },
        ],
      },
      {
        type: "scenario",
        id: "ds-scenario-adozione",
        title: "Scenario: il design system che nessuno usa",
        description: "Tre decisioni sul rilancio di un sistema in stallo.",
        minutes: 8,
        setup:
          "Sei entrato da due mesi come design system lead in un'azienda da 300 persone, 6 team di prodotto, 12 designer. Il design system esiste da 18 mesi, ha 40 componenti, ed è usato in modo pieno solo da 1 team su 6. Gli altri lo usano come riferimento visivo e reimplementano tutto. La direzione ti ha chiesto di 'aumentare l'adozione' e valuta di sciogliere il team se non succede entro sei mesi.",
        steps: [
          {
            id: "s1",
            situation:
              "Prima settimana. Devi decidere da dove partire.",
            question: "Qual è la tua prima mossa?",
            options: [
              {
                id: "a",
                label:
                  "Presenti alla direzione un piano di adozione obbligatoria con obiettivi per team",
                score: 0,
                outcome:
                  "Hai trasformato un problema di prodotto in un problema politico, e hai reso il tuo team un ente di controllo. I team prodotto ora hanno un incentivo a dichiarare adozione senza praticarla. Sei anche entrato in conflitto con sei team leader che non hai ancora conosciuto.",
              },
              {
                id: "b",
                label:
                  "Passi due settimane a intervistare i 5 team che non lo usano, e leggi il codice",
                score: 3,
                outcome:
                  "Emergono tre cause distinte, tutte risolvibili: il sistema non ha componenti per la densità di dati che serve a due team; le richieste di contributo hanno tempi di risposta medi di sei settimane; la documentazione non copre i casi di composizione. Nessuna delle tre è pigrizia. Ora hai un piano fondato invece che un'ipotesi.",
              },
              {
                id: "c",
                label:
                  "Rifai la documentazione, che è chiaramente il problema principale qui",
                score: 1,
                outcome:
                  "La documentazione migliora ma l'adozione resta ferma. Hai speso sei settimane su una causa che era reale ma marginale, e non hai più credito per un secondo tentativo.",
              },
              {
                id: "d",
                label:
                  "Costruisci i 15 componenti mancanti che i team hanno chiesto nel backlog",
                score: 1,
                outcome:
                  "Consegni molto, ma il backlog rifletteva le richieste di chi già partecipava. I cinque team silenziosi restano silenziosi, e il tuo team ora ha 55 componenti da mantenere invece di 40.",
              },
            ],
            debrief:
              "La bassa adozione è un problema di ricerca prima che di produzione. Il team di design system è un team di prodotto e i suoi utenti sono gli altri designer e sviluppatori: se non fai ricerca sui tuoi utenti, costruisci per te. È anche il motivo per cui i design system lead con background da ricercatore riescono spesso meglio di quelli con background da UI designer.",
          },
          {
            id: "s2",
            situation:
              "Le cause sono chiare. Hai risorse per affrontarne una sola in profondità nel primo trimestre.",
            question: "Quale scegli?",
            options: [
              {
                id: "a",
                label:
                  "Il tempo di risposta: modello federato, con impegno di risposta in 5 giorni",
                score: 3,
                outcome:
                  "È la causa che blocca tutte le altre: finché contribuire costa sei settimane, i team continueranno a reimplementare anche i componenti che esistono. In tre mesi arrivano 9 contributi esterni, due dei quali risolvono da soli il problema della densità di dati. Il sistema inizia a crescere senza che il tuo team lo produca.",
              },
              {
                id: "b",
                label:
                  "I componenti mancanti per la densità di dati: sono la richiesta più concreta",
                score: 2,
                outcome:
                  "Sblocchi due team, che iniziano ad adottare. Risultato reale e misurabile, ma hai risolto un caso invece di una causa: fra sei mesi mancherà qualcos'altro e il collo di bottiglia sarai di nuovo tu.",
              },
              {
                id: "c",
                label: "La documentazione dei casi di composizione dei componenti esistenti",
                score: 1,
                outcome:
                  "Migliora la qualità di chi già usa il sistema. Non muove chi è fuori, perché chi è fuori non legge la documentazione di un sistema che non usa.",
              },
              {
                id: "d",
                label: "Costruisci un plugin che misura l'adozione dei componenti in tempo reale",
                score: 1,
                outcome:
                  "Ottimo strumento di reportistica verso la direzione, zero effetto sulla causa. Ti darà numeri precisi su un fallimento.",
              },
            ],
            debrief:
              "Quando un sistema centralizzato è in stallo, il collo di bottiglia è quasi sempre il tempo di risposta, non la copertura funzionale. Un modello federato con impegni di tempo dichiarati scala perché sposta la produzione ai bordi e lascia al centro la sola cosa che non si può distribuire: il criterio di accettazione.",
          },
          {
            id: "s3",
            situation:
              "Quinto mese. L'adozione è passata dal 40% al 68%. La direzione chiede un numero da mostrare al board e vuole sapere 'quanto ci fa risparmiare il design system'.",
            question: "Come rispondi?",
            options: [
              {
                id: "a",
                label:
                  "Presenti il 68% di adozione come risultato principale del semestre",
                score: 1,
                outcome:
                  "L'adozione è una metrica di attività, non di valore. Il board chiederà — giustamente — perché dovrebbe interessargli, e non avrai una seconda occasione per rispondere meglio.",
              },
              {
                id: "b",
                label:
                  "Colleghi l'adozione al tempo di consegna, e al costo evitato sul rebrand",
                score: 3,
                outcome:
                  "Mostri che le schermate standard passano da 9 a 4 giorni e che l'aggiornamento del brand di marzo è costato 3 settimane invece dei 4 mesi stimati sul vecchio modello. Il team viene confermato e ottiene una persona in più. Il numero che convince non è quanto il sistema è usato, ma cosa cambia perché è usato.",
              },
              {
                id: "c",
                label:
                  "Spieghi che il valore di un design system non è quantificabile in modo affidabile",
                score: 0,
                outcome:
                  "Vero in senso stretto, disastroso in pratica. Tutto ciò che compete per un budget deve produrre un numero: se non lo produci tu, lo produrrà qualcun altro contro di te.",
              },
              {
                id: "d",
                label:
                  "Presenti il risparmio teorico calcolato sui componenti riusati",
                score: 1,
                outcome:
                  "È il calcolo che ogni team di design system presenta e che ogni CFO ha già visto: si basa su un contrafattuale non verificabile ('avremmo costruito tutto da zero'). Passa la prima volta, non la seconda.",
              },
            ],
            debrief:
              "Il valore va misurato sull'effetto, non sull'uso. Le due misure che reggono davvero sono il tempo di ciclo su lavoro ripetitivo (confrontabile prima/dopo) e il costo evitato su un evento reale già accaduto — un rebrand, un adeguamento di accessibilità, l'aggiunta del tema scuro. Entrambe hanno un fatto verificabile alle spalle, ed è per questo che sopravvivono a una domanda scettica.",
          },
        ],
      },
    ],
  },
  {
    id: "ricerca-utente",
    level: "avanzato",
    title: "Ricerca applicata al prodotto",
    tagline:
      "La domanda giusta con il metodo economico batte la domanda vaga con il metodo costoso.",
    accent: "mint",
    minutes: 60,
    outcomes: [
      "Scegliere il metodo in base alla domanda e al costo di sbagliare",
      "Riconoscere e neutralizzare i bias che rendono inutile una ricerca",
      "Sintetizzare dati qualitativi senza trasformarli in aneddoti",
    ],
    capabilities: [
      {
        claim:
          "Puoi impostare uno studio che risponde a una decisione specifica in una settimana, invece di un progetto di ricerca che risponde a tutto in due mesi e arriva tardi.",
        signal:
          "La ricerca senior si giudica dalla decisione che cambia, non dalla ricchezza del report.",
      },
      {
        claim:
          "Puoi condurre un'intervista senza contaminare la risposta, e riconoscere quando un partecipante ti sta dicendo quello che vuoi sentire.",
        signal:
          "È l'abilità che rende utile la ricerca qualitativa e la cui assenza la rende attivamente dannosa.",
      },
      {
        claim:
          "Puoi dire a un dirigente che i dati non supportano la sua ipotesi, in un modo che non chiuda la conversazione.",
        signal: "Portare cattive notizie bene è metà del mestiere di ricerca.",
      },
    ],
    gapCost:
      "Senza questo, la ricerca diventa teatro: si fa per confermare quello che si era già deciso. Peggio ancora, cinque interviste condotte male producono false certezze che orientano un anno di roadmap.",
    lessons: [
      {
        id: "domanda-metodo",
        title: "Dalla decisione al metodo",
        body: [
          "La ricerca inutile inizia sempre allo stesso modo: 'facciamo un po' di ricerca su questo tema'. La ricerca utile inizia da una decisione da prendere e dal costo di sbagliarla.",
          "Il percorso è: quale decisione devo prendere → cosa non so che mi impedisce di prenderla → qual è il modo più economico di saperlo → quanto costa sbagliare (che determina quanta certezza mi serve).",
          "L'asse fondamentale: comportamento vs. atteggiamento, qualitativo vs. quantitativo. Ciò che la gente fa e ciò che la gente dice sono dati diversi e spesso divergenti. Se la decisione dipende dal comportamento, chiedere non serve.",
          "— Serve capire perché qualcosa non funziona? Test di usabilità, 5-8 partecipanti. Con 5 partecipanti trovi la maggior parte dei problemi gravi ricorrenti, non 'l'85% dei problemi' — la cifra spesso citata vale solo sotto assunzioni che raramente si verificano.",
          "— Serve sapere quanti e quanto? Metodo quantitativo: analisi comportamentale, sondaggio con campione dimensionato, test A/B.",
          "— Serve capire il contesto e i bisogni non articolati? Ricerca sul campo, diari, interviste contestuali.",
          "— Serve scegliere tra due strutture? Tree test o test di preferenza con compito.",
          "La domanda che salva più tempo di tutte: 'se il risultato fosse X, cosa faremmo diversamente? E se fosse Y?'. Se le due risposte coincidono, la ricerca non serve.",
        ],
        source: "Just Enough Research — Erika Hall",
      },
      {
        id: "bias",
        title: "I bias che contano davvero",
        body: [
          "— Desiderabilità sociale: il partecipante dice ciò che lo fa apparire ragionevole. Antidoto: chiedere del passato concreto ('l'ultima volta che ti è successo, cosa hai fatto?') invece che di intenzioni future ('lo useresti?').",
          "— Effetto sperimentatore: la tua domanda contiene la risposta. 'Trovi utile questa funzione?' non è una domanda, è un suggerimento. Antidoto: domande aperte, silenzio dopo la risposta, e far parlare il partecipante per primo.",
          "— Bias di conferma nella sintesi: hai 40 citazioni e scegli le 6 che confermano l'ipotesi. È il bias più pericoloso perché avviene dopo la raccolta, quando ti senti al sicuro. Antidoto: codifica indipendente da due persone, o almeno la ricerca deliberata delle prove contrarie.",
          "— Bias di campionamento: recluti attraverso il canale che raggiunge gli utenti più affezionati e concludi che gli utenti sono affezionati. È il difetto standard dei sondaggi in-app.",
          "— Bias di sopravvivenza: intervisti chi usa il prodotto. Chi se n'è andato — cioè chi aveva il problema più grave — non è nel campione. Vale per quasi tutta la ricerca sui prodotti maturi.",
          "L'onestà metodologica non è un valore morale: è ciò che rende la ricerca utile. Uno studio che conferma sempre chi lo commissiona non ha valore informativo, e prima o poi qualcuno se ne accorge.",
        ],
      },
      {
        id: "sintesi",
        title: "Sintesi: dal rumore al pattern",
        body: [
          "La sintesi è il punto in cui la maggior parte della ricerca si rovina: si passa da 12 ore di interviste a cinque slide, e nel passaggio si perde tutto ciò che era scomodo.",
          "Metodo minimo che regge: trascrivi, estrai osservazioni atomiche (una osservazione = un fatto o una citazione, senza interpretazione), raggruppa per somiglianza in modo iterativo, e solo alla fine nomina i gruppi. Nominare prima significa decidere prima.",
          "Tieni traccia di quanti partecipanti supportano ogni tema, sempre. 'Gli utenti trovano il flusso confuso' è una frase senza informazione. '6 partecipanti su 8 si sono fermati al passo 3, e 4 hanno cercato un pulsante indietro che non esiste' è un fatto su cui si può agire.",
          "Distingui sempre tre livelli nel report: osservazione (cosa è successo), interpretazione (cosa penso significhi), raccomandazione (cosa propongo). Tenerli separati permette a chi legge di essere d'accordo con te sui fatti e in disaccordo sulla proposta — che è esattamente la conversazione produttiva da avere.",
          "Il report che nessuno legge è un fallimento della ricerca, non del lettore. Nei team veloci funziona meglio una sintesi di una pagina con le clip video incorporate e le raccomandazioni in cima, con il dettaglio come allegato per chi lo vuole.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "ricerca-quiz",
        title: "Metodo e rigore",
        description: "Cinque scelte metodologiche con conseguenze reali.",
        minutes: 7,
        questions: [
          {
            id: "q1",
            prompt:
              "Il PM chiede: 'gli utenti userebbero una funzione di condivisione del report?'. Come imposti la ricerca?",
            options: [
              {
                id: "a",
                label: "Sondaggio su cinquecento utenti, chiedendo se la userebbero",
              },
              {
                id: "b",
                label: "Guardi cosa fanno già: export, invii, soluzioni improvvisate",
              },
              {
                id: "c",
                label: "Otto interviste in profondità sull'interesse per la funzione",
              },
              {
                id: "d",
                label: "Un fake door test con un pulsante finto e i click misurati",
              },
            ],
            correctId: "b",
            explanation:
              "Le dichiarazioni di intenzione futura sono il dato meno affidabile che la ricerca produca: la gente sopravvaluta il proprio interesse per ciò che non esiste. Il comportamento attuale è verificabile e già disponibile a costo zero — chi condivide con metodi macchinosi ha dimostrato il bisogno col proprio tempo. La (d) è metodologicamente valida ed è il secondo passo giusto: costa fiducia, quindi va dopo l'evidenza gratuita. La (a) e la (c) differiscono solo per numerosità e fanno entrambe la stessa domanda ipotetica.",
          },
          {
            id: "q2",
            prompt:
              "Durante un test di usabilità il partecipante si blocca e chiede: 'dovrei cliccare qui?'. Cosa rispondi?",
            options: [
              {
                id: "a",
                label: "'Sì, è quello il percorso corretto per questo compito'",
              },
              {
                id: "b",
                label: "'Cosa ti aspetteresti che succeda?' e poi lasci il silenzio",
              },
              {
                id: "c",
                label: "'Non posso rispondere, prosegui come faresti a casa tua'",
              },
              {
                id: "d",
                label: "'Non c'è una risposta giusta, fai come ti viene naturale'",
              },
            ],
            correctId: "b",
            explanation:
              "Rigirare la domanda tiene il partecipante nel compito e trasforma uno stallo nel dato più prezioso della sessione: il modello mentale. La (c) e la (d) sono corrette nell'intenzione e sprecano l'occasione — e la (c) in particolare suona come un rifiuto, aumentando il disagio di chi è già bloccato. La (a) contamina tutto ciò che segue e rende inutilizzabile il resto della sessione. Il dettaglio operativo che quasi nessuno applica è la seconda metà della (b): il silenzio dopo la domanda.",
          },
          {
            id: "q3",
            prompt:
              "Hai fatto 8 interviste e 6 partecipanti citano un problema di lentezza. Come lo riporti?",
            options: [
              {
                id: "a",
                label: "'Gli utenti trovano lento il caricamento della dashboard'",
              },
              {
                id: "b",
                label: "'6 su 8 l'hanno citata spontaneamente, 3 con un rimedio proprio'",
              },
              {
                id: "c",
                label: "'La performance è il problema principale segnalato in assoluto'",
              },
              {
                id: "d",
                label: "'Il 75% degli utenti riporta problemi di prestazioni gravi'",
              },
            ],
            correctId: "b",
            explanation:
              "La (b) riporta il conteggio esatto sul campione, specifica che il tema è emerso senza essere sollecitato — molto più forte di una risposta indotta — e aggiunge il comportamento compensatorio, che è la prova migliore perché mostra un costo già pagato. La (d) è l'errore grave: trasformare 6 su 8 in una percentuale suggerisce una generalizzabilità che un campione di otto non ha, e con chiunque conosca la statistica ti costa la credibilità. La (a) e la (c) perdono il numero, e senza numero non c'è niente su cui agire.",
          },
          {
            id: "q4",
            prompt:
              "Un test A/B sulla nuova onboarding mostra +12% di completamento con p = 0,04 dopo 4 giorni. Il PM vuole rilasciare. Cosa segnali?",
            options: [
              {
                id: "a",
                label: "Niente: con p sotto 0,05 il risultato è significativo",
              },
              {
                id: "b",
                label: "Fermarsi al primo p buono gonfia i falsi positivi, e manca la settimana",
              },
              {
                id: "c",
                label: "Serve un campione più ampio per stringere l'intervallo",
              },
              {
                id: "d",
                label: "Un +12% è troppo alto per essere credibile su un onboarding",
              },
            ],
            correctId: "b",
            explanation:
              "Tre problemi in uno: il peeking, che fa salire il tasso reale di falsi positivi ben oltre il 5% dichiarato; la stagionalità settimanale, che quattro giorni non coprono; e soprattutto la metrica, perché più completamento può significare aver fatto passare gente non qualificata, con ritenzione peggiore a trenta giorni. La (c) confonde precisione con validità: un campione più grande non sana una regola d'arresto decisa dopo. La (d) rifiuta un risultato per intuizione invece che per metodo.",
          },
          {
            id: "q5",
            prompt:
              "La direzione ha già deciso di costruire una funzione e chiede una ricerca 'per validare'. Come ti comporti?",
            options: [
              {
                id: "a",
                label: "Rifiuti: è ricerca di conferma e non produce informazione",
              },
              {
                id: "b",
                label: "Riformuli: non 'è buona', ma 'come può fallire e cosa cambiamo'",
              },
              {
                id: "c",
                label: "Esegui come richiesto e riporti i risultati senza commento",
              },
              {
                id: "d",
                label: "Proponi di sospendere la decisione finché non arrivano i dati",
              },
            ],
            correctId: "b",
            explanation:
              "Quando la decisione è presa e non è reversibile, la ricerca valutativa sulla bontà dell'idea è denaro sprecato: nessun risultato la cambierà. Ma il come è ancora aperto, e lì la ricerca generativa conserva tutto il suo valore. La (a) è coerente e costa il posto al tavolo, e chi non è al tavolo non influenza la decisione dopo. La (d) chiede una cosa che non verrà concessa, quindi brucia credibilità senza ottenere nulla. La (c) esegue senza esercitare la competenza per cui sei lì.",
          }
        ],
      },
      {
        type: "scenario",
        id: "ricerca-scenario-risultati",
        title: "Scenario: i dati dicono di no",
        description: "Tre decisioni su come portare un risultato scomodo.",
        minutes: 8,
        setup:
          "Sei il ricercatore di un'app fintech. Il VP Product ha spinto per sei mesi una funzione di 'obiettivi di risparmio sociali' (condividere i tuoi obiettivi con gli amici) — è il progetto con cui si è presentato al board. Hai appena chiuso uno studio con 14 partecipanti e un sondaggio su 800 utenti. I risultati: forte rifiuto della condivisione sociale sui dati finanziari (11 su 14 la definiscono invadente), ma emerge con chiarezza un bisogno adiacente e non servito — la gestione di obiettivi condivisi tra partner conviventi, citata spontaneamente da 9 partecipanti. La presentazione al VP è domani.",
        steps: [
          {
            id: "s1",
            situation: "Stai preparando la presentazione.",
            question: "Come la struttureresti?",
            options: [
              {
                id: "a",
                label:
                  "Apri con il risultato negativo, chiaro e documentato, per non nasconderlo",
                score: 2,
                outcome:
                  "Onesto e difendibile, ma metti il VP in posizione difensiva dalla prima slide: passerà il resto della riunione a cercare difetti nel tuo metodo invece di ascoltare. Il contenuto è giusto, la sequenza fa perdere metà del suo valore.",
              },
              {
                id: "b",
                label:
                  "Apri col bisogno emerso, e presenti il rifiuto come il dato che ci porta lì",
                score: 3,
                outcome:
                  "La stanza resta aperta. Il rifiuto non è una bocciatura ma il vincolo che ha rivelato l'opportunità vera: la stessa intuizione del VP — le persone vogliono risparmiare insieme — ma con il gruppo giusto. Nessuno deve ritrattare pubblicamente, e la funzione si sposta invece di morire.",
              },
              {
                id: "c",
                label:
                  "Presenti tutti i dati in ordine neutro e lasci trarre le conclusioni",
                score: 1,
                outcome:
                  "L'imparzialità apparente scarica su di lui il lavoro di sintesi che è il tuo. In assenza di una lettura chiara, il VP sceglierà i dati che confermano ciò in cui ha già investito sei mesi — e sarà tecnicamente autorizzato a farlo.",
              },
              {
                id: "d",
                label:
                  "Anticipi i risultati al VP in privato, prima della riunione col team",
                score: 3,
                outcome:
                  "Nessuna sorpresa in pubblico è una regola quasi sempre giusta con i risultati scomodi: gli dai il tempo di elaborare senza dover reagire davanti al team, e arriva in riunione come alleato invece che come imputato. Combinata con l'inquadramento di B, è la mossa migliore possibile.",
              },
            ],
            debrief:
              "Un risultato scomodo non cambia una decisione se chi deve cambiarla ci perde la faccia. Le due tecniche che funzionano quasi sempre: nessuna sorpresa in pubblico, e riformulare la bocciatura come scoperta di un vincolo che rivela un'opportunità. Nessuna delle due richiede di ammorbidire i dati — richiedono di progettare come arrivano.",
          },
          {
            id: "s2",
            situation:
              "Il VP contesta: '14 persone non sono un campione. Il sondaggio su 800 aveva domande ipotetiche. Non possiamo buttare sei mesi per questo.'",
            question: "Come rispondi?",
            options: [
              {
                id: "a",
                label:
                  "Spieghi che 14 è adeguato per la saturazione qualitativa e citi la letteratura",
                score: 1,
                outcome:
                  "Tecnicamente corretto e politicamente inutile. Stai discutendo di metodologia con qualcuno che sta difendendo un investimento: la discussione si sposta sul terreno dove tu hai ragione e lui non ti seguirà.",
              },
              {
                id: "b",
                label:
                  "Riconosci il limite e proponi un fake door su entrambe, per due settimane",
                score: 3,
                outcome:
                  "Hai accettato la sua obiezione invece di respingerla, e l'hai trasformata in un esperimento con una data. Due settimane dopo: 0,4% di attivazione sulla variante sociale, 7,1% su quella con partner. Il disaccordo si chiude da solo e nessuno ha dovuto avere torto.",
              },
              {
                id: "c",
                label: "Proponi di ampliare lo studio qualitativo a trenta partecipanti",
                score: 1,
                outcome:
                  "Sei settimane in più per rafforzare una conclusione che il VP non contesta sul merito ma sull'autorità. Arriverai agli stessi risultati con la stessa accoglienza.",
              },
              {
                id: "d",
                label:
                  "Accetti di procedere con un rilascio limitato per verificare sul campo",
                score: 2,
                outcome:
                  "Ragionevole, ma costruire la funzione completa per il 5% degli utenti costa quasi quanto costruirla per tutti. Hai scelto l'esperimento più caro tra quelli disponibili.",
              },
            ],
            debrief:
              "Quando qualcuno contesta il tuo campione, raramente sta parlando di statistica: sta dicendo che il costo di crederti è alto. La risposta efficace non difende il metodo, propone l'evidenza più economica che chiude la questione. Il fake door test costa giorni e produce dati comportamentali su traffico reale — il tipo di dato che nessuno contesta.",
          },
          {
            id: "s3",
            situation:
              "I dati del fake door confermano. Il VP accetta di riorientare verso gli obiettivi condivisi tra partner. Ti chiede: 'come evitiamo di rifare questo errore?'",
            question: "Cosa proponi?",
            options: [
              {
                id: "a",
                label: "Una ricerca preliminare obbligatoria prima di ogni nuova iniziativa",
                score: 1,
                outcome:
                  "Diventi un ufficio autorizzazioni. I team impareranno a fare la ricerca minima sufficiente a passare il controllo, e le decisioni importanti prenderanno percorsi che ti aggirano.",
              },
              {
                id: "b",
                label:
                  "Un rituale: prima si scrive l'assunzione più rischiosa e come falsificarla",
                score: 3,
                outcome:
                  "Leggero, applicabile da chiunque, e sposta la ricerca dove serve — all'inizio, sull'assunzione che se sbagliata fa crollare tutto. Sei mesi dopo è diventato un riflesso del team e la tua coda di richieste 'di validazione' si è dimezzata.",
              },
              {
                id: "c",
                label:
                  "Un archivio consultabile di tutte le ricerche già svolte in azienda",
                score: 2,
                outcome:
                  "Utile e sottovalutato — molta ricerca viene rifatta perché nessuno sa che esiste già. Ma è uno strumento di memoria, non un cambio di comportamento: non avrebbe impedito questo errore.",
              },
              {
                id: "d",
                label:
                  "Presenze fisse del ricercatore nelle riunioni di pianificazione trimestrale",
                score: 2,
                outcome:
                  "Migliora l'influenza e l'intercettazione precoce, ma dipende interamente dalla tua presenza personale: non scala oltre te e sparisce il giorno in cui cambi ruolo.",
              },
            ],
            debrief:
              "Le pratiche di ricerca che sopravvivono sono quelle che riducono il lavoro di chi le adotta, non quelle che lo aumentano. 'Qual è l'assunzione più rischiosa e come la falsifichiamo in una settimana' è una domanda che un PM può porsi da solo, e questo è precisamente ciò che la rende durevole: non ha bisogno di te per funzionare.",
          },
        ],
      },
      {
        type: "brief",
        id: "ricerca-brief-piano",
        title: "Brief a tempo: piano di ricerca in una settimana",
        description: "20 minuti. Una decisione, un vincolo stretto, un piano.",
        minutes: 20,
        brief:
          "Un'app di consegna della spesa ha un tasso di riacquisto del 22% a 30 giorni, contro un obiettivo di 35%. Il team ha tre ipotesi in competizione, ciascuna sostenuta da una persona diversa: (1) i tempi di consegna sono troppo lunghi e imprevedibili; (2) il catalogo non copre i prodotti che la gente compra abitualmente; (3) l'esperienza di sostituzione dei prodotti mancanti è frustrante e distrugge la fiducia. La decisione da prendere entro due settimane è dove investire il prossimo trimestre di sviluppo — una sola delle tre. Hai una settimana, accesso completo ai dati di prodotto, un budget di 800 € per gli incentivi ai partecipanti, e nessun ricercatore oltre a te.",
        constraints: [
          "Una settimana di calendario, tu da solo",
          "Puoi contattare gli utenti solo via email o notifica in-app",
          "I dati comportamentali esistono ma nessuno li ha mai analizzati per coorti",
        ],
        deliverables: [
          "L'ordine in cui affronti le tre ipotesi e perché quell'ordine",
          "Il metodo per ciascuna, con numeri di partecipanti e durata",
          "Cosa fai nei primi due giorni, in concreto",
          "Come gestisci il caso in cui i risultati siano ambigui",
          "Il formato con cui consegni la raccomandazione",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Uso dei dati già esistenti prima di raccoglierne di nuovi",
            description:
              "Hai capito che i dati comportamentali non analizzati possono già eliminare o confermare ipotesi a costo zero?",
            excellent:
              "Due punti se parti dall'analisi dei dati esistenti e la usi per restringere il campo prima di parlare con chiunque. Un punto se citi i dati ma parti comunque dalle interviste.",
          },
          {
            id: "r2",
            criterion: "Corrispondenza tra ipotesi e metodo",
            description:
              "Ogni ipotesi ha il metodo che può davvero confermarla o smentirla?",
            excellent:
              "Due punti se distingui le ipotesi verificabili con i dati comportamentali (1 e 2) da quella che richiede il qualitativo (3). Un punto se applichi lo stesso metodo a tutte.",
          },
          {
            id: "r3",
            criterion: "Il campione giusto",
            description:
              "Hai capito chi devi intervistare per rispondere a una domanda sulla mancata ripetizione?",
            excellent:
              "Due punti se recluti chi ha smesso di ordinare (non chi continua) e affronti il problema del bias di sopravvivenza. Un punto se recluti utenti generici.",
          },
          {
            id: "r4",
            criterion: "Realismo del piano settimanale",
            description: "Il piano è eseguibile da una persona in cinque giorni lavorativi?",
            excellent:
              "Due punti se il piano ha una sequenza giorno per giorno con il reclutamento avviato al giorno 1 (il collo di bottiglia reale). Un punto se il piano è sensato ma non tiene conto dei tempi di reclutamento.",
          },
          {
            id: "r5",
            criterion: "Gestione dell'ambiguità e formato di consegna",
            description:
              "Hai previsto cosa fare se i dati non discriminano, e consegni in un formato che produce una decisione?",
            excellent:
              "Due punti se dichiari in anticipo il criterio di decisione e prevedi una raccomandazione anche in caso di ambiguità. Un punto se consegni un report senza criterio predefinito.",
          },
        ],
        expertAnswer: [
          "**Giorno 1, mattina: la mossa che quasi tutti saltano.** Le ipotesi 1 e 2 sono verificabili senza parlare con nessuno, con dati che l'azienda già possiede. Segmento gli utenti in due coorti — chi ha riordinato entro 30 giorni e chi no — e confronto la loro prima esperienza. Per l'ipotesi 1: ritardo medio e varianza della prima consegna nelle due coorti (la varianza conta più della media: un'attesa lunga ma prevedibile si tollera, una imprevedibile no). Per l'ipotesi 2: percentuale di articoli del primo carrello non disponibili e tasso di ricerche a zero risultati. Per l'ipotesi 3: frequenza di sostituzioni nel primo ordine e tasso di rifiuto delle sostituzioni proposte.",
          "**Perché quest'ordine.** L'analisi costa mezza giornata e non ha costo di reclutamento. Nella maggior parte dei casi elimina almeno un'ipotesi immediatamente, e nel migliore dei casi la differenza tra le coorti è così netta da rispondere quasi da sola. Iniziare dalle interviste significherebbe spendere il collo di bottiglia — il tempo di reclutamento — prima di sapere cosa chiedere.",
          "**Giorno 1, pomeriggio: reclutamento in parallelo.** Il reclutamento è il vincolo reale di una settimana, quindi parte lo stesso giorno, prima ancora di avere i risultati dell'analisi. Email a un campione di utenti che hanno fatto un solo ordine 30-60 giorni fa: 12 slot da 30 minuti, incentivo da 50 € (600 € totali, entro budget). Il tasso di risposta su utenti inattivi è basso — vanno contattati almeno 250 per ottenerne 12.",
          "**Il campione è la scelta che decide il valore dello studio.** Intervistare chi ordina ancora è il modo più affidabile di non trovare il problema: quelle persone hanno superato l'ostacolo per definizione. Servono le persone che hanno smesso. È scomodo — rispondono meno, sono meno gentili, alcuni sono irritati — ed è esattamente per questo che quasi nessuno lo fa, e per questo l'informazione è lì.",
          "**Giorni 2-4: interviste retrospettive sull'ultimo ordine reale.** Nessuna domanda ipotetica. 'Raccontami l'ultimo ordine che hai fatto, dall'inizio alla fine' e poi si segue il racconto. Lo strumento decisivo è avere sotto gli occhi i dati di quell'ordine specifico durante l'intervista: quando la persona dice 'è arrivato tardi' posso verificare se è vero, se la percezione differisce dal fatto — e la discrepanza tra percezione e dato è spesso l'informazione più utile dell'intera settimana. Solo nell'ultimo terzo dell'intervista introduco i temi non emersi spontaneamente, segnando che sono stati sollecitati.",
          "**Giorno 5: sintesi e consegna.** Osservazioni atomiche, raggruppamento, conteggio dei partecipanti per tema. Incrocio con le coorti del giorno 1: se il qualitativo dice sostituzioni e il quantitativo mostra che chi non ha riordinato aveva il triplo di sostituzioni nel primo ordine, la convergenza tra due metodi indipendenti è l'argomento più forte che una settimana possa produrre.",
          "**Il criterio di decisione, dichiarato prima di guardare i dati.** Raccomando l'ipotesi che soddisfa entrambe le condizioni: differenza netta tra le coorti nei dati comportamentali, e menzione spontanea da parte di almeno metà dei partecipanti. Scriverlo prima è ciò che mi impedisce di scegliere dopo il tema che preferivo — ed è la protezione più economica contro il bias di conferma.",
          "**Se i risultati sono ambigui.** Il piano prevede l'ambiguità come esito possibile, non come fallimento. Se due ipotesi restano in gioco, la raccomandazione non è 'serve altra ricerca': è indicare quale delle due è più economica da testare in produzione nelle prime due settimane del trimestre, con la metrica e la soglia già definite. Il team ha bisogno di partire, non di aspettarmi.",
          "**Formato.** Una pagina: raccomandazione in cima, tre evidenze che la sostengono, l'evidenza più forte contraria (sempre, esplicitamente), e cosa cambierebbe la raccomandazione. Le clip video sono allegate ma non sono la consegna — servono a chi vorrà verificare, e servono soprattutto quando qualcuno contesterà la conclusione tra due mesi.",
          "**Nota sull'ipotesi 3.** Se vince, la soluzione probabilmente non è 'migliorare l'interfaccia di sostituzione'. La sostituzione fallisce perché avviene quando l'utente non c'è e non può decidere. Il problema è di sistema — preferenze dichiarate in anticipo, sostituzioni proposte prima dell'acquisto, rimborso automatico senza chiedere — e il quarto di sviluppo va speso lì, non sull'interfaccia.",
        ],
      },
    ],
  },
  {
    id: "accessibilita",
    level: "avanzato",
    title: "Accessibilità che regge un audit",
    tagline:
      "Non è una checklist a fine progetto: è un insieme di decisioni prese nelle prime due ore.",
    accent: "butter",
    minutes: 50,
    outcomes: [
      "Conoscere i criteri WCAG 2.2 che i designer possono violare o rispettare da soli",
      "Progettare focus, ordine di lettura e nomi accessibili prima della consegna",
      "Distinguere conformità formale da usabilità reale con tecnologie assistive",
    ],
    capabilities: [
      {
        claim:
          "Puoi consegnare specifiche che includono ordine di focus, nomi accessibili e comportamento da tastiera — cioè le tre cose che gli sviluppatori altrimenti inventano.",
        signal:
          "È ciò che separa un prodotto conforme da un prodotto che ha superato l'audit e resta inutilizzabile.",
      },
      {
        claim:
          "Puoi rispondere a una richiesta di conformità EN 301 549 o European Accessibility Act sapendo cosa è in tuo controllo e cosa no.",
        signal:
          "Dal giugno 2025 l'EAA rende obbligatoria l'accessibilità per gran parte dei prodotti digitali rivolti ai consumatori nell'UE: è diventato un requisito legale, non una virtù.",
      },
      {
        claim:
          "Puoi navigare il tuo prodotto da tastiera e con uno screen reader, e trovare in dieci minuti i problemi che uno strumento automatico non vede.",
        signal:
          "Gli strumenti automatici intercettano una minoranza dei problemi reali. Il resto richiede qualcuno che provi.",
      },
    ],
    gapCost:
      "Senza questo, l'accessibilità arriva come rifacimento a fine progetto e costa dieci volte tanto — oppure non arriva, e diventa un rischio legale con l'European Accessibility Act in vigore.",
    lessons: [
      {
        id: "criteri-designer",
        title: "I criteri WCAG su cui decide il designer",
        body: [
          "La maggior parte dei criteri WCAG è responsabilità dello sviluppo. Una minoranza dipende interamente da decisioni di design, e sono quelli su cui un designer non può nascondersi.",
          "— Contrasto del testo (1.4.3, AA): 4,5:1 per il testo normale, 3:1 per il testo grande (≥24px, o ≥18,66px in grassetto). Il testo disabilitato è escluso dal requisito, il che non lo rende leggibile.",
          "— Contrasto dei componenti non testuali (1.4.11, AA): 3:1 per bordi di campi, icone informative, indicatori di stato. È il criterio più violato dai design 'puliti': un campo con bordo grigio chiarissimo su bianco non è conforme.",
          "— Il colore non è l'unico mezzo (1.4.1, A): un errore segnalato solo col bordo rosso è invisibile a chi ha una discromatopsia. Serve icona, testo o entrambi.",
          "— Focus visibile (2.4.7, AA) e, novità della 2.2, aspetto del focus (2.4.11, AAA) e focus non oscurato (2.4.12, AA): l'elemento con il focus non deve finire nascosto sotto una barra fissa. È il difetto tipico delle intestazioni sticky.",
          "— Dimensione del bersaglio (2.5.8, AA in WCAG 2.2): minimo 24×24 CSS px, con eccezioni per la spaziatura. Non è la vecchia raccomandazione di 44px, ma è un minimo legale.",
          "— Aiuto coerente (3.2.6) e Autenticazione accessibile (3.3.8): due criteri nuovi della 2.2. Il secondo vieta di richiedere un test cognitivo (come ricopiare un codice o risolvere un puzzle) come unico modo per autenticarsi, se non esiste un'alternativa.",
        ],
        source: "W3C — WCAG 2.2 (ottobre 2023) / EN 301 549",
      },
      {
        id: "focus-ordine",
        title: "Focus, ordine, nomi: la parte che si progetta",
        body: [
          "Tre cose vanno specificate dal designer perché nessun altro ha l'informazione per deciderle bene.",
          "— L'ordine di focus segue l'ordine di lettura logico, che non è sempre l'ordine visivo. Se una colonna laterale appare a destra ma logicamente precede il contenuto, il DOM e il focus devono seguire la logica. Il CSS può spostare visivamente gli elementi e creare discrepanze invisibili a chi vede.",
          "— La gestione del focus nei componenti dinamici: quando si apre un dialogo, il focus entra dentro e resta intrappolato; quando si chiude, torna all'elemento che l'ha aperto. Quando compare un errore, il focus o un annuncio devono portarci l'utente. Sono decisioni di comportamento, e vanno nella specifica.",
          "— Il nome accessibile: cosa 'legge' uno screen reader su un elemento. Un pulsante con la sola icona a forma di ingranaggio ha bisogno di un nome esplicito ('Impostazioni'). Un link 'Scopri di più' ripetuto otto volte in pagina è tecnicamente conforme e praticamente inutile, perché chi naviga per elenco di link sente otto voci identiche.",
          "Il testo alternativo delle immagini è una decisione editoriale, non tecnica: un'immagine decorativa vuole alt vuoto (non l'assenza di alt), un'immagine informativa vuole la sua informazione, un grafico vuole il dato o un testo equivalente vicino.",
        ],
      },
      {
        id: "oltre-conformita",
        title: "Conformità non è usabilità",
        body: [
          "Un prodotto può soddisfare tutti i criteri AA ed essere insopportabile con uno screen reader. La conformità è la soglia minima, non l'obiettivo.",
          "Gli strumenti automatici (axe, Lighthouse, WAVE) trovano una parte minoritaria dei problemi reali — le stime serie oscillano tra il 20% e il 40%. Trovano contrasti e attributi mancanti; non trovano un ordine di lettura assurdo, un nome accessibile fuorviante o un flusso impossibile da completare senza mouse.",
          "Il test minimo che chiunque può fare in dieci minuti: metti via il mouse e attraversa il flusso principale solo con Tab, Shift+Tab, Invio, Spazio e frecce. Se ti perdi, se il focus sparisce, se non riesci a chiudere un dialogo, hai trovato un difetto che nessuno strumento avrebbe segnalato.",
          "Il passo successivo è ascoltare il prodotto: VoiceOver su macOS/iOS, NVDA su Windows, TalkBack su Android. Bastano venti minuti per capire perché quella tabella è illeggibile.",
          "La regola che conta: coinvolgere persone con disabilità nella ricerca, non solo simulare. Le soluzioni improvvisate che gli utenti reali hanno costruito valgono più di qualsiasi linea guida — e nessuna simulazione riproduce vent'anni di esperienza con uno screen reader.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "a11y-quiz",
        title: "Criteri e casi limite",
        description: "Cinque decisioni con implicazioni di conformità.",
        minutes: 7,
        questions: [
          {
            id: "q1",
            prompt:
              "Il tuo campo di testo ha bordo #E5E7EB su bianco. Il designer dice che è conforme perché il testo interno ha contrasto 12:1. Chi ha ragione?",
            options: [
              {
                id: "a",
                label: "Il designer: il criterio di contrasto si applica al testo",
              },
              {
                id: "b",
                label: "No: 1.4.11 chiede 3:1 anche ai bordi dei componenti attivi",
              },
              {
                id: "c",
                label: "Dipende dalla dimensione del campo e dallo spessore del bordo",
              },
              {
                id: "d",
                label: "È conforme se un'etichetta esterna identifica il campo",
              },
            ],
            correctId: "b",
            explanation:
              "Il criterio 1.4.11 copre le informazioni non testuali necessarie a identificare i componenti e i loro stati, e il bordo di un campo è ciò che comunica dove si può scrivere: a 1,2:1 è invisibile a chi ha ipovisione o guarda lo schermo in pieno sole. La (d) è il distrattore migliore perché confonde due cose diverse: l'etichetta dice a cosa serve il campo, non dove si trova l'area in cui digitare. La (c) inventa una soglia che nella norma non esiste.",
          },
          {
            id: "q2",
            prompt:
              "Un'intestazione fissa copre l'elemento che riceve il focus quando si naviga da tastiera scorrendo la pagina. Quanto è grave?",
            options: [
              {
                id: "a",
                label: "Fastidioso, ma non viola nessun criterio delle linee guida",
              },
              {
                id: "b",
                label: "Viola 2.4.12 Focus Not Obscured, livello AA nella WCAG 2.2",
              },
              {
                id: "c",
                label: "È una violazione solo se l'utente non può scorrere a mano",
              },
              {
                id: "d",
                label: "Riguarda solo chi usa uno screen reader, non chi vede",
              },
            ],
            correctId: "b",
            explanation:
              "È uno dei criteri introdotti dalla 2.2 proprio perché le barre fisse avevano reso il problema endemico. La (d) inverte esattamente chi colpisce: riguarda chi naviga da tastiera e vede lo schermo — una popolazione ampia, che include disabilità motorie e utenti esperti. La (c) inventa un'esenzione che non esiste. Si risolve con scroll-margin-top sugli elementi focusabili: poche righe, e quasi nessuno le mette nella specifica di design.",
          },
          {
            id: "q3",
            prompt:
              "Una tabella ha 12 pulsanti icona 'Modifica' identici, uno per riga. Come li rendi accessibili?",
            options: [
              {
                id: "a",
                label: "aria-label='Modifica' su ciascuno dei dodici pulsanti",
              },
              {
                id: "b",
                label: "Un nome col contesto: 'Modifica la fattura 2024-0142'",
              },
              {
                id: "c",
                label: "Un attributo title='Modifica' su ciascuno dei pulsanti",
              },
              {
                id: "d",
                label: "L'icona basta: la matita è compresa universalmente",
              },
            ],
            correctId: "b",
            explanation:
              "Chi usa uno screen reader spesso naviga per elenco di elementi interattivi, fuori dal contesto della tabella: dodici voci 'Modifica' identiche sono indistinguibili e il pannello si usa a tentativi. La (a) è il distrattore che conta: passa qualunque controllo automatico e fallisce con l'utente, perché il nome c'è ma non discrimina. La (c) è peggio dell'assenza: title non appare su touch e ha supporto incoerente fra screen reader. Il nome accessibile deve essere autosufficiente.",
          },
          {
            id: "q4",
            prompt:
              "Il team propone di sostituire il CAPTCHA con un puzzle di trascinamento 'più divertente'. Cosa segnali?",
            options: [
              {
                id: "a",
                label: "È un miglioramento: il CAPTCHA testuale è peggiore per tutti",
              },
              {
                id: "b",
                label: "3.3.8 vieta il test cognitivo obbligatorio, e il trascinamento esclude",
              },
              {
                id: "c",
                label: "Va bene se resta disponibile un'alternativa audio per chi non vede",
              },
              {
                id: "d",
                label: "Va bene se dopo tre tentativi la verifica si può saltare",
              },
            ],
            correctId: "b",
            explanation:
              "Il criterio 3.3.8 vieta di rendere obbligatorio un test cognitivo per autenticarsi quando non esiste un'alternativa, e il trascinamento aggiunge una barriera motoria che il CAPTCHA testuale non aveva. La (c) è la correzione parziale più diffusa: risolve per la vista e non per il carico cognitivo, che è ciò che il criterio protegge. La (d) rende la barriera temporanea, non assente, e chiede all'utente di fallire tre volte prima. Le soluzioni conformi — passkey, link via email — sono migliori per tutti.",
          },
          {
            id: "q5",
            prompt:
              "Lighthouse dà 100/100 sull'accessibilità e il PM conclude che il prodotto è conforme. Cosa rispondi?",
            options: [
              {
                id: "a",
                label: "Confermi: cento su cento è il massimo punteggio ottenibile",
              },
              {
                id: "b",
                label: "Gli automatismi coprono una parte: servono tastiera e screen reader",
              },
              {
                id: "c",
                label: "Serve affiancare un secondo strumento, per esempio axe DevTools",
              },
              {
                id: "d",
                label: "Quel punteggio vale solo per la pagina che è stata analizzata",
              },
            ],
            correctId: "b",
            explanation:
              "Un punteggio automatico perfetto è compatibile con un prodotto inutilizzabile: un modulo può avere tutte le etichette corrette e un ordine di focus che lo rende incompilabile. La (c) è il distrattore per chi conosce gli strumenti, e sbaglia sulla natura del limite: aggiungere un secondo scanner amplia la copertura di ciò che è automatizzabile, non la sposta. Nessun controllo automatico può dire se un testo alternativo descrive l'immagine o se un flusso si completa senza mouse. La (d) è vera e irrilevante.",
          }
        ],
      },
      {
        type: "critique",
        id: "a11y-critique-checkout",
        title: "Critique: lo stesso checkout, con la lente accessibilità",
        description:
          "Hai già guardato questo schermo con le euristiche. Ora cambia lente: cosa impedisce a qualcuno di completare l'acquisto?",
        minutes: 10,
        mockId: "checkout",
        lens: "Accessibilità e uso senza mouse",
        context:
          "Lo stesso checkout del modulo sulle euristiche. L'azienda vende nell'Unione Europea a consumatori e rientra nell'ambito dell'European Accessibility Act. Un utente ha segnalato di non riuscire a completare l'ordine con lo screen reader.",
        issues: [
          {
            id: "i1",
            label:
              "L'errore compare in cima al form senza che il focus o un annuncio ci portino l'utente: chi usa uno screen reader non sa che è comparso",
            isReal: true,
            severity: "alta",
            explanation:
              "Un cambiamento di stato non annunciato è invisibile a chi non guarda lo schermo. L'utente preme 'Paga', non succede nulla di percepibile, riprova. Serve una regione live o lo spostamento del focus sul sommario degli errori, più l'associazione di ogni errore al proprio campo via `aria-describedby`. È la causa più probabile della segnalazione ricevuta.",
          },
          {
            id: "i2",
            label:
              "I bordi dei campi hanno un contrasto molto sotto 3:1 rispetto allo sfondo",
            isReal: true,
            severity: "alta",
            explanation:
              "Violazione di 1.4.11. In un checkout, non riuscire a distinguere dove si scrive è un ostacolo diretto alla conversione, non solo un problema di conformità — e riguarda anche chi usa il telefono all'aperto.",
          },
          {
            id: "i3",
            label:
              "Il campo scadenza carta è diviso in due select (mese/anno) senza un'etichetta di gruppo: gli screen reader annunciano due menù senza contesto",
            isReal: true,
            severity: "media",
            explanation:
              "Servono un `fieldset` con `legend` (o un raggruppamento equivalente) perché l'insieme abbia un nome. Senza, l'utente sente 'menù, 01, 02, 03...' senza sapere di cosa. Vale in generale per ogni gruppo di controlli che insieme rispondono a una sola domanda.",
          },
          {
            id: "i4",
            label:
              "L'indicatore di focus è quello predefinito del browser, rimosso via CSS su alcuni elementi personalizzati",
            isReal: true,
            severity: "alta",
            explanation:
              "Violazione di 2.4.7. Rimuovere l'outline senza sostituirlo è probabilmente il singolo errore più diffuso del web: rende il prodotto inutilizzabile da tastiera pur restando perfetto a vedersi con il mouse — motivo per cui sopravvive alle revisioni di design.",
          },
          {
            id: "i5",
            label:
              "Il pulsante 'Paga ora' non ha un attributo aria-live per annunciare l'elaborazione",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore tecnicamente sbagliato: `aria-live` non va sul pulsante. Il modo corretto di comunicare l'elaborazione è cambiare il nome accessibile e lo stato del pulsante (`aria-busy`, testo 'Elaborazione in corso') o annunciare in una regione live separata. Mettere aria-live su un elemento interattivo produce annunci imprevedibili.",
          },
          {
            id: "i6",
            label:
              "Il totale dell'ordine si aggiorna dinamicamente quando si cambia il metodo di spedizione, senza annuncio",
            isReal: true,
            severity: "alta",
            explanation:
              "Un cambiamento di contenuto lontano dall'elemento su cui si sta agendo è il caso da manuale della regione live. Qui la posta in gioco è il prezzo: l'utente può confermare un totale diverso da quello che crede. È anche un problema di visibilità dello stato per tutti, non solo per chi usa tecnologie assistive.",
          },
          {
            id: "i7",
            label:
              "Il form non usa gli attributi autocomplete sui campi di indirizzo e pagamento",
            isReal: true,
            severity: "media",
            explanation:
              "Il criterio 1.3.5 (Identify Input Purpose, AA) lo richiede, ma il motivo pratico è più forte del formale: `autocomplete` permette il riempimento automatico, che per chi ha disabilità motorie o cognitive è la differenza tra completare l'ordine e rinunciare. È anche uno dei pochi interventi di accessibilità con effetto misurabile sulla conversione di tutti gli utenti.",
          },
        ],
      },
      {
        type: "brief",
        id: "a11y-brief-piano",
        title: "Brief a tempo: portare a conformità un prodotto esistente",
        description: "25 minuti. Vincoli reali, priorità reali.",
        minutes: 25,
        brief:
          "Sei il product designer di un'app di prenotazione viaggi per il mercato europeo, 200.000 utenti attivi. Un audit esterno ha rilevato 340 problemi di accessibilità: 45 critici (bloccanti), 120 gravi, 175 minori. L'azienda rientra nell'ambito dell'European Accessibility Act e ha ricevuto un reclamo formale da un'associazione. Il CTO ha allocato 2 sviluppatori per 8 settimane, il che copre realisticamente il 30% dei problemi. Il CEO chiede 'quando saremo conformi'. Il team di design è composto da te e un junior.",
        constraints: [
          "2 sviluppatori × 8 settimane, non negoziabile in questo trimestre",
          "Il rilascio della nuova sezione 'Esperienze' è già pianificato tra 6 settimane",
          "Nessuno in azienda ha mai usato uno screen reader",
        ],
        deliverables: [
          "Il criterio con cui prioritizzi i 340 problemi",
          "Cosa entra nelle 8 settimane e cosa no",
          "Cosa rispondi al CEO sulla domanda 'quando saremo conformi'",
          "Come impedisci che la nuova sezione 'Esperienze' aggiunga altri 100 problemi",
          "Cosa cambi nel processo perché non si ripeta",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Criterio di prioritizzazione",
            description:
              "Prioritizzi per gravità dell'audit o per impatto sui percorsi critici dell'utente?",
            excellent:
              "Due punti se ordini per percorso utente critico (ricerca → prenotazione → pagamento) incrociato con la gravità, spiegando perché un problema critico su una pagina secondaria conta meno di uno grave sul flusso di acquisto. Un punto se segui solo la gravità dell'audit.",
          },
          {
            id: "r2",
            criterion: "Ricerca delle cause comuni",
            description:
              "Hai capito che 340 problemi non sono 340 correzioni indipendenti?",
            excellent:
              "Due punti se identifichi che gran parte dei problemi deriva da pochi componenti condivisi e proponi di correggerli alla radice. Un punto se tratti i problemi come lista lineare.",
          },
          {
            id: "r3",
            criterion: "Onestà con il CEO",
            description:
              "La risposta sulla conformità è realistica, con date e senza promesse indifendibili?",
            excellent:
              "Due punti se distingui conformità dichiarata (piano pubblico e progressi documentati, che è ciò che protegge legalmente nel breve) da conformità sostanziale con data motivata. Un punto se dai una data senza argomentarla.",
          },
          {
            id: "r4",
            criterion: "Prevenzione sul nuovo",
            description:
              "Blocchi il flusso in ingresso di nuovi problemi mentre svuoti il debito?",
            excellent:
              "Due punti se poni criteri di accettazione sul nuovo lavoro (definition of done, controlli automatici in CI, revisione da tastiera prima del rilascio). Un punto se citi solo formazione.",
          },
          {
            id: "r5",
            criterion: "Cambio di processo e competenze",
            description:
              "Affronti il fatto che nessuno sa usare uno screen reader?",
            excellent:
              "Due punti se prevedi formazione pratica e coinvolgimento di utenti reali con disabilità nella ricerca. Un punto se prevedi solo strumenti automatici.",
          },
        ],
        expertAnswer: [
          "**Primo: 340 problemi non sono 340 correzioni.** Prima di qualsiasi prioritizzazione, raggruppo per causa. In un prodotto con componenti condivisi, un audit produce una lista di occorrenze, non di difetti: l'outline del focus rimosso su un componente pulsante genera 40 righe nel report ed è una correzione sola. Nella mia esperienza questo passaggio riduce il lavoro reale del 50-70%. È la prima cosa da fare, e trasforma '30% dei problemi in 8 settimane' in una stima completamente diversa.",
          "**Prioritizzazione: percorso critico × gravità, in quest'ordine.** Un problema critico nella pagina 'Chi siamo' è meno urgente di un problema grave nel selettore di date della ricerca. Definisco il percorso critico — cerca → seleziona → prenota → paga → gestisci la prenotazione — e lo tratto come un flusso unico che deve essere completabile al 100% da tastiera e con screen reader. Un flusso di acquisto completabile al 90% è completabile allo 0%: se il quinto passo è bloccato, i primi quattro non servono a niente. Questa è la logica che giustifica tutto il piano.",
          "**Cosa entra nelle 8 settimane.** Settimane 1-2: correzioni alla radice sui componenti condivisi (focus visibile, contrasti dei bordi, nomi accessibili, dimensione dei bersagli). Massimo effetto per unità di lavoro, e ripulisce trasversalmente centinaia di occorrenze. Settimane 3-6: i 45 critici che restano sul percorso di prenotazione, uno per uno, verificati manualmente da tastiera e con NVDA. Settimane 7-8: verifica end-to-end dell'intero percorso critico, correzione di ciò che emerge, e — deliberatamente riservato — un margine per gli imprevisti, che ci saranno.",
          "**Cosa non entra, dichiarato apertamente.** I 175 minori, i problemi delle pagine di supporto e del centro assistenza, e il pannello di amministrazione interno. Non è una rinuncia: è un piano datato che dice quando verranno affrontati. La differenza tra 'non lo faremo' e 'lo faremo nel Q3, ecco perché dopo' è tutto ciò che serve sia al CEO sia a un'eventuale interlocuzione con l'associazione.",
          "**Risposta al CEO, in due parti.** Prima: 'conforme' non è un interruttore, è uno stato che si mantiene. Chiedere quando saremo conformi è come chiedere quando saremo sicuri. Seconda, e più utile: entro 8 settimane il percorso di prenotazione sarà completabile con tecnologie assistive e avremo una dichiarazione di accessibilità pubblica con lo stato reale e il piano datato per il resto. Nel contesto EAA, un piano credibile documentato e in esecuzione è la posizione difendibile; una dichiarazione di piena conformità falsa è molto peggio del silenzio. La conformità sostanziale su tutto il prodotto è realistica in tre trimestri con questo livello di risorse — e se la vuole prima, la leva è il numero di sviluppatori, non la data.",
          "**La nuova sezione 'Esperienze' è la decisione più importante di tutto il piano.** Rilasciare tra 6 settimane una sezione costruita senza requisiti di accessibilità significa aggiungere debito mentre lo si ripaga, e vanifica il lavoro dal punto di vista sia pratico sia legale. Pongo una condizione d'ingresso non negoziabile: la sezione usa solo componenti già corretti, e prima del rilascio passa una verifica da tastiera end-to-end più un controllo automatico in CI che blocca il deploy sulle violazioni note. Se questo non è compatibile con la data, la data si sposta — ed è una conversazione che va fatta adesso, non tra cinque settimane.",
          "**Processo, tre interventi permanenti.** Uno: axe-core in CI su ogni pull request, con blocco sulle violazioni di gravità critica — automatizza la parte automatizzabile e non chiede giudizio a nessuno. Due: 'completabile da tastiera' entra nella definizione di fatto di ogni storia, con la verifica fatta da chi sviluppa prima della revisione. Tre: le specifiche di design includono d'ora in poi ordine di focus, nomi accessibili e comportamento da tastiera — è lavoro mio e del junior, ed è la parte che nessun controllo automatico può recuperare a valle.",
          "**Competenze: mezza giornata, effetto permanente.** Nessuno in azienda ha mai usato uno screen reader, ed è la causa di fondo di tutto il resto: non si progetta per un'esperienza che non si è mai vista. Una sessione pratica di due ore in cui ogni persona del team prova a completare una prenotazione con VoiceOver cambia il comportamento più di qualsiasi corso — perché il problema smette di essere una riga in un report e diventa un'esperienza personale di frustrazione.",
          "**E la cosa che conta più di tutte.** Il reclamo dell'associazione è un'opportunità mal travestita: quelle persone sono utenti reali con competenza specifica che si sono già prese la briga di scrivere. Coinvolgerli in una sessione di test retribuita alla settimana 6 dà un feedback che nessun audit produce, ed è anche la risposta più solida da poter dare sul piano relazionale. L'audit dice cosa viola una regola; loro dicono cosa impedisce di prenotare un viaggio.",
        ],
      },
    ],
  },
];
