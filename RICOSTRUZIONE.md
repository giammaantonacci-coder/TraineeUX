# TraineeUX — Manuale di ricostruzione

Tutto quello che serve per ricreare l'app da zero: cosa fa, com'è fatta, lo
schema del database, la procedura di deploy e gli errori già incontrati.

---

## 0. Leggi questo prima di cancellare

**Il repository GitHub contiene circa 340 KB di contenuti scritti**: 12 moduli,
40 esercizi, spiegazioni ragionate, risposte esperte. Sono la parte con più
valore e più difficile da rifare — questo documento ne descrive la *struttura*,
non il testo.

Prima di cancellare qualsiasi cosa, scarica lo zip del repo:
`https://github.com/giammaantonacci-coder/TraineeUX/archive/refs/heads/main.zip`

Consiglio pratico: cancella e rifai **Vercel e Supabase**, che sono le parti
che hanno dato problemi. Il codice non ha mai fallito una build.

---

## 1. Cos'è l'app

Un'app di allenamento in UX e product design, in italiano, per chi è già a
livello intermedio e vuole arrivare a ragionare da senior, lead ed expert.

Non insegna la teoria: mette davanti a decisioni. Il valore sta nel confronto
tra la tua risposta e quella di chi il problema l'ha già affrontato.

### Struttura del percorso

Cinque livelli, con moltiplicatore XP crescente:

| Livello | Moltiplicatore | Cosa allena |
|---|---|---|
| Intermedio | ×1 | Le fondamenta che un mid deve avere automatiche |
| Avanzato | ×1,25 | Sistemi, ricerca e accessibilità |
| Senior | ×1,55 | Metriche, strategia e influenza sugli altri |
| Lead / Principal | ×1,9 | Scalare persone, piattaforme e decisioni pluriennali |
| Expert | ×2,3 | Etica, AI e problemi senza precedenti |

### I quattro formati di esercizio

| Formato | Come funziona | Punteggio |
|---|---|---|
| **Quiz** | 5 domande a scelta singola. I distrattori sono errori che si sentono davvero in riunione, non risposte assurde | 1 punto per risposta corretta |
| **Critique** | Uno schermo finto ma realistico, renderizzato in HTML dentro l'app, da esaminare con una lente dichiarata. Alcune osservazioni sono difetti veri, altre distrattori plausibili | 1 punto per ogni scelta corretta, **inclusi i distrattori non selezionati** |
| **Scenario** | Una situazione professionale e 3 decisioni in sequenza. Le conseguenze si vedono solo alla consegna | 0-3 punti per decisione |
| **Brief a tempo** | Problema aperto, risposta scritta, autovalutazione su rubrica, poi confronto con la risposta esperta | 0-2 punti per criterio |

**Regola di design centrale**: le soluzioni non arrivano mai al browser. Il
client riceve una proiezione pubblica dell'esercizio; la correzione avviene in
una Server Action. Non c'è modo di sbirciare, ed è voluto.

### Progressione e premi

- **XP** per tentativo: `base_per_tipo × moltiplicatore_livello × (0,25 + 0,75 × punteggio%)`.
  Base: quiz 40, critique 75, scenario 85, brief 110. Anche un tentativo debole
  vale il 25%: l'obiettivo è tornare domani, non punire chi sbaglia.
- **Gradi** per XP totali: Praticante 0 · Designer 400 · Senior 1200 · Lead 2600 · Principal 4500 · Expert 7000.
- **Serie giornaliera** (streak) con record storico.
- **12 badge**, ricalcolati da zero a ogni consegna (idempotenti).
- **Soglia di padronanza: 70%.**

### Capacità sbloccate

Ogni modulo dichiara 3 capacità concrete (`claim` + `signal`) e un `gapCost`.
Superata la soglia del 70%, compaiono nel profilo come cose che sai fare, non
come cose che hai studiato. È la risposta alla domanda "cosa potrei fare
sapendo queste nozioni".

