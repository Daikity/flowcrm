import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui'

interface DealSearchProps {
  value: string
  onChange: (value: string) => void
}

export function DealSearch({ value, onChange }: DealSearchProps) {
  const { t } = useTranslation()

  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={t('deals.search.placeholder')}
      aria-label={t('deals.search.aria')}
      className="max-w-sm"
    />
  )
}
