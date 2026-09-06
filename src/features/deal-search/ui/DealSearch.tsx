import { Input } from '@/shared/ui'

interface DealSearchProps {
  value: string
  onChange: (value: string) => void
}

export function DealSearch({ value, onChange }: DealSearchProps) {
  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search deals..."
      aria-label="Search deals"
      className="max-w-sm"
    />
  )
}
