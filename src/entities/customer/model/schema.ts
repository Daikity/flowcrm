import { z } from 'zod'

export const customerFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  email: z.email('Invalid email'),
  phone: z.string().min(5, 'Invalid phone'),
  industry: z.enum([
    'Technology',
    'Finance',
    'Healthcare',
    'Retail',
    'Manufacturing',
  ]),
  status: z.enum(['active', 'inactive', 'lead']),
  ownerId: z.string().min(1, 'Owner is required'),
})

export type CustomerFormValues = z.infer<typeof customerFormSchema>
