import type { BityMood, BityTint } from "@/components/Bity";

/**
 * Le cartoline.
 *
 * Non danno XP e non spostano la classifica: se lo facessero, due amici che se
 * le scambiano a vicenda la falserebbero, e la classifica e' la cosa che in
 * questa sezione deve restare vera. Quello che danno e' un messaggio che non
 * hai dovuto scrivere tu — che e' esattamente il motivo per cui la gente manda
 * le cartoline.
 *
 * Si sbloccano con gli XP, quindi ricevere una "Stella" dice anche quanta
 * strada ha fatto chi te l'ha mandata: il regalo porta con se' la fatica di
 * chi l'ha guadagnato.
 *
 * ATTENZIONE — le soglie sono scritte anche nella tabella gift_catalog, ed e'
 * quella che comanda. Il controllo non puo' stare qui: questo file finisce nel
 * browser, e chi chiama la funzione per conto suo se lo salterebbe. Cambiando
 * un minXp va cambiata anche la riga nel database.
 */
export interface Cartolina {
  id: string;
  nome: string;
  /** La frase stampata sulla cartolina. Parla al destinatario. */
  frase: string;
  /** XP che il mittente deve avere per poterla mandare. */
  minXp: number;
  mood: BityMood;
  tint: BityTint;
}

export const CARTOLINE: Cartolina[] = [
  {
    id: "ciao",
    nome: "Un saluto",
    frase: "Ehi. Ti ho visto qui dentro e mi ha fatto piacere.",
    minXp: 0,
    mood: "felice",
    tint: "mint",
  },
  {
    id: "forza",
    nome: "Forza",
    frase: "So che oggi era di quelli storti. Domani la serie riparte.",
    minXp: 150,
    mood: "curioso",
    tint: "sky",
  },
  {
    id: "bravo",
    nome: "Bravo",
    frase: "Quel modulo non era semplice, e l'hai chiuso. Ci voleva.",
    minXp: 400,
    mood: "esulta",
    tint: "butter",
  },
  {
    id: "caffe",
    nome: "Un caffè",
    frase: "Offro io. Poi però torni a studiare.",
    minXp: 800,
    mood: "assonnato",
    tint: "blush",
  },
  {
    id: "scintilla",
    nome: "La scintilla",
    frase: "Hai capito una cosa che ieri non vedevi. Succede solo a chi insiste.",
    minXp: 1500,
    mood: "sicuro",
    tint: "mint",
  },
  {
    id: "corona",
    nome: "La corona",
    frase: "Questa settimana comandi tu. Me lo segno.",
    minXp: 2600,
    mood: "fiero",
    tint: "butter",
  },
  {
    id: "faro",
    nome: "Il faro",
    frase: "Quando non so da che parte girarmi, guardo cosa faresti tu.",
    minXp: 4500,
    mood: "pensieroso",
    tint: "plum",
  },
  {
    id: "stella",
    nome: "La stella",
    frase: "Sei arrivato dove quasi nessuno arriva. Buon viaggio, davvero.",
    minXp: 7000,
    mood: "trionfante",
    tint: "plum",
  },
];

export function cartolina(id: string): Cartolina | undefined {
  return CARTOLINE.find((c) => c.id === id);
}

/** Quelle che si possono mandare con gli XP che si hanno adesso. */
export function cartolineSbloccate(xp: number): Cartolina[] {
  return CARTOLINE.filter((c) => c.minXp <= xp);
}

/** La prima ancora chiusa: serve a dire quanto manca, non solo che manca. */
export function prossimaCartolina(xp: number): Cartolina | null {
  return CARTOLINE.find((c) => c.minXp > xp) ?? null;
}

/** Quante se ne possono mandare in un giorno. Lo stesso numero e' nel database. */
export const CARTOLINE_AL_GIORNO = 5;
