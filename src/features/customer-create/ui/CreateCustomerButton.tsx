import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomerForm, type CustomerFormValues } from '@/entities/customer'
import type { User } from '@/entities/user'
import { useCreateCustomerMutation } from '@/shared/api'
import { getApiErrorMessage } from '@/shared/lib'
import { Button, Modal, Typography } from '@/shared/ui'

interface CreateCustomerButtonProps {
  users: User[]
}

export function CreateCustomerButton({ users }: CreateCustomerButtonProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [createCustomer, { isLoading }] = useCreateCustomerMutation()

  async function handleSubmit(values: CustomerFormValues) {
    setFormError('')
    try {
      await createCustomer(values).unwrap()
      setOpen(false)
    } catch (error) {
      setFormError(getApiErrorMessage(error, t('customers.create.error')))
    }
  }

  function handleClose() {
    setFormError('')
    setOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        {t('customers.create.button')}
      </Button>

      <Modal open={open} onClose={handleClose} title={t('customers.create.modalTitle')}>
        <div className="space-y-3">
          {formError ? (
            <Typography variant="small" className="text-danger">
              {formError}
            </Typography>
          ) : null}
          <CustomerForm
            key={open ? 'open' : 'closed'}
            users={users}
            submitLabel={t('customers.create.submit')}
            isSubmitting={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </div>
      </Modal>
    </>
  )
}
