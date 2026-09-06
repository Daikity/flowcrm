import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import type { User } from '@/entities/user'
import { Button, Input, Select } from '@/shared/ui'
import {
  createCustomerSchema,
  type CustomerFormValues,
} from '../model/schema'

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
] as const

const STATUSES = ['active', 'inactive', 'lead'] as const

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
  const { t } = useTranslation()
  const schema = useMemo(() => createCustomerSchema(t), [t])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(schema),
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

  const industryOptions = INDUSTRIES.map((industry) => ({
    value: industry,
    label: t(`enums.industry.${industry}`),
  }))

  const statusOptions = STATUSES.map((status) => ({
    value: status,
    label: t(`enums.customerStatus.${status}`),
  }))

  const ownerOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }))

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t('customers.form.name')}
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label={t('customers.form.company')}
        error={errors.company?.message}
        {...register('company')}
      />
      <Input
        label={t('customers.form.email')}
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label={t('customers.form.phone')}
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Controller
        name="industry"
        control={control}
        render={({ field }) => (
          <Select
            label={t('customers.form.industry')}
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
            label={t('customers.form.status')}
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
            label={t('customers.form.owner')}
            options={ownerOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.ownerId?.message}
          />
        )}
      />

      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t('common.actions.cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
