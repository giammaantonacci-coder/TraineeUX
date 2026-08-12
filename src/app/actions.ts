"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { origineRichiesta } from "@/lib/origine";
import { getExercise, modulesByLevel } from "@/content";
import { gradeExercise, type ExerciseAnswer, type GradeResult } from "@/lib/grading";
import { xpForAttempt } from "@/lib/progression";
import { earnedBadgeIds } from "@/content/badges";
import type { AttemptRow, ModuleProgressRow } from "@/lib/types";

export interface SubmitResult {
  ok: boolean;
  error?: string;
  grade?: GradeResult;
  xpAwarded?: number;
  totalXp?: number;
  streak?: number;
  newBadgeIds?: string[];
}

export async function submitExercise(
  moduleId: string,
  exerciseId: string,
  answer: ExerciseAnswer,
  durationSeconds?: number,
): Promise<SubmitResult> {
  const found = getExercise(moduleId, exerciseId);
  if (!found) return { ok: false, error: "Esercizio non trovato." };
  const { module, exercise } = found;

  if (answer.type !== exercise.type) {
    return { ok: false, error: "Risposta non valida per questo esercizio." };
  }

  const supabase = await createClient();
  // Firma verificata invece di un giro sul server di autenticazione: la
  // consegna è il momento in cui l'attesa si nota di più.
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) return { ok: false, error: "Sessione scaduta. Rientra e riprova." };

  // La correzione avviene qui: le soluzioni non sono mai state inviate al client.
  const grade = gradeExercise(exercise, answer);
  const xp = xpForAttempt(exercise.type, module.level, grade.scorePct);

  const { data, error } = await supabase.rpc("record_attempt", {
    p_module_id: moduleId,
    p_exercise_id: exerciseId,
    p_exercise_type: exercise.type,
    p_score: grade.score,
    p_max_score: grade.maxScore,
    p_xp: xp,
    p_module_exercise_count: module.exercises.length,
    p_duration_seconds: durationSeconds ?? null,
    p_answer: answer as unknown as Record<string, unknown>,
  });

  if (error) {
    return { ok: false, error: `Non siamo riusciti a salvare il tentativo: ${error.message}` };
  }

  const stats = (data ?? {}) as {
    total_xp?: number;
    streak?: number;
  };

  const newBadgeIds = await syncBadges(supabase, userId, stats.streak ?? 0);

  revalidatePath("/");
  // "/oggi" serve la stessa schermata per le installazioni gia' esistenti
  revalidatePath("/oggi");
  revalidatePath("/percorso");
  revalidatePath(`/percorso/${moduleId}`);
  revalidatePath("/profilo");

  return {
    ok: true,
    grade,
    xpAwarded: xp,
    totalXp: stats.total_xp,
    streak: stats.streak,
    newBadgeIds,
  };
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/** Ricalcola i badge meritati e inserisce solo quelli nuovi. */
async function syncBadges(
  supabase: SupabaseServerClient,
  userId: string,
  streak: number,
): Promise<string[]> {
  const [attemptsRes, progressRes, existingRes] = await Promise.all([
    supabase
      .from("attempts")
      .select("module_id, exercise_type, score, max_score")
      .eq("user_id", userId),
    supabase.from("module_progress").select("*").eq("user_id", userId),
    supabase.from("badges").select("badge_id").eq("user_id", userId),
  ]);

  const attempts = (attemptsRes.data ?? []) as Pick<
    AttemptRow,
    "module_id" | "exercise_type" | "score" | "max_score"
  >[];
  const progress = (progressRes.data ?? []) as ModuleProgressRow[];
  const existing = new Set(
    ((existingRes.data ?? []) as { badge_id: string }[]).map((b) => b.badge_id),
  );

  const earned = earnedBadgeIds({
    attempts,
    progress,
    streak,
    intermedioModuleIds: modulesByLevel("intermedio").map((m) => m.id),
    seniorModuleIds: modulesByLevel("senior").map((m) => m.id),
  });

  const fresh = earned.filter((id) => !existing.has(id));
  if (fresh.length > 0) {
    await supabase
      .from("badges")
      .insert(fresh.map((badge_id) => ({ user_id: userId, badge_id })));
  }
  return fresh;
}

/* ------------------------------------------------------------------ */
/* Autenticazione                                                      */
/* ------------------------------------------------------------------ */

export interface AuthResult {
  error?: string;
  message?: string;
  /** Valorizzato quando l'unico ostacolo e' la conferma non ancora aperta. */
  emailDaConfermare?: string;
}

/** I due accessi esterni. L'elenco vive qui e non nel modulo del browser. */
const PROVIDER = {
  google: "Google",
  apple: "Apple",
} as const;

type ProviderId = keyof typeof PROVIDER;

function isProvider(v: string): v is ProviderId {
  return Object.hasOwn(PROVIDER, v);
}

