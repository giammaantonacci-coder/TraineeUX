"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthResult } from "@/app/actions";

const initial: AuthResult = {};

export function AuthPanel() {
  const [mode, setMode] = useState<"accedi" | "registrati">("registrati");
  const [signInState, signInAction, signInPending] = useActionState(signIn, initial);
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, initial);

  const isSignUp = mode === "registrati";
  const state = isSignUp ? signUpState : signInState;
  const pending = isSignUp ? signUpPending : signInPending;

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

      <form
        key={mode}
        action={isSignUp ? signUpAction : signInAction}
        className="mt-6 space-y-4"
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
          {pending
            ? "Un attimo…"
            : isSignUp
              ? "Crea account e inizia"
              : "Entra"}
        </button>
      </form>
    </div>
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
