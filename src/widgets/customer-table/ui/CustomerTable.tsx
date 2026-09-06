import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const usersById = Object.fromEntries(users.map((user) => [user.id, user]))
  const allSelected =
    customers.length > 0 && customers.every((customer) => selectedIds.includes(customer.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedIds([])
      return
    }
    setSelectedIds(customers.map((customer) => customer.id))
  }

  function toggleOne(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  function sortLabel(column: string) {
    if (sortBy !== column) return ''
    return sortOrder === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <THead>
            <TR>
              <TH className="w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all customers"
                />
              </TH>
              <TH>
                <button type="button" onClick={() => onSort('name')}>
                  Customer{sortLabel('name')}
                </button>
              </TH>
              <TH>
                <button type="button" onClick={() => onSort('company')}>
                  Company{sortLabel('company')}
                </button>
              </TH>
              <TH>Status</TH>
              <TH>Industry</TH>
              <TH>
                <button type="button" onClick={() => onSort('revenue')}>
                  Revenue{sortLabel('revenue')}
                </button>
              </TH>
              <TH>Owner</TH>
              <TH>
                <button type="button" onClick={() => onSort('createdAt')}>
                  Created{sortLabel('createdAt')}
                </button>
              </TH>
              <TH className="w-16">Actions</TH>
            </TR>
          </THead>
          <TBody>
            {customers.map((customer) => {
              const owner = usersById[customer.ownerId]

              return (
                <TR key={customer.id} className="hover:bg-surface-secondary/60">
                  <TD>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(customer.id)}
                      onChange={() => toggleOne(customer.id)}
                      aria-label={`Select ${customer.name}`}
                    />
                  </TD>
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
                  <TD>{customer.industry}</TD>
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
                  <TD>{formatDate(customer.createdAt)}</TD>
                  <TD>
                    <Dropdown
                      triggerLabel="⋮"
                      variant="ghost"
                      size="sm"
                      align="end"
                      items={[
                        {
                          id: 'view',
                          label: 'View',
                          onSelect: () => navigate(`/customers/${customer.id}`),
                        },
                        {
                          id: 'edit',
                          label: 'Edit',
                          onSelect: () => onEdit(customer),
                        },
                        {
                          id: 'delete',
                          label: 'Delete',
                          danger: true,
                          onSelect: () => onDelete(customer),
                        },
                      ]}
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
                  items={[
                    {
                      id: 'view',
                      label: 'View',
                      onSelect: () => navigate(`/customers/${customer.id}`),
                    },
                    {
                      id: 'edit',
                      label: 'Edit',
                      onSelect: () => onEdit(customer),
                    },
                    {
                      id: 'delete',
                      label: 'Delete',
                      danger: true,
                      onSelect: () => onDelete(customer),
                    },
                  ]}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <CustomerStatusBadge status={customer.status} />
                <span className="text-small text-text-secondary">
                  {customer.industry}
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