### News e Aziende

- **News**: aggregatore RSS lato server di 8 fonti (NN/g, Smashing, UX
  Collective, A List Apart, GOV.UK GDS, Intercom, Shopify UX, Figma), cache di
  un'ora, filtri per argomento. Una fonte irraggiungibile non rompe la pagina.
- **Aziende**: 10 schede curate con cosa fa l'azienda, cosa si impara dal suo
  modo di lavorare e come ci si entra davvero.

---

## 2. Stack

- **Next.js 15.5** (App Router) + **TypeScript** + **Tailwind CSS 4**
- **React 19**
- **Supabase** per autenticazione e persistenza (`@supabase/ssr`, `@supabase/supabase-js`)
- **fast-xml-parser** per i feed RSS
- **server-only** per impedire che il layer dati finisca nel bundle client
- Font: **Plus Jakarta Sans** via `next/font/google`
- Node **>= 20.9**

---

## 3. Ordine di ricostruzione

1. Crea il progetto Supabase → applica lo schema (sezione 4)
2. Configura l'autenticazione Supabase (sezione 5)
3. Crea il repo GitHub e carica il codice (sezione 6)
4. Collega Vercel al repo (sezione 9)
5. Torna su Supabase e imposta gli URL con il dominio Vercel definitivo
6. Verifica con la checklist (sezione 11)

---

## 4. Schema del database

Regione consigliata: `eu-central-1` (Francoforte). Piano free sufficiente.

Incolla tutto nell'SQL Editor di Supabase, in quest'ordine.

### 4.1 Tabelle e RLS

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  xp integer not null default 0,
  streak_count integer not null default 0,
  longest_streak integer not null default 0,
  last_active_date date,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  exercise_id text not null,
  exercise_type text not null,
  score integer not null,
  max_score integer not null,
  xp_awarded integer not null default 0,
  duration_seconds integer,
  answer jsonb,
  created_at timestamptz not null default now()
);
create index if not exists attempts_user_created_idx on public.attempts (user_id, created_at desc);
create index if not exists attempts_user_module_idx on public.attempts (user_id, module_id);
alter table public.attempts enable row level security;
create policy "attempts_select_own" on public.attempts for select using (auth.uid() = user_id);
create policy "attempts_insert_own" on public.attempts for insert with check (auth.uid() = user_id);

create table if not exists public.module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  exercises_completed integer not null default 0,
  best_score_pct integer not null default 0,
  last_score_pct integer not null default 0,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_id)
);
alter table public.module_progress enable row level security;
create policy "module_progress_select_own" on public.module_progress for select using (auth.uid() = user_id);
create policy "module_progress_write_own" on public.module_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.badges (
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);
alter table public.badges enable row level security;
create policy "badges_select_own" on public.badges for select using (auth.uid() = user_id);
create policy "badges_insert_own" on public.badges for insert with check (auth.uid() = user_id);
```

### 4.2 Profilo automatico alla registrazione

```sql
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Obbligatorio: è una trigger function, non deve essere invocabile via API REST.
-- Senza questo, l'advisor di sicurezza di Supabase segnala due warning.
revoke execute on function public.handle_new_user() from anon, authenticated, public;
```

### 4.3 Registrazione del tentativo (transazione unica)

Aggiorna in un colpo solo: tentativo, XP, serie giornaliera e riepilogo del
modulo. `security invoker`, quindi rispetta le policy RLS.

```sql
create or replace function public.record_attempt(
  p_module_id text, p_exercise_id text, p_exercise_type text,
  p_score integer, p_max_score integer, p_xp integer,
  p_module_exercise_count integer,
  p_duration_seconds integer default null, p_answer jsonb default null
) returns jsonb language plpgsql security invoker set search_path = public as $$
declare
  v_user uuid := auth.uid();
  v_pct integer;
  v_today date := (now() at time zone 'utc')::date;
  v_last date; v_streak integer; v_longest integer;
  v_distinct integer; v_completed_at timestamptz; v_profile profiles%rowtype;
