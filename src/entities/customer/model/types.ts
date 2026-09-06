import type { Activity } from '@/entities/activity'
import type { Deal } from '@/entities/deal'

export type CustomerStatus = 'active' | 'inactive' | 'lead'

export type CustomerIndustry =
  | 'Technology'
  | 'Finance'
  | 'Healthcare'
  | 'Retail'
  | 'Manufacturing'

export interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  industry: CustomerIndustry
  status: CustomerStatus
  ownerId: string
  revenue: number
  createdAt: string
}

export interface CustomersParams {
  page: number
  limit: number
  search?: string
  status?: CustomerStatus
  industry?: CustomerIndustry
  ownerId?: string
  sortBy?: 'name' | 'company' | 'revenue' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface CustomersResponse {
  items: Customer[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type CreateCustomerInput = Omit<Customer, 'id' | 'createdAt' | 'revenue'> & {
  revenue?: number
}

export type UpdateCustomerInput = Partial<
  Omit<Customer, 'id' | 'createdAt'>
>

export interface CustomerDetails extends Customer {
  dealsCount: number
  openDealsCount: number
  deals: Deal[]
  activities: Activity[]
}
