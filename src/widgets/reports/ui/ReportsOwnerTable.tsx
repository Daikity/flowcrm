import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('reports.byOwner.title')}</CardTitle>
        <CardDescription>{t('reports.byOwner.description')}</CardDescription>
      </CardHeader>

      {data.length === 0 ? (
        <Typography muted className="py-8 text-center">
          {t('reports.byOwner.empty')}
        </Typography>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <THead>
              <TR>
                <TH>{t('reports.byOwner.columns.owner')}</TH>
                <TH>{t('reports.byOwner.columns.deals')}</TH>
                <TH>{t('reports.byOwner.columns.won')}</TH>
                <TH>{t('reports.byOwner.columns.revenue')}</TH>
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
