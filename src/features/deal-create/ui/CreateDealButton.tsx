import { useState } from 'react'
import type { Customer } from '@/entities/customer'
import { DealForm, type DealFormValues } from '@/entities/deal'
import type { User } from '@/entities/user'
import { useCreateDealMutation } from '@/shared/api'
import { getApiErrorMessage } from '@/shared/lib'
import { Button, Modal, Typography } from '@/shared/ui'

interface CreateDealButtonProps {
  users: User[]
  customers: Customer[]
}

export function CreateDealButton({ users, customers }: CreateDealButtonProps) {
  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [createDeal, { isLoading }] = useCreateDealMutation()

  async function handleSubmit(values: DealFormValues) {
    setFormError('')
    try {
      await createDeal(values).unwrap()
      setOpen(false)
    } catch (error) {
      setFormError(getApiErrorMessage(error, 'Failed to create deal.'))
    }
  }

  function handleClose() {
    setFormError('')
    setOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        + Add deal
      </Button>

      <Modal open={open} onClose={handleClose} title="Create Deal">
        <div className="space-y-3">
          {formError ? (
            <Typography variant="small" className="text-danger">
              {formError}
            </Typography>
          ) : null}
          <DealForm
            key={open ? 'open' : 'closed'}
            users={users}
            customers={customers}
            submitLabel="Create deal"
            isSubmitting={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </div>
      </Modal>
    </>
  )
}
