import type { TFunction } from 'i18next'
import { z } from 'zod'

export function createCustomerSchema(t: TFunction) {
  return z.object({
    name: z.string().min(2, t('validation.customer.nameRequired')),
    company: z.string().min(2, t('validation.customer.companyRequired')),
    email: z.email(t('validation.customer.invalidEmail')),
    phone: z.string().min(5, t('validation.customer.invalidPhone')),
    industry: z.enum([
      'Technology',
      'Finance',
      'Healthcare',
      'Retail',
      'Manufacturing',
    ]),
    status: z.enum(['active', 'inactive', 'lead']),
    ownerId: z.string().min(1, t('validation.ownerRequired')),
  })
}

export type CustomerFormValues = z.infer<ReturnType<typeof createCustomerSchema>>