/**
 * Accesso con Google o con Apple.
 *
 * Non facciamo noi il giro: chiediamo a Supabase l'indirizzo del provider e ci
 * mandiamo il browser. Da li' si torna su /auth/callback con un codice usa e
 * getta, che diventa una sessione.
 *
 * Il provider arriva dal modulo, quindi si controlla contro un elenco chiuso:
 * `signInWithOAuth` accetta una ventina di provider, e senza controllo
 * chiunque potrebbe farne partire uno che non abbiamo configurato ne' voluto.
 */
export async function accediConProvider(
  _prev: AuthResult,
  formData: FormData,
): Promise<AuthResult> {
  const scelto = String(formData.get("provider") ?? "");
  if (!isProvider(scelto)) return { error: "Metodo di accesso non riconosciuto." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: scelto,
    options: { redirectTo: `${await origineRichiesta()}/auth/callback` },
  });

  if (error || !data?.url) {
    return {
      error: `Non siamo riusciti ad aprire l'accesso con ${PROVIDER[scelto]}. Riprova, oppure entra con email e password.`,
    };
  }

  redirect(data.url);
}

export async function signIn(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Inserisci email e password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // "Email not confirmed" arriva a chi si e' iscritto e non ha ancora aperto
    // il link. Lasciato in inglese com'e', sembra un guasto: e' invece l'unico
    // errore di questa schermata che si risolve senza fare niente qui dentro.
    if (error.message === "Email not confirmed") {
      return {
        error:
          "Devi prima confermare l'indirizzo: apri l'email che ti abbiamo mandato. Se non la trovi, guarda nello spam.",
        emailDaConfermare: email,
      };
    }
    return {
      error:
        error.message === "Invalid login credentials"
          ? "Email o password non corrispondono. Se non hai ancora un account, creane uno qui sotto."
          : error.message,
    };
  }
  redirect("/");
}

/**
 * Rimanda l'email di conferma.
 *
 * Serve piu' spesso di quanto sembri: la prima finisce nello spam, oppure si
 * chiude la scheda prima di aprirla. Senza questo, l'unica via d'uscita e'
 * iscriversi di nuovo con un altro indirizzo.
 */
export async function rimandaConferma(
  _prev: AuthResult,
  formData: FormData,
): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Manca l'indirizzo a cui rimandarla." };

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: `${await origineRichiesta()}/auth/confirm` },
  });

  // Un errore qui e' quasi sempre il limite di invii ravvicinati. Non si
  // riporta la frase del server: direbbe "over_email_send_rate_limit".
  if (error) {
    return {
      error:
        "Abbiamo gia' mandato un'email da poco. Aspetta qualche minuto prima di chiederne un'altra.",
    };
  }

  return { message: `Email rimandata a ${email}. Controlla anche lo spam.` };
}

export async function signUp(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim();

  if (!email || !password) return { error: "Inserisci email e password." };
  if (password.length < 8)
    return { error: "La password deve avere almeno 8 caratteri." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || email.split("@")[0] },
      emailRedirectTo: `${await origineRichiesta()}/auth/confirm`,
    },
  });

  if (error) return { error: error.message };

  // Se la conferma email è disattivata, la sessione c'è già: entra subito.
  if (data.session) redirect("/");

  return {
    message: `Account creato. Ti abbiamo mandato un'email a ${email}: aprila per confermare l'indirizzo, poi torna qui e accedi.`,
    emailDaConfermare: email,
  };
}

/**
 * Cancellazione dell'account.
 *
 * Il lavoro vero lo fa `elimina_account` dentro Postgres: togliere la riga da
 * auth.users porta via in cascata profilo, tentativi, progressi, badge,
 * preferenze, iscrizioni push e notifiche. Qui non si elenca niente, perche'
 * un elenco scritto in TypeScript resterebbe indietro alla prima tabella
 * nuova, mentre i vincoli nel database no.
 *
 * La funzione non riceve l'identita' da noi: la legge dal token della
 * sessione. Anche manomettendo il modulo, non c'e' un id di qualcun altro da
 * mandare.
 *
 * La parola da scrivere non e' teatro: questa e' l'unica azione dell'app che
 * non si puo' annullare, e un pulsante da solo si preme per sbaglio.
 */
export async function eliminaAccount(
  _prev: AuthResult,
  formData: FormData,
): Promise<AuthResult> {
  const conferma = String(formData.get("conferma") ?? "")
    .trim()
    .toUpperCase();
  if (conferma !== "ELIMINA") {
    return { error: "Per confermare, scrivi ELIMINA nel campo qui sopra." };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("elimina_account");
  if (error) {
    return {
      error:
        "Non siamo riusciti a eliminare l'account. Riprova fra poco: l'account è intatto e non si è perso niente.",
    };
  }

  // La sessione punta a un utente che non esiste piu': senza questo, il
  // cookie resta nel browser e ogni schermata proverebbe a leggere i dati di
  // un id cancellato.
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/benvenuto");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  // Ora che il router tiene in cache le schermate per qualche secondo, uscire
  // senza svuotarla lascerebbe i progressi di chi esce a disposizione di chi
  // entra dopo sullo stesso dispositivo.
  revalidatePath("/", "layout");
  redirect("/benvenuto");
}
