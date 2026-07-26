import type { Module } from "@/lib/types";

export const leadModules: Module[] = [
  {
    id: "scalare-il-design",
    level: "lead",
    title: "Scalare un'organizzazione di design",
    tagline:
      "Da un certo punto in poi il tuo impatto non passa più dal tuo lavoro, ma dalle condizioni che crei.",
    accent: "butter",
    minutes: 60,
    outcomes: [
      "Riconoscere in quale fase di maturità è l'organizzazione e cosa serve in quella fase",
      "Progettare percorsi di carriera che non costringano i bravi a diventare manager",
      "Distribuire la qualità senza diventare il collo di bottiglia che la garantisce",
    ],
    capabilities: [
      {
        claim:
          "Puoi diagnosticare perché un team di design consegna lentamente, distinguendo problemi di competenza, di processo, di struttura organizzativa e di mandato.",
        signal:
          "Quattro cause con quattro cure diverse. Applicare la cura sbagliata è il modo standard di peggiorare la situazione.",
      },
      {
        claim:
          "Puoi definire livelli di carriera e aspettative che permettono a un individual contributor di crescere fino al livello di un director senza gestire persone.",
        signal:
          "Le organizzazioni che non lo fanno perdono i loro designer migliori o li promuovono in ruoli che non volevano.",
      },
      {
        claim:
          "Puoi decidere quando centralizzare e quando federare il design, sapendo che è una scelta reversibile legata alla fase e non un'ideologia.",
        signal:
          "Chi tratta il modello organizzativo come una convinzione personale riorganizza ogni 18 mesi.",
      },
    ],
    gapCost:
      "Senza questo, diventi un lead che fa il lavoro di tre designer e ne rallenta cinque. Il team dipende da te per la qualità, e la qualità non scala oltre le tue ore.",
    lessons: [
      {
        id: "maturita",
        title: "La fase determina cosa serve",
        body: [
          "L'errore più comune di un design leader è applicare le pratiche dell'azienda da cui viene a un'azienda in una fase diversa. Un design system con governance federata in un'azienda di 12 persone è sovrastruttura; l'assenza di un design system a 200 persone è caos.",
          "— Fase 1 (design come servizio): il design viene chiamato a valle. Priorità del leader: dimostrare valore su un caso visibile, guadagnare accesso alle decisioni precoci. Non introdurre processi: nessuno li adotterà.",
          "— Fase 2 (design come partner): il design è nella stanza quando si decide. Priorità: rendere ripetibile ciò che funziona, iniziare a costruire strumenti condivisi, assumere per coprire i buchi di competenza.",
          "— Fase 3 (design come funzione): esistono più team, il design system è reale, la ricerca ha una pratica. Priorità: coerenza tra team, percorsi di carriera, evitare che i team divergano in dialetti incompatibili.",
          "— Fase 4 (design come infrastruttura): il design opera su piattaforme e su orizzonti pluriennali. Priorità: strategia, allocazione, sviluppo dei leader successivi.",
          "La domanda diagnostica: qual è il vincolo che oggi limita l'impatto del design? Se è la credibilità, i processi non servono. Se è la coerenza, assumere altri designer peggiora le cose.",
        ],
      },
      {
        id: "carriera",
        title: "Percorsi di carriera che reggono",
        body: [
          "Il doppio binario (individual contributor / manager) è ormai standard sulla carta e raramente reale. Il test: esiste in azienda un IC di design pagato come un director e ascoltato come un director? Se no, il binario è decorativo e i migliori designer lo capiranno.",
          "Le aspettative per livello devono essere descritte in termini di ambito di impatto, non di anni o di abilità tecniche. Un principal designer non è 'più bravo a disegnare' di un senior: opera su un ambito più largo (più team, più tempo, più ambiguità) e produce leva sugli altri.",
          "Tre assi che descrivono la crescita meglio delle competenze tecniche: ambito (una funzione → un prodotto → più prodotti → l'azienda), autonomia (esegue → decide → definisce cosa va deciso), e leva (fa → fa fare meglio → cambia il sistema che produce il lavoro).",
          "Il livello va assegnato sul comportamento dimostrato, non sul potenziale. Promuovere sul potenziale è il modo più comune di creare un senior che non regge il ruolo e che nessuno vuole più affiancare.",
          "La conversazione più difficile e più necessaria: dire a qualcuno che è a un plateau. Farlo tardi è una crudeltà travestita da gentilezza — la persona costruisce aspettative su una promozione che non arriverà, e scopre il vero giudizio quando è troppo tardi per agirci.",
        ],
      },
      {
        id: "qualita-distribuita",
        title: "Distribuire la qualità",
        body: [
          "Un lead che rivede personalmente ogni schermata garantisce la qualità e blocca la crescita: del team, che non impara a giudicare, e del prodotto, che aspetta lui.",
          "I meccanismi che distribuiscono il giudizio: principi di design espliciti e usati davvero nelle decisioni (non poster); critique come esercizio di giudizio collettivo; un design system che rende la scelta buona anche quella facile; e la pratica di far spiegare le decisioni per iscritto, che costringe a esplicitare i criteri.",
          "La regola operativa: un lead dovrebbe rivedere le decisioni, non le esecuzioni. La domanda giusta a una revisione è 'perché questa scelta e non l'alternativa', non 'sposterei quel margine di 4px'.",
          "L'eccezione legittima: le prime settimane di un nuovo assunto e i lavori a rischio molto alto. In quei casi la revisione ravvicinata è formazione o gestione del rischio, non collo di bottiglia — ma va dichiarata come temporanea e con una data.",
          "Il segnale che stai riuscendo: il team prende decisioni che avresti preso tu, senza chiedertelo, e ogni tanto ne prende una migliore. Il segnale che stai fallendo: le decisioni ti arrivano tutte, e il tuo calendario è pieno di revisioni.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "scalare-quiz",
        title: "Decisioni da lead",
        description: "Cinque situazioni organizzative con una lettura corretta.",
        minutes: 7,
        questions: [
          {
            id: "q1",
            prompt:
              "Sei il primo design lead di una startup da 30 persone e il design viene chiamato a cose decise. Da cosa parti?",
            options: [
              {
                id: "a",
                label: "Introduci un processo con fasi, consegne e criteri di passaggio",
              },
              {
                id: "b",
                label: "Risolvi bene un problema visibile e usi quel credito per entrare prima",
              },
              {
                id: "c",
                label: "Assumi due designer, per aumentare subito la capacità del team",
              },
              {
                id: "d",
                label: "Costruisci il design system, per dare coerenza a ciò che esiste",
              },
            ],
            correctId: "b",
            explanation:
              "In questa fase il vincolo è la credibilità, non la capacità né la coerenza. La (a) è la mossa che sembra più professionale e viene percepita come burocrazia da chi non ti ha ancora dato fiducia: verrà aggirata. La (c) moltiplica designer che vengono chiamati tardi, cioè moltiplica il problema invece di risolverlo. La (d) risolve a trenta persone un problema che non hai ancora. Il credito si guadagna su un risultato che qualcun altro voleva ottenere, e apre l'accesso alle decisioni precoci.",
          },
          {
            id: "q2",
            prompt:
              "Un tuo senior è tecnicamente eccellente ma cerca sempre la tua approvazione prima di decidere. Come intervieni?",
            options: [
              {
                id: "a",
                label: "Gli dici di decidere da solo: ha l'esperienza per farlo",
              },
              {
                id: "b",
                label: "Espliciti i criteri, dichiari il perimetro, cambi il tuo ruolo",
              },
              {
                id: "c",
                label: "Riduci la frequenza degli incontri, così deve decidere lui",
              },
              {
                id: "d",
                label: "Gli assegni progetti meno critici, per fargli fare pratica",
              },
            ],
            correctId: "b",
            explanation:
              "La ricerca di approvazione è quasi sempre razionale: se storicamente le decisioni sono state ribaltate senza criteri visibili, chiedere prima è la strategia ottimale. La (a) e la (c) togliono la rete senza rendere prevedibile il giudizio, e l'ansia aumenta invece di scendere — la (c) in più lo fa senza dirglielo. La (d) comunica una retrocessione a chi è tecnicamente eccellente. La leva è rendere prevedibile il tuo giudizio e dichiarare dove decide lui: 'in quest'area decidi tu, mi informi dopo'.",
          },
          {
            id: "q3",
            prompt:
              "Cinque team con un designer ciascuno, prodotti che divergono. Il CPO propone di centralizzare i designer in un team che serve i prodotti su richiesta. Cosa segnali?",
            options: [
              {
                id: "a",
                label: "È la soluzione corretta, perché garantisce coerenza fra i prodotti",
              },
              {
                id: "b",
                label: "Risolve la coerenza e riporta il design a essere un servizio",
              },
              {
                id: "c",
                label: "Serve prima il design system, poi si valuta il modello organizzativo",
              },
              {
                id: "d",
                label: "È un problema di assunzioni: servono designer più esperti nei team",
              },
            ],
            correctId: "b",
            explanation:
              "È il pendolo organizzativo classico: si centralizza per la coerenza, si perde il contesto di dominio, si decentralizza per il contesto, si perde la coerenza, e si riorganizza ogni diciotto mesi. La (c) è il distrattore più forte perché il design system è parte della soluzione: da solo produce coerenza visiva, non concettuale, e non dice a chi appartengono le decisioni che attraversano i prodotti. Il modello che tiene entrambe le cose è designer incorporati nei team più un nucleo condiviso.",
          },
          {
            id: "q4",
            prompt:
              "Devi dire a un designer con 7 anni di esperienza che non sarà promosso a principal: esecuzioni ottime, impatto tutto dentro il suo team. Come imposti la conversazione?",
            options: [
              {
                id: "a",
                label: "Spieghi che dipende dal budget, quest'anno più stretto del solito",
              },
              {
                id: "b",
                label: "Sei esplicito sull'ambito, con esempi, e definite due occasioni",
              },
              {
                id: "c",
                label: "Gli dici che è vicino e che serve solo un altro po' di tempo",
              },
              {
                id: "d",
                label: "Gli chiedi cosa pensa che gli manchi per arrivare a quel livello",
              },
            ],
            correctId: "b",
            explanation:
              "La (a) e la (c) sono le versioni gentili e le più dannose: la prima gli dice che il criterio non dipende da lui, la seconda costruisce un'aspettativa che fra un anno diventerà rabbia legittima. La (d) è il distrattore interessante perché è un buon complemento e un cattivo sostituto: il giudizio è tuo, e chiedere la diagnosi alla persona giudicata è evitamento travestito da coaching. L'unica versione rispettosa è specifica, con esempi di cosa fa un principal in azienda, e con occasioni reali per dimostrarlo.",
          },
          {
            id: "q5",
            prompt:
              "Il tuo calendario è pieno di revisioni di design: la qualità è alta, il team consegna lentamente, nessuno decide senza di te. Intervento più efficace?",
            options: [
              {
                id: "a",
                label: "Deleghi le revisioni ai due senior, distribuendo il carico",
              },
              {
                id: "b",
                label: "Passi dalle esecuzioni alle decisioni, e rendi pubblici i criteri",
              },
              {
                id: "c",
                label: "Dimezzi il numero di revisioni, tenendo solo quelle critiche",
              },
              {
                id: "d",
                label: "Assumi un design manager, per dividere il lavoro di revisione",
              },
            ],
            correctId: "b",
            explanation:
              "La (a) sposta il collo di bottiglia su due persone e lo replica identico. La (c) abbassa la qualità senza aumentare l'autonomia: meno controlli sullo stesso team che non ha imparato a giudicare. La (d) aggiunge un livello gerarchico a un problema di metodo, e costa mesi. La leva è cambiare l'oggetto della revisione: se si discutono i criteri invece dei margini, il team li interiorizza e inizia ad applicarli da solo — che è l'unico modo in cui la qualità scala oltre le tue ore.",
          }
        ],
      },
      {
        type: "scenario",
        id: "scalare-scenario-riorg",
        title: "Scenario: il team che cresce troppo in fretta",
        description: "Tre decisioni di struttura in un anno di crescita.",
        minutes: 9,
        setup:
          "Sei head of design di un'azienda passata in 14 mesi da 60 a 200 persone. Il team di design è cresciuto da 4 a 11 designer. I problemi visibili: i prodotti stanno divergendo, tre designer si sono lamentati di non sapere cosa ci si aspetta da loro, la qualità è molto variabile tra team, e tu stai lavorando 55 ore a settimana rivedendo lavoro. Il CEO ti chiede un piano per il prossimo anno, in cui l'azienda arriverà a 350 persone.",
        steps: [
          {
            id: "s1",
            situation: "Devi scegliere da dove partire. Non puoi fare tutto insieme.",
            question: "Qual è la priorità dei prossimi tre mesi?",
            options: [
              {
                id: "a",
                label:
                  "Definire i livelli di carriera e le aspettative per ruolo",
                score: 3,
                outcome:
                  "È il vincolo che blocca tutto il resto: senza aspettative esplicite non puoi delegare (non sai a chi), non puoi assumere (non sai cosa cerchi), non puoi far crescere nessuno. Tre mesi dopo hai due senior con perimetri di autonomia dichiarati e il tuo calendario inizia a liberarsi.",
              },
              {
                id: "b",
                label: "Costruire il design system, per fermare la divergenza",
                score: 2,
                outcome:
                  "Interviene sul sintomo più visibile e serve davvero, ma senza qualcuno a cui affidarlo diventa un tuo progetto in più. La divergenza rallenta, il tuo carico aumenta.",
              },
              {
                id: "c",
                label: "Assumere un design manager, per gestire le persone",
                score: 2,
                outcome:
                  "Sensato a 11 designer, ma assumere un manager prima di aver definito le aspettative significa chiedergli di valutare persone rispetto a criteri che non esistono. Funzionerà solo se li scrive lui, il che sposta il problema di tre mesi.",
              },
              {
                id: "d",
                label:
                  "Riorganizzare i designer per allinearli ai team di prodotto",
                score: 1,
                outcome:
                  "Una riorganizzazione senza aver diagnosticato la causa produce mesi di rumore e le stesse dinamiche in una configurazione diversa.",
              },
            ],
            debrief:
              "Nella crescita rapida il vincolo è quasi sempre la chiarezza, non la capacità. Le aspettative esplicite sono l'infrastruttura su cui poggiano delega, assunzione, crescita e valutazione: senza, ogni altra iniziativa continua a richiedere il tuo giudizio caso per caso — che è esattamente la cosa che non scala.",
          },
          {
            id: "s2",
            situation:
              "Sei mesi dopo. I livelli esistono, due senior hanno ambiti autonomi, il design system è partito. Il CEO ti propone di assumere un VP Design sopra di te, dicendo che 'servirà a livello di board'.",
            question: "Come reagisci?",
            options: [
              {
                id: "a",
                label:
                  "Capire quale problema il CEO vede e tu non risolvi",
                score: 3,
                outcome:
                  "Emerge che il CEO ha bisogno di qualcuno che porti il design nelle conversazioni con gli investitori e nella strategia a tre anni, un ambito che tu non hai mai coperto perché eri sommerso dall'operativo. Non è un giudizio sul tuo lavoro: è un buco reale. Ora la conversazione è su chi lo copre e come, e sei tu a condurla.",
              },
              {
                id: "b",
                label: "Ti opponi: hai appena stabilizzato il team",
                score: 1,
                outcome:
                  "Difendi la posizione senza aver capito il problema. Il CEO conclude che non vedi il livello successivo — il che, paradossalmente, conferma la ragione della sua proposta.",
              },
              {
                id: "c",
                label: "Accetti e chiedi di partecipare alla selezione",
                score: 2,
                outcome:
                  "Maturo e collaborativo, ma accetti una diagnosi che non hai verificato. Potresti scoprire dopo l'assunzione che il buco era colmabile da te con un diverso equilibrio di responsabilità.",
              },
              {
                id: "d",
                label: "Chiedi di essere promosso tu al ruolo di VP",
                score: 1,
                outcome:
                  "Rivendicare il titolo senza aver dimostrato l'ambito che il titolo richiede sposta la conversazione sulla tua carriera invece che sul bisogno dell'azienda. È anche il modo più rapido di trasformare un'opportunità in un negoziato.",
              },
            ],
            debrief:
              "Ogni proposta organizzativa risponde a un problema percepito da chi la fa. Capire il problema prima di negoziare la soluzione vale in ogni contesto, e vale doppio quando la proposta riguarda te: la reazione difensiva è naturale e quasi sempre chiude la porta all'esito migliore.",
          },
          {
            id: "s3",
            situation:
              "Un anno dopo. 20 designer, 3 manager, un design system adottato. Il tuo miglior principal designer ti dice che sta valutando un'offerta esterna: dice che qui 'non ha più spazio per crescere'.",
            question: "Come rispondi?",
            options: [
              {
                id: "a",
                label:
                  "Gli chiedi cosa significa crescere, in concreto, per lui",
                score: 3,
                outcome:
                  "Scopri che vuole lavorare su problemi a orizzonte pluriennale e influenzare la strategia di piattaforma, ambito che l'azienda avrà tra un anno ma non ora. Gli dici la verità e costruite insieme un percorso di 12 mesi con un'occasione concreta. Resta, e sa che non gli hai raccontato una storia.",
              },
              {
                id: "b",
                label: "Gli fai una controproposta economica migliorativa",
                score: 0,
                outcome:
                  "Il denaro non risolve un problema di ambito. Nella maggior parte dei casi accetta, resta sei mesi, e se ne va comunque — con in più il precedente che per ottenere un aumento serve un'offerta esterna.",
              },
              {
                id: "c",
                label: "Gli offri un ruolo di gestione delle persone",
                score: 0,
                outcome:
                  "L'errore classico: offrire l'unico percorso di crescita visibile invece di quello che la persona vuole. Perdi un principal eccellente e guadagni un manager riluttante.",
              },
              {
                id: "d",
                label:
                  "Gli proponi un progetto strategico ad alta visibilità",
                score: 2,
                outcome:
                  "Buona mossa se il progetto è reale e corrisponde a ciò che cerca. Rischiosa se è costruita per trattenerlo: se ne accorgerà, e il costo di fiducia sarà superiore alla partenza.",
              },
            ],
            debrief:
              "Quando qualcuno dice 'non ho spazio per crescere' sta descrivendo un ambito, non uno stipendio né un titolo. La risposta onesta — capire cosa cerca e dire se qui esiste o no — trattiene più persone di qualsiasi controproposta, e quando non le trattiene produce comunque una partenza pulita e un ex collega che parla bene di te. Che, a livello di lead, è un asset reale.",
          },
        ],
      },
      {
        type: "brief",
        id: "scalare-brief-livelli",
        title: "Brief a tempo: scrivere il livello Principal",
        description: "25 minuti. Un documento che deciderà carriere.",
        minutes: 25,
        brief:
          "Sei head of design di un'azienda di 250 persone con 14 designer. I livelli attuali sono: Junior, Mid, Senior, e poi solo ruoli manageriali (Design Manager, Head of Design). Due senior designer con 8 e 10 anni di esperienza hanno chiesto quale sia il loro percorso, e uno dei due ha detto esplicitamente che non vuole gestire persone. Il CFO chiede perché servano nuovi livelli e cosa comportino in termini di costo. Devi scrivere la definizione del livello Principal Designer: cosa lo distingue da Senior, come si valuta, e come si evita che diventi un premio all'anzianità.",
        constraints: [
          "Il livello deve essere applicabile sia a chi fa product design sia a chi fa ricerca",
          "L'azienda non ha una cultura di documentazione: un documento di 20 pagine non verrà letto",
          "Ci sono al massimo due persone che potrebbero raggiungerlo nei prossimi 18 mesi",
        ],
        deliverables: [
          "La definizione del livello in termini di ambito, autonomia e leva",
          "Tre comportamenti osservabili che distinguono Principal da Senior",
          "Il processo di promozione e chi decide",
          "Come eviti la deriva verso il premio all'anzianità",
          "Come rispondi al CFO",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Definizione per ambito, non per abilità",
            description:
              "Il livello è descritto per ampiezza di impatto e non per bravura tecnica?",
            excellent:
              "Due punti se distingui ambito (quante squadre/quanto orizzonte), autonomia (decide cosa va deciso) e leva (cambia il sistema). Un punto se descrivi il livello con aggettivi di eccellenza.",
          },
          {
            id: "r2",
            criterion: "Comportamenti osservabili",
            description:
              "I criteri sono verificabili da persone diverse con lo stesso esito?",
            excellent:
              "Due punti se ogni comportamento è formulato in modo che si possa portare un esempio concreto come prova. Un punto se i comportamenti restano interpretabili.",
          },
          {
            id: "r3",
            criterion: "Processo di promozione",
            description:
              "È chiaro chi decide, su quali evidenze e con quale calendario?",
            excellent:
              "Due punti se prevedi evidenza raccolta nel tempo, voce di più valutatori e una decisione con un responsabile unico. Un punto se il processo è vago o interamente delegato al manager diretto.",
          },
          {
            id: "r4",
            criterion: "Difesa contro la deriva all'anzianità",
            description:
              "Hai meccanismi che impediscono che il livello diventi automatico dopo N anni?",
            excellent:
              "Due punti se richiedi evidenza di impatto già dimostrato e dichiari esplicitamente che il tempo di servizio non è un criterio. Un punto se lo affermi senza meccanismo.",
          },
          {
            id: "r5",
            criterion: "Argomento economico",
            description: "La risposta al CFO collega il livello a un costo evitato o a un valore?",
            excellent:
              "Due punti se colleghi al costo di sostituzione e alla perdita di impatto sui problemi che solo quel livello affronta. Un punto se argomenti per equità interna.",
          },
        ],
        expertAnswer: [
          "**Definizione, in una frase.** Un Principal Designer produce risultati che nessun singolo team avrebbe potuto produrre, su problemi che nessuno gli ha assegnato, e lascia dietro di sé capacità che restano quando lui passa ad altro.",
          "**I tre assi, con la soglia esplicita.** Ambito: il Senior possiede un prodotto o un'area e un orizzonte trimestrale; il Principal opera trasversalmente su più team con un orizzonte annuale o pluriennale. Autonomia: il Senior decide come risolvere un problema che gli è stato dato; il Principal identifica quale problema vale la pena risolvere e convince l'organizzazione. Leva: il Senior consegna lavoro eccellente; il Principal cambia il modo in cui il lavoro viene prodotto — attraverso strumenti, standard, o l'aver reso più bravi altri designer.",
          "**Tre comportamenti osservabili, con la prova richiesta.** Uno: *ha cambiato una direzione di prodotto sulla base di evidenza che ha generato lui*. Prova: la decisione, la ricerca o l'analisi che l'ha innescata, la testimonianza di chi ha deciso. Due: *ha risolto un problema che attraversava più team senza avere autorità gerarchica su nessuno*. Prova: il problema, chi era coinvolto, cosa esiste oggi che prima non esisteva. Tre: *ha reso misurabilmente più capaci altri designer*, tramite uno strumento, un metodo o un affiancamento. Prova: cosa fanno oggi gli altri che prima non facevano, con il loro riscontro diretto.",
          "**Perché servono le prove e non i giudizi.** Ognuno dei tre comportamenti è formulato in modo che la risposta 'sì, lo fa' debba essere accompagnata da un fatto specifico. È questo, e non la formulazione dei criteri, ciò che impedisce a una promozione di essere un'impressione condivisa.",
          "**Processo.** Le evidenze si raccolgono lungo tutto l'anno in un documento che il designer aggiorna e il manager commenta — non si costruisce un dossier a marzo. La valutazione avviene una volta l'anno, con almeno tre voci esterne al rapporto diretto (un PM, un tech lead, un designer di un altro team), perché l'impatto trasversale per definizione si osserva fuori dal proprio team. La decisione finale è mia, singola e motivata per iscritto in mezza pagina che viene condivisa con la persona: un processo collegiale senza un responsabile identificabile produce compromessi che nessuno può spiegare.",
          "**La difesa contro l'anzianità, in tre punti.** Il documento dice esplicitamente che gli anni di esperienza non sono un criterio e che restare Senior a tempo indeterminato è un esito legittimo e rispettato — quest'ultima frase è la più importante del documento intero. La promozione richiede impatto già dimostrato, mai potenziale. E ogni promozione produce una motivazione scritta con i fatti: se la motivazione non si riesce a scrivere in modo convincente, la promozione non è matura.",
          "**Al CFO, in tre punti concreti.** Primo, il costo che stiamo già pagando: un senior designer con 10 anni di esperienza che se ne va costa tra i 6 e i 9 mesi di produttività tra ricerca, inserimento e conoscenza di dominio persa. Ne abbiamo due a rischio adesso, e uno ha già detto che non vuole il percorso manageriale — cioè l'unico che gli offriamo. Secondo, cosa non stiamo facendo: i problemi trasversali — coerenza tra prodotti, esperienze che attraversano più team, standard di qualità — oggi non hanno nessuno che li possieda, e ricadono su di me o su nessuno. Un Principal è la figura che li affronta a tempo pieno. Terzo, il costo marginale: parliamo di due persone in 18 mesi, con un differenziale retributivo nell'ordine del 15-20% rispetto al senior. È molto meno di una sostituzione, e molto meno di un design manager assunto per fare un lavoro che quelle persone non vogliono fare.",
          "**Formato.** Una pagina, non venti. Definizione, tre comportamenti con esempi reali presi dalla nostra azienda, processo, e la frase sul fatto che restare Senior va benissimo. Un documento di carriera che non viene letto non esiste, e in un'azienda senza cultura di documentazione la lunghezza è il modo più affidabile di non essere applicati.",
        ],
      },
    ],
  },
  {
    id: "piattaforma-e-migrazioni",
    level: "lead",
    title: "Design di piattaforma e migrazioni",
    tagline:
      "Progettare per più prodotti, più team e più anni — sapendo che ogni scelta diventa un vincolo per qualcun altro.",
    accent: "sky",
    minutes: 55,
    outcomes: [
      "Distinguere i problemi che vanno risolti a livello di piattaforma da quelli locali",
      "Progettare una migrazione che le persone completano invece di subire",
      "Ragionare sul debito di design come si ragiona sul debito tecnico",
    ],
    capabilities: [
      {
        claim:
          "Puoi progettare un cambiamento che tocca milioni di utenti e più team senza che diventi un evento traumatico o una migrazione mai finita.",
        signal:
          "Le migrazioni incompiute sono il debito più costoso di un'organizzazione: due sistemi da mantenere per sempre.",
      },
      {
        claim:
          "Puoi decidere cosa standardizzare e cosa lasciare libero, sapendo che ogni standard è un costo imposto a chi lo deve rispettare.",
        signal:
          "Chi standardizza tutto ottiene aggiramento; chi non standardizza nulla ottiene frammentazione.",
      },
      {
        claim:
          "Puoi quantificare il debito di design e portarlo in una conversazione di prioritizzazione insieme al debito tecnico.",
        signal:
          "Finché il debito di design non è visibile e quantificato, perde ogni confronto contro una funzione nuova.",
      },
    ],
    gapCost:
      "Senza questo, ogni prodotto si evolve per conto suo, le migrazioni si fermano al 60% e restano lì per anni, e ogni nuovo designer eredita quattro modi diversi di fare la stessa cosa.",
    lessons: [
      {
        id: "livello-giusto",
        title: "A quale livello va risolto un problema",
        body: [
          "La domanda che precede ogni decisione di piattaforma: questo problema è dello stesso tipo in tutti i contesti in cui si presenta? Se la risposta è no, standardizzare produce un compromesso che serve male tutti.",
          "Test pratico in tre passaggi. Uno: il problema si presenta in almeno tre contesti indipendenti? Due: la soluzione migliore per ciascun contesto è la stessa, o solo simile? Tre: il costo del coordinamento è inferiore al costo della divergenza?",
          "'Simile' non basta. Due flussi di pagamento che si assomigliano ma differiscono su vincoli regolamentari vanno tenuti separati: unificarli produce un componente pieno di eccezioni condizionali che nessuno osa toccare — e che è più costoso delle due versioni separate.",
          "Distingui i tre oggetti di standardizzazione, che hanno costi e benefici diversi: i token (economici da imporre, alto beneficio), i componenti (costo medio, beneficio alto se il comportamento è davvero comune), i flussi (costo altissimo, beneficio reale solo quando l'utente li attraversa in sequenza tra prodotti diversi).",
          "Il principio da tenere: standardizza le cose che l'utente percepisce come un'unica esperienza, lascia libere quelle che percepisce come strumenti distinti.",
        ],
      },
      {
        id: "migrazioni",
        title: "Migrazioni che finiscono",
        body: [
          "Una migrazione ha tre fasi e la terza è quella che quasi nessuno completa: convivenza, spostamento, rimozione. Senza rimozione, hai raddoppiato il costo di manutenzione in modo permanente e non hai incassato nessun beneficio.",
          "Le condizioni che rendono completabile una migrazione: un percorso di uscita automatizzato (codemod, strumenti di conversione) perché altrimenti compete con le priorità di prodotto e perde; una data di rimozione dichiarata e rispettata almeno una volta, che è ciò che rende credibili tutte le successive; e la responsabilità della migrazione assegnata a qualcuno con nome e cognome.",
          "Sul fronte utente, i cambiamenti grandi vanno introdotti per fasi: opzionale con invito, predefinito con ritorno possibile, obbligatorio. La fase 2 è quella informativa: se la percentuale di ritorno alla vecchia versione è alta, il problema è nel nuovo design, non nella resistenza al cambiamento.",
          "La resistenza al cambiamento esiste ma è sovrastimata come spiegazione. Quando gli utenti protestano per un redesign, la causa più frequente non è l'abitudine: è che qualcosa che facevano in tre click ora ne richiede sei, e nessuno se n'era accorto perché era un percorso di nicchia molto usato.",
          "Misura sempre le attività degli utenti esperti prima e dopo. Sono la minoranza più rumorosa e spesso la più redditizia, e sono i primi a soffrire di ogni semplificazione fatta pensando ai nuovi.",
        ],
      },
      {
        id: "debito-design",
        title: "Il debito di design",
        body: [
          "Il debito di design è l'insieme delle incoerenze, duplicazioni e scorciatoie accumulate che rendono ogni cambiamento futuro più costoso. È reale quanto il debito tecnico e molto meno visibile, perché non produce errori: produce lentezza.",
          "Renderlo visibile richiede di quantificarlo. Alcune misure che funzionano: numero di implementazioni diverse dello stesso pattern; tempo medio per aggiungere una funzione che tocca più prodotti; numero di eccezioni al design system; numero di schermate che violano gli standard di accessibilità.",
          "Il debito non va estinto: va gestito. Alcune incoerenze costano poco e non vale la pena toccarle. La domanda è quali rallentano il lavoro futuro sui percorsi che useremo di più.",
          "La strategia più efficace è la regola dell'accampamento: chi tocca un'area la lascia meglio di come l'ha trovata, rispetto a un criterio dichiarato. Funziona perché distribuisce il costo su chi ha già il contesto, invece di concentrarlo in un progetto di rifacimento che verrà sempre rimandato.",
          "I grandi rifacimenti falliscono per una ragione strutturale: durano più a lungo della pazienza dell'organizzazione, e vengono interrotti a metà — lasciando due sistemi invece di uno. La domanda da porsi prima di proporne uno è: cosa succede se ci fermano al 50%?",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "piattaforma-quiz",
        title: "Livelli e migrazioni",
        description: "Cinque decisioni di piattaforma.",
        minutes: 7,
        questions: [
          {
            id: "q1",
            prompt:
              "Tre prodotti hanno tre onboarding diversi e il CTO propone di unificarli per ridurre la manutenzione. Cosa verifichi prima?",
            options: [
              {
                id: "a",
                label: "Quale dei tre funziona meglio, per usarlo come base comune",
              },
              {
                id: "b",
                label: "Se i tre servono lo stesso compito con gli stessi vincoli",
              },
              {
                id: "c",
                label: "Quanto costa la migrazione dei tre prodotti al flusso unico",
              },
              {
                id: "d",
                label: "Se i tre team sono d'accordo sull'unificazione e sui tempi",
              },
            ],
            correctId: "b",
            explanation:
              "L'unificazione ha senso se il problema è lo stesso, non se le schermate si assomigliano: un onboarding B2C ottimizza la conversione individuale, uno enterprise il provisioning di cinquecento account e la conformità. Unirli produce un flusso con rami condizionali che costa più delle tre versioni separate. La (a) presuppone già la risposta e cerca solo la base di partenza. La (c) viene dopo: un costo basso su una cosa sbagliata resta uno spreco. La (d) raccoglie consenso su una premessa non verificata.",
          },
          {
            id: "q2",
            prompt:
              "Una migrazione al nuovo design system è ferma al 60% da otto mesi e i team dicono che finiranno 'quando ci sarà tempo'. Cosa fai?",
            options: [
              {
                id: "a",
                label: "Chiedi ai team di allocare tempo dedicato nel prossimo trimestre",
              },
              {
                id: "b",
                label: "Abbassi il costo, fissi la data di rimozione, rendi visibile lo stato",
              },
              {
                id: "c",
                label: "Accetti la convivenza permanente dei due sistemi e la documenti",
              },
              {
                id: "d",
                label: "Completi tu la migrazione col tuo team, per sbloccare la situazione",
              },
            ],
            correctId: "b",
            explanation:
              "'Quando ci sarà tempo' significa mai: la migrazione compete con lavoro che ha un committente e perde sempre. Le tre leve funzionano insieme — automazione per abbassare il costo, rimozione del vecchio per creare una scadenza reale, visibilità per attivare la pressione fra pari, che è più efficace di qualsiasi richiesta gerarchica. La (a) è ciò che è già stato chiesto implicitamente per otto mesi. La (d) sembra generosa e insegna che i costi delle scelte dei team li paga qualcun altro.",
          },
          {
            id: "q3",
            prompt:
              "Dopo un redesign gli utenti esperti protestano rumorosamente, ma le metriche generali sono stabili o in leggero miglioramento. Come procedi?",
            options: [
              {
                id: "a",
                label: "I dati generali prevalgono: è resistenza al cambiamento",
              },
              {
                id: "b",
                label: "Segmenti la coorte esperta e conti i passi dei loro compiti",
              },
              {
                id: "c",
                label: "Ripristini il vecchio design e ripensi l'approccio da zero",
              },
              {
                id: "d",
                label: "Aggiungi un'opzione per tornare alla vecchia interfaccia",
              },
            ],
            correctId: "b",
            explanation:
              "Le metriche aggregate nascondono per costruzione gli effetti sulle minoranze, e gli utenti esperti sono numericamente pochi e spesso economicamente sproporzionati. Contare quanti passi servono oggi per i loro compiti ricorrenti rispetto a prima dà una risposta netta in poche ore. La (d) è il compromesso che sembra rispettoso: crea due interfacce da mantenere per sempre e non ti dice se la protesta era fondata. La (a) usa un'etichetta psicologica al posto di una verifica.",
          },
          {
            id: "q4",
            prompt:
              "Devi convincere il comitato di prodotto a investire un trimestre nel debito di design. Qual è l'argomento più efficace?",
            options: [
              {
                id: "a",
                label: "Che l'incoerenza danneggia la percezione del marchio nel tempo",
              },
              {
                id: "b",
                label: "Che il tempo per le funzioni cross-prodotto è cresciuto del 40%",
              },
              {
                id: "c",
                label: "Che i designer sono frustrati e il rischio di uscite è concreto",
              },
              {
                id: "d",
                label: "Che i concorrenti hanno prodotti visibilmente più coerenti",
              },
            ],
            correctId: "b",
            explanation:
              "Il debito compete contro funzioni nuove che hanno un committente, un valore atteso e una data: perde sempre, tranne quando è espresso nella stessa unità di misura, cioè il tempo di consegna del lavoro che il comitato ha già deciso di fare. La (a) e la (c) sono entrambe vere e non convertibili in una decisione di allocazione. La (d) invita un confronto che non controlli. Collegare il numero a voci specifiche della roadmap trasforma un investimento in qualità in un investimento in velocità.",
          },
          {
            id: "q5",
            prompt:
              "Proponi un rifacimento di 12 mesi dell'esperienza principale. Qual è la domanda più importante da porsi prima?",
            options: [
              {
                id: "a",
                label: "Abbiamo le risorse per sostenere dodici mesi di lavoro?",
              },
              {
                id: "b",
                label: "Cosa resta in mano se ci fermano a metà del percorso?",
              },
              {
                id: "c",
                label: "I team sono allineati sulla visione e sull'ordine dei passi?",
              },
              {
                id: "d",
                label: "Abbiamo ricerca sufficiente a sostenere le scelte di fondo?",
              },
            ],
            correctId: "b",
            explanation:
              "I rifacimenti lunghi vengono interrotti — da un cambio di priorità, da un taglio, da un cambio di dirigenza — con una frequenza che ne fa la modalità normale, non l'eccezione. Un piano che produce valore solo al cento per cento è una scommessa su una condizione che raramente si verifica. La (a), la (c) e la (d) sono tutte domande giuste e assumono tutte che il piano arrivi in fondo: verificano le condizioni di partenza invece della resistenza all'interruzione. Spezzare in tappe utili da sole non è prudenza, è l'unico modo di consegnare qualcosa.",
          }
        ],
      },
      {
        type: "scenario",
        id: "piattaforma-scenario-migrazione",
        title: "Scenario: la migrazione che nessuno vuole",
        description: "Tre decisioni per portare a termine un cambiamento grande.",
        minutes: 9,
        setup:
          "Sei principal designer in un'azienda con tre prodotti che condividono un vecchio sistema di navigazione, costruito sei anni fa. Il nuovo sistema è pronto, testato e migliore su ogni metrica misurata. La migrazione richiede a ciascuno dei tre team circa 5 settimane di lavoro. Nessuno dei tre ha la migrazione nella roadmap. Il tuo mandato non ti dà autorità su di loro. La direzione considera il progetto 'importante ma non urgente'.",
        steps: [
          {
            id: "s1",
            situation: "Devi far partire una migrazione che nessuno ha chiesto.",
            question: "Da dove cominci?",
            options: [
              {
                id: "a",
                label:
                  "Convinci un solo team, quello col beneficio più evidente, e documenti",
                score: 3,
                outcome:
                  "Il team con il flusso più penalizzato dalla vecchia navigazione accetta. Sei settimane dopo hai un caso reale: −22% di ticket sulla navigazione, tre giorni risparmiati sull'ultima funzione consegnata. Gli altri due team ora hanno una prova interna invece di una promessa, e uno dei due si fa avanti da solo.",
              },
              {
                id: "b",
                label:
                  "Chiedi alla direzione di imporre la migrazione a tutti e tre",
                score: 1,
                outcome:
                  "Ottieni un mandato debole su un progetto dichiarato 'non urgente'. I team eseguiranno al minimo indispensabile e la migrazione arriverà al 60% — con in più il costo di aver speso il tuo capitale su un'imposizione.",
              },
              {
                id: "c",
                label:
                  "Presenti a tutti e tre i team i dati sui benefici del nuovo sistema",
                score: 1,
                outcome:
                  "I dati sono veri e non spostano nulla: nessun team ha 5 settimane libere, e i benefici sono per l'utente e per l'azienda, non per il team che paga il costo. Persuadere senza cambiare l'equazione dei costi non funziona.",
              },
              {
                id: "d",
                label:
                  "Costruisci strumenti di migrazione automatica prima di parlare con chiunque",
                score: 2,
                outcome:
                  "Riduce il costo reale, che è la leva giusta, ma costruire gli strumenti senza aver visto una migrazione reale significa automatizzare quello che immagini. Meglio dopo il primo team, quando saprai dove sta davvero il lavoro.",
              },
            ],
            debrief:
              "Le migrazioni volontarie si diffondono per prova, non per persuasione. Il primo migrante va scelto per massimo beneficio e minimo costo, non a caso, e va supportato in modo sproporzionato: il suo successo è il tuo unico argomento. È il pattern di adozione che funziona in ogni organizzazione senza autorità gerarchica.",
          },
          {
            id: "s2",
            situation:
              "Due team su tre hanno migrato. Il terzo — il prodotto più vecchio e con più clienti enterprise — rifiuta: dice che i suoi clienti sono avversi ai cambiamenti e che il rischio non vale il beneficio.",
            question: "Come procedi?",
            options: [
              {
                id: "a",
                label:
                  "Verifichi quanti clienti hanno davvero obiettato, e a cosa esattamente",
                score: 3,
                outcome:
                  "Emerge che l'avversione riguarda tre clienti su quaranta e nasce da un cambiamento fatto male due anni fa, senza preavviso. La migrazione parte con un programma di anteprima per quei tre clienti, coinvolti come collaudatori. Diventano i sostenitori più efficaci verso gli altri.",
              },
              {
                id: "b",
                label:
                  "Accetti, e lasci quel prodotto sul vecchio sistema di navigazione",
                score: 0,
                outcome:
                  "Convivenza permanente: due sistemi da mantenere per sempre, e il beneficio della migrazione — un solo sistema — non arriva mai. È l'esito peggiore di tutti, e il più comune.",
              },
              {
                id: "c",
                label:
                  "Porti il caso alla direzione mostrando che due team su tre hanno già migrato",
                score: 1,
                outcome:
                  "Escalation con un argomento di conformità invece che di merito. Anche vincendo, il team migrerà controvoglia e il rischio che una migrazione fatta male dia ragione ai loro timori è alto.",
              },
              {
                id: "d",
                label:
                  "Proponi di migrare solo le parti nuove del prodotto, lasciando le vecchie",
                score: 1,
                outcome:
                  "Produce un prodotto con due navigazioni diverse, che è peggio di entrambe le opzioni pure. La coerenza interna a un singolo prodotto è più importante della coerenza tra prodotti.",
              },
            ],
            debrief:
              "'I nostri clienti sono avversi ai cambiamenti' è quasi sempre una generalizzazione a partire da un evento specifico andato male. Verificarla — quanti, chi, per cosa — trasforma un'obiezione di principio in un vincolo di progettazione, e i vincoli si affrontano. Il passaggio da oppositori a collaudatori è una delle mosse più efficaci disponibili, e funziona perché a nessuno dispiace essere consultato.",
          },
          {
            id: "s3",
            situation:
              "Tutti e tre i prodotti hanno migrato. Il vecchio sistema è ancora nel codice perché 'alcune pagine minori lo usano'. Sono passati quattro mesi.",
            question: "Cosa fai?",
            options: [
              {
                id: "a",
                label:
                  "Censisci le pagine residue, fissi la data di rimozione, e la rispetti",
                score: 3,
                outcome:
                  "Il censimento trova 14 pagine, di cui 9 obsolete da eliminare comunque. La rimozione avviene alla data. Il beneficio della migrazione — un solo sistema da mantenere — si incassa finalmente, e la prossima volta che dichiarerai una data, tutti sapranno che è reale.",
              },
              {
                id: "b",
                label:
                  "Lasci il vecchio sistema: le pagine residue sono poche e a basso traffico",
                score: 0,
                outcome:
                  "Il costo di manutenzione resta intero — un sistema si mantiene per intero anche se lo usa una pagina sola — e ogni futuro aggiornamento andrà fatto due volte. È la definizione di migrazione non completata.",
              },
              {
                id: "c",
                label:
                  "Aggiungi la rimozione al backlog e la riproponi ogni trimestre",
                score: 1,
                outcome:
                  "Il backlog è dove le cose importanti e non urgenti vanno a non essere fatte. Tra due anni sarà ancora lì, e nel frattempo qualcuno avrà aggiunto una quindicesima pagina sul vecchio sistema.",
              },
              {
                id: "d",
                label:
                  "Marchi il vecchio sistema come deprecato e blocchi nuovi utilizzi",
                score: 2,
                outcome:
                  "Ferma l'emorragia — cosa che va comunque fatta — ma non incassa il beneficio. È metà del lavoro, ed è la metà che non produce risparmio.",
              },
            ],
            debrief:
              "L'ultimo 5% di una migrazione contiene il 100% del beneficio: finché il vecchio sistema esiste, si mantiene per intero. La rimozione è la fase che richiede più determinazione e meno lavoro, ed è precisamente per questo che viene rimandata. Una data rispettata una volta rende credibili tutte le successive; una data mancata le rende tutte trattabili.",
          },
        ],
      },
      {
        type: "brief",
        id: "piattaforma-brief-redesign",
        title: "Brief a tempo: un cambiamento che tocca 2 milioni di utenti",
        description: "25 minuti. Il piano vale più del design.",
        minutes: 25,
        brief:
          "Sei principal designer di un'app di home banking con 2 milioni di utenti attivi mensili, età media 47 anni, di cui il 22% sopra i 65. La navigazione principale deve cambiare: la struttura attuale a 6 tab non regge le nuove aree (investimenti, assicurazioni, servizi per le imprese) e i dati mostrano che tre tab raccolgono il 91% dell'uso. Il nuovo modello proposto ha 4 tab più un'area personalizzabile. I test di usabilità su 24 partecipanti danno risultati positivi (successo dei compiti dal 71% all'89%), ma i partecipanti sopra i 65 hanno impiegato in media il 40% di tempo in più rispetto alla struttura attuale nella prima sessione, allineandosi solo alla terza. Il servizio clienti riceve 8.000 chiamate al mese e teme un picco. Il precedente redesign, tre anni fa, ha prodotto 400 recensioni negative in una settimana e una notizia sui giornali.",
        constraints: [
          "Vincoli normativi: alcune funzioni devono restare raggiungibili entro un numero massimo di passaggi",
          "Il servizio clienti non può assorbire più del +15% di volume",
          "Il rilascio è previsto tra 4 mesi e la data è pubblica verso il consiglio",
        ],
        deliverables: [
          "Il piano di introduzione, fase per fase, con criteri di passaggio",
          "Come tratti il segmento over 65 senza costruire un prodotto separato",
          "Cosa misuri per fermarti, con soglie numeriche",
          "Come coinvolgi il servizio clienti prima e durante",
          "Il piano di comunicazione verso gli utenti",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Introduzione per fasi con criteri",
            description:
              "Le fasi hanno criteri di passaggio dichiarati prima, non valutazioni a posteriori?",
            excellent:
              "Due punti se ogni fase ha una percentuale di utenti, una durata e una soglia numerica per procedere o fermarsi. Un punto se le fasi ci sono ma i criteri sono qualitativi.",
          },
          {
            id: "r2",
            criterion: "Trattamento del segmento vulnerabile",
            description:
              "Affronti il dato sugli over 65 senza né ignorarlo né creare un prodotto separato?",
            excellent:
              "Due punti se distingui il costo di apprendimento transitorio dal danno permanente e progetti supporti mirati e temporanei. Un punto se prevedi solo un'opzione di ritorno alla vecchia interfaccia.",
          },
          {
            id: "r3",
            criterion: "Criteri di arresto",
            description:
              "Hai definito prima cosa ti farebbe fermare o tornare indietro?",
            excellent:
              "Due punti se le soglie coprono volume di chiamate, tasso di completamento delle operazioni critiche e ritorno alla vecchia versione, con numeri. Un punto se le soglie sono generiche.",
          },
          {
            id: "r4",
            criterion: "Coinvolgimento del servizio clienti",
            description:
              "Il servizio clienti è parte del piano o ne subisce le conseguenze?",
            excellent:
              "Due punti se lo coinvolgi prima del rilascio come fonte di ricerca e come primo segnale di allarme, con un canale di ritorno rapido. Un punto se prevedi solo formazione.",
          },
          {
            id: "r5",
            criterion: "Comunicazione",
            description:
              "La comunicazione riduce il costo di apprendimento invece di annunciare il cambiamento?",
            excellent:
              "Due punti se è contestuale, ripetuta al momento del bisogno e mostra dove sono finite le cose. Un punto se prevedi solo un annuncio e un tour iniziale.",
          },
        ],
        expertAnswer: [
          "**Lettura del dato sugli over 65.** Il +40% nella prima sessione con allineamento alla terza non è un difetto del design: è il costo di apprendimento, ed è normale in qualsiasi cambiamento strutturale. La distinzione che conta è tra costo transitorio (si estingue con l'uso) e danno permanente (resta). Il dato dei test dice che siamo nel primo caso. Ma per un utente che entra nell'app due volte al mese, tre sessioni sono un mese e mezzo di difficoltà — e questo, non il dato in sé, è ciò per cui devo progettare.",
          "**Introduzione in quattro fasi, con criteri numerici dichiarati prima.** Fase 0 (settimane 1-2): 2% degli utenti, esclusi over 70 e clienti imprese, con attivazione volontaria da un invito. Si procede se il completamento delle 5 operazioni critiche resta entro il 3% della baseline. Fase 1 (settimane 3-6): 10%, campione rappresentativo per età, nuova navigazione come predefinita con ritorno sempre disponibile in due tocchi. Si procede se il ritorno alla vecchia versione resta sotto il 12% e le chiamate della coorte sotto il +15%. Fase 2 (settimane 7-10): 50%, stessi criteri. Fase 3 (settimane 11-14): 100%, con ritorno disponibile ancora per 8 settimane. Rimozione della vecchia navigazione alla settimana 22, con data dichiarata all'inizio.",
          "**Il tasso di ritorno alla vecchia versione è la metrica più informativa dell'intero piano.** Non è una valvola di sfogo per gli scontenti: è uno strumento di misura. Se il 30% torna indietro, il problema è il design e me lo dice prima che lo dicano i giornali. Se torna il 5%, la migrazione è sana. E soprattutto, va segmentato: un 25% di ritorni concentrato negli over 65 è un problema diverso da un 25% distribuito, e richiede una cura diversa.",
          "**Over 65, senza prodotto separato.** Tre interventi, tutti temporanei e mirati. Primo: alla prima apertura, un'unica schermata che mostra la mappa vecchio→nuovo delle tre funzioni che quella persona usava di più — personalizzata sui suoi dati d'uso reali, non generica. Secondo: per le prime tre sessioni, un accesso rapido persistente alle sue tre operazioni più frequenti, che si ritira da solo dopo. Terzo: la ricerca in-app deve accettare i vecchi nomi delle sezioni per sempre, non per un periodo. Nessuno di questi crea un prodotto separato: sono impalcature che si smontano, e la parte più importante è che si smontino.",
          "**Il vincolo normativo va verificato prima di tutto il resto.** Se alcune funzioni devono restare raggiungibili entro un numero massimo di passaggi, questo è un requisito di conformità che precede qualsiasi considerazione di usabilità: verifico il nuovo modello contro l'elenco puntuale delle funzioni vincolate prima della fase 0, con l'ufficio conformità. Scoprire un problema qui alla fase 2 significa fermare tutto.",
          "**Servizio clienti: prima risorsa, non ultima vittima.** Quattro settimane prima della fase 0, due sessioni con gli operatori più esperti: sanno esattamente cosa la gente non trova oggi, ed è la ricerca più economica disponibile in azienda. Durante le fasi, un canale diretto — un modulo di dieci secondi — per segnalare in tempo reale le confusioni ricorrenti, con revisione quotidiana nelle prime due settimane di ogni fase. Un operatore partecipa alla revisione dei criteri di passaggio. Il volume di chiamate è un mio criterio di arresto, quindi il loro carico è parte del mio piano, non un effetto collaterale.",
          "**Comunicazione: contestuale, non annunciata.** Il precedente redesign ha prodotto 400 recensioni negative in una settimana, e la causa più probabile è che la gente si sia trovata l'app cambiata senza preavviso. Ma l'email di annuncio e il tour iniziale sono strumenti deboli: la prima non viene letta, il secondo viene saltato e dimenticato prima del momento del bisogno. Ciò che funziona è mostrare dove sono finite le cose *quando la persona le cerca*: nella posizione della vecchia voce, per le prime settimane, un puntatore alla nuova. Più un'unica comunicazione preventiva sobria, due settimane prima, che dice cosa cambia, perché, e che si potrà tornare indietro — quest'ultima frase riduce l'ansia più di qualsiasi altra cosa.",
          "**La data pubblica verso il consiglio.** Quattro mesi coprono le fasi 0-3 solo se nulla va storto, il che è un'ipotesi ottimistica. Sollevo il tema adesso, non alla settimana 10: propongo di comunicare al consiglio la data di *inizio del rilascio graduale* invece della data di completamento. È vero, è verificabile, e mi lascia il margine di fermare una fase senza trasformare una decisione tecnica corretta in un problema di credibilità verso il consiglio. Se questa distinzione non è accettabile, allora il piano ha una fase in meno e va detto ora quale.",
          "**Cosa mi farebbe tornare indietro del tutto.** Un calo superiore al 5% nel completamento di un'operazione critica (bonifico, pagamento bollettino, blocco carta) che persista oltre due settimane in qualsiasi fase. Quelle cinque operazioni sono il motivo per cui l'app esiste: su tutto il resto si itera, su quelle si ripristina.",
        ],
      },
    ],
  },
];
