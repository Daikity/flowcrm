import { CustomerForm, type Customer, type CustomerFormValues } from '@/entities/customer'
import type { User } from '@/entities/user'
import { useUpdateCustomerMutation } from '@/shared/api'
import { Modal } from '@/shared/ui'

interface EditCustomerModalProps {
  customer: Customer | null
  users: User[]
  open: boolean
  onClose: () => void
}

export function EditCustomerModal({
  customer,
  users,
  open,
  onClose,
}: EditCustomerModalProps) {
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation()

  if (!customer) {
    return null
  }

  async function handleSubmit(values: CustomerFormValues) {
    if (!customer) return
    await updateCustomer({ id: customer.id, data: values }).unwrap()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Customer">
      <CustomerForm
        key={customer.id}
        users={users}
        defaultValues={{
          name: customer.name,
          company: customer.company,
          email: customer.email,
          phone: customer.phone,
          industry: customer.industry,
          status: customer.status,
          ownerId: customer.ownerId,
        }}
        submitLabel="Save changes"
        isSubmitting={isLoading}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  )
}
