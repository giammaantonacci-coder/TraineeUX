"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS = [
  { href: "/", label: "Oggi", icon: HomeIcon },
  { href: "/percorso", label: "Percorso", icon: PathIcon },
  { href: "/news", label: "News", icon: NewsIcon },
  { href: "/profilo", label: "Profilo", icon: ProfileIcon },
];

/**
 * Indice della voce corrispondente al percorso, o -1 se non ce n'è una.
 *
 * Prima il -1 veniva riportato a 0, cioè a "Oggi". Ma le rotte fuori dalla
 * barra esistono — un esercizio, il centro notifiche, la pagina aziende — e su
 * quelle la barra accendeva Oggi e ci metteva pure aria-current="page":
 * indicava una schermata su cui non eri e lo annunciava come un fatto a chi
 * naviga con uno screen reader. Non essere in nessuna delle quattro sezioni è
 * uno stato legittimo, e ora la barra lo rappresenta invece di inventare.
 */
function indexOfPath(pathname: string): number {
  return ITEMS.findIndex((item) =>
    // La radice va confrontata per intero: con startsWith sarebbe attiva
    // ovunque. "/oggi" è il vecchio indirizzo della stessa schermata e resta
    // vivo per le installazioni già presenti su qualche telefono.
    item.href === "/"
      ? pathname === "/" || pathname === "/oggi"
      : pathname.startsWith(item.href),
  );
}

/**
 * Voce da evidenziare adesso.
 *
 * usePathname cambia solo a navigazione conclusa: legandoci l'indicatore, il
 * tocco restava senza risposta per tutto il tempo del viaggio al server. Qui
 * l'indice viene fissato al tocco e il percorso reale lo raggiunge dopo,
 * riallineando anche i casi in cui la rotta cambia senza un tocco: indietro,
 * avanti, un redirect.
 */
function useActiveIndex(): [number, number, (i: number) => void] {
  const pathname = usePathname();
  const reale = indexOfPath(pathname);
  const [atteso, setAtteso] = useState<number | null>(null);

  useEffect(() => setAtteso(null), [pathname]);

  return [atteso ?? reale, reale, setAtteso];
}

export function BottomNav() {
  const [attivo, reale, prevedi] = useActiveIndex();

  return (
    <>
      {/* Dissolve il contenuto sotto la barra invece di lasciarlo scorrere
          leggibile a filo delle etichette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-28 bg-gradient-to-t from-canvas via-canvas/85 to-transparent md:hidden"
      />
      <div className="fixed inset-x-0 bottom-0 z-40 px-5 pb-[max(1.15rem,env(safe-area-inset-bottom))] md:hidden">
        <nav aria-label="Navigazione principale" className="mx-auto max-w-sm">
          {/* Quattro colonne uguali. Prima l'etichetta compariva solo sulla voce
              attiva, quindi le larghezze cambiavano a ogni passaggio: la pillola
              andava misurata dopo il render e di nuovo a transizione conclusa, e
              quei due passaggi erano il "si sposta e poi si riempie". Con le
              colonne fisse la geometria si ricava dall'indice, la pillola deve
              solo traslare, e il movimento è uno solo. */}
          <ul className="relative grid grid-cols-4 rounded-full border border-black/[0.07] bg-white/[0.92] p-1.5 shadow-[0_2px_6px_rgba(15,17,23,0.05),0_18px_40px_-24px_rgba(15,17,23,0.75)] backdrop-blur-xl">
            {/* La pillola scura scorre da una colonna all'altra. La larghezza
                toglie il padding del contenitore, così un passo di traslazione
                è esattamente una colonna. Fuori dalle quattro sezioni sparisce
                invece di restare accesa su una voce a caso: resta al suo posto
                e riappare da lì al primo tocco. */}
            <li
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/4)] rounded-full bg-ink transition-[transform,opacity] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                attivo < 0 ? "opacity-0" : "opacity-100"
              }`}
              style={{ transform: `translateX(${Math.max(0, attivo) * 100}%)` }}
            />

            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={item.href} className="relative z-10">
                  <Link
                    href={item.href}
                    /* Scarica in anticipo la schermata intera, non solo lo
                       scheletro: sono quattro rotte e si passa la vita fra
                       quelle. */
                    prefetch
                    /* aria-current segue il percorso vero, non quello previsto:
                       l'indicatore può anticipare, l'annuncio "pagina corrente"
                       no, o direbbe il falso finché la pagina non è arrivata. */
                    aria-current={i === reale ? "page" : undefined}
                    onClick={() => prevedi(i)}
                    className={`tappable flex flex-col items-center gap-1 rounded-full py-2 transition-colors duration-[300ms] ${
                      i === attivo ? "text-white" : "text-ink-muted"
                    }`}
                  >
                    <Icon
                      className={`h-[22px] w-[22px] shrink-0 transition-transform duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        i === attivo ? "scale-110" : "scale-100"
                      }`}
                    />
                    {/* Sempre visibile: con le colonne fisse c'è lo spazio, e
                        un'icona con il suo nome accanto non va indovinata. */}
                    <span className="text-[11px] font-bold leading-none">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export function SideNav() {
  const [attivo, reale, prevedi] = useActiveIndex();

  return (
    <nav
      aria-label="Navigazione principale"
      className="hidden md:sticky md:top-6 md:block md:h-fit md:w-56 md:shrink-0"
    >
      <div className="card-light p-2.5">
        <ul className="space-y-1.5">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch
                  aria-current={i === reale ? "page" : undefined}
                  onClick={() => prevedi(i)}
                  className={`tappable flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                    i === attivo
                      ? "bg-ink text-white"
                      : "text-ink-muted hover:bg-black/[0.04] hover:text-ink"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

type IconProps = { className?: string };

function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PathIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 4v7a3 3 0 0 0 3 3h4a3 3 0 0 1 3 3v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="7" cy="4" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="20" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function NewsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M7 9h6M7 13h10M7 16h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
