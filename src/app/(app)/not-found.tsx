import Link from "next/link";
import { Bity } from "@/components/Bity";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-10 text-center">
      <Bity mood="pensieroso" tint="sky" size={80} className="mx-auto" />
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
        Questa pagina non esiste
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
        Può essere un modulo rinominato o un link vecchio. Il percorso completo è
        sempre raggiungibile: da lì ritrovi tutti i moduli e gli esercizi.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/percorso"
          className="rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-transform active:scale-[0.97]"
        >
          Vai al percorso
        </Link>
        <Link
          href="/"
          className="rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-bold transition-transform active:scale-[0.97]"
        >
          Torna a Oggi
        </Link>
      </div>
    </div>
  );
}
