/**
 * Chiavi pubbliche del progetto Supabase.
 * La publishable key è pensata per stare nel bundle client: l'accesso ai dati
 * è protetto dalle policy RLS, non dal segreto della chiave.
 * Le env var, se presenti, hanno la precedenza (utile per ambienti separati).
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://rzrkeiudlivliapqykle.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_D0uiyltV8w1eofHAHqE5Pw_f5lIp3G3";

/**
 * Quali accessi esterni mostrare, separati da virgola: "google,apple".
 *
 * Un provider si accende in due posti — qui e nel pannello di Supabase — e i
 * due momenti non coincidono: la configurazione di Apple richiede un account
 * a pagamento e puo' arrivare settimane dopo quella di Google. Senza questo
 * interruttore, pubblicare il codice vorrebbe dire mettere in pagina un
 * pulsante che rimanda a una schermata di errore, che e' peggio di non averlo.
 *
 * Vuoto di proposta: chi non ha ancora configurato niente non deve accorgersi
 * che questo codice esiste.
 */
export const ACCESSI_ESTERNI: string[] = (
  process.env.NEXT_PUBLIC_ACCESSI_ESTERNI ?? ""
)
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