begin
  if v_user is null then raise exception 'not authenticated'; end if;

  insert into profiles (id) values (v_user) on conflict (id) do nothing;

  v_pct := case when p_max_score > 0
                then round((p_score::numeric / p_max_score::numeric) * 100)::int
                else 0 end;

  insert into attempts (user_id, module_id, exercise_id, exercise_type, score,
                        max_score, xp_awarded, duration_seconds, answer)
  values (v_user, p_module_id, p_exercise_id, p_exercise_type, p_score,
          p_max_score, greatest(p_xp, 0), p_duration_seconds, p_answer);

  select count(distinct exercise_id) into v_distinct
  from attempts where user_id = v_user and module_id = p_module_id;

  select last_active_date, streak_count, longest_streak
    into v_last, v_streak, v_longest
  from profiles where id = v_user for update;

  if v_last is null then v_streak := 1;
  elsif v_last = v_today then v_streak := greatest(coalesce(v_streak, 1), 1);
  elsif v_last = v_today - 1 then v_streak := coalesce(v_streak, 0) + 1;
  else v_streak := 1;
  end if;
  v_longest := greatest(coalesce(v_longest, 0), v_streak);

  update profiles
     set xp = xp + greatest(p_xp, 0), streak_count = v_streak,
         longest_streak = v_longest, last_active_date = v_today
   where id = v_user returning * into v_profile;

  v_completed_at := case
    when p_module_exercise_count > 0 and v_distinct >= p_module_exercise_count
    then now() else null end;

  insert into module_progress (user_id, module_id, exercises_completed,
                               best_score_pct, last_score_pct, completed_at, updated_at)
  values (v_user, p_module_id, v_distinct, v_pct, v_pct, v_completed_at, now())
  on conflict (user_id, module_id) do update
    set exercises_completed = excluded.exercises_completed,
        best_score_pct = greatest(module_progress.best_score_pct, excluded.best_score_pct),
        last_score_pct = excluded.last_score_pct,
        completed_at = coalesce(module_progress.completed_at, excluded.completed_at),
        updated_at = now();

  return jsonb_build_object(
    'score_pct', v_pct, 'xp_awarded', greatest(p_xp, 0),
    'total_xp', v_profile.xp, 'streak', v_profile.streak_count,
    'longest_streak', v_profile.longest_streak,
    'module_exercises_completed', v_distinct);
end;
$$;

grant execute on function public.record_attempt(
  text, text, text, integer, integer, integer, integer, integer, jsonb
) to authenticated;
```

### 4.4 Verifica

Database → Advisors → Security: deve essere vuoto.

---

## 5. Configurazione autenticazione Supabase

**Authentication → URL Configuration**
- Site URL: `https://<dominio-vercel>`
- Redirect URLs: `https://<dominio-vercel>/**`

**Authentication → Sign In / Providers → Email**
- Disattiva **Confirm email**. L'SMTP condiviso di Supabase ha limiti stretti e
  su Gmail recapita male: è la causa numero uno di "ho creato l'account e non
  riesco a entrare". Il codice gestisce comunque entrambi i casi — se la
  sessione arriva subito entra, altrimenti mostra il messaggio di conferma.

**Progetto attuale**: `traineeux-prod` (`rzrkeiudlivliapqykle`), eu-central-1.
Le chiavi sono gia' nel codice in `src/lib/supabase/config.ts`.

**Chiavi da recuperare** se ricrei il progetto (Project Settings → API):
- Project URL
- Publishable key (`sb_publishable_...`)

Entrambe sono pubbliche per progetto: finiscono nel bundle client ed è
corretto, la protezione dei dati è data da RLS, non dal segreto della chiave.

---

## 6. Struttura del codice

