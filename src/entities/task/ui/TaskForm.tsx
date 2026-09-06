import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Customer } from '@/entities/customer'
import type { DealListItem } from '@/entities/deal'
import type { User } from '@/entities/user'
import { Button, Input, Select } from '@/shared/ui'
import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABEL,
  TASK_STATUS_LABEL,
  TASK_STATUSES,
} from '../model/constants'
import { taskFormSchema, type TaskFormValues } from '../model/schema'

const statusOptions = TASK_STATUSES.map((status) => ({
  value: status,
  label: TASK_STATUS_LABEL[status],
}))

const priorityOptions = TASK_PRIORITIES.map((priority) => ({
  value: priority,
  label: TASK_PRIORITY_LABEL[priority],
}))

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
    resolver: zodResolver(taskFormSchema),
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

  const assigneeOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }))

  const customerOptions = [
    { value: '', label: 'No customer' },
    ...customers.map((customer) => ({
      value: customer.id,
      label: customer.company,
    })),
  ]

  const filteredDeals = selectedCustomerId
    ? deals.filter((deal) => deal.customerId === selectedCustomerId)
    : deals

  const dealOptions = [
    { value: '', label: 'No deal' },
    ...filteredDeals.map((deal) => ({
      value: deal.id,
      label: deal.title,
    })),
  ]

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Title"
        error={errors.title?.message}
        {...register('title')}
      />

      <Input
        label="Description"
        error={errors.description?.message}
        {...register('description')}
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
        name="priority"
        control={control}
        render={({ field }) => (
          <Select
            label="Priority"
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
            label="Assignee"
            options={assigneeOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.assigneeId?.message}
          />
        )}
      />

      <Input
        label="Due date"
        type="date"
        error={errors.dueDate?.message}
        {...register('dueDate')}
      />

      <Controller
        name="customerId"
        control={control}
        render={({ field }) => (
          <Select
            label="Customer"
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
            label="Deal"
            options={dealOptions}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={errors.dealId?.message}
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
