import { LoadingShell, Skeleton, SkeletonCard } from "@/components/ui";

export default function Loading() {
  return (
    <LoadingShell>
      <Skeleton className="mb-4 h-4 w-40" />
      <div className="rounded-[28px] bg-black/[0.05] p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>
        <Skeleton className="mt-5 h-7 w-3/4 rounded-xl" />
        <Skeleton className="mt-3 h-3 w-full" />
      </div>
      <div className="mt-4">
        <SkeletonCard lines={4} />
      </div>
    </LoadingShell>
  );
}
