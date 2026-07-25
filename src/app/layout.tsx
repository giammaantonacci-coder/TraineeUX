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
};

export const viewport: Viewport = {
  themeColor: "#0f1117",
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
