import type { Customer } from '@/entities/customer'
import { useDeleteCustomerMutation } from '@/shared/api'
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
  const [deleteCustomer, { isLoading }] = useDeleteCustomerMutation()

  if (!customer) {
    return null
  }

  async function handleDelete() {
    if (!customer) return
    await deleteCustomer(customer.id).unwrap()
    onClose()
    onDeleted?.()
  }

  return (
    <Modal open={open} onClose={onClose} title="Delete customer?">
      <div className="space-y-4">
        <Typography muted>
          Are you sure you want to delete{' '}
          <span className="font-medium text-text-primary">{customer.company}</span>?
        </Typography>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
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
