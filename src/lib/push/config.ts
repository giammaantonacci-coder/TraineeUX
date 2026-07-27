/**
 * Chiave pubblica VAPID.
 *
 * Va nel pacchetto del browser ed è pubblica per costruzione: serve al servizio
 * di push del telefono per verificare che chi invia sia chi dice di essere. La
 * metà privata sta solo fra i segreti di Supabase e non deve mai entrare in
 * questo repository, che è pubblico.
 */
export const VAPID_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ??
  "BBcpgLLwOhbj9frlVQ2V52KrZtM2M1WbFYWvI6vPQqqnb20RxdvtVHsUMvx-A4QLKZDWW5JzY888WsDssTDZSYg";

/** base64url → Uint8Array, la forma che pretende PushManager.subscribe. */
export function chiaveApplicazione(base64url: string): Uint8Array {
  const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

/** ArrayBuffer → base64url, per spedire al server le chiavi dell'iscrizione. */
export function inBase64Url(buffer: ArrayBuffer | null): string {
  if (!buffer) return "";
  const bytes = new Uint8Array(buffer);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
