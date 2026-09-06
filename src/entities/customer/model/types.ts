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
