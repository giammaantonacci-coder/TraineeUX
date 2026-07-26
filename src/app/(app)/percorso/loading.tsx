import { LoadingShell, Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <LoadingShell>
      <div className="mb-6">
        <Skeleton className="h-2.5 w-20" />
        <Skeleton className="mt-3 h-9 w-3/4 rounded-xl" />
        <Skeleton className="mt-3 h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-5/6" />
      </div>

      {[0, 1].map((section) => (
        <div key={section} className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[0, 1].map((card) => (
              <div key={card} className="card-light p-5">
                <Skeleton className="h-1.5 w-10" />
                <Skeleton className="mt-3 h-5 w-4/5 rounded-lg" />
                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-2/3" />
                <Skeleton className="mt-5 h-2 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </LoadingShell>
  );
}
