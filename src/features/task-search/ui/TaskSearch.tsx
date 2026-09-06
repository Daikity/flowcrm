import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui'

interface TaskSearchProps {
  value: string
  onChange: (value: string) => void
}

export function TaskSearch({ value, onChange }: TaskSearchProps) {
  const { t } = useTranslation()

  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={t('tasks.search.placeholder')}
      aria-label={t('tasks.search.aria')}
      className="max-w-sm"
    />
  )
}
