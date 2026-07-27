"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Le preferenze e le iscrizioni push passano da qui e non dal client, così il
 * client non ha mai bisogno di sapere che tabelle esistono.
 */

export interface PrefNotifiche {
  enabled: boolean;
  hour: number;
  timezone: string;
}

async function idUtente(): Promise<string | null> {
  const supabase = await createClient();
  try {
    const { data } = await supabase.auth.getClaims();
    return data?.claims?.sub ?? null;
  } catch {
    return null;
  }
}

export async function leggiPreferenze(): Promise<PrefNotifiche | null> {
  const userId = await idUtente();
  if (!userId) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("notification_prefs")
    .select("enabled, hour, timezone")
    .eq("user_id", userId)
    .maybeSingle();
  return (
    (data as PrefNotifiche | null) ?? {
      enabled: false,
      hour: 19,
      timezone: "Europe/Rome",
    }
  );
}

export async function salvaPreferenze(
  pref: PrefNotifiche,
): Promise<{ ok: boolean; error?: string }> {
  const userId = await idUtente();
  if (!userId) return { ok: false, error: "Sessione scaduta. Rientra e riprova." };
  if (!Number.isInteger(pref.hour) || pref.hour < 0 || pref.hour > 23) {
    return { ok: false, error: "Ora non valida." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("notification_prefs").upsert(
    {
      user_id: userId,
      enabled: pref.enabled,
      hour: pref.hour,
      timezone: pref.timezone,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) return { ok: false, error: error.message };

  revalidatePath("/profilo");
  return { ok: true };
}

export interface IscrizionePush {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export async function registraDispositivo(
  s: IscrizionePush,
): Promise<{ ok: boolean; error?: string }> {
  const userId = await idUtente();
  if (!userId) return { ok: false, error: "Sessione scaduta. Rientra e riprova." };

  const supabase = await createClient();
  // Sullo stesso endpoint si sovrascrive: il browser lo rigenera da solo ogni
  // tanto, e senza questo la tabella si riempirebbe di iscrizioni morte.
  const { error } = await supabase
    .from("push_subscriptions")
    .upsert(
      { user_id: userId, endpoint: s.endpoint, p256dh: s.p256dh, auth: s.auth },
      { onConflict: "endpoint" },
    );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function dimenticaDispositivo(
  endpoint: string,
): Promise<{ ok: boolean }> {
  const userId = await idUtente();
  if (!userId) return { ok: false };
  const supabase = await createClient();
  await supabase
    .from("push_subscriptions")
    .delete()
    .eq("user_id", userId)
    .eq("endpoint", endpoint);
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Centro notifiche                                                    */
/* ------------------------------------------------------------------ */

export interface Notifica {
  id: string;
  kind: string;
  title: string;
  body: string;
  href: string | null;
  created_at: string;
  read_at: string | null;
}

export async function leggiNotifiche(): Promise<Notifica[]> {
  const userId = await idUtente();
  if (!userId) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .select("id, kind, title, body, href, created_at, read_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(30);
  return (data as Notifica[] | null) ?? [];
}

/** Solo il conteggio: la campanella non ha bisogno del contenuto. */
export async function contaNonLette(): Promise<number> {
  const userId = await idUtente();
  if (!userId) return 0;
  const supabase = await createClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .is("read_at", null);
  return count ?? 0;
}

export async function segnaTutteLette(): Promise<void> {
  const userId = await idUtente();
  if (!userId) return;
  const supabase = await createClient();
  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", userId)
    .is("read_at", null);
  revalidatePath("/notifiche");
  revalidatePath("/", "layout");
}
