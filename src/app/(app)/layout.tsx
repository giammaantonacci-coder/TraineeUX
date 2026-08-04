import { BottomNav, SideNav } from "@/components/Nav";
import { RiconciliaPush } from "@/components/RiconciliaPush";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Il padding in cima ripete la stessa misura della fascia bianca — se i due
  // valori divergono il contenuto le finisce dietro — più uno stacco. Lo
  // stacco è la parte comprimibile: la fascia deve coprire l'orologio, questo
  // no, quindi è qui che si guadagna spazio senza rischi.
  return (
    <div className="mx-auto min-h-dvh w-full max-w-5xl px-4 pb-32 pt-[calc(max(env(safe-area-inset-top),2.25rem)+0.75rem)] md:px-6 md:pb-12 md:pt-8">
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

      {/* Non disegna nulla: all'apertura ricontrolla che l'indirizzo push del
          dispositivo sia ancora quello registrato. Sta qui e non su Profilo
          perché un indirizzo scaduto non dà segno di sé da nessuna parte, e
          aspettare che qualcuno passi dalle impostazioni voleva dire lasciarlo
          scaduto per giorni. */}
      <RiconciliaPush />
    </div>
  );
}
