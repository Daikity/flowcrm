import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Customer } from '@/entities/customer'
import type { User } from '@/entities/user'
import { Button, DatePicker, Input, Select } from '@/shared/ui'
import {
  DEAL_STAGE_LABEL,
  DEAL_STAGE_PROBABILITY,
  DEAL_STAGES,
} from '../model/constants'
import { dealFormSchema, type DealFormValues } from '../model/schema'
import type { DealStage } from '../model/types'

const stageOptions = DEAL_STAGES.map((stage) => ({
  value: stage,
  label: DEAL_STAGE_LABEL[stage],
}))

interface DealFormProps {
  users: User[]
  customers: Customer[]
  defaultValues?: Partial<DealFormValues>
  submitLabel: string
  isSubmitting?: boolean
  onSubmit: (values: DealFormValues) => Promise<void> | void
  onCancel: () => void
}

export function DealForm({
  users,
  customers,
  defaultValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: DealFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DealFormValues>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: {
      title: '',
      customerId: customers[0]?.id ?? '',
      ownerId: users[0]?.id ?? '',
      value: 0,
      stage: 'lead',
      probability: DEAL_STAGE_PROBABILITY.lead,
      expectedCloseDate: new Date().toISOString().slice(0, 10),
      ...defaultValues,
    },
  })

  const ownerOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }))

  const customerOptions = customers.map((customer) => ({
    value: customer.id,
    label: customer.company,
  }))

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Title"
        error={errors.title?.message}
        {...register('title')}
      />

      <Controller
        name="customerId"
        control={control}
        render={({ field }) => (
          <Select
            label="Customer"
            options={customerOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.customerId?.message}
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

      <Input
        label="Value ($)"
        type="number"
        min={0}
        error={errors.value?.message}
        {...register('value')}
      />

      <Controller
        name="stage"
        control={control}
        render={({ field }) => (
          <Select
            label="Stage"
            options={stageOptions}
            value={field.value}
            onChange={(value) => {
              const stage = value as DealStage
              field.onChange(stage)
              setValue('probability', DEAL_STAGE_PROBABILITY[stage])
            }}
            error={errors.stage?.message}
          />
        )}
      />

      <Input
        label="Probability (%)"
        type="number"
        min={0}
        max={100}
        error={errors.probability?.message}
        {...register('probability')}
      />

      <Controller
        name="expectedCloseDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Expected close date"
            value={field.value}
            onChange={field.onChange}
            clearable={false}
            error={errors.expectedCloseDate?.message}
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
