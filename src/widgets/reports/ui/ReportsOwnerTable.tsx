import type { ReportOwnerBreakdown } from '@/entities/report'
import { formatCurrency } from '@/shared/lib'
import {
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
  Typography,
} from '@/shared/ui'

interface ReportsOwnerTableProps {
  data: ReportOwnerBreakdown[]
}

export function ReportsOwnerTable({ data }: ReportsOwnerTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>By Owner</CardTitle>
        <CardDescription>Выручка и сделки по владельцам</CardDescription>
      </CardHeader>

      {data.length === 0 ? (
        <Typography muted className="py-8 text-center">
          Нет данных по владельцам
        </Typography>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <THead>
              <TR>
                <TH>Owner</TH>
                <TH>Deals</TH>
                <TH>Won</TH>
                <TH>Revenue</TH>
              </TR>
            </THead>
            <TBody>
              {data.map((row) => (
                <TR key={row.ownerId}>
                  <TD>{row.ownerName}</TD>
                  <TD>{row.deals}</TD>
                  <TD>{row.wonDeals}</TD>
                  <TD>{formatCurrency(row.revenue)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      )}
    </Card>
  )
}
