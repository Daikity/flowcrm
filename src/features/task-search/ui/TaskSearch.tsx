import { Input } from '@/shared/ui'

interface TaskSearchProps {
  value: string
  onChange: (value: string) => void
}

export function TaskSearch({ value, onChange }: TaskSearchProps) {
  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search tasks..."
      aria-label="Search tasks"
      className="max-w-sm"
    />
  )
}
