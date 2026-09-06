import { useState } from 'react'
import type { Customer } from '@/entities/customer'
import { useDeleteCustomerMutation } from '@/shared/api'
import { getApiErrorMessage } from '@/shared/lib'
import { Button, Modal, Typography } from '@/shared/ui'

interface DeleteCustomerModalProps {
  customer: Customer | null
  open: boolean
  onClose: () => void
  onDeleted?: () => void
}

export function DeleteCustomerModal({
  customer,
  open,
  onClose,
  onDeleted,
}: DeleteCustomerModalProps) {
  const [formError, setFormError] = useState('')
  const [deleteCustomer, { isLoading }] = useDeleteCustomerMutation()

  if (!customer) {
    return null
  }

  async function handleDelete() {
    if (!customer) return
    setFormError('')
    try {
      await deleteCustomer(customer.id).unwrap()
      onClose()
      onDeleted?.()
    } catch (error) {
      setFormError(getApiErrorMessage(error, 'Failed to delete customer.'))
    }
  }

  function handleClose() {
    setFormError('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Delete customer?">
      <div className="space-y-4">
        <Typography muted>
          Are you sure you want to delete{' '}
          <span className="font-medium text-text-primary">{customer.company}</span>?
        </Typography>
        {formError ? (
          <Typography variant="small" className="text-danger">
            {formError}
          </Typography>
        ) : null}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={isLoading}
            onClick={() => {
              void handleDelete()
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}