```
src/
  app/
    layout.tsx                 Font, metadata, html lang="it"
    page.tsx                   Redirect a /oggi
    globals.css                Design token + classi card
    actions.ts                 Server Actions: submitExercise, signIn/Up/Out
    benvenuto/page.tsx         Landing pubblica + pannello auth
    auth/confirm/route.ts      Atterraggio del link di conferma email
    (app)/
      layout.tsx               Shell: SideNav desktop + BottomNav mobile
      oggi/page.tsx            Dashboard: grado, XP, consigli, livelli
      percorso/page.tsx        I 5 livelli con i moduli
      percorso/[moduleId]/     Modulo: outcome, capacità, lezioni, esercizi
      allenamento/[moduleId]/[exerciseId]/  Runner dell'esercizio
      news/page.tsx            Feed RSS con filtri
      aziende/page.tsx         Schede aziende
      profilo/page.tsx         Statistiche, capacità sbloccate, badge
  components/
    Nav.tsx                    BottomNav a pillola flottante + SideNav
    AuthPanel.tsx              Registrazione / accesso
    ExerciseRunner.tsx         Macchina a stati: intro → svolgimento → risultato
    ui.tsx                     Pill, ScoreRing, ProgressBar, Prose, PageHeader
    mocks/index.tsx            I 5 schermi finti da criticare
  content/
    index.ts                   Aggregatore, lookup, conteggi
    modules/{intermedio,avanzato,senior,lead,expert}.ts
    badges.ts                  Definizioni + regole di assegnazione
    companies.ts               Schede aziende
  lib/
    types.ts                   Modello dei contenuti
    labels.ts                  Etichette, maxScoreFor, verdict — NIENTE contenuti
    grading.ts                 Proiezione pubblica + correzione
    progression.ts             Livelli, XP, gradi, soglia di padronanza
    data.ts                    Lettura dati utente (server-only)
    news.ts                    Fonti RSS, fetch, parsing
    supabase/{config,client,server,middleware}.ts
  middleware.ts                Refresh sessione + guardia rotte
vercel.json                    Framework, build e install command
```

### Decisioni architetturali da non perdere

**1. Le soluzioni non lasciano il server.**
`grading.ts` espone `toPublicExercise()` che rimuove risposte corrette,
spiegazioni, punteggi delle opzioni e risposte esperte. Il runner riceve solo
quella. `submitExercise` corregge sul server e restituisce il dettaglio.

**2. `lib/labels.ts` non importa mai i contenuti.**
Etichette e `verdict()` stanno lì proprio perché servono al componente client.
Se il client importa qualcosa da `@/content`, l'intero catalogo — soluzioni
comprese — finisce nel bundle del browser. È già successo: la pagina esercizio
pesava 103 kB, ora ne pesa 9.

**3. Il layer dati non fa cadere le pagine.**
`getUserData()` e il middleware avvolgono `auth.getUser()` in try/catch: se
Supabase non risponde si degrada a "non autenticato" invece di restituire 500.

**4. I mock delle critique sono HTML, non immagini.**
Sono componenti React con i difetti descritti negli esercizi. Restano nitidi a
ogni densità, si adattano allo schermo, e si modificano come codice.

---

## 7. Modello dei contenuti

Il contratto completo è in `src/lib/types.ts`. Le parti che contano:

```ts
interface Module {
  id: string;
  level: "intermedio" | "avanzato" | "senior" | "lead" | "expert";
  title: string;
  tagline: string;
  accent: "mint" | "sky" | "blush" | "butter";  // colore della card
  minutes: number;
  outcomes: string[];          // cosa saprai fare
  capabilities: Capability[];  // { claim, signal } — sbloccate sopra il 70%
  gapCost: string;             // cosa costa non saperlo
  lessons: Lesson[];           // { id, title, body: string[], source? }
  exercises: Exercise[];
}
```

Nel corpo delle lezioni, una riga che inizia con `— ` viene resa come punto
elenco. Nelle risposte esperte, `**testo**` diventa grassetto e `*testo*`
corsivo (reso da `renderInline`, senza dipendenze markdown).

