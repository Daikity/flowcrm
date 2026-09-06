import { useTranslation } from 'react-i18next'
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
  const { t, i18n } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.activity.title')}</CardTitle>
        <CardDescription>{t('dashboard.activity.description')}</CardDescription>
      </CardHeader>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">
            <Badge variant={typeVariant[activity.type]} className="mt-0.5 shrink-0">
              {t(`enums.activityType.${activity.type}`)}
            </Badge>
            <div className="min-w-0 space-y-1">
              <Typography variant="small">{activity.message}</Typography>
              <Typography variant="caption" muted className="normal-case tracking-normal">
                {formatDate(activity.createdAt, i18n.language)}
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
