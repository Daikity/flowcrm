import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CustomerAvatar, CustomerStatusBadge } from '@/entities/customer'
import type { DealStage } from '@/entities/deal'
import { useGetCustomerQuery, useGetUsersQuery } from '@/shared/api'
import { formatCurrency, formatDate, isNotFoundError } from '@/shared/lib'
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Skeleton,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Typography,
} from '@/shared/ui'

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

export function CustomerDetailsPage() {
  const { t, i18n } = useTranslation()
  const { id = '' } = useParams()
  const { data, isLoading, isError, error, refetch } = useGetCustomerQuery(id, {
    skip: !id,
  })
  const { data: users = [] } = useGetUsersQuery()

  if (isLoading) {
    return <CustomerDetailsSkeleton />
  }

  if (isNotFoundError(error) || (!isLoading && !isError && !data)) {
    return (
      <EmptyState
        title={t('customers.details.notFound.title')}
        description={t('customers.details.notFound.description')}
        action={
          <Link to="/customers">
            <Button type="button" variant="secondary">
              {t('customers.details.back')}
            </Button>
          </Link>
        }
      />
    )
  }

  if (isError || !data) {
    return (
      <EmptyState
        title={t('common.error.title')}
        description={t('customers.details.error.description')}
        action={
          <div className="flex gap-2">
            <Link to="/customers">
              <Button type="button" variant="secondary">
                {t('customers.details.back')}
              </Button>
            </Link>
            <Button type="button" onClick={() => void refetch()}>
              {t('common.retry')}
            </Button>
          </div>
        }
      />
    )
  }

  const owner = users.find((user) => user.id === data.ownerId)

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/customers"
          className="text-small text-text-secondary hover:text-text-primary"
        >
          {t('customers.details.back')}
        </Link>
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <CustomerAvatar name={data.name} size="lg" />
        <div className="space-y-2">
          <Typography variant="h1">{data.company}</Typography>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-body text-text-secondary">
              {t(`enums.industry.${data.industry}`)}
            </span>
            <CustomerStatusBadge status={data.status} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('customers.details.overview.title')}</CardTitle>
            <CardDescription>
              {t('customers.details.overview.description')}
            </CardDescription>
          </CardHeader>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-small text-text-secondary">
                {t('customers.details.metrics.revenue')}
              </dt>
              <dd className="text-h3">
                {formatCurrency(data.revenue)}
              </dd>
            </div>
            <div>
              <dt className="text-small text-text-secondary">
                {t('customers.details.metrics.deals')}
              </dt>
              <dd className="text-h3">{data.dealsCount}</dd>
            </div>
            <div>
              <dt className="text-small text-text-secondary">
                {t('customers.details.metrics.openDeals')}
              </dt>
              <dd className="text-h3">{data.openDealsCount}</dd>
            </div>
            <div>
              <dt className="text-small text-text-secondary">
                {t('customers.details.metrics.created')}
              </dt>
              <dd className="text-h3">
                {formatDate(data.createdAt, i18n.language)}
              </dd>
            </div>
          </dl>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('customers.details.contact.title')}</CardTitle>
            <CardDescription>
              {t('customers.details.contact.description')}
            </CardDescription>
          </CardHeader>
          <div className="space-y-2">
            <p className="font-medium">{data.name}</p>
            <p className="text-body text-text-secondary">{data.email}</p>
            <p className="text-body text-text-secondary">{data.phone}</p>
            {owner ? (
              <p className="pt-2 text-small text-text-secondary">
                {t('customers.details.owner', { name: owner.name })}
              </p>
            ) : null}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="p-5 pb-0">
          <CardHeader>
            <CardTitle>{t('customers.details.deals.title')}</CardTitle>
            <CardDescription>
              {t('customers.details.deals.description')}
            </CardDescription>
          </CardHeader>
        </div>
        {data.deals.length === 0 ? (
          <p className="px-5 pb-5 text-body text-text-secondary">
            {t('customers.details.deals.empty')}
          </p>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>{t('customers.details.deals.columns.deal')}</TH>
                <TH>{t('customers.details.deals.columns.stage')}</TH>
                <TH>{t('customers.details.deals.columns.value')}</TH>
                <TH>{t('customers.details.deals.columns.expectedClose')}</TH>
              </TR>
            </THead>
            <TBody>
              {data.deals.map((deal) => (
                <TR key={deal.id}>
                  <TD className="font-medium">{deal.title}</TD>
                  <TD>
                    <Badge variant={stageVariant[deal.stage]}>
                      {t(`enums.dealStage.${deal.stage}`)}
                    </Badge>
                  </TD>
                  <TD>{formatCurrency(deal.value)}</TD>
                  <TD>{formatDate(deal.expectedCloseDate, i18n.language)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('customers.details.activity.title')}</CardTitle>
          <CardDescription>
            {t('customers.details.activity.description')}
          </CardDescription>
        </CardHeader>
        {data.activities.length === 0 ? (
          <p className="text-body text-text-secondary">
            {t('customers.details.activity.empty')}
          </p>
        ) : (
          <ul className="space-y-3">
            {data.activities.map((activity) => (
              <li key={activity.id} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-body text-text-primary">{activity.message}</p>
                  <p className="text-small text-text-secondary">
                    {formatDate(activity.createdAt, i18n.language)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

function CustomerDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton height={20} width={160} />
      <div className="flex items-center gap-4">
        <Skeleton height={48} width={48} rounded="full" />
        <div className="space-y-2">
          <Skeleton height={28} width={240} />
          <Skeleton height={18} width={160} />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton height={180} className="w-full" rounded="lg" />
        <Skeleton height={180} className="w-full" rounded="lg" />
      </div>
      <Skeleton height={220} className="w-full" rounded="lg" />
      <Skeleton height={180} className="w-full" rounded="lg" />
    </div>
  )
}
