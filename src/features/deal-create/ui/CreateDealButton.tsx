import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [createDeal, { isLoading }] = useCreateDealMutation()

  async function handleSubmit(values: DealFormValues) {
    setFormError('')
    try {
      await createDeal(values).unwrap()
      setOpen(false)
    } catch (error) {
      setFormError(getApiErrorMessage(error, t('deals.create.error')))
    }
  }

  function handleClose() {
    setFormError('')
    setOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        {t('deals.create.button')}
      </Button>

      <Modal open={open} onClose={handleClose} title={t('deals.create.modalTitle')}>
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
            submitLabel={t('deals.create.submit')}
            isSubmitting={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </div>
      </Modal>
    </>
  )
}
