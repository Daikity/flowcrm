export type UserRole = 'admin' | 'manager' | 'sales'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
}
