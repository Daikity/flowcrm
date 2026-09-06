import {
  DEAL_STAGE_LABEL,
  DEAL_STAGES,
  type DealListItem,
  type DealsTotals,
} from '@/entities/deal'
import { ChangeDealStage } from '@/features/deal-change-stage'
import type { User } from '@/entities/user'
import { formatCurrency } from '@/shared/lib'
import { Avatar, Card, Typography } from '@/shared/ui'

interface DealsKanbanProps {
  deals: DealListItem[]
  users: User[]
  totals: DealsTotals
  onEdit: (deal: DealListItem) => void
}

export function DealsKanban({
  deals,
  users,
  totals,
  onEdit,
}: DealsKanbanProps) {
  const usersById = Object.fromEntries(users.map((user) => [user.id, user]))

  const byStage = Object.fromEntries(
    DEAL_STAGES.map((stage) => [
      stage,
      deals.filter((deal) => deal.stage === stage),
    ]),
  ) as Record<(typeof DEAL_STAGES)[number], DealListItem[]>

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {DEAL_STAGES.map((stage) => {
        const columnDeals = byStage[stage]
        const columnTotal = totals.byStage[stage]

        return (
          <div
            key={stage}
            className="flex w-72 shrink-0 flex-col gap-3 rounded-lg border border-border bg-surface-secondary/40 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <Typography variant="h3">{DEAL_STAGE_LABEL[stage]}</Typography>
                <Typography muted className="text-small">
                  {columnTotal.count} · {formatCurrency(columnTotal.value)}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {columnDeals.length === 0 ? (
                <p className="px-1 py-6 text-center text-small text-text-secondary">
                  No deals
                </p>
              ) : (
                columnDeals.map((deal) => {
                  const owner = usersById[deal.ownerId]

                  return (
                    <Card
                      key={deal.id}
                      className="cursor-pointer p-3 transition hover:border-primary/40"
                      onClick={() => onEdit(deal)}
                    >
                      <Typography variant="h3" className="text-body">
                        {deal.title}
                      </Typography>
                      <Typography muted className="mt-1 text-small">
                        {deal.customerName}
                      </Typography>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="font-medium">
                          {formatCurrency(deal.value)}
                        </span>
                        {owner ? <Avatar name={owner.name} size="sm" /> : null}
                      </div>

                      <div
                        className="mt-3"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <ChangeDealStage deal={deal} className="w-full" />
                      </div>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
