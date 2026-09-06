import { useState } from 'react'
import { CustomerForm, type CustomerFormValues } from '@/entities/customer'
import type { User } from '@/entities/user'
import { useCreateCustomerMutation } from '@/shared/api'
import { getApiErrorMessage } from '@/shared/lib'
import { Button, Modal, Typography } from '@/shared/ui'

interface CreateCustomerButtonProps {
  users: User[]
}

export function CreateCustomerButton({ users }: CreateCustomerButtonProps) {
  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [createCustomer, { isLoading }] = useCreateCustomerMutation()

  async function handleSubmit(values: CustomerFormValues) {
    setFormError('')
    try {
      await createCustomer(values).unwrap()
      setOpen(false)
    } catch (error) {
      setFormError(getApiErrorMessage(error, 'Failed to create customer.'))
    }
  }

  function handleClose() {
    setFormError('')
    setOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        + Add customer
      </Button>

      <Modal open={open} onClose={handleClose} title="Create Customer">
        <div className="space-y-3">
          {formError ? (
            <Typography variant="small" className="text-danger">
              {formError}
            </Typography>
          ) : null}
          <CustomerForm
            key={open ? 'open' : 'closed'}
            users={users}
            submitLabel="Create customer"
            isSubmitting={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </div>
      </Modal>
    </>
  )
}
