import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * Quanto a lungo il router riusa una schermata già scaricata prima di
     * richiederla di nuovo.
     *
     * Dalla 15 il valore predefinito per le rotte dinamiche è zero: ogni
     * ritorno su Oggi rifaceva il giro completo al server, con la verifica
     * della sessione e le due letture su Supabase, anche a due secondi dal
     * passaggio precedente. È il motivo per cui tornare indietro sembrava più
     * lento che andare avanti.
     *
     * Trenta secondi non fanno vedere dati vecchi dove conta: quando i
     * progressi cambiano davvero, la consegna di un esercizio chiama
     * revalidatePath, e quella invalida anche questa cache.
     */
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;
