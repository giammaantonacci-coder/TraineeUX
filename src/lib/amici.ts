import "server-only";
import { createClient } from "./supabase/server";
import { levelFromModuleIds } from "./data";
import { MODULES } from "@/content";
import { MASTERY_THRESHOLD } from "./progression";
import type { LevelId, ProfileRow } from "./types";

/**
 * Il giro di amici.
 *
 * Tutto quello che riguarda gli altri passa da funzioni SECURITY DEFINER nel
 * database: le policy dicono che un profilo lo legge solo il suo proprietario,
 * ed è giusto che continuino a dirlo. Di un amico si vede quello che
 * amici_panoramica decide di mostrare — nome, XP, serie, moduli — e non una
 * riga intera con dentro anche l'ultima volta che ha aperto l'app.
 */

/** Come torna dal database: moduli grezzi, livello ancora da calcolare. */
interface RigaPanoramica {
  utente: string;
  sono_io: boolean;
  nome: string | null;
  xp: number;
  xp_settimana: number;
  serie: number;
  moduli: { m: string; p: number }[];
}

export interface RigaClassifica {
  utente: string;
  sonoIo: boolean;
  nome: string;
  xp: number;
  xpSettimana: number;
  serie: number;
  livello: LevelId;
  moduliPadroneggiati: number;
  /** 1 è il primo. Le parità dividono la stessa posizione. */
  posizione: number;
}

export interface CartolinaRicevuta {
  id: string;
  giftId: string;
  daNome: string;
  quando: string;
  visto: boolean;
}

export interface DatiAmici {
  /** Il mio codice invito. */
  codice: string | null;
  xp: number;
  classifica: RigaClassifica[];
  ricevute: CartolinaRicevuta[];
  /** Quante cartoline ho già mandato oggi: il limite è cinque. */
  mandateOggi: number;
}

/**
 * L'ordine della classifica: prima gli XP della settimana, poi quelli di
 * sempre, poi il nome.
 *
 * Il lunedì mattina la settimana è a zero per tutti, e senza il secondo
 * criterio l'ordine sarebbe quello in cui il database ha restituito le righe —
 * cioè diverso a ogni ricarica, su una schermata che deve sembrare stabile.
 */
function confronta(a: RigaPanoramica, b: RigaPanoramica): number {
  if (b.xp_settimana !== a.xp_settimana) return b.xp_settimana - a.xp_settimana;
  if (b.xp !== a.xp) return b.xp - a.xp;
  return (a.nome ?? "").localeCompare(b.nome ?? "", "it");
}


export async function getDatiAmici(): Promise<DatiAmici | null> {
  const supabase = await createClient();

  let userId: string | null = null;
  try {
    const { data } = await supabase.auth.getClaims();
    userId = data?.claims?.sub ?? null;
  } catch {
    return null;
  }
  if (!userId) return null;

  const [profiloRes, panoramicaRes, regaliRes, oggiRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.rpc("amici_panoramica"),
    supabase.rpc("regali_ricevuti"),
    // Il conteggio del giorno serve solo a scrivere quante ne restano, ma il
    // taglio della giornata lo dà il database: rifarlo qui voleva dire
    // riscrivere l'ora legale italiana a mano, e sbagliarla per metà anno.
    supabase.rpc("cartoline_mandate_oggi"),
  ]);

  const profile = (profiloRes.data as ProfileRow | null) ?? null;
  const righe = (panoramicaRes.data as RigaPanoramica[] | null) ?? [];

  const ordinate = [...righe].sort(confronta);
  const classifica: RigaClassifica[] = ordinate.map((r, i) => {
    // La parità condivide la posizione: due amici fermi entrambi a zero sono
    // primi a pari merito, e numerarli 1 e 2 direbbe una cosa falsa.
    const prec = i > 0 ? ordinate[i - 1] : null;
    const stessoDiPrima =
      prec !== null && prec.xp_settimana === r.xp_settimana && prec.xp === r.xp;
    return {
      utente: r.utente,
      sonoIo: r.sono_io,
      nome: r.nome?.trim() || "Designer",
      xp: r.xp,
      xpSettimana: r.xp_settimana,
      serie: r.serie,
      livello: levelFromModuleIds(r.moduli.map((m) => m.m)),
      moduliPadroneggiati: r.moduli.filter(
        (m) => m.p >= MASTERY_THRESHOLD && MODULES.some((mod) => mod.id === m.m),
      ).length,
      posizione: stessoDiPrima ? 0 : i + 1,
    };
  });
  // Il secondo passaggio riempie le posizioni lasciate a zero dalle parità.
  for (let i = 1; i < classifica.length; i++) {
    if (classifica[i].posizione === 0) classifica[i].posizione = classifica[i - 1].posizione;
  }

  const ricevute = (
    (regaliRes.data as
      | { id: string; gift_id: string; da_nome: string | null; quando: string; visto: boolean }[]
      | null) ?? []
  ).map((r) => ({
    id: r.id,
    giftId: r.gift_id,
    daNome: r.da_nome?.trim() || "Un amico",
    quando: r.quando,
    visto: r.visto,
  }));

  return {
    codice: profile?.friend_code ?? null,
    xp: profile?.xp ?? 0,
    classifica,
    ricevute,
    mandateOggi: (oggiRes.data as number | null) ?? 0,
  };
}

export interface AnteprimaInvito {
  nome: string;
  sonoIo: boolean;
  giaAmico: boolean;
}

/**
 * Chi c'è dietro un codice, prima di accettare.
 *
 * Il nome arrivava già da aggiungi_amico, ma solo dopo aver creato
 * l'amicizia — cioè dopo la decisione. Qui si legge senza scrivere niente,
 * così la domanda che si fa a chi apre un invito è «vuoi entrare nel giro di
 * Chiara» e non «vuoi entrare nel giro di H6DVNG97».
 *
 * Torna null se il codice non è di nessuno: quello non è un errore da
 * mostrare rosso, è un invito scaduto o copiato male.
 */
export async function anteprimaInvito(codice: string): Promise<AnteprimaInvito | null> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("anteprima_invito", { p_codice: codice });
  const riga = (
    data as { nome: string | null; sono_io: boolean; gia_amico: boolean }[] | null
  )?.[0];
  if (!riga) return null;
  return {
    nome: riga.nome?.trim() || "Un designer",
    sonoIo: riga.sono_io,
    giaAmico: riga.gia_amico,
  };
}
