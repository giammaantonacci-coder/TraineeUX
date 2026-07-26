import type { MetadataRoute } from "next";

/**
 * Senza questo manifest, l'icona sulla schermata home di iOS è un segnalibro:
 * ogni navigazione esce in Safari. `display: standalone` più i meta Apple
 * (dichiarati in layout.tsx) tengono tutto dentro l'app.
 *
 * `scope: "/"` è la parte che impedisce l'uscita: tutte le rotte interne
 * restano nella finestra autonoma, mentre i link esterni (news, aziende)
 * continuano ad aprirsi nel browser, che è il comportamento giusto.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TraineeUX — Allenamento UX e Product Design",
    short_name: "TraineeUX",
    description:
      "Percorso di allenamento in UX e product design dal livello intermedio all'expert: esercizi, progressi, premi e news di settore.",
    lang: "it",
    dir: "ltr",
    start_url: "/oggi",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