```ts
// Quiz: una risposta chiaramente migliore, distrattori plausibili
{ type: "quiz", id, title, description, minutes,
  questions: [{ id, prompt, options: [{id, label}], correctId, explanation }] }

// Critique: isReal distingue difetti veri e distrattori
{ type: "critique", id, title, description, minutes, mockId, lens, context,
  issues: [{ id, label, isReal, severity: "alta"|"media"|"bassa", explanation }] }

// Scenario: score 0-3, 3 = scelta migliore
{ type: "scenario", id, title, description, minutes, setup,
  steps: [{ id, situation, question,
            options: [{ id, label, score, outcome }], debrief }] }

// Brief: autovalutazione 0-2 per criterio
{ type: "brief", id, title, description, minutes, brief,
  constraints: string[], deliverables: string[],
  rubric: [{ id, criterion, description, excellent }],
  expertAnswer: string[] }
```

### Come si scrive un esercizio che funziona

- **Quiz**: i distrattori devono essere errori che qualcuno commette davvero,
  non assurdità. La spiegazione dice perché la risposta giusta è giusta *e*
  perché quella plausibile è sbagliata.
- **Critique**: servono distrattori, altrimenti si impara a selezionare tutto.
  Almeno 2 su 7. E devono essere plausibili: idealmente l'inverso di una moda
  diffusa ma sbagliata.
- **Scenario**: nessuna opzione deve essere ovviamente stupida. Le opzioni da
  1 punto sono scelte che una persona ragionevole fa. Il debrief spiega il
  principio, non solo la risposta.
- **Brief**: la rubrica deve distinguere il 2 dall'1 in modo verificabile. La
  risposta esperta deve contenere almeno una decisione controintuitiva.

---

## 8. Catalogo completo

12 moduli, 40 esercizi.

### Livello Intermedio

**Euristiche e leggi UX, applicate** · `euristiche-avanzate` · accent mint
*Smetti di citare Nielsen a memoria: usa le euristiche come strumento diagnostico.*
- quiz `euristiche-quiz` — Diagnosi rapida
- critique `euristiche-critique-checkout` — Checkout di un e-commerce (mock `checkout`)
- scenario `euristiche-scenario-convenzione` — La navigazione che il fondatore vuole reinventare

**Architettura informativa e navigazione** · `architettura-informativa` · sky
*La struttura è il 70% dell'usabilità di un prodotto complesso.*
- quiz `ia-quiz` — Scegliere il metodo giusto
- critique `ia-critique-filtri` — Catalogo con filtri (mock `ricerca-filtri`)
- brief `ia-brief-ristrutturazione` — Ristrutturare una nav cresciuta male

**Stati, errori e microcopy** · `stati-e-microcopy` · blush
*Il prodotto vive negli stati intermedi.*
- quiz `stati-quiz` — Stati e parole
- critique `stati-critique-notifiche` — Impostazioni notifiche (mock `settings-notifiche`)
- brief `stati-brief-errore` — Il flusso che fallisce a metà

### Livello Avanzato

**Design system e token** · `design-system` · sky
- quiz `ds-quiz` — Decisioni di sistema
- critique `ds-critique-pricing` — Pagina piani (mock `pricing`)
- scenario `ds-scenario-adozione` — Il design system che nessuno usa

**Ricerca applicata al prodotto** · `ricerca-utente` · mint
- quiz `ricerca-quiz` — Metodo e rigore
- scenario `ricerca-scenario-risultati` — I dati dicono di no
- brief `ricerca-brief-piano` — Piano di ricerca in una settimana

**Accessibilità che regge un audit** · `accessibilita` · butter
- quiz `a11y-quiz` — Criteri e casi limite (WCAG 2.2, European Accessibility Act)
- critique `a11y-critique-checkout` — Lo stesso checkout, lente accessibilità
- brief `a11y-brief-piano` — Portare a conformità un prodotto esistente

