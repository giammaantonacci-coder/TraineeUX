"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { COOKIE_INVITO } from "@/lib/invito";

/**
 * Le azioni del giro di amici.
 *
 * Nessuna di queste scrive direttamente su una tabella: chiamano funzioni del
 * database che controllano da sé le condizioni. Non è pignoleria — chiunque
 * abbia la chiave pubblicabile e la propria sessione può chiamare quelle
 * funzioni senza passare da qui, quindi un controllo scritto in questo file
 * sarebbe un controllo che si può saltare.
 */

export interface EsitoAmico {
  ok: boolean;
  nome?: string;
  eraGiaAmico?: boolean;
  errore?: string;
}

/**
 * I messaggi del database sono etichette, non frasi da mostrare: qui
 * diventano italiano. Quello che non riconosciamo resta generico, perché un
 * errore di Postgres in faccia a chi usa l'app non aiuta nessuno.
 */
function frase(messaggio: string): string {
  if (messaggio.includes("codice_sconosciuto"))
    return "Questo codice non corrisponde a nessuno. Controlla che sia scritto giusto.";
  if (messaggio.includes("codice_tuo"))
    return "Questo è il tuo codice: mandalo a qualcun altro.";
  if (messaggio.includes("non_amici"))
    return "Potete scambiarvi cartoline solo se siete amici.";
  if (messaggio.includes("non_sbloccato"))
    return "Questa cartolina non è ancora tua. Ti servono più XP.";
  if (messaggio.includes("troppe_oggi"))
    return "Per oggi hai finito le cartoline. Riprova domani.";
  if (messaggio.includes("regalo_sconosciuto")) return "Questa cartolina non esiste.";
  if (messaggio.includes("non_autenticato"))
    return "Sessione scaduta. Rientra e riprova.";
  return "Non ha funzionato. Riprova fra un momento.";
}

export async function aggiungiAmico(codice: string): Promise<EsitoAmico> {
  const pulito = codice.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (pulito.length === 0) return { ok: false, errore: "Scrivi un codice." };

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("aggiungi_amico", { p_codice: pulito });

  // L'invito è servito, in un senso o nell'altro: il cookie va tolto comunque,
  // o un codice sbagliato resterebbe a riproporsi a ogni visita.
  await scordaInvito();

  if (error) return { ok: false, errore: frase(error.message) };

  const riga = (data as { amico_nome: string | null; era_gia_amico: boolean }[] | null)?.[0];
  revalidatePath("/amici");
  return {
    ok: true,
    nome: riga?.amico_nome?.trim() || "il tuo amico",
    eraGiaAmico: riga?.era_gia_amico ?? false,
  };
}

export async function rimuoviAmico(amico: string): Promise<{ ok: boolean; errore?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("rimuovi_amico", { p_amico: amico });
  if (error) return { ok: false, errore: frase(error.message) };
  revalidatePath("/amici");
  return { ok: true };
}

export async function mandaCartolina(
  destinatario: string,
  regalo: string,
): Promise<{ ok: boolean; errore?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("manda_regalo", {
    p_destinatario: destinatario,
    p_regalo: regalo,
  });
  if (error) return { ok: false, errore: frase(error.message) };
  revalidatePath("/amici");
  return { ok: true };
}

/**
 * Segna come viste le cartoline arrivate.
 *
 * Le apre chi le riceve, guardando la bacheca: è l'unico momento in cui si
 * può dire con onestà che le ha viste.
 */
export async function segnaCartolineViste(): Promise<void> {
  const supabase = await createClient();
  let userId: string | null = null;
  try {
    const { data } = await supabase.auth.getClaims();
    userId = data?.claims?.sub ?? null;
  } catch {
    return;
  }
  if (!userId) return;

  await supabase
    .from("gifts")
    .update({ seen_at: new Date().toISOString() })
    .eq("to_user", userId)
    .is("seen_at", null);
  revalidatePath("/amici");
  revalidatePath("/", "layout");
}

export async function scordaInvito(): Promise<void> {
  const barattolo = await cookies();
  barattolo.delete(COOKIE_INVITO);
}
