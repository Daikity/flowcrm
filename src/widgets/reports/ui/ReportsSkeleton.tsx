import { Card, Skeleton } from '@/shared/ui'

export function ReportsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton height={32} width="35%" />
        <Skeleton height={16} width="55%" />
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} height={40} width={160} rounded="md" />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="space-y-3">
            <Skeleton height={12} width="40%" />
            <Skeleton height={28} width="60%" />
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="space-y-4">
          <Skeleton height={20} width="35%" />
          <Skeleton height={220} width="100%" rounded="lg" />
        </Card>
        <Card className="space-y-4">
          <Skeleton height={20} width="40%" />
          <Skeleton height={220} width="100%" rounded="lg" />
        </Card>
      </div>
    </div>
  )
}
