/**
 * Invia i promemoria di allenamento.
 *
 * Viene chiamata ogni ora dallo scheduler dentro Postgres. Non decide lei chi
 * avvisare: quella scelta è una funzione SQL, perché dipende dall'ora locale
 * di ciascuno e Postgres i fusi li sa fare. Qui si sceglie il testo, si cifra
 * e si spedisce.
 *
 * Questo file è la copia versionata di quello che gira su Supabase. Va
 * ridistribuito dopo ogni modifica: il repository da solo non lo pubblica.
 *
 * verify_jwt è spento di proposito: chi chiama è lo scheduler del database,
 * che non ha un token utente. Al suo posto c'è un segreto condiviso, senza il
 * quale la funzione non fa nulla.
 */
import webpush from "npm:web-push@3.6.7";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PUBLIC = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") ?? "mailto:notifiche@traineeux.app";
const CRON_SECRET = Deno.env.get("CRON_SECRET")!;

/**
 * I messaggi ruotano perché un promemoria quotidiano con testo fisso si
 * riconosce dalla forma e si scarta senza leggerlo. Parlano di cosa si va a
 * fare, non della serie da difendere: il punteggio è una conseguenza, non il
 * motivo per cui vale la pena aprire l'app.
 *
 * Le frasi cominciano in minuscolo perché seguono il nome. Senza nome, la
 * prima lettera viene alzata da codice.
 */
const MESSAGGI: { titolo: string; frase: string }[] = [
  { titolo: "Il giudizio si allena", frase: "dieci minuti su un caso vero valgono più di un articolo letto." },
  { titolo: "Un caso reale ti aspetta", frase: "oggi c'è da decidere, non da ripassare." },
  { titolo: "Trovare i difetti si esercita", frase: "una critique è il modo più rapido per accorgersene prima degli altri." },
  { titolo: "Le euristiche non si citano", frase: "si usano come strumento diagnostico, e c'è un esercizio pronto." },
  { titolo: "Decisioni con conseguenze", frase: "uno scenario ti mostra dove porta ogni scelta, non solo qual è giusta." },
  { titolo: "Scrivere è progettare", frase: "un brief a tempo scopre in fretta cosa non sai ancora argomentare." },
  { titolo: "Cosa sapresti difendere?", frase: "un esercizio trasforma un'intuizione in un argomento." },
  { titolo: "Il dettaglio che cambia tutto", frase: "le risposte si somigliano apposta: è lì che si impara." },
  { titolo: "Un problema, non una schermata", frase: "oggi c'è da inquadrare prima che da disegnare." },
  { titolo: "L'ambito su cui decidi", frase: "si allarga un esercizio alla volta, non un titolo alla volta." },
  { titolo: "Accessibilità, sistemi, metriche", frase: "c'è un modulo che aspetta di diventare una cosa che sai fare." },
  { titolo: "Il mestiere si sedimenta", frase: "facendo, non leggendo. Un esercizio basta." },
];

interface Dovuto {
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  display_name: string | null;
}

/** Solo il nome di battesimo: il cognome in una notifica suona come posta pubblicitaria. */
function nomeDiBattesimo(completo: string | null): string | null {
  if (!completo) return null;
  const primo = completo.trim().split(/\s+/)[0];
  return primo && primo.length > 1 ? primo : null;
}

/** Giorno dell'anno: la rotazione cicla su tutti i messaggi prima di ripetersi. */
function indiceDelGiorno(): number {
  const ora = new Date();
  const inizio = Date.UTC(ora.getUTCFullYear(), 0, 0);
  const giorno = Math.floor((ora.getTime() - inizio) / 86_400_000);
  return giorno % MESSAGGI.length;
}

Deno.serve(async (req: Request) => {
  if (req.headers.get("x-cron-secret") !== CRON_SECRET) {
    return new Response(JSON.stringify({ error: "non autorizzato" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const mancanti = [
    ["VAPID_PUBLIC_KEY", VAPID_PUBLIC],
    ["VAPID_PRIVATE_KEY", VAPID_PRIVATE],
  ].filter(([, v]) => !v).map(([k]) => k);
  if (mancanti.length > 0) {
    return new Response(
      JSON.stringify({ error: `segreti mancanti: ${mancanti.join(", ")}` }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
  const db = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data, error } = await db.rpc("promemoria_dovuti");
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const dovuti = (data ?? []) as Dovuto[];

  // Un utente può avere più dispositivi: l'avviso in app si scrive una volta
  // sola, la push si manda a ciascuno.
  const perUtente = new Map<string, Dovuto[]>();
  for (const d of dovuti) {
    const lista = perUtente.get(d.user_id) ?? [];
    lista.push(d);
    perUtente.set(d.user_id, lista);
  }

  const messaggio = MESSAGGI[indiceDelGiorno()];
  let inviate = 0;
  let scartate = 0;
  const errori: string[] = [];

  for (const [userId, iscrizioni] of perUtente) {
    const nome = nomeDiBattesimo(iscrizioni[0].display_name);
    const corpo = nome
      ? `${nome}, ${messaggio.frase}`
      : messaggio.frase.charAt(0).toUpperCase() + messaggio.frase.slice(1);

    // Il tag cambia ogni giorno. Con un tag costante, il promemoria di oggi
    // prendeva il posto di quello di ieri rimasto nel centro notifiche, e il
    // telefono lo trattava come un aggiornamento invece che come un avviso
    // nuovo: nessun suono, nessun banner. Da qui in poi ogni giorno è una
    // notifica per conto suo.
    const payload = JSON.stringify({
      title: messaggio.titolo,
      body: corpo,
      href: "/",
      tag: `promemoria-${new Date().toISOString().slice(0, 10)}`,
    });

    let almenoUna = false;
    for (const s of iscrizioni) {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          payload,
        );
        inviate++;
        almenoUna = true;
      } catch (e) {
        const stato = (e as { statusCode?: number }).statusCode;
        // 404 e 410 vogliono dire che quell'iscrizione non esiste più: il
        // dispositivo è stato disinstallato o il browser l'ha rigenerata.
        if (stato === 404 || stato === 410) {
          await db.rpc("scarta_iscrizione", { p_endpoint: s.endpoint });
          scartate++;
        } else {
          errori.push(`${stato ?? "?"}: ${(e as Error).message}`.slice(0, 120));
        }
      }
    }

    // L'avviso resta nel centro notifiche anche se nessuna push è passata:
    // il telefono poteva essere spento, e riaprendo l'app va comunque letto.
    await db.rpc("registra_promemoria", {
      p_user_id: userId,
      p_title: messaggio.titolo,
      p_body: corpo,
    });
    if (!almenoUna && iscrizioni.length > 0) {
      errori.push(`nessuna consegna per ${userId.slice(0, 8)}`);
    }
  }

  return new Response(
    JSON.stringify({
      utenti: perUtente.size,
      messaggio: messaggio.titolo,
      inviate,
      scartate,
      errori: errori.slice(0, 5),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
});
