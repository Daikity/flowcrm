import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Customer } from '@/entities/customer'
import type { DealListItem } from '@/entities/deal'
import {
  TaskForm,
  type TaskFormValues,
  type TaskListItem,
} from '@/entities/task'
import type { User } from '@/entities/user'
import { useUpdateTaskMutation } from '@/shared/api'
import { getApiErrorMessage } from '@/shared/lib'
import { Modal, Typography } from '@/shared/ui'

interface EditTaskModalProps {
  task: TaskListItem | null
  users: User[]
  customers: Customer[]
  deals: DealListItem[]
  open: boolean
  onClose: () => void
}

function toUpdatePayload(values: TaskFormValues) {
  return {
    title: values.title,
    description: values.description || undefined,
    status: values.status,
    priority: values.priority,
    assigneeId: values.assigneeId,
    dueDate: values.dueDate,
    customerId: values.customerId || undefined,
    dealId: values.dealId || undefined,
  }
}

export function EditTaskModal({
  task,
  users,
  customers,
  deals,
  open,
  onClose,
}: EditTaskModalProps) {
  const { t } = useTranslation()
  const [formError, setFormError] = useState('')
  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  if (!task) {
    return null
  }

  async function handleSubmit(values: TaskFormValues) {
    if (!task) return
    setFormError('')
    try {
      await updateTask({ id: task.id, data: toUpdatePayload(values) }).unwrap()
      onClose()
    } catch (error) {
      setFormError(getApiErrorMessage(error, t('tasks.edit.error')))
    }
  }

  function handleClose() {
    setFormError('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title={t('tasks.edit.modalTitle')}>
      <div className="space-y-3">
        {formError ? (
          <Typography variant="small" className="text-danger">
            {formError}
          </Typography>
        ) : null}
        <TaskForm
          key={task.id}
          users={users}
          customers={customers}
          deals={deals}
          defaultValues={{
            title: task.title,
            description: task.description ?? '',
            status: task.status,
            priority: task.priority,
            assigneeId: task.assigneeId,
            dueDate: task.dueDate.slice(0, 10),
            customerId: task.customerId ?? '',
            dealId: task.dealId ?? '',
          }}
          submitLabel={t('common.actions.saveChanges')}
          isSubmitting={isLoading}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </div>
    </Modal>
  )
}
