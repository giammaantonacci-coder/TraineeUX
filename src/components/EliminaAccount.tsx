"use client";

import { useActionState, useState } from "react";
import { eliminaAccount, type AuthResult } from "@/app/actions";

const initial: AuthResult = {};

/**
 * Il modulo di cancellazione.
 *
 * Sta su una pagina sua e non dentro il profilo: un'azione irreversibile non
 * deve poter essere sfiorata scorrendo verso il fondo di una schermata che si
 * apre per altri motivi.
 *
 * Il pulsante resta spento finche' la parola non e' scritta per intero. La
 * verifica vera e' comunque nel server, questa serve solo a non far arrivare
 * in fondo chi ha aperto la pagina per curiosita'.
 */
export function EliminaAccount() {
  const [state, action, pending] = useActionState(eliminaAccount, initial);
  const [conferma, setConferma] = useState("");
  const pronto = conferma.trim().toUpperCase() === "ELIMINA";

  return (
    <form action={action} className="mt-6">
      <label htmlFor="conferma" className="block text-sm font-bold">
        Scrivi <span className="font-extrabold">ELIMINA</span> per confermare
      </label>
      <input
        id="conferma"
        name="conferma"
        type="text"
        value={conferma}
        onChange={(e) => setConferma(e.target.value)}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        aria-describedby={state.error ? "errore-elimina" : undefined}
        className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base font-semibold outline-none focus:border-ink"
      />

      {state.error ? (
        <p id="errore-elimina" role="alert" className="mt-3 text-sm font-semibold text-blush-deep">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!pronto || pending}
        className="tappable mt-5 w-full rounded-full bg-ink px-5 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {pending ? "Eliminazione in corso…" : "Elimina definitivamente l'account"}
      </button>
    </form>
  );
}
