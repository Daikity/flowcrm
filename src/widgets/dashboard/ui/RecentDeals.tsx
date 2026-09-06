import type { Deal, DealStage } from '@/entities/deal'
import { formatCurrency, formatDate } from '@/shared/lib'
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '@/shared/ui'

interface RecentDealsProps {
  deals: Deal[]
}

const stageVariant: Record<
  DealStage,
  'neutral' | 'primary' | 'success' | 'warning' | 'danger'
> = {
  lead: 'neutral',
  qualified: 'primary',
  proposal: 'warning',
  negotiation: 'warning',
  won: 'success',
  lost: 'danger',
}

export function RecentDeals({ deals }: RecentDealsProps) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-5 pb-0">
        <CardHeader>
          <CardTitle>Recent deals</CardTitle>
          <CardDescription>Последние сделки в пайплайне</CardDescription>
        </CardHeader>
      </div>
      <Table>
        <THead>
          <TR>
            <TH>Deal</TH>
            <TH>Stage</TH>
            <TH>Value</TH>
            <TH>Created</TH>
          </TR>
        </THead>
        <TBody>
          {deals.map((deal) => (
            <TR key={deal.id}>
              <TD className="font-medium">{deal.title}</TD>
              <TD>
                <Badge variant={stageVariant[deal.stage]}>{deal.stage}</Badge>
              </TD>
              <TD>{formatCurrency(deal.value)}</TD>
              <TD>{formatDate(deal.createdAt)}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </Card>
  )
}