### Livello Senior

**Metriche ed esperimenti** · `metriche-esperimenti` · sky
- quiz `metriche-quiz` — Leggere i numeri
- scenario `metriche-scenario-guardrail` — Il numero che sale mentre il prodotto peggiora
- brief `metriche-brief-piano` — Definire il successo prima di progettare

**Strategia di prodotto per designer** · `strategia-prodotto` · mint
- quiz `strategia-quiz` — Inquadrare il problema
- scenario `strategia-scenario-roadmap` — La roadmap che non regge
- brief `strategia-brief-riformulazione` — Riformulare una richiesta

**Influenza, critique e stakeholder** · `influenza-e-critique` · blush
- quiz `influenza-quiz` — Situazioni di stanza
- scenario `influenza-scenario-riunione` — La presentazione che va storta
- brief `influenza-brief-critique` — Rimettere in piedi le critique

### Livello Lead / Principal

**Scalare un'organizzazione di design** · `scalare-il-design` · butter
- quiz `scalare-quiz` — Decisioni da lead
- scenario `scalare-scenario-riorg` — Il team che cresce troppo in fretta
- brief `scalare-brief-livelli` — Scrivere il livello Principal

**Design di piattaforma e migrazioni** · `piattaforma-e-migrazioni` · sky
- quiz `piattaforma-quiz` — Livelli e migrazioni
- scenario `piattaforma-scenario-migrazione` — La migrazione che nessuno vuole
- brief `piattaforma-brief-redesign` — Un cambiamento che tocca 2 milioni di utenti

### Livello Expert

**Design etico e interfacce AI** · `etica-e-ai` · blush
- quiz `etica-quiz` — Confini (DSA, AI Act, dark pattern)
- critique `etica-critique-assistant` — Assistente AI finanziario (mock `ai-assistant`)
- brief `etica-brief-ai` — L'AI dove non dovrebbe stare

### I 5 mock delle critique

`checkout` · `ricerca-filtri` · `settings-notifiche` · `pricing` · `ai-assistant`

Ognuno contiene deliberatamente i difetti elencati nel proprio esercizio.
`checkout` è usato due volte, con due lenti diverse (euristiche e
accessibilità): è pedagogicamente corretto e realistico.

### I 12 badge

`primo-passo` 🌱 · `occhio-critico` 🔍 · `decisore` 🧭 · `penna-veloce` ✍️ ·
`perfezione` 💯 · `streak-7` 🔥 · `streak-30` 🏔️ · `modulo-padroneggiato` 🎯 ·
`livello-avanzato` 🚀 · `livello-senior` 👑 · `ricercatore` 🧪 · `maratoneta` 🏅

---

## 9. Design system

```css
@theme {
  --color-canvas: #ffffff;        /* sfondo pagina, bianco pieno */
  --color-surface: #ffffff;
  --color-surface-muted: #f5f7f9;
  --color-ink: #0f1117;           /* testo e card scure */
  --color-ink-muted: #5d6472;

  --color-mint: #9fe7c7;   --color-mint-deep: #6fd4a8;
  --color-sky: #a8ddf0;    --color-sky-deep: #6cc7e8;
  --color-blush: #ffb6dc;  --color-blush-deep: #ff8ec9;
  --color-butter: #ffe3a3;

  --radius-card: 28px;
}
```

