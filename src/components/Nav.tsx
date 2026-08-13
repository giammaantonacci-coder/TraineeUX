"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/percorso", label: "Percorso", icon: PathIcon },
  { href: "/news", label: "News", icon: NewsIcon },
  { href: "/profilo", label: "Profilo", icon: ProfileIcon },
];

/**
 * Indice della voce corrispondente al percorso, o -1 se non ce n'è una.
 *
 * Prima il -1 veniva riportato a 0, cioè alla home. Ma le rotte fuori dalla
 * barra esistono — un esercizio, il centro notifiche, la pagina aziende — e su
 * quelle la barra accendeva la home e ci metteva pure aria-current="page":
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

/**
 * Barra compatta mentre si scorre verso il basso, distesa tornando su.
 *
 * Scorrendo verso il basso si sta leggendo, e la barra è solo ingombro: perde
 * le etichette e si abbassa. Scorrendo verso l'alto si sta cercando dove
 * andare, ed è il momento in cui i nomi servono davvero.
 *
 * La soglia evita che il movimento parta per una carezza sullo schermo, e
 * vicino alla cima la barra resta sempre distesa: lì non c'è niente da
 * guadagnare, e il cambio di forma si leggerebbe come un tremolio.
 */
function useCompatta(): boolean {
  const [compatta, setCompatta] = useState(false);
  const pathname = usePathname();

  // Cambiando schermata si riparte dall'alto, quindi anche dalla forma distesa:
  // senza, la barra restava rimpicciolita su una pagina appena aperta.
  useEffect(() => setCompatta(false), [pathname]);

  useEffect(() => {
    let ultimo = Math.max(0, window.scrollY);
    let inAttesa = false;
    const SOGLIA = 10;

    function suScorrimento() {
      // Un fotogramma per volta: su iOS lo scorrimento a inerzia genera molti
      // più eventi di quanti disegni ci siano da fare.
      if (inAttesa) return;
      inAttesa = true;
      requestAnimationFrame(() => {
        inAttesa = false;
        const y = Math.max(0, window.scrollY);
        const delta = y - ultimo;
        if (y < 48) {
          setCompatta(false);
          ultimo = y;
          return;
        }
        if (Math.abs(delta) < SOGLIA) return;
        setCompatta(delta > 0);
        ultimo = y;
      });
    }

    window.addEventListener("scroll", suScorrimento, { passive: true });
    return () => window.removeEventListener("scroll", suScorrimento);
  }, []);

  return compatta;
}

export function BottomNav() {
  const [attivo, reale, prevedi] = useActiveIndex();
  const compatta = useCompatta();

  return (
    <>
      {/* Dissolve il contenuto sotto la barra invece di lasciarlo scorrere
          leggibile a filo delle etichette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-28 bg-gradient-to-t from-canvas via-canvas/85 to-transparent md:hidden"
      />
      <div className="fixed inset-x-0 bottom-0 z-40 px-5 pb-[max(1.15rem,env(safe-area-inset-bottom))] md:hidden">
        {/* Da compatta la barra si stringe oltre che abbassarsi: senza, restava
            una fascia larga quanto lo schermo e il rimpicciolimento si leggeva
            come uno schiacciamento invece che come un ritirarsi. La larghezza è
            in percentuale e non in pixel perché la transizione parta dalla
            larghezza vera: passando da 24rem a un valore fisso, il primo tratto
            sarebbe stato invisibile — la barra è già limitata dallo schermo — e
            il movimento sarebbe sembrato partire in ritardo. */}
        <nav
          aria-label="Navigazione principale"
          className={`mx-auto max-w-sm transition-[width] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            compatta ? "w-[72%]" : "w-full"
          }`}
        >
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
                    /* Il nome dichiarato non dipende dalla forma della barra:
                       da compatta l'etichetta è alta zero pixel, e il nome
                       accessibile non deve rimpicciolirsi con lei. */
                    aria-label={item.label}
                    onClick={() => prevedi(i)}
                    className={`tappable flex flex-col items-center rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      compatta ? "gap-0 py-2" : "gap-1 py-2"
                    } ${i === attivo ? "text-white" : "text-ink-muted"}`}
                  >
                    {/* L'icona rimpicciolisce con la barra: lasciandola a 22px
                        dentro una barra più stretta e più bassa sarebbe
                        diventata la cosa più grande rimasta, e la barra
                        compatta avrebbe pesato più di quella distesa. */}
                    <Icon
                      className={`shrink-0 transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        compatta ? "h-5 w-5" : "h-[22px] w-[22px]"
                      } ${i === attivo ? "scale-110" : "scale-100"}`}
                    />
                    {/* Il nome resta lì dove serve: si legge a barra ferma o
                        risalendo, e si ritira scorrendo verso il basso, dove
                        l'unica cosa che conta è vedere la pagina. L'altezza è
                        animata invece che nascosta di colpo, così la barra si
                        abbassa in un movimento solo insieme all'etichetta. */}
                    <span
                      className={`overflow-hidden text-[11px] font-bold leading-none transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        compatta ? "h-0 opacity-0" : "h-[11px] opacity-100"
                      }`}
                    >
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
