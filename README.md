# TraineeUX

App di allenamento in UX e product design: percorso a cinque livelli (Intermedio →
Avanzato → Senior → Lead/Principal → Expert), 12 moduli, esercizi in quattro
formati, progressi con XP e premi, e una sezione news con feed reali e schede
sulle aziende del settore. Contenuti in italiano.

## Come funziona

- **Quiz** — domande a scelta singola su principi e metodo, con spiegazione ragionata.
- **Critique** — interfacce reali (renderizzate in app) da esaminare con una lente
  precisa. Alcune osservazioni sono distrattori: segnalarle costa punti.
- **Scenario** — decisioni professionali con conseguenze rivelate solo alla consegna.
- **Brief a tempo** — problema aperto, risposta scritta, autovalutazione su rubrica e
  confronto con una risposta esperta.

Le soluzioni non vengono mai inviate al browser: la correzione avviene in una Server
Action, e al client arriva solo una proiezione pubblica dell'esercizio.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- Supabase per autenticazione e persistenza (RLS attiva su tutte le tabelle)
- Feed RSS aggregati lato server con revalidate oraria

## Sviluppo locale

```bash
npm install
npm run dev
```

Le chiavi pubbliche Supabase hanno un fallback in `src/lib/supabase/config.ts`.
Per puntare a un altro progetto, imposta:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

## Deploy su Vercel

1. Importa il repository su Vercel (framework rilevato automaticamente: Next.js).
2. Nessuna variabile d'ambiente è obbligatoria: le chiavi pubbliche hanno un fallback.
   Impostale comunque se vuoi separare gli ambienti.
3. Nel pannello Supabase → Authentication → URL Configuration, imposta la **Site URL**
   sul dominio Vercel e aggiungi `https://<dominio>/auth/confirm` fra le Redirect URLs.

## Schema del database

Migrazioni applicate al progetto Supabase:

- `profiles` — XP, serie giornaliera, nome visualizzato (creata da trigger alla registrazione)
- `attempts` — ogni consegna, con punteggio, XP e risposta in JSON
- `module_progress` — riepilogo per modulo (miglior punteggio, esercizi completati)
- `badges` — premi sbloccati
- `record_attempt()` — funzione che registra il tentativo, aggiorna XP, serie e
  riepilogo del modulo in una sola transazione
