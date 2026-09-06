import type { User } from '@/entities/user'

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Igor Edis',
    email: 'igor@flowcrm.app',
    role: 'admin',
  },
  {
    id: 'user-2',
    name: 'Anna Petrova',
    email: 'anna@flowcrm.app',
    role: 'manager',
  },
  {
    id: 'user-3',
    name: 'Boris Ivanov',
    email: 'boris@flowcrm.app',
    role: 'sales',
  },
]
