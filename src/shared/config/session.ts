import type { User } from '@/entities/user'

/** Временный пользователь до появления auth */
export const currentUser: User = {
  id: 'user-1',
  name: 'Igor Edis',
  email: 'igor@flowcrm.app',
  role: 'admin',
}
