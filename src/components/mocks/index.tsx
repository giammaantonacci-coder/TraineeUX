import type { ReactNode } from "react";

/**
 * Schermi finti da criticare. Sono renderizzati in HTML e contengono
 * deliberatamente i difetti descritti negli esercizi: nessuna interazione,
 * servono solo da oggetto di osservazione.
 */

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    /* È un'illustrazione, non un'interfaccia: i pulsanti finti non sono
       pulsanti. Dichiararlo evita che uno screen reader annunci controlli
       inesistenti come se fossero utilizzabili. */
    <figure className="overflow-hidden rounded-3xl border border-black/10 bg-white">
      <figcaption className="sr-only">
        Simulazione statica di uno schermo da esaminare. Gli elementi non sono
        interattivi: fanno parte dell&apos;esercizio.
      </figcaption>
      <div>
      <div className="flex items-center gap-2 border-b border-black/10 bg-[#f3f4f6] px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-md bg-white px-3 py-1 text-[11px] text-neutral-500">
          {title}
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[320px] p-5 text-neutral-900">{children}</div>
      </div>
      </div>
    </figure>
  );
}

function CheckoutMock() {
  return (
    <Frame title="shop.esempio.it/checkout">
      <div className="mx-auto max-w-md text-[13px]">
        <div className="mb-4 rounded-lg bg-[#fef2f2] px-3 py-2 text-[12px] text-[#b91c1c]">
          Si è verificato un errore. Controlla i dati inseriti.
        </div>

        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-base font-bold">Pagamento</h3>
          <span className="text-lg font-bold">947,90 €</span>
        </div>

        <div className="mb-4 space-y-3">
          <div>
            <label className="mb-1 block text-[12px] font-medium text-neutral-700">
              Indirizzo di spedizione
            </label>
            <div className="w-full rounded-md border border-[#f1f1f2] px-3 py-2 text-neutral-400">
              Via, numero civico
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-medium text-neutral-700">
              Numero carta
            </label>
            <div className="w-full rounded-md border border-[#f1f1f2] px-3 py-2 text-neutral-400">
              0000 0000 0000 0000
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <div className="mb-1 text-[12px] font-medium text-neutral-700">Scadenza</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-[#f1f1f2] px-3 py-2 text-neutral-400">
                  MM ▾
                </div>
                <div className="rounded-md border border-[#f1f1f2] px-3 py-2 text-neutral-400">
                  AA ▾
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[12px] font-medium text-neutral-700">
                CVV
              </label>
              <div className="rounded-md border border-[#f1f1f2] px-3 py-2 text-neutral-400">
                •••
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-md bg-neutral-50 p-3 text-[12px]">
          <div className="flex justify-between py-0.5">
            <span>Metodo di spedizione</span>
            <span className="text-neutral-500">Standard ▾</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-neutral-200 pt-2 font-semibold">
            <span>Totale</span>
            <span>947,90 €</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-[#111827] px-4 py-3 text-center font-semibold text-white">
            Paga ora
          </div>
          <div className="rounded-md bg-[#dc2626] px-4 py-3 text-center font-semibold text-white">
            Svuota carrello
          </div>
        </div>
      </div>
    </Frame>
  );
}

function RicercaFiltriMock() {
  return (
    <Frame title="marketplace.esempio.it/catalogo">
      <div className="grid gap-5 text-[13px] md:grid-cols-[180px_1fr]">
        <aside className="space-y-4">
          <div>
            <p className="mb-2 font-semibold">Categoria</p>
            {["Componentistica generale", "Cuscinetti", "Guarnizioni", "Motori"].map(
              (c) => (
                <label key={c} className="mb-1.5 flex items-center gap-2 text-neutral-600">
                  <span className="h-3.5 w-3.5 rounded border border-neutral-300" />
                  {c}
                </label>
              ),
            )}
          </div>
          <div>
            <p className="mb-2 font-semibold">Marca</p>
            {["Bosch", "SKF", "Festo"].map((c) => (
              <label key={c} className="mb-1.5 flex items-center gap-2 text-neutral-600">
                <span className="h-3.5 w-3.5 rounded border border-neutral-300" />
                {c}
              </label>
            ))}
          </div>
          <div>
            <p className="mb-2 font-semibold">Disponibilità</p>
            <label className="mb-1.5 flex items-center gap-2 text-neutral-600">
              <span className="h-3.5 w-3.5 rounded border border-neutral-900 bg-neutral-900" />
              Solo in magazzino
            </label>
          </div>
        </aside>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-neutral-500">
              AB-1200
            </div>
            <div className="rounded-md bg-neutral-900 px-4 py-2 font-semibold text-white">
              Cerca
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between text-[12px] text-neutral-500">
            <span>0 risultati</span>
            <span>Ordina per: Rilevanza ▾</span>
          </div>
          <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-dashed border-neutral-200 text-neutral-400">
            Nessun risultato
          </div>
        </div>
      </div>
    </Frame>
  );
}

function SettingsNotificheMock() {
  const rows = [
    { label: "Tutte le notifiche", hint: "Attiva o disattiva ogni comunicazione", on: false },
    { label: "Notifiche intelligenti", hint: "Powered by AI", on: true },
    { label: "Menzioni nei commenti", hint: "Quando qualcuno ti nomina", on: true },
    { label: "Scadenze imminenti", hint: "Attività in scadenza entro 24 ore", on: true },
    { label: "Riepilogo settimanale", hint: "Ogni lunedì mattina", on: false },
  ];
  return (
    <Frame title="app.esempio.it/impostazioni/notifiche">
      <div className="mx-auto max-w-md text-[13px]">
        <h3 className="mb-1 text-base font-bold">Notifiche</h3>
        <p className="mb-4 text-[12px] text-neutral-500">
          Le modifiche vengono applicate immediatamente.
        </p>
        <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-100">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 p-3.5">
              <div className="min-w-0">
                <p className="font-medium">{row.label}</p>
                <p className="text-[12px] text-neutral-500">{row.hint}</p>
              </div>
              <span
                aria-hidden="true"
                className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 ${
                  row.on ? "justify-end bg-[#22c55e]" : "justify-start bg-neutral-300"
                }`}
              >
                <i className="block h-4 w-4 rounded-full bg-white" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function PricingMock() {
  const plans = [
    {
      name: "Base",
      price: "12 €",
      cta: "Scegli Base",
      ctaClass: "border border-neutral-900 text-neutral-900",
      features: ["3 progetti", "1 GB di spazio", "Supporto via email"],
      radius: "rounded-xl",
    },
    {
      name: "Pro",
      price: "39 €",
      cta: "Inizia ora",
      ctaClass: "bg-[#ea580c] text-white",
      features: [
        "Progetti illimitati",
        "50 GB di spazio",
        "Supporto prioritario",
        "Integrazioni avanzate",
        "Ruoli e permessi",
      ],
      radius: "rounded-xl",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Su misura",
      cta: "Contattaci →",
      ctaClass: "text-neutral-600 underline",
      features: ["Tutto di Pro", "SSO e audit log"],
      radius: "rounded-xl",
    },
  ];

  return (
    <Frame title="esempio.it/prezzi">
      <div className="text-[13px]">
        <h3
          className="mb-1 text-center text-2xl font-black"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Scegli il tuo piano
        </h3>
        <p className="mb-[37px] text-center text-[12px] text-neutral-500">
          Cambia o disdici quando vuoi
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${plan.radius} border p-4 ${
                plan.highlight ? "border-[#ea580c] bg-[#fff7ed]" : "border-neutral-200"
              }`}
            >
              {plan.highlight ? (
                <span className="mb-2 inline-block rounded-full bg-[#ea580c] px-2 py-0.5 text-[10px] font-bold text-white">
                  CONSIGLIATO
                </span>
              ) : null}
              <p className="font-bold">{plan.name}</p>
              <p className="mb-[22px] mt-1 text-xl font-black">
                {plan.price}
                {plan.price.includes("€") ? (
                  <span className="text-[11px] font-medium text-neutral-500">/mese</span>
                ) : null}
              </p>
              <ul className="mb-4 space-y-1.5 text-[12px] text-neutral-600">
                {plan.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              <div
                className={`rounded-md px-3 py-2 text-center text-[12px] font-semibold ${plan.ctaClass}`}
              >
                {plan.cta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function AiAssistantMock() {
  const rows = [
    { doc: "Fatt. 2024-0142 — Enel Energia", cat: "Utenze" },
    { doc: "Fatt. 2024-0143 — Amazon Business", cat: "Cancelleria" },
    { doc: "Ric. 88213 — Hotel Milano", cat: "Trasferte" },
    { doc: "Fatt. 2024-0145 — Studio Legale Rossi", cat: "Consulenze" },
  ];
  return (
    <Frame title="conta.esempio.it/assistente">
      <div className="mx-auto max-w-lg text-[13px]">
        <div className="mb-4 flex items-start gap-3 rounded-xl bg-[#eef2ff] p-4">
          <span aria-hidden="true" className="text-lg">
            ✨
          </span>
          <div>
            <p className="font-semibold">Ho categorizzato 47 fatture per te!</p>
            <p className="mt-1 text-[12px] text-neutral-600">
              Basato sulle tue abitudini contabili. Puoi accettare tutto o rivedere
              una per una.
            </p>
          </div>
        </div>

        <div className="mb-4 divide-y divide-neutral-100 rounded-lg border border-neutral-100">
          {rows.map((r) => (
            <div key={r.doc} className="flex items-center justify-between gap-3 p-3">
              <span className="min-w-0 truncate">{r.doc}</span>
              <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium">
                {r.cat}
              </span>
            </div>
          ))}
          <div className="p-3 text-center text-[12px] text-neutral-400">
            …altre 43 fatture
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-md bg-[#4f46e5] px-4 py-3 text-center font-semibold text-white">
            Accetta tutto
          </div>
          <div className="text-[12px] text-neutral-500 underline">Rivedi una per una</div>
        </div>
      </div>
    </Frame>
  );
}

const MOCKS: Record<string, () => ReactNode> = {
  checkout: CheckoutMock,
  "ricerca-filtri": RicercaFiltriMock,
  "settings-notifiche": SettingsNotificheMock,
  pricing: PricingMock,
  "ai-assistant": AiAssistantMock,
};

export function Mock({ id }: { id: string }) {
  const Component = MOCKS[id];
  if (!Component) {
    return (
      <div className="rounded-3xl border border-dashed border-black/15 p-8 text-center text-sm text-ink-muted">
        Schermo non disponibile.
      </div>
    );
  }
  return <Component />;
}
