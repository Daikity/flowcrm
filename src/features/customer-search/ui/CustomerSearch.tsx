import { Input } from '@/shared/ui'

interface CustomerSearchProps {
  value: string
  onChange: (value: string) => void
}

export function CustomerSearch({ value, onChange }: CustomerSearchProps) {
  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search customers..."
      aria-label="Search customers"
      className="max-w-sm"
    />
  )
}
