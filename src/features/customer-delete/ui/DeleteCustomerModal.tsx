import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
      setFormError(getApiErrorMessage(error, t('customers.delete.error')))
    }
  }

  function handleClose() {
    setFormError('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title={t('customers.delete.modalTitle')}>
      <div className="space-y-4">
        <Typography muted>
          {t('customers.delete.confirm', { company: customer.company })}
        </Typography>
        {formError ? (
          <Typography variant="small" className="text-danger">
            {formError}
          </Typography>
        ) : null}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            {t('common.actions.cancel')}
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={isLoading}
            onClick={() => {
              void handleDelete()
            }}
          >
            {t('common.actions.delete')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
