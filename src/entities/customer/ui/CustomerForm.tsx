import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@/entities/user'
import { Button, Input, Select } from '@/shared/ui'
import {
  customerFormSchema,
  type CustomerFormValues,
} from '../model/schema'

const industryOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Manufacturing', label: 'Manufacturing' },
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'lead', label: 'Lead' },
]

interface CustomerFormProps {
  users: User[]
  defaultValues?: Partial<CustomerFormValues>
  submitLabel: string
  isSubmitting?: boolean
  onSubmit: (values: CustomerFormValues) => Promise<void> | void
  onCancel: () => void
}

export function CustomerForm({
  users,
  defaultValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: CustomerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      industry: 'Technology',
      status: 'active',
      ownerId: users[0]?.id ?? '',
      ...defaultValues,
    },
  })

  const ownerOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }))

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="Company"
        error={errors.company?.message}
        {...register('company')}
      />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Phone"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Controller
        name="industry"
        control={control}
        render={({ field }) => (
          <Select
            label="Industry"
            options={industryOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.industry?.message}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            label="Status"
            options={statusOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.status?.message}
          />
        )}
      />

      <Controller
        name="ownerId"
        control={control}
        render={({ field }) => (
          <Select
            label="Owner"
            options={ownerOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.ownerId?.message}
          />
        )}
      />

      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
