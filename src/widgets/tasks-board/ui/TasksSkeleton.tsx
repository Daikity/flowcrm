import { Skeleton } from '@/shared/ui'

export function TasksSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, section) => (
        <div key={section} className="space-y-3">
          <Skeleton height={24} className="w-28" rounded="md" />
          {Array.from({ length: 3 }).map((__, index) => (
            <Skeleton
              key={index}
              height={88}
              className="w-full"
              rounded="lg"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
