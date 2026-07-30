import { BottomNav, SideNav } from "@/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-5xl px-4 pb-32 pt-[calc(env(safe-area-inset-top)+1.25rem)] md:px-6 md:pb-12 md:pt-8">
      {/* Con viewport-fit cover il contenuto scorre sotto la barra di stato
          dell'iPhone, e le scritte finivano addosso a orologio e batteria.
          Questa fascia è alta esattamente quanto l'area riservata: il
          contenuto le sparisce dietro e non la oltrepassa mai. */}
      <div aria-hidden="true" className="barra-stato md:hidden" />

      {/* Chi naviga da tastiera non deve attraversare la navigazione a ogni
          pagina. Visibile solo quando riceve il focus. */}
      <a
        href="#contenuto"
        className="skip-link rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white"
      >
        Salta al contenuto
      </a>
      <div className="md:flex md:gap-8">
        <SideNav />
        <main id="contenuto" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
