"use client";

import { useEffect } from "react";
import { segnaCartolineViste } from "@/app/(app)/amici/actions";

/**
 * Segna viste le cartoline arrivate, aprendo la bacheca.
 *
 * Deve stare in un effetto e non nel corpo della pagina: una schermata che
 * scrive mentre viene disegnata non è più una schermata che si può ridisegnare
 * quando serve, e revalidatePath durante il render Next non lo permette
 * proprio. Qui succede dopo, a pagina consegnata, che è anche il momento in
 * cui è vero che qualcuno le ha guardate.
 */
export function SegnaCartolineViste({ quante }: { quante: number }) {
  useEffect(() => {
    if (quante > 0) void segnaCartolineViste();
  }, [quante]);
  return null;
}
