import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui'

interface CustomerSearchProps {
  value: string
  onChange: (value: string) => void
}

export function CustomerSearch({ value, onChange }: CustomerSearchProps) {
  const { t } = useTranslation()

  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={t('customers.search.placeholder')}
      aria-label={t('customers.search.aria')}
      className="max-w-sm"
    />
  )
}
