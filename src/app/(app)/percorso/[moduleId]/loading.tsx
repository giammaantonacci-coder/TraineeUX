import { LoadingShell, Skeleton, SkeletonCard } from "@/components/ui";

export default function Loading() {
  return (
    <LoadingShell>
      <Skeleton className="mb-4 h-4 w-28" />
      <div className="rounded-[28px] bg-black/[0.05] p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-20" />
        </div>
        <Skeleton className="mt-5 h-8 w-4/5 rounded-xl" />
        <Skeleton className="mt-3 h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-3/5" />
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard lines={4} />
      </div>
      <Skeleton className="mt-8 mb-3 h-5 w-56 rounded-lg" />
      <div className="space-y-3">
        <SkeletonCard lines={2} />
        <SkeletonCard lines={2} />
      </div>
    </LoadingShell>
  );
}
