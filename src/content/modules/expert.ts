import type { Module } from "@/lib/types";

export const expertModules: Module[] = [
  {
    id: "etica-e-ai",
    level: "expert",
    title: "Design etico e interfacce AI",
    tagline:
      "Progettare per sistemi che sbagliano in modo plausibile, in un contesto in cui la manipolazione è diventata illegale.",
    accent: "blush",
    minutes: 65,
    outcomes: [
      "Riconoscere un dark pattern anche quando è redditizio e nessuno lo chiama così",
      "Progettare interfacce per sistemi probabilistici, dove l'output può essere sbagliato con sicurezza",
      "Calibrare la fiducia dell'utente sulla reale affidabilità del sistema",
    ],
    capabilities: [
      {
        claim:
          "Puoi identificare un dark pattern nel tuo stesso prodotto e argomentarne la rimozione in termini di rischio legale e valore a lungo termine, non di moralità.",
        signal:
          "Il Digital Services Act e l'AI Act hanno spostato il tema dall'etica alla conformità. Chi sa parlarne in quei termini viene ascoltato.",
      },
      {
        claim:
          "Puoi progettare l'esperienza di un sistema AI che sbaglia: incertezza visibile, verifica agevole, correzione che non umilia l'utente.",
        signal:
          "È la competenza di design più richiesta e meno diffusa del momento, perché non ha ancora convenzioni consolidate.",
      },
      {
        claim:
          "Puoi decidere quando l'automazione non va usata, e sostenere quella posizione con un ragionamento sul costo dell'errore invece che con un principio.",
        signal: "Chi sa dire dove l'AI non va messa è più utile di chi sa metterla ovunque.",
      },
    ],
    gapCost:
      "Senza questo, costruisci prodotti che funzionano nelle demo e falliscono con gli utenti reali, o che ottimizzano metriche a breve mentre accumulano un rischio legale e reputazionale che esploderà tutto insieme.",
    lessons: [
      {
        id: "dark-pattern",
        title: "Dark pattern: la tassonomia e la legge",
        body: [
          "I dark pattern (o deceptive design) non sono un elenco di trucchi: sono strutture di scelta che sfruttano sistematicamente i limiti cognitivi a vantaggio di chi progetta e a danno di chi usa.",
          "— Sneaking: costi o elementi aggiunti tardi nel flusso, quando l'utente ha già investito. Il caso più comune sono le spese rivelate al checkout.",
          "— Urgency e scarcity falsi: contatori e 'ultimi posti' non veritieri. In UE ricadono nella direttiva sulle pratiche commerciali sleali.",
          "— Misdirection e confirmshaming: gerarchia visiva che spinge verso l'opzione redditizia, e testi che fanno vergognare chi rifiuta ('No grazie, preferisco pagare di più').",
          "— Obstruction (roach motel): iscriversi in due click, disdire per telefono in orario d'ufficio. È il pattern più sanzionato.",
          "— Forced action e nagging: chiedere ripetutamente finché l'utente cede.",
          "Il quadro normativo è cambiato: il Digital Services Act (art. 25) vieta esplicitamente alle piattaforme online le interfacce che ingannano o manipolano gli utenti; l'AI Act vieta le tecniche manipolative basate su AI; e diverse autorità nazionali hanno già sanzionato modelli di disdetta ostruttivi. La domanda in riunione non è più 'è giusto?' ma 'è legale, e chi firma?'.",
          "Il test operativo più utile, e più scomodo: se dovessimo spiegare all'utente esattamente cosa stiamo facendo e perché, in quel momento, continuerebbe? Se la risposta è no, il pattern funziona perché è nascosto — che è la definizione stessa di inganno.",
        ],
        source: "Deceptive Design (Harry Brignull) / DSA art. 25 / EU AI Act",
      },
      {
        id: "ux-probabilistica",
        title: "Progettare per sistemi che sbagliano",
        body: [
          "Il software tradizionale è deterministico: se sbaglia, è un bug e si corregge. Un sistema generativo è probabilistico: sbaglia per costruzione, e l'errore è indistinguibile dal successo nella forma. Questo cambia il design, non solo l'implementazione.",
          "Tre principi che reggono. Uno: l'output va presentato come proposta, non come risultato. La differenza tra 'ecco il tuo riepilogo' e 'ecco una bozza di riepilogo — controlla i numeri' è tutta l'esperienza. Due: il costo della verifica deve essere inferiore al costo di fare la cosa a mano, altrimenti l'automazione è un peso travestito da aiuto. Tre: la correzione va progettata come percorso principale, non come caso di errore.",
          "L'incertezza va comunicata dove è azionabile. Una percentuale di confidenza generica è rumore; evidenziare i tre campi su venti di cui il sistema è meno sicuro è informazione. La regola: mostra l'incertezza dove l'utente può fare qualcosa, non ovunque.",
          "La calibrazione della fiducia è l'obiettivo, non la fiducia. Un utente che si fida troppo accetta errori; uno che si fida troppo poco non usa il sistema. Un'interfaccia ben progettata rende visibile *quando* fidarsi: mostrare le fonti, indicare quando il sistema è fuori dal proprio dominio, e sbagliare in modo evidente invece che silenzioso.",
          "L'automation bias è documentato e forte: le persone accettano il suggerimento di un sistema anche quando hanno le informazioni per smentirlo, e la tendenza cresce con la fluidità della presentazione. Un output ben scritto e sicuro di sé viene creduto di più a parità di correttezza — il che significa che la qualità della scrittura è un fattore di rischio, non solo di qualità.",
        ],
      },
      {
        id: "quando-no",
        title: "Quando l'automazione non va usata",
        body: [
          "La domanda che precede ogni funzione AI: qual è il costo di un errore, chi lo paga, e quanto è facile accorgersene?",
          "Matrice utile. Errore a basso costo e facilmente visibile (suggerimento di testo, ordinamento): automatizzare liberamente. Errore a basso costo ma invisibile (una raccomandazione tra molte): automatizzare con campionamento di controllo. Errore ad alto costo ma visibile (bozza di un documento legale): automatizzare con verifica obbligatoria. Errore ad alto costo e invisibile (valutazione del merito creditizio, selezione di candidati, diagnosi): qui l'automazione va usata solo con supervisione umana strutturata, e in molti casi ricade tra i sistemi ad alto rischio dell'AI Act, con obblighi precisi.",
          "L'asimmetria da tenere presente: chi progetta il sistema quasi mai paga il costo dei suoi errori. Il costo lo paga chi riceve il rifiuto del prestito, chi non viene chiamato al colloquio, chi si vede negare il rimborso. Questa asimmetria è il motivo strutturale per cui l'autoregolamentazione tende a non funzionare.",
          "Un caso spesso trascurato: l'automazione che funziona benissimo nel 95% dei casi può essere peggio dello status quo se il 5% restante colpisce sempre le stesse persone. Le performance aggregate nascondono i danni concentrati — ed è per questo che la valutazione di un sistema va fatta per segmento, sempre.",
          "Dire di no all'automazione è una posizione professionale legittima quando è argomentata sul costo dell'errore. 'Non credo nell'AI' non è un argomento; 'in questo flusso un falso negativo costa a una persona reale l'accesso a un servizio e non c'è modo per lei di accorgersene o contestarlo' lo è.",
        ],
      },
    ],
    exercises: [
      {
        type: "quiz",
        id: "etica-quiz",
        title: "Confini",
        description: "Cinque situazioni ai margini di ciò che è accettabile.",
        minutes: 8,
        questions: [
          {
            id: "q1",
            prompt:
              "Il team crescita propone di mostrare 'Altre 12 persone stanno guardando questo articolo' con un numero casuale fra 5 e 20. Cosa dici?",
            options: [
              {
                id: "a",
                label: "Va bene se il numero è plausibile e non è verificabile da fuori",
              },
              {
                id: "b",
                label: "È un'affermazione falsa su cui si basa una decisione d'acquisto",
              },
              {
                id: "c",
                label: "Va bene se la pratica è dichiarata nei termini di servizio",
              },
              {
                id: "d",
                label: "Va bene se il numero deriva da una media storica reale",
              },
            ],
            correctId: "b",
            explanation:
              "Non è una zona grigia: è un'affermazione di fatto falsa che influenza una decisione economica, e ricade nella direttiva sulle pratiche commerciali sleali oltre che nell'articolo 25 del DSA per le piattaforme. La (d) è la variante più sottile e altrettanto problematica: la frase è al presente e afferma un fatto sul momento attuale, non una media. La (c) non sana nulla, perché l'inganno avviene nell'interfaccia. Se il dato reale esiste, mostrarlo è anche più efficace: a volte è più alto.",
          },
          {
            id: "q2",
            prompt:
              "Stai progettando un assistente AI che riassume documenti legali. Qual è la decisione di design più importante?",
            options: [
              {
                id: "a",
                label: "La qualità della scrittura del riassunto, che deve essere impeccabile",
              },
              {
                id: "b",
                label: "Rendere la verifica più economica della lettura integrale",
              },
              {
                id: "c",
                label: "La velocità di generazione, perché il tempo è il valore promesso",
              },
              {
                id: "d",
                label: "Un avviso che segnala che l'output può contenere errori",
              },
            ],
            correctId: "b",
            explanation:
              "In un dominio ad alto costo dell'errore un riassunto non verificabile è inutilizzabile: un professionista non può assumersene la responsabilità e leggerà comunque tutto. L'ancoraggio di ogni affermazione al passaggio d'origine è ciò che rende reale il risparmio di tempo. La (a) è il punto controintuitivo: una scrittura eccellente senza verificabilità aumenta il rischio, perché la fluidità alimenta l'automation bias. La (d) è teatro di conformità — nessuno la legge e non cambia il comportamento.",
          },
          {
            id: "q3",
            prompt:
              "Un sistema di selezione candidati ha accuratezza 87% complessiva, 91% sugli uomini e 78% sulle donne. Il team dice che 87% batte il recruiter medio. Cosa segnali?",
            options: [
              {
                id: "a",
                label: "Che serve un modello più accurato prima di andare in produzione",
              },
              {
                id: "b",
                label: "Che la media nasconde un danno concentrato su un gruppo protetto",
              },
              {
                id: "c",
                label: "Che va comunicato ai candidati l'uso di un sistema automatico",
              },
              {
                id: "d",
                label: "Che serve un umano a validare ogni suggerimento prima dell'invio",
              },
            ],
            correctId: "b",
            explanation:
              "Il confronto col recruiter medio sembra ragionevole e non regge: un sistema applica il proprio errore in modo uniforme e su scala, mentre gli errori umani sono eterogenei e non producono lo stesso effetto sistematico. La (c) e la (d) sono necessarie e insufficienti, e la (d) in particolare è la più pericolosa perché rassicura: la supervisione umana su un sistema con questo divario tende a ratificarlo, per automation bias. La (a) tratta come problema di qualità ciò che è una discriminazione indiretta.",
          },
          {
            id: "q4",
            prompt:
              "L'azienda vuole ridurre le disdette degli abbonamenti. Quale intervento è legittimo?",
            options: [
              {
                id: "a",
                label: "Rendere la disdetta disponibile soltanto tramite telefono",
              },
              {
                id: "b",
                label: "Mostrare cosa si perde e le alternative, in una schermata sola",
              },
              {
                id: "c",
                label: "Aggiungere tre schermate di conferma con offerte di sconto",
              },
              {
                id: "d",
                label: "Richiedere un questionario sui motivi prima di procedere",
              },
            ],
            correctId: "b",
            explanation:
              "La differenza fra informare e ostacolare sta nel numero di passaggi e nella disponibilità dell'uscita: nella (b) chi vuole andarsene lo fa in un click, e le alternative sono reali, non sconti. La (a) è il caso più sanzionato dalle autorità europee. La (c) aggiunge attrito e lo traveste da offerta. La (d) è particolarmente indifendibile e passa spesso inosservata: chiede all'utente di lavorare per te nel momento esatto in cui ti sta lasciando, e lo fa sembrare un passaggio necessario.",
          },
          {
            id: "q5",
            prompt:
              "Un prodotto per la salute mentale vuole notifiche personalizzate sui momenti di vulnerabilità rilevati dai dati d'uso. Nei test è efficace. Come ti poni?",
            options: [
              {
                id: "a",
                label: "Procedi: l'efficacia è dimostrata e l'obiettivo è benefico",
              },
              {
                id: "b",
                label: "Sfruttare la vulnerabilità è manipolativo anche con buone intenzioni",
              },
              {
                id: "c",
                label: "Proponi di verificare l'efficacia su un campione più ampio",
              },
              {
                id: "d",
                label: "Proponi di limitare la frequenza massima delle notifiche",
              },
            ],
            correctId: "b",
            explanation:
              "È il caso più difficile del set proprio perché l'intenzione è buona e i risultati positivi. Una tecnica che agisce sui momenti di vulnerabilità senza che la persona lo sappia e possa controllarlo è manipolativa per struttura, e l'AI Act tratta esplicitamente lo sfruttamento delle vulnerabilità fra le pratiche vietate. La (c) e la (d) sono mitigazioni che lasciano intatto il meccanismo: misurano meglio, o dosano, ciò che non dovrebbe essere nascosto. La correzione non è rinunciare: è renderlo dichiarato, controllabile e progettato con clinici. Se smette di funzionare quando è dichiarato, funzionava perché era nascosto.",
          }
        ],
      },
      {
        type: "critique",
        id: "etica-critique-assistant",
        title: "Critique: assistente AI in un prodotto finanziario",
        description:
          "Guarda come il sistema comunica quello che sa e quello che non sa.",
        minutes: 10,
        mockId: "ai-assistant",
        lens: "Fiducia calibrata, incertezza e responsabilità",
        context:
          "Assistente AI dentro un gestionale di contabilità per piccole imprese. Analizza le fatture e propone la categorizzazione fiscale. Gli utenti sono imprenditori senza formazione contabile. Un errore di categorizzazione produce una dichiarazione fiscale sbagliata.",
        issues: [
          {
            id: "i1",
            label:
              "L'output è presentato come un fatto compiuto ('Categorizzate 47 fatture') senza distinguere i casi certi da quelli incerti",
            isReal: true,
            severity: "alta",
            explanation:
              "Presentare un output probabilistico come risultato definitivo produce un affidamento non giustificato. La forma corretta distingue esplicitamente i casi ad alta confidenza da quelli che richiedono l'occhio dell'utente, e ordina la revisione partendo dai secondi: è ciò che rende la verifica più economica del lavoro manuale.",
          },
          {
            id: "i2",
            label:
              "Non c'è modo di vedere perché una fattura è stata categorizzata in un certo modo",
            isReal: true,
            severity: "alta",
            explanation:
              "Senza spiegazione l'utente non può calibrare la fiducia: non ha modo di distinguere una categorizzazione ovvia da un'ipotesi azzardata. In un contesto in cui la responsabilità fiscale resta sua, questo è anche un problema di responsabilità, non solo di usabilità.",
          },
          {
            id: "i3",
            label:
              "Il pulsante 'Accetta tutto' è primario e ben visibile, mentre la revisione singola richiede più passaggi",
            isReal: true,
            severity: "alta",
            explanation:
              "La gerarchia visiva spinge verso l'azione a rischio più alto. In un sistema probabilistico ad alto costo dell'errore, l'accettazione in blocco non dovrebbe essere l'azione primaria — o va limitata al sottoinsieme ad alta confidenza, esplicitamente etichettato come tale.",
          },
          {
            id: "i4",
            label:
              "Il messaggio dice 'basato sulle tue abitudini contabili' ma non è chiaro quali dati siano stati usati né per quanto tempo",
            isReal: true,
            severity: "media",
            explanation:
              "Un'affermazione vaga sull'uso dei dati non soddisfa i requisiti di trasparenza e non aiuta l'utente a giudicare l'attendibilità. Sapere che il sistema si basa su 8 mesi di categorizzazioni sue è un'informazione molto diversa dal sapere che si basa su dati aggregati di altre imprese.",
          },
          {
            id: "i5",
            label:
              "L'assistente usa un tono conversazionale e amichevole",
            isReal: false,
            severity: "bassa",
            explanation:
              "Distrattore. Il tono in sé non è un difetto e può ridurre l'intimidazione per utenti senza formazione contabile. Il problema, semmai, è la sicurezza espressa a prescindere dalla confidenza reale — che è una questione di calibrazione del linguaggio, non di registro amichevole.",
          },
          {
            id: "i6",
            label:
              "Non esiste una traccia delle modifiche: se l'utente corregge una categorizzazione, non c'è storico né possibilità di annullare in blocco",
            isReal: true,
            severity: "media",
            explanation:
              "In un contesto fiscale la tracciabilità è un requisito, non una comodità: serve a ricostruire chi ha deciso cosa in caso di verifica. Ed è anche il meccanismo di sicurezza che rende accettabile l'automazione — poter tornare indietro riduce il costo di fidarsi.",
          },
          {
            id: "i7",
            label:
              "L'assistente non dichiara mai quando una fattura è fuori dai casi che sa trattare",
            isReal: true,
            severity: "alta",
            explanation:
              "Un sistema che risponde con la stessa sicurezza dentro e fuori dal proprio dominio è il caso peggiore per la calibrazione della fiducia. Saper dire 'questa non la so classificare, guardala tu' è più prezioso di qualche punto di accuratezza in più: rende l'incertezza visibile esattamente dove l'utente può agire.",
          },
        ],
      },
      {
        type: "brief",
        id: "etica-brief-ai",
        title: "Brief a tempo: l'AI dove non dovrebbe stare",
        description: "25 minuti. Una decisione che riguarda persone reali.",
        minutes: 25,
        brief:
          "Sei principal designer in un'azienda che fornisce software di gestione a enti che erogano sussidi abitativi. La direzione, spinta da un cliente pubblico importante, vuole introdurre un sistema che assegna a ogni domanda di sussidio un punteggio di priorità basato su dati storici, per aiutare gli operatori a gestire le code — che oggi sono di 4-6 mesi. Il modello è stato addestrato su 5 anni di decisioni passate degli enti. I test interni mostrano che il punteggio predice l'esito finale della pratica nell'82% dei casi. La direzione presenta la funzione come 'un aiuto agli operatori, la decisione resta umana'. Ti chiedono di progettare l'interfaccia. Il rilascio è previsto tra 5 mesi.",
        constraints: [
          "Non hai l'autorità di bloccare il progetto",
          "Il cliente pubblico è il 30% del fatturato e ha già annunciato la funzione internamente",
          "Gli operatori gestiscono in media 40 pratiche al giorno e sono sotto pressione sui tempi",
        ],
        deliverables: [
          "L'analisi dei rischi specifici di questo sistema, in ordine di gravità",
          "Le domande che poni prima di progettare qualsiasi cosa, e a chi",
          "Come progetti l'interfaccia se il progetto va avanti",
          "Cosa proponi di misurare dopo il rilascio",
          "Dove metti il tuo limite, e come lo comunichi",
        ],
        rubric: [
          {
            id: "r1",
            criterion: "Riconoscimento del rischio strutturale",
            description:
              "Hai identificato che un modello addestrato su decisioni passate riproduce le disparità di quelle decisioni?",
            excellent:
              "Due punti se spieghi il meccanismo (il modello predice l'esito storico, non il bisogno) e ne trai le conseguenze operative. Un punto se citi genericamente il rischio di bias.",
          },
          {
            id: "r2",
            criterion: "Realismo sulla supervisione umana",
            description:
              "Affronti il fatto che 'la decisione resta umana' con 40 pratiche al giorno è debole?",
            excellent:
              "Due punti se citi l'automation bias e progetti contro di esso invece di affidarti alla presenza dell'operatore. Un punto se rilevi il problema senza affrontarlo nel design.",
          },
          {
            id: "r3",
            criterion: "Domande giuste alle persone giuste",
            description:
              "Le tue domande vanno a chi ha le informazioni che mancano, incluso chi subisce le decisioni?",
            excellent:
              "Due punti se coinvolgi operatori, ufficio legale/conformità e i richiedenti o chi li rappresenta. Un punto se ti fermi agli stakeholder interni.",
          },
          {
            id: "r4",
            criterion: "Interventi di design concreti",
            description:
              "Le tue scelte di interfaccia riducono il rischio in modo verificabile?",
            excellent:
              "Due punti se progetti contro l'ancoraggio, rendi contestabile il punteggio e prevedi la tracciabilità delle decisioni. Un punto se aggiungi solo spiegazioni e avvisi.",
          },
          {
            id: "r5",
            criterion: "Posizione professionale",
            description:
              "Hai un limite dichiarato e un modo di comunicarlo che non sia né resa né uscita di scena?",
            excellent:
              "Due punti se dichiari cosa non sei disposto a progettare, lo comunichi per iscritto in modo costruttivo e proponi l'alternativa. Un punto se esprimi disagio senza definire il limite.",
          },
        ],
        expertAnswer: [
          "**Il rischio principale non è tecnico ed è quello che nessuno ha nominato.** Il modello non predice il bisogno abitativo: predice cosa avrebbero deciso gli enti. Se negli ultimi cinque anni certe categorie di richiedenti sono state sistematicamente svantaggiate — per lingua, per tipo di documentazione, per quartiere, per capacità di compilare bene un modulo — il modello ha imparato quella disparità e la applicherà con coerenza e su scala. L'82% di accuratezza misura la fedeltà al passato, e viene presentato come se misurasse la qualità. È la confusione centrale di tutto il progetto e va detta al primo incontro.",
          "**Secondo rischio: 'la decisione resta umana' non regge alla prova dei numeri.** Un operatore con 40 pratiche al giorno e obiettivi sui tempi userà il punteggio come ordinamento di fatto. L'automation bias è documentato e si intensifica sotto pressione temporale: la supervisione umana nominale, in queste condizioni, produce ratifica. Progettare confidando su di essa significa progettare per un operatore che non esiste.",
          "**Terzo rischio: il ciclo di retroazione.** Se il punteggio influenza l'ordine di trattazione, influenza gli esiti; e gli esiti diventeranno i dati di addestramento successivi. Il sistema si conferma da solo, e la disparità si irrigidisce a ogni ciclo diventando sempre più difficile da rilevare. Questo va detto ora perché è l'unico rischio che diventa irreversibile con il tempo.",
          "**Le domande, prima di disegnare qualunque cosa.** Al team dati: qual è la performance del modello segmentata per nazionalità, fascia di reddito, composizione familiare e zona? Se questa analisi non esiste, è la prima cosa da fare e blocca tutto il resto. All'ufficio legale: questo sistema rientra tra quelli ad alto rischio dell'AI Act — l'accesso a servizi pubblici essenziali è nell'elenco — e chi si assume la responsabilità della valutazione di conformità? Agli operatori, sul campo: come decidete oggi l'ordine, cosa vi serve davvero, cosa vi fa perdere più tempo? È probabile che il loro problema reale sia la documentazione incompleta, non l'ordinamento. E ai richiedenti, o a chi li assiste: come si accorgerebbero di essere stati messi in fondo alla coda, e cosa potrebbero fare?",
          "**Il riorientamento che proporrei.** Il problema dichiarato è la coda di 4-6 mesi. Un punteggio di priorità non riduce la coda: ne cambia l'ordine, e sposta il costo su chi finisce in fondo. Se il collo di bottiglia reale è il tempo speso su pratiche incomplete — verificabile con i dati esistenti in pochi giorni — allora l'automazione utile è a monte: controllo di completezza alla presentazione, richiesta proattiva dei documenti mancanti, precompilazione dai dati già in possesso dell'ente. Stessa tecnologia, stesso beneficio sui tempi, nessuna decisione automatizzata sulle persone. Questa è la proposta con cui entro in riunione, e ha il vantaggio di servire l'obiettivo del cliente meglio della sua stessa richiesta.",
          "**Se il progetto va avanti comunque — e devo assumere che vada.** Nessun punteggio numerico: i numeri ancorano più di qualsiasi altra rappresentazione, e un 87 contro un 34 chiude il giudizio prima che inizi. Al suo posto, fattori nominati e verificabili ('nucleo con minori', 'sfratto esecutivo', 'documentazione completa'), che l'operatore può controllare uno per uno contro la pratica. Nessun ordinamento predefinito per punteggio: l'ordinamento resta cronologico, e il sistema segnala i casi che meritano attenzione anticipata con la ragione esplicita — segnalare è diverso da ordinare. Ogni segnalazione contestabile in un click, con la contestazione registrata e usata per la revisione del modello: gli operatori sono la migliore fonte di rilevazione degli errori sistematici, se il dissenso è economico. Motivazione obbligatoria quando l'operatore segue una segnalazione forte, non solo quando se ne discosta: questa asimmetria è ciò che neutralizza la deriva verso la ratifica automatica. E tracciabilità completa, perché tra due anni qualcuno chiederà conto di una decisione specifica.",
          "**Cosa misurare dopo il rilascio.** Distribuzione degli esiti per gruppo demografico, confrontata con la baseline pre-sistema — è la misura che rileva il danno concentrato, e va guardata mensilmente, non annualmente. Tasso di discordanza tra operatore e sistema: se scende sotto una soglia (direi il 10%) il sistema non è più uno strumento di supporto, è il decisore di fatto, e va dichiarato tale con tutte le conseguenze. Tempo medio di attesa per gruppo, non aggregato. E un canale di contestazione per i richiedenti con il conteggio degli esiti ribaltati.",
          "**Il mio limite, dichiarato.** Progetto l'interfaccia di segnalazione con le protezioni sopra. Non progetto un ordinamento automatico della coda basato su punteggio predittivo, e non progetto un'interfaccia che nasconda all'operatore che sta guardando una previsione. Lo metto per iscritto in una nota di due paragrafi al mio manager e al responsabile del prodotto: neutra, con il ragionamento, l'alternativa, e la proposta di rivalutare alla luce dell'analisi segmentata del modello. Non è un ultimatum e non è una minaccia di dimissioni: è la posizione professionale che mi permette di restare al tavolo, dove posso ancora cambiare il risultato. Andarsene sbattendo la porta su questo progetto significherebbe lasciarlo a qualcuno che non solleverà nessuna di queste domande.",
          "**Nota finale sul cliente.** Il cliente pubblico ha annunciato la funzione internamente e vale il 30% del fatturato. È esattamente il tipo di pressione che produce i disastri di questo genere. Ma è anche un ente pubblico, quindi soggetto all'AI Act e a un rischio reputazionale e di contenzioso molto superiore al nostro: portargli l'analisi segmentata e la proposta alternativa non è ostacolare la vendita, è proteggerlo da una decisione che tra due anni sarà sulla stampa con il suo nome sopra. Formulata così, questa conversazione si può avere.",
        ],
      },
    ],
  },
];
