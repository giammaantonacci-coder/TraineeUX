"use client";

import { useEffect, useRef, useState } from "react";
import { BITY_MOOD_BY_LEVEL, Bity, type BityMood } from "@/components/Bity";
import { LEVELS } from "@/lib/progression";
import type { LevelId } from "@/lib/types";

/**
 * Bity in home, e la scheda che si apre toccandola.
 *
 * Bity cambia colore col livello raggiunto da quando esiste, ma quel colore
 * non era spiegato da nessuna parte: chi lo notava non aveva modo di sapere
 * cosa volesse dire, e chi non lo notava si perdeva l'unico segno di progresso
 * che l'app mostra fuori dalle schermate dei numeri. Toccarla apre la scala
 * intera, con il gradino su cui sei.
 *
 * La mascotte era già l'elemento che più invita a essere toccato — è tonda, si
 * muove, guarda — e finora non succedeva niente. Questo è il posto dove
 * quell'invito viene mantenuto.
 */
export function LivelliBity({
  mood,
  livello,
  svolti,
  className = "",
}: {
  mood: BityMood;
  /** livello più alto in cui hai messo piede: è quello che colora Bity */
  livello: LevelId;
  svolti: number;
  className?: string;
}) {
  const scheda = useRef<HTMLDialogElement>(null);
  const [aperta, setAperta] = useState(false);

  // showModal e non l'attributo open: la versione modale è quella che porta
  // con sé il fondo scuro, la trappola del focus e la chiusura con Esc. Senza,
  // andrebbero riscritte tutte e tre a mano, peggio.
  useEffect(() => {
    const d = scheda.current;
    if (!d) return;
    if (aperta && !d.open) d.showModal();
    if (!aperta && d.open) d.close();
  }, [aperta]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAperta(true)}
        aria-haspopup="dialog"
        aria-label="I livelli del percorso, e dove sei"
        className={`tappable shrink-0 rounded-full ${className}`}
      >
        {/* alive resta acceso: la mascotte respira anche dentro un pulsante,
            ed è metà del motivo per cui viene voglia di toccarla. */}
        <Bity mood={mood} level={livello} size={56} float aria-hidden />
      </button>

      <dialog
        ref={scheda}
        // close scatta anche per Esc e per il gesto del sistema, non solo dal
        // nostro pulsante: senza questo, lo stato resterebbe "aperta" a scheda
        // già chiusa e il secondo tocco su Bity non farebbe niente.
        onClose={() => setAperta(false)}
        // Il click sul fondo scuro arriva alla dialog stessa e non ai figli:
        // è così che si distingue "fuori" da "dentro" senza un velo finto.
        onClick={(e) => {
          if (e.target === scheda.current) setAperta(false);
        }}
        /* Galleggia, non è attaccata al bordo.
           Prima era un foglio incollato in basso, arrotondato solo sopra: la
           forma di un cassetto che esce dal telefono. Qui è una scheda che sta
           per conto suo — margine su tutti e quattro i lati, angoli tondi
           ovunque, e un'ombra profonda che la stacca dal fondo scuro.
           Il centraggio è con i margini automatici e non con una
           trasformazione: la trasformazione è una proprietà sola, e servendo a
           tenerla al centro non sarebbe più disponibile per l'animazione di
           entrata. Così restano indipendenti. */
        className="scheda fixed inset-x-4 inset-y-9 m-auto h-fit max-h-[calc(100dvh-4.5rem)] max-w-[32rem] overflow-y-auto rounded-[28px] border-0 bg-canvas p-0 text-ink shadow-[0_4px_16px_rgba(15,17,23,0.10),0_40px_80px_-32px_rgba(15,17,23,0.65)] backdrop:bg-ink/45"
      >
        {/* Il focus entra qui e non sulla X.
            showModal lo mette sul primo elemento raggiungibile, che era il
            pulsante di chiusura: da tastiera e' giusto, ma il browser disegna
            l'anello di focus anche quando la scheda si e' aperta con un dito,
            e restava un riquadro attorno alla X senza che nessuno avesse
            usato la tastiera. Con autofocus su un contenitore non
            raggiungibile con Tab, il focus e' comunque dentro la scheda —
            quindi Tab, Esc e gli screen reader continuano a funzionare — ma
            non si posa su niente che abbia un anello da mostrare. */}
        <div autoFocus tabIndex={-1} className="p-5 outline-none">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-extrabold tracking-tight">
                I cinque livelli
              </h2>
              <p className="mt-1 text-sm leading-snug text-ink-muted">
                Bity prende il colore del livello più alto in cui hai messo
                piede. Basta averlo cominciato.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAperta(false)}
              aria-label="Chiudi"
              className="tappable -mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-muted active:bg-black/5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <ul className="mt-5 space-y-2">
            {LEVELS.map((l, i) => {
              const qui = l.id === livello;
              return (
                <li
                  key={l.id}
                  className={`flex items-center gap-3 rounded-2xl p-3 ${
                    qui ? "bg-ink text-white" : "bg-black/[0.03]"
                  }`}
                >
                  {/* Un Bity per livello, nel suo colore e con la sua faccia:
                      sono le stesse due cose che cambiano in home salendo di
                      livello, quindi questa fila e' la legenda di quella
                      mascotte. L'espressione sale con la scala — neutra,
                      felice, sicura, fiera, trionfante — e la sicurezza che
                      cresce si legge prima dei sottotitoli.
                      Il seme sfasa i respiri, che all'unisono sembrerebbero
                      finti. */}
                  <Bity
                    mood={BITY_MOOD_BY_LEVEL[l.id]}
                    level={l.id}
                    size={40}
                    seed={i}
                    className="shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="font-bold">{l.name}</span>
                      {/* A zero esercizi il primo livello resta acceso —
                          Bity e' del suo colore e la scheda deve spiegarlo —
                          ma non si dice "sei qui" a chi non e' ancora
                          partito: sarebbe smentito dalla frase qui sotto. */}
                      {qui ? (
                        <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-ink">
                          {svolti === 0 ? "Si parte da qui" : "Sei qui"}
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={`mt-0.5 text-[13px] leading-snug ${
                        qui ? "text-white/70" : "text-ink-muted"
                      }`}
                    >
                      {l.subtitle}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 rounded-2xl bg-mint/30 p-4 text-[15px] leading-relaxed">
            {incoraggiamento(livello, svolti)}
          </p>
        </div>
      </dialog>
    </>
  );
}

/**
 * La frase in fondo.
 *
 * Cambia col punto in cui sei, perché una frase sola per tutti sarebbe finta
 * proprio con chi ha più bisogno di sentirsela dire. Chi non ha ancora
 * cominciato non riceve i complimenti per un livello che non ha toccato: gli
 * si dice qual è il primo passo e quanto costa poco.
 */
function incoraggiamento(livello: LevelId, svolti: number): string {
  if (svolti === 0) {
    return "Non hai ancora cominciato, e va bene così: il primo esercizio è quello che costa meno di tutti. Da lì Bity comincia a cambiare colore.";
  }

  switch (livello) {
    case "intermedio":
      return "Sei sulle fondamenta, ed è il livello che nessuno può saltare: tutto quello che viene dopo ci si appoggia sopra. Falle diventare automatiche e il resto arriva più veloce di quanto sembri.";
    case "avanzato":
      return "Hai smesso di ragionare per schermate singole. Da qui si lavora su sistemi, ricerca e accessibilità — è il punto in cui il mestiere comincia a somigliare a quello vero.";
    case "senior":
      return "Non risolvi più solo problemi che ti danno già inquadrati: cominci a inquadrarli tu, e a difendere le scelte con i dati. È la differenza che si sente in una riunione.";
    case "lead":
      return "Il tuo impatto passa dal lavoro degli altri, e questa è la parte che non si impara disegnando. Sei più vicino alla cima di quanto pensi.";
    case "expert":
      return "Sei in cima alla scala. Da qui la pratica la definisci, non la segui — e i problemi interessanti sono quelli senza precedenti a cui riferirsi.";
  }
}
