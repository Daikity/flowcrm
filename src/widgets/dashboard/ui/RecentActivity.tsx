import type { Activity, ActivityType } from '@/entities/activity'
import { formatDate } from '@/shared/lib'
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from '@/shared/ui'

interface RecentActivityProps {
  activities: Activity[]
}

const typeLabel: Record<ActivityType, string> = {
  customer_created: 'Customer',
  deal_created: 'Deal',
  deal_won: 'Won',
  task_completed: 'Task',
  note_updated: 'Note',
}

const typeVariant: Record<
  ActivityType,
  'neutral' | 'primary' | 'success' | 'warning'
> = {
  customer_created: 'primary',
  deal_created: 'neutral',
  deal_won: 'success',
  task_completed: 'warning',
  note_updated: 'neutral',
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Свежие события по CRM</CardDescription>
      </CardHeader>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">
            <Badge variant={typeVariant[activity.type]} className="mt-0.5 shrink-0">
              {typeLabel[activity.type]}
            </Badge>
            <div className="min-w-0 space-y-1">
              <Typography variant="small">{activity.message}</Typography>
              <Typography variant="caption" muted className="normal-case tracking-normal">
                {formatDate(activity.createdAt)}
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
