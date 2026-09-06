import { Avatar } from '@/shared/ui'

interface CustomerAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

export function CustomerAvatar({ name, size = 'sm' }: CustomerAvatarProps) {
  return <Avatar name={name} size={size} />
}