Due sole superfici: `.card-light` (bianca, **filo di bordo obbligatorio** —
su fondo bianco l'ombra da sola non basta) e `.card-dark` (inchiostro).
I pastello sono riservati alle card dei moduli e alle testate degli esercizi:
essendo l'unico colore della pagina, hanno molto peso.

Font: Plus Jakarta Sans, pesi 400-800.

Focus visibile globale a 3px: l'app insegna accessibilità, deve praticarla.
`prefers-reduced-motion` azzera tutte le transizioni.

**Navigazione mobile**: pillola flottante staccata dai bordi, vetro smerigliato,
voci inattive solo icona, voce attiva con etichetta dentro un indicatore scuro
che *scorre* tra le posizioni (misurate a runtime, rimisurate al cambio rotta,
a transizione conclusa e al resize). Sopra la barra, una sfumatura dissolve il
contenuto: senza, il testo scorre leggibile sotto le etichette.

---

## 10. Deploy su Vercel

### Procedura

1. Il repo deve avere un branch **`main`** con l'app. Vercel usa `main` come
   branch di produzione predefinito: se non esiste, non c'è niente da
   costruire e *ogni* deploy risulta in errore.
2. `vercel.com/new` → importa il repo → **Deploy**, senza toccare nulla.
3. Nessuna variabile d'ambiente è obbligatoria: le chiavi pubbliche Supabase
   hanno un fallback in `src/lib/supabase/config.ts`. Per separare gli
   ambienti, imposta `NEXT_PUBLIC_SUPABASE_URL` e
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
4. Settings → **Deployment Protection** → Vercel Authentication → **Disabled**,
   altrimenti il sito risponde 403 a chiunque non sia loggato su Vercel.
5. Torna su Supabase e imposta Site URL e Redirect URLs con il dominio reale.

`vercel.json` nel repo fissa già framework, build command e install command,
quindi eventuali impostazioni sbagliate nel pannello non contano. **Unica
eccezione**: se in Settings → General c'è una **Root Directory** valorizzata,
`vercel.json` non viene nemmeno letto. Deve essere vuota.

### Trappole già incontrate

| Sintomo | Causa | Rimedio |
|---|---|---|
| Tutti i deploy in errore, build che non parte | Manca il branch `main` | Crea `main` |
| Sito risponde 403 | Deployment Protection attiva | Disattivala |
| Build fallisce solo su Vercel | Node troppo vecchio | `engines.node >= 20.9` in package.json |
| Registrazione non completa | Confirm email attivo, email non arriva | Disattiva Confirm email |
| Link di conferma va su localhost | Site URL non impostata | Impostala sul dominio Vercel |
| `npm ci` fallisce | package-lock non allineato | `npm install` e commit del lock |

---

## 11. Verifica finale

Build:
```bash
git clone <repo> verifica && cd verifica && npm ci && npm run build
```
Deve compilare senza errori e generare 12 pagine modulo.

In produzione, nell'ordine:
1. `/benvenuto` si apre senza login
2. Crea account → entri su `/oggi` con grado Praticante e 0 XP
3. `/percorso` mostra 5 livelli e 12 moduli
4. Apri un modulo → lezioni espandibili, 3 esercizi
5. Fai un quiz → alla consegna **atterri sul punteggio**, XP assegnati, serie a 1
6. Rifai lo stesso esercizio meglio → il miglior punteggio sale, i tentativi si sommano
7. Supera il 70% su un modulo → le capacità compaiono nel profilo
8. `/news` carica articoli reali (se una fonte è giù, lo dice in fondo)
9. `/profilo` mostra badge, medie per tipo di esercizio, moduli padroneggiati

Su telefono (390px o meno):
- la nav non lascia trasparire il contenuto sotto le etichette
- la barra di consegna non copre in modo permanente l'ultima risposta
- nessuno scorrimento orizzontale su nessuna pagina

---

## 12. Cosa non è ancora stato verificato

Onestà sullo stato: la sezione **News** non è mai stata vista funzionare con
feed reali, perché l'ambiente di sviluppo usato bloccava le chiamate in uscita.
Il codice gestisce le fonti irraggiungibili senza rompersi, ma il rendering con
dati veri va guardato almeno una volta.

Lo stesso vale per il flusso di autenticazione completo end-to-end e per la
persistenza reale su Supabase: schema, policy e funzione sono stati applicati e
verificati sul database, ma il giro completo dall'interfaccia è tutto da
provare al primo utilizzo.
