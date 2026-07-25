/**
 * Chiavi pubbliche del progetto Supabase.
 * La publishable key è pensata per stare nel bundle client: l'accesso ai dati
 * è protetto dalle policy RLS, non dal segreto della chiave.
 * Le env var, se presenti, hanno la precedenza (utile per ambienti separati).
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://cjtvynnvpfkwbakyipkr.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_WxOWDSUeyd2ZlHWHfRlUZA_cNFOikXE";
