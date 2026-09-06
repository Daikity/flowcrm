import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  CustomerAvatar,
  CustomerStatusBadge,
  type Customer,
} from '@/entities/customer'
import type { User } from '@/entities/user'
import { formatCurrency, formatDate } from '@/shared/lib'
import {
  Avatar,
  Card,
  Dropdown,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Typography,
} from '@/shared/ui'

interface CustomerTableProps {
  customers: Customer[]
  users: User[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  onSort: (column: 'name' | 'company' | 'revenue' | 'createdAt') => void
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export function CustomerTable({
  customers,
  users,
  sortBy,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const usersById = Object.fromEntries(users.map((user) => [user.id, user]))

  function sortLabel(column: string) {
    if (sortBy !== column) return ''
    return sortOrder === 'asc' ? ' ↑' : ' ↓'
  }

  function actionItems(customer: Customer) {
    return [
      {
        id: 'view',
        label: t('common.actions.view'),
        onSelect: () => navigate(`/customers/${customer.id}`),
      },
      {
        id: 'edit',
        label: t('common.actions.edit'),
        onSelect: () => onEdit(customer),
      },
      {
        id: 'delete',
        label: t('common.actions.delete'),
        danger: true,
        onSelect: () => onDelete(customer),
      },
    ]
  }

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <THead>
            <TR>
              <TH>
                <button type="button" onClick={() => onSort('name')}>
                  {t('customers.table.columns.customer')}
                  {sortLabel('name')}
                </button>
              </TH>
              <TH>
                <button type="button" onClick={() => onSort('company')}>
                  {t('customers.table.columns.company')}
                  {sortLabel('company')}
                </button>
              </TH>
              <TH>{t('customers.table.columns.status')}</TH>
              <TH>{t('customers.table.columns.industry')}</TH>
              <TH>
                <button type="button" onClick={() => onSort('revenue')}>
                  {t('customers.table.columns.revenue')}
                  {sortLabel('revenue')}
                </button>
              </TH>
              <TH>{t('customers.table.columns.owner')}</TH>
              <TH>
                <button type="button" onClick={() => onSort('createdAt')}>
                  {t('customers.table.columns.created')}
                  {sortLabel('createdAt')}
                </button>
              </TH>
              <TH className="w-16">{t('customers.table.columns.actions')}</TH>
            </TR>
          </THead>
          <TBody>
            {customers.map((customer) => {
              const owner = usersById[customer.ownerId]

              return (
                <TR key={customer.id} className="hover:bg-surface-secondary/60">
                  <TD>
                    <div className="flex items-center gap-3">
                      <CustomerAvatar name={customer.name} />
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-small text-text-secondary">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </TD>
                  <TD>{customer.company}</TD>
                  <TD>
                    <CustomerStatusBadge status={customer.status} />
                  </TD>
                  <TD>{t(`enums.industry.${customer.industry}`)}</TD>
                  <TD>{formatCurrency(customer.revenue)}</TD>
                  <TD>
                    {owner ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={owner.name} size="sm" />
                        <span className="text-small">{owner.name}</span>
                      </div>
                    ) : (
                      '—'
                    )}
                  </TD>
                  <TD>{formatDate(customer.createdAt, i18n.language)}</TD>
                  <TD>
                    <Dropdown
                      triggerLabel="⋮"
                      variant="ghost"
                      size="sm"
                      align="end"
                      items={actionItems(customer)}
                    />
                  </TD>
                </TR>
              )
            })}
          </TBody>
        </Table>
      </div>

      <div className="grid gap-3 md:hidden">
        {customers.map((customer) => {
          const owner = usersById[customer.ownerId]

          return (
            <Card key={customer.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CustomerAvatar name={customer.name} size="md" />
                  <div>
                    <Typography variant="h3">{customer.name}</Typography>
                    <Typography muted className="text-small">
                      {customer.company}
                    </Typography>
                  </div>
                </div>
                <Dropdown
                  triggerLabel="⋮"
                  variant="ghost"
                  size="sm"
                  align="end"
                  items={actionItems(customer)}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <CustomerStatusBadge status={customer.status} />
                <span className="text-small text-text-secondary">
                  {t(`enums.industry.${customer.industry}`)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium">
                  {formatCurrency(customer.revenue)}
                </span>
                {owner ? <Avatar name={owner.name} size="sm" /> : null}
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
