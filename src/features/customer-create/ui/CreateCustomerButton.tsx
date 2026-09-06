import { useState } from 'react'
import { CustomerForm, type CustomerFormValues } from '@/entities/customer'
import type { User } from '@/entities/user'
import { useCreateCustomerMutation } from '@/shared/api'
import { Button, Modal } from '@/shared/ui'

interface CreateCustomerButtonProps {
  users: User[]
}

export function CreateCustomerButton({ users }: CreateCustomerButtonProps) {
  const [open, setOpen] = useState(false)
  const [createCustomer, { isLoading }] = useCreateCustomerMutation()

  async function handleSubmit(values: CustomerFormValues) {
    await createCustomer(values).unwrap()
    setOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        + Add customer
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create Customer"
      >
        <CustomerForm
          key={open ? 'open' : 'closed'}
          users={users}
          submitLabel="Create customer"
          isSubmitting={isLoading}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  )
}
