import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/shared/ui'

interface TasksEmptyProps {
  hasFilters: boolean
  action?: ReactNode
}

export function TasksEmpty({ hasFilters, action }: TasksEmptyProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('tasks.empty.title')}
      description={
        hasFilters ? t('tasks.empty.filtered') : t('tasks.empty.default')
      }
      action={action}
    />
  )
}
