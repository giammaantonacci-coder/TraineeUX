"use client";

import { useActionState, useState } from "react";
import {
  accediConProvider,
  rimandaConferma,
  signIn,
  signUp,
  type AuthResult,
} from "@/app/actions";
import { ACCESSI_ESTERNI } from "@/lib/supabase/config";

const initial: AuthResult = {};

/** L'ordine e' quello in cui compaiono; l'elenco acceso arriva dalle env var. */
const ESTERNI = [
  { id: "google", etichetta: "Continua con Google", marchio: <MarchioGoogle /> },
  { id: "apple", etichetta: "Continua con Apple", marchio: <MarchioApple /> },
];

export function AuthPanel() {
  const [mode, setMode] = useState<"accedi" | "registrati">("registrati");
  const [signInState, signInAction, signInPending] = useActionState(signIn, initial);
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, initial);
  const [provState, provAction, provPending] = useActionState(accediConProvider, initial);

  const isSignUp = mode === "registrati";
  const state = isSignUp ? signUpState : signInState;
  const pending = isSignUp ? signUpPending : signInPending;

  // L'errore del provider non appartiene al modulo di sotto: viene da un
  // pulsante diverso e va mostrato dove si e' premuto.
  const erroreProvider = provState.error;

  const esterni = ESTERNI.filter((p) => ACCESSI_ESTERNI.includes(p.id));

  return (
    <div className="card-dark p-6 md:p-7">
      <div
        role="tablist"
        aria-label="Accedi o registrati"
        className="mb-6 flex gap-1 rounded-full bg-white/10 p-1"
      >
        {(["registrati", "accedi"] as const).map((value) => (
          <button
            key={value}
            role="tab"
            type="button"
            aria-selected={mode === value}
            onClick={() => setMode(value)}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-bold capitalize transition-colors ${
              mode === value ? "bg-white text-ink" : "text-white/70 hover:text-white"
            }`}
          >
            {value === "registrati" ? "Crea account" : "Accedi"}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-bold">
        {isSignUp ? "Inizia ad allenarti" : "Bentornato"}
      </h2>
      <p className="mt-1 text-sm text-white/60">
        {isSignUp
          ? "I progressi restano legati al tuo account: puoi allenarti da qualsiasi dispositivo."
          : "Riprendi da dove avevi lasciato."}
      </p>

      {/* Gli accessi esterni stanno sopra il modulo, non sotto: chi ne usa uno
          non deve leggere tre campi prima di scoprire che non gli servono. Non
          c'e' distinzione fra creare ed entrare, perche' dalla parte del
          provider non esiste: il primo accesso crea l'account, i successivi lo
          ritrovano.
          Compaiono solo quelli accesi: un pulsante che porta a una schermata di
          errore vale meno di un pulsante che non c'e'. */}
      {esterni.length > 0 ? (
        <>
          <div className="mt-6 space-y-2.5">
            {esterni.map((p) => (
              <form key={p.id} action={provAction}>
                <input type="hidden" name="provider" value={p.id} />
                <BottoneProvider disabled={provPending} etichetta={p.etichetta}>
                  {p.marchio}
                </BottoneProvider>
              </form>
            ))}
          </div>

          {erroreProvider ? (
            <p
              role="alert"
              className="mt-3 rounded-2xl bg-blush/20 px-4 py-3 text-sm font-medium text-blush"
            >
              {erroreProvider}
            </p>
          ) : null}

          <div className="my-6 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-white/15" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
              oppure
            </span>
            <span className="h-px flex-1 bg-white/15" />
          </div>
        </>
      ) : null}

      <form
        key={mode}
        action={isSignUp ? signUpAction : signInAction}
        className={esterni.length > 0 ? "space-y-4" : "mt-6 space-y-4"}
      >
        {isSignUp ? (
          <Field
            id="display_name"
            name="display_name"
            label="Come ti chiami"
            type="text"
            autoComplete="name"
            hint="Comparirà nel saluto della home. Puoi mettere solo il nome."
          />
        ) : null}

        <Field
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
        />

        <Field
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          hint={isSignUp ? "Almeno 8 caratteri." : undefined}
        />

        {state.error ? (
          <p
            role="alert"
            className="rounded-2xl bg-blush/20 px-4 py-3 text-sm font-medium text-blush"
          >
            {state.error}
          </p>
        ) : null}

        {state.message ? (
          <p
            role="status"
            className="rounded-2xl bg-mint/20 px-4 py-3 text-sm font-medium text-mint"
          >
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Un attimo…" : isSignUp ? "Crea account e inizia" : "Entra"}
        </button>
      </form>

      {state.emailDaConfermare ? (
        <RimandaConferma email={state.emailDaConfermare} />
      ) : null}
    </div>
  );
}

/**
 * Il rimando dell'email di conferma.
 *
 * Compare solo dopo un'iscrizione o dopo un accesso rifiutato per indirizzo non
 * confermato: e' l'unica volta in cui serve, e prima non significherebbe
 * niente. Sta fuori dal modulo principale perche' un modulo dentro un altro non
 * si puo' fare.
 */
function RimandaConferma({ email }: { email: string }) {
  const [state, action, pending] = useActionState(rimandaConferma, initial);

  return (
    <form action={action} className="mt-4 border-t border-white/10 pt-4">
      <input type="hidden" name="email" value={email} />
      <p className="text-sm text-white/60">Non ti è arrivata?</p>
      <button
        type="submit"
        disabled={pending}
        className="mt-1.5 text-sm font-bold text-white underline underline-offset-2 disabled:opacity-60"
      >
        {pending ? "Invio…" : "Rimanda l'email di conferma"}
      </button>
      {state.error ? (
        <p role="alert" className="mt-2 text-sm text-blush">
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p role="status" className="mt-2 text-sm text-mint">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function BottoneProvider({
  children,
  etichetta,
  disabled,
}: {
  children: React.ReactNode;
  etichetta: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {children}
      {etichetta}
    </button>
  );
}

/** Il marchio Google va riprodotto nei suoi colori, non ricolorato. */
function MarchioGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

/** Su fondo bianco il marchio Apple va nero. */
function MarchioApple() {
  return (
    <svg width="17" height="20" viewBox="0 0 17 20" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.02 10.62c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.87.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.32-3.5zM11.83 3.9c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.06 1.69-.93 2.69.97.07 1.97-.49 2.59-1.22z"
      />
    </svg>
  );
}

function Field({
  id,
  name,
  label,
  type,
  autoComplete,
  required,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required ? null : <span className="text-white/50"> (facoltativo)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="w-full rounded-2xl border border-white/25 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:border-white focus:outline-none"
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-white/50">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
