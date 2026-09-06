import { useState } from 'react'
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
  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [createTask, { isLoading }] = useCreateTaskMutation()

  async function handleSubmit(values: TaskFormValues) {
    setFormError('')
    try {
      await createTask(toCreatePayload(values)).unwrap()
      setOpen(false)
    } catch (error) {
      setFormError(getApiErrorMessage(error, 'Failed to create task.'))
    }
  }

  function handleClose() {
    setFormError('')
    setOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        + New Task
      </Button>

      <Modal open={open} onClose={handleClose} title="Create Task">
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
            submitLabel="Create task"
            isSubmitting={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </div>
      </Modal>
    </>
  )
}
