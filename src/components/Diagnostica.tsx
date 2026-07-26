"use client";

import { useEffect, useState } from "react";

/**
 * Riquadro di diagnosi temporaneo per il problema dell'app che esce dalla
 * finestra autonoma su iOS.
 *
 * Serve perché le prove fatte dal browser non rispondono alla domanda giusta:
 * aprendo il manifest a mano si è connessi e i cookie partono, mentre iOS lo
 * scarica senza credenziali. Qui la richiesta viene rifatta come la fa il
 * sistema, dall'interno dell'app installata.
 *
 * Da togliere appena la causa è identificata.
 */
export function Diagnostica() {
  const [righe, setRighe] = useState<string[] | null>(null);

  useEffect(() => {
    const out: string[] = [];

    // Modalità autonoma per le due strade: quella storica di iOS e quella
    // che dipende dal manifest. Se differiscono, il manifest non è stato letto.
    const legacy = (window.navigator as { standalone?: boolean }).standalone;
    out.push(`autonoma (iOS storico): ${legacy === undefined ? "non esposto" : legacy}`);
    out.push(
      `autonoma (da manifest): ${window.matchMedia("(display-mode: standalone)").matches}`,
    );
    out.push(`origine: ${window.location.origin}`);
    out.push(`pagina: ${window.location.pathname}`);

    // La richiesta com'è fatta davvero dal sistema: senza credenziali.
    fetch("/manifest.webmanifest", { credentials: "omit" })
      .then(async (r) => {
        const tipo = r.headers.get("content-type") ?? "?";
        out.push(`manifest: ${r.status} · ${tipo.split(";")[0]}`);
        const testo = await r.text();
        if (testo.trimStart().startsWith("{")) {
          const m = JSON.parse(testo);
          out.push(`  scope: ${m.scope} · start_url: ${m.start_url} · display: ${m.display}`);
        } else {
          out.push(`  NON è il manifest: arriva ${testo.trimStart().slice(0, 40)}…`);
        }
      })
      .catch((e) => out.push(`manifest: richiesta fallita (${String(e).slice(0, 60)})`))
      .finally(() => setRighe([...out]));
  }, []);

  if (!righe) return null;

  return (
    <details className="mt-8 rounded-2xl border border-black/10 bg-surface-muted p-4">
      <summary className="cursor-pointer text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
        Diagnosi installazione
      </summary>
      <ul className="mt-3 space-y-1">
        {righe.map((r, i) => (
          <li key={i} className="font-mono text-[11px] leading-relaxed break-all">
            {r}
          </li>
        ))}
      </ul>
    </details>
  );
}
