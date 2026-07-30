import { BottomNav, SideNav } from "@/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Il padding in cima ripete la stessa misura della fascia bianca: se i due
  // valori divergono, il contenuto le finisce dietro.
  return (
    <div className="mx-auto min-h-dvh w-full max-w-5xl px-4 pb-32 pt-[calc(max(env(safe-area-inset-top),2.75rem)+1.25rem)] md:px-6 md:pb-12 md:pt-8">
      {/* Con viewport-fit cover il contenuto scorre sotto la barra di stato
          dell'iPhone, e le scritte finivano addosso a orologio e batteria.
          Questa fascia lo copre: il contenuto le sparisce dietro e non la
          oltrepassa mai. */}
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
