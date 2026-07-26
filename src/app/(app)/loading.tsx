import { LoadingShell, Skeleton, SkeletonCard } from "@/components/ui";

export default function Loading() {
  return (
    <LoadingShell>
      <div className="mb-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-3 h-8 w-2/3 rounded-xl" />
        <Skeleton className="mt-3 h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-4/5" />
      </div>
      <div className="space-y-3">
        <SkeletonCard />
        <SkeletonCard lines={2} />
        <SkeletonCard lines={2} />
      </div>
    </LoadingShell>
  );
}
