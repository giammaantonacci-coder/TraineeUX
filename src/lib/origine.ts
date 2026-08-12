import "server-only";
import { headers } from "next/headers";

/**
 * L'indirizzo pubblico da cui arriva questa richiesta.
 *
 * Serve a costruire i punti di ritorno: il link di conferma via email e
 * l'indirizzo a cui Google e Apple rimandano dopo l'accesso. Sbagliarlo non da'
 * un errore visibile — manda la persona sul posto sbagliato, che e' peggio.
 *
 * Non si usa `new URL(request.url).origin` perche' dietro il proxy di Vercel
 * quell'host e' quello interno: il valore giusto e' nelle intestazioni
 * inoltrate. In locale non ci sono e si ricade su `host`.
 */
export async function origineRichiesta(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
