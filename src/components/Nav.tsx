"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

const ITEMS = [
  { href: "/oggi", label: "Oggi", icon: HomeIcon },
  { href: "/percorso", label: "Percorso", icon: PathIcon },
  { href: "/news", label: "News", icon: NewsIcon },
  { href: "/profilo", label: "Profilo", icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  const activeIndex = Math.max(
    0,
    ITEMS.findIndex((item) => pathname.startsWith(item.href)),
  );

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  // L'indicatore insegue la voce attiva: la posizione va misurata dopo il
  // render, perché la voce attiva mostra anche l'etichetta ed è più larga.
  useLayoutEffect(() => {
    function measure() {
      const el = itemRefs.current[activeIndex];
      if (!el) return;
      setPill({ left: el.offsetLeft, width: el.offsetWidth });
    }
    measure();
    // Un secondo passaggio a transizione dell'etichetta conclusa.
    const t = setTimeout(measure, 320);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [activeIndex]);

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
          <ul className="relative flex items-center justify-between gap-1 rounded-full border border-black/[0.07] bg-white/[0.92] p-1.5 shadow-[0_2px_6px_rgba(15,17,23,0.05),0_18px_40px_-24px_rgba(15,17,23,0.75)] backdrop-blur-xl">
            {/* La pillola scura scorre da una voce all'altra */}
            <li
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1.5 left-0 rounded-full bg-ink transition-[transform,width] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={
                pill
                  ? { transform: `translateX(${pill.left}px)`, width: pill.width }
                  : { opacity: 0 }
              }
            />

            {ITEMS.map((item, i) => {
              const active = i === activeIndex;
              const Icon = item.icon;
              return (
                <li
                  key={item.href}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="relative z-10"
                >
                  <Link
                    href={item.href}
                    /* Scarica in anticipo la schermata intera, non solo lo
                       scheletro: sono quattro rotte e si passa la vita fra
                       quelle. */
                    prefetch
                    aria-current={active ? "page" : undefined}
                    /* Il nome accessibile non puo' dipendere dall'animazione:
                       sulle voci inattive l'etichetta ha larghezza zero e
                       spariva dall'albero di accessibilita', lasciando il link
                       senza nome. L'aria-label lo rende stabile. */
                    aria-label={item.label}
                    className={`tappable flex items-center rounded-full px-3.5 py-3 text-[13px] font-bold ${
                      active ? "text-white" : "text-ink-muted active:text-ink"
                    }`}
                  >
                    <Icon
                      className={`h-[22px] w-[22px] shrink-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active ? "scale-110" : "scale-100"
                      }`}
                    />
                    {/* Duplicato visivo del nome accessibile: nascosto agli
                        screen reader per non farlo annunciare due volte. */}
                    <span
                      aria-hidden="true"
                      className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                        active ? "ml-2 max-w-[6rem] opacity-100" : "max-w-0 opacity-0"
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
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigazione principale"
      className="hidden md:sticky md:top-6 md:block md:h-fit md:w-56 md:shrink-0"
    >
      <div className="card-light p-2.5">
        <ul className="space-y-1.5">
          {ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch
                  aria-current={active ? "page" : undefined}
                  className={`tappable flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold ${
                    active
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
