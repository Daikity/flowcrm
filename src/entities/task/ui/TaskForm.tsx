import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import type { Customer } from '@/entities/customer'
import type { DealListItem } from '@/entities/deal'
import type { User } from '@/entities/user'
import { Button, DatePicker, Input, Select } from '@/shared/ui'
import { TASK_PRIORITIES, TASK_STATUSES } from '../model/constants'
import { createTaskSchema, type TaskFormValues } from '../model/schema'

interface TaskFormProps {
  users: User[]
  customers: Customer[]
  deals: DealListItem[]
  defaultValues?: Partial<TaskFormValues>
  submitLabel: string
  isSubmitting?: boolean
  onSubmit: (values: TaskFormValues) => Promise<void> | void
  onCancel: () => void
}

export function TaskForm({
  users,
  customers,
  deals,
  defaultValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const { t } = useTranslation()
  const schema = useMemo(() => createTaskSchema(t), [t])
  const initialCustomerId = defaultValues?.customerId ?? ''
  const [selectedCustomerId, setSelectedCustomerId] =
    useState(initialCustomerId)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      assigneeId: users[0]?.id ?? '',
      dueDate: new Date().toISOString().slice(0, 10),
      customerId: '',
      dealId: '',
      ...defaultValues,
    },
  })

  const statusOptions = TASK_STATUSES.map((status) => ({
    value: status,
    label: t(`enums.taskStatus.${status}`),
  }))

  const priorityOptions = TASK_PRIORITIES.map((priority) => ({
    value: priority,
    label: t(`enums.taskPriority.${priority}`),
  }))

  const assigneeOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }))

  const customerOptions = [
    { value: '', label: t('tasks.form.noCustomer') },
    ...customers.map((customer) => ({
      value: customer.id,
      label: customer.company,
    })),
  ]

  const filteredDeals = selectedCustomerId
    ? deals.filter((deal) => deal.customerId === selectedCustomerId)
    : deals

  const dealOptions = [
    { value: '', label: t('tasks.form.noDeal') },
    ...filteredDeals.map((deal) => ({
      value: deal.id,
      label: deal.title,
    })),
  ]

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t('tasks.form.title')}
        error={errors.title?.message}
        {...register('title')}
      />

      <Input
        label={t('tasks.form.description')}
        error={errors.description?.message}
        {...register('description')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            label={t('tasks.form.status')}
            options={statusOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.status?.message}
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <Select
            label={t('tasks.form.priority')}
            options={priorityOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.priority?.message}
          />
        )}
      />

      <Controller
        name="assigneeId"
        control={control}
        render={({ field }) => (
          <Select
            label={t('tasks.form.assignee')}
            options={assigneeOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.assigneeId?.message}
          />
        )}
      />

      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            label={t('tasks.form.dueDate')}
            value={field.value}
            onChange={field.onChange}
            clearable={false}
            error={errors.dueDate?.message}
          />
        )}
      />

      <Controller
        name="customerId"
        control={control}
        render={({ field }) => (
          <Select
            label={t('tasks.form.customer')}
            options={customerOptions}
            value={field.value ?? ''}
            onChange={(value) => {
              field.onChange(value)
              setSelectedCustomerId(value)
              setValue('dealId', '')
            }}
            error={errors.customerId?.message}
          />
        )}
      />

      <Controller
        name="dealId"
        control={control}
        render={({ field }) => (
          <Select
            label={t('tasks.form.deal')}
            options={dealOptions}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={errors.dealId?.message}
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
