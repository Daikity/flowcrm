import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Customer } from '@/entities/customer'
import type { DealListItem } from '@/entities/deal'
import { TaskForm, type TaskFormValues } from '@/entities/task'
import type { User } from '@/entities/user'
import { useCreateTaskMutation } from '@/shared/api'
import { getApiErrorMessage } from '@/shared/lib'
import { Button, Modal, Typography } from '@/shared/ui'

interface CreateTaskButtonProps {
  users: User[]
  customers: Customer[]
  deals: DealListItem[]
}

function toCreatePayload(values: TaskFormValues) {
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

export function CreateTaskButton({
  users,
  customers,
  deals,
}: CreateTaskButtonProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [createTask, { isLoading }] = useCreateTaskMutation()

  async function handleSubmit(values: TaskFormValues) {
    setFormError('')
    try {
      await createTask(toCreatePayload(values)).unwrap()
      setOpen(false)
    } catch (error) {
      setFormError(getApiErrorMessage(error, t('tasks.create.error')))
    }
  }

  function handleClose() {
    setFormError('')
    setOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        {t('tasks.create.button')}
      </Button>

      <Modal open={open} onClose={handleClose} title={t('tasks.create.modalTitle')}>
        <div className="space-y-3">
          {formError ? (
            <Typography variant="small" className="text-danger">
              {formError}
            </Typography>
          ) : null}
          <TaskForm
            key={open ? 'open' : 'closed'}
            users={users}
            customers={customers}
            deals={deals}
            submitLabel={t('tasks.create.submit')}
            isSubmitting={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </div>
      </Modal>
    </>
  )
}
