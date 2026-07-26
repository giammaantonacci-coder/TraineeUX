import { LoadingShell, Skeleton } from "@/components/ui";

/**
 * Riproduce la forma esatta della dashboard: saluto, card del grado, card
 * in evidenza. Così quando i dati arrivano nulla si sposta.
 */
export default function Loading() {
  return (
    <LoadingShell>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <Skeleton className="h-7 w-52 rounded-xl" />
          <Skeleton className="mt-2 h-3 w-64" />
        </div>
        <Skeleton className="h-9 w-16" />
      </div>

      <div className="mb-6 rounded-[28px] bg-ink p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Skeleton className="h-2.5 w-24 bg-white/15" />
            <Skeleton className="mt-3 h-7 w-40 rounded-xl bg-white/15" />
            <Skeleton className="mt-3 h-3 w-full bg-white/10" />
          </div>
          <Skeleton className="h-9 w-16 bg-white/15" />
        </div>
        <Skeleton className="mt-5 h-2 w-full bg-white/15" />
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="h-5 w-14 rounded-lg bg-white/15" />
              <Skeleton className="mt-2 h-2.5 w-12 bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="mb-3 h-5 w-40 rounded-lg" />
      <div className="rounded-[28px] bg-black/[0.05] p-5 md:p-6">
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-24" />
        </div>
        <Skeleton className="mt-4 h-6 w-4/5 rounded-lg" />
        <Skeleton className="mt-3 h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-3/4" />
        <Skeleton className="mt-5 h-11 w-32" />
      </div>
    </LoadingShell>
  );
}
