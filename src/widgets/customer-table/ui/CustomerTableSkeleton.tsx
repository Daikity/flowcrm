import { Skeleton } from '@/shared/ui'

export function CustomerTableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="hidden space-y-2 md:block">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} height={48} className="w-full" rounded="md" />
        ))}
      </div>
      <div className="grid gap-3 md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} height={140} className="w-full" rounded="lg" />
        ))}
      </div>
    </div>
  )
}
