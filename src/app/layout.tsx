import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TraineeUX — Allenamento UX e Product Design",
  description:
    "Percorso di allenamento in UX e product design dal livello intermedio all'expert: esercizi, progressi, premi e news di settore.",
  applicationName: "TraineeUX",
  // Tiene l'app autonoma quando è aggiunta alla schermata home di iOS:
  // senza questo, ogni link apre Safari e si esce dall'app.
  appleWebApp: {
    capable: true,
    title: "TraineeUX",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  // Serve perché env(safe-area-inset-bottom) abbia un valore reale:
  // è quello che tiene la nav flottante sopra la barra home dell'iPhone.
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body
        className={`${jakarta.variable} font-[family-name:var(--font-jakarta)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
