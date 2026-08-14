import { LoadingShell, Skeleton, SkeletonCard } from "@/components/ui";

export default function Loading() {
  return (
    <LoadingShell>
      <Skeleton className="h-8 w-40 rounded-xl" />
      <div className="mt-6 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[68px] rounded-[22px]" />
        ))}
      </div>
      <div className="mt-8">
        <SkeletonCard lines={2} />
      </div>
    </LoadingShell>
  );
}
