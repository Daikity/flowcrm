import { DealStageBadge, type DealListItem } from '@/entities/deal'
import { ChangeDealStage } from '@/features/deal-change-stage'
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

type SortBy = 'title' | 'value' | 'probability' | 'expectedCloseDate' | 'createdAt'

interface DealsTableProps {
  deals: DealListItem[]
  users: User[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  onSort: (column: SortBy) => void
  onEdit: (deal: DealListItem) => void
}

export function DealsTable({
  deals,
  users,
  sortBy,
  sortOrder,
  onSort,
  onEdit,
}: DealsTableProps) {
  const usersById = Object.fromEntries(users.map((user) => [user.id, user]))

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
              <TH>
                <button type="button" onClick={() => onSort('title')}>
                  Deal{sortLabel('title')}
                </button>
              </TH>
              <TH>Customer</TH>
              <TH>Stage</TH>
              <TH>
                <button type="button" onClick={() => onSort('value')}>
                  Value{sortLabel('value')}
                </button>
              </TH>
              <TH>
                <button type="button" onClick={() => onSort('probability')}>
                  Probability{sortLabel('probability')}
                </button>
              </TH>
              <TH>Owner</TH>
              <TH>
                <button type="button" onClick={() => onSort('expectedCloseDate')}>
                  Close{sortLabel('expectedCloseDate')}
                </button>
              </TH>
              <TH className="w-16">Actions</TH>
            </TR>
          </THead>
          <TBody>
            {deals.map((deal) => {
              const owner = usersById[deal.ownerId]

              return (
                <TR key={deal.id} className="hover:bg-surface-secondary/60">
                  <TD className="font-medium">{deal.title}</TD>
                  <TD>{deal.customerName}</TD>
                  <TD>
                    <ChangeDealStage deal={deal} className="w-40" />
                  </TD>
                  <TD>{formatCurrency(deal.value)}</TD>
                  <TD>{deal.probability}%</TD>
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
                  <TD>{formatDate(deal.expectedCloseDate)}</TD>
                  <TD>
                    <Dropdown
                      triggerLabel="⋮"
                      variant="ghost"
                      size="sm"
                      align="end"
                      items={[
                        {
                          id: 'edit',
                          label: 'Edit',
                          onSelect: () => onEdit(deal),
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
        {deals.map((deal) => {
          const owner = usersById[deal.ownerId]

          return (
            <Card key={deal.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Typography variant="h3">{deal.title}</Typography>
                  <Typography muted className="text-small">
                    {deal.customerName}
                  </Typography>
                </div>
                <Dropdown
                  triggerLabel="⋮"
                  variant="ghost"
                  size="sm"
                  align="end"
                  items={[
                    {
                      id: 'edit',
                      label: 'Edit',
                      onSelect: () => onEdit(deal),
                    },
                  ]}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <DealStageBadge stage={deal.stage} />
                <span className="text-small text-text-secondary">
                  {deal.probability}%
                </span>
              </div>

              <div className="mt-3">
                <ChangeDealStage deal={deal} className="w-full" />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium">{formatCurrency(deal.value)}</span>
                {owner ? <Avatar name={owner.name} size="sm" /> : null}
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
