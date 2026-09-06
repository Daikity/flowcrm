import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Customer } from '@/entities/customer'
import {
  DealForm,
  type DealFormValues,
  type DealListItem,
} from '@/entities/deal'
import type { User } from '@/entities/user'
import { useUpdateDealMutation } from '@/shared/api'
import { getApiErrorMessage } from '@/shared/lib'
import { Modal, Typography } from '@/shared/ui'

interface EditDealModalProps {
  deal: DealListItem | null
  users: User[]
  customers: Customer[]
  open: boolean
  onClose: () => void
}

export function EditDealModal({
  deal,
  users,
  customers,
  open,
  onClose,
}: EditDealModalProps) {
  const { t } = useTranslation()
  const [formError, setFormError] = useState('')
  const [updateDeal, { isLoading }] = useUpdateDealMutation()

  if (!deal) {
    return null
  }

  async function handleSubmit(values: DealFormValues) {
    if (!deal) return
    setFormError('')
    try {
      await updateDeal({ id: deal.id, data: values }).unwrap()
      onClose()
    } catch (error) {
      setFormError(getApiErrorMessage(error, t('deals.edit.error')))
    }
  }

  function handleClose() {
    setFormError('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title={t('deals.edit.modalTitle')}>
      <div className="space-y-3">
        {formError ? (
          <Typography variant="small" className="text-danger">
            {formError}
          </Typography>
        ) : null}
        <DealForm
          key={deal.id}
          users={users}
          customers={customers}
          defaultValues={{
            title: deal.title,
            customerId: deal.customerId,
            ownerId: deal.ownerId,
            value: deal.value,
            stage: deal.stage,
            probability: deal.probability,
            expectedCloseDate: deal.expectedCloseDate.slice(0, 10),
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
