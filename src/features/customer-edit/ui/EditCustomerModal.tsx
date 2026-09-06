import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomerForm, type Customer, type CustomerFormValues } from '@/entities/customer'
import type { User } from '@/entities/user'
import { useUpdateCustomerMutation } from '@/shared/api'
import { getApiErrorMessage } from '@/shared/lib'
import { Modal, Typography } from '@/shared/ui'

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
  const { t } = useTranslation()
  const [formError, setFormError] = useState('')
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation()

  if (!customer) {
    return null
  }

  async function handleSubmit(values: CustomerFormValues) {
    if (!customer) return
    setFormError('')
    try {
      await updateCustomer({ id: customer.id, data: values }).unwrap()
      onClose()
    } catch (error) {
      setFormError(getApiErrorMessage(error, t('customers.edit.error')))
    }
  }

  function handleClose() {
    setFormError('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title={t('customers.edit.modalTitle')}>
      <div className="space-y-3">
        {formError ? (
          <Typography variant="small" className="text-danger">
            {formError}
          </Typography>
        ) : null}
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
          submitLabel={t('common.actions.saveChanges')}
          isSubmitting={isLoading}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </div>
    </Modal>
  )
}
