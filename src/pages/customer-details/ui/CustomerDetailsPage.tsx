import { Link, useParams } from 'react-router-dom'
import { CustomerAvatar, CustomerStatusBadge } from '@/entities/customer'
import type { DealStage } from '@/entities/deal'
import { useGetCustomerQuery, useGetUsersQuery } from '@/shared/api'
import { formatCurrency, formatDate } from '@/shared/lib'
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
  const { id = '' } = useParams()
  const { data, isLoading, isError, refetch } = useGetCustomerQuery(id, {
    skip: !id,
  })
  const { data: users = [] } = useGetUsersQuery()

  if (isLoading) {
    return <CustomerDetailsSkeleton />
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Something went wrong."
        description="Unable to load customer details."
        action={
          <div className="flex gap-2">
            <Link to="/customers">
              <Button type="button" variant="secondary">
                Back to customers
              </Button>
            </Link>
            <Button type="button" onClick={() => void refetch()}>
              Try again
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
          ← Back to customers
        </Link>
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <CustomerAvatar name={data.name} size="lg" />
        <div className="space-y-2">
          <Typography variant="h1">{data.company}</Typography>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-body text-text-secondary">{data.industry}</span>
            <CustomerStatusBadge status={data.status} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Key metrics for this customer</CardDescription>
          </CardHeader>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-small text-text-secondary">Revenue</dt>
              <dd className="text-h3">{formatCurrency(data.revenue)}</dd>
            </div>
            <div>
              <dt className="text-small text-text-secondary">Deals</dt>
              <dd className="text-h3">{data.dealsCount}</dd>
            </div>
            <div>
              <dt className="text-small text-text-secondary">Open deals</dt>
              <dd className="text-h3">{data.openDealsCount}</dd>
            </div>
            <div>
              <dt className="text-small text-text-secondary">Created</dt>
              <dd className="text-h3">{formatDate(data.createdAt)}</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>Primary contact details</CardDescription>
          </CardHeader>
          <div className="space-y-2">
            <p className="font-medium">{data.name}</p>
            <p className="text-body text-text-secondary">{data.email}</p>
            <p className="text-body text-text-secondary">{data.phone}</p>
            {owner ? (
              <p className="pt-2 text-small text-text-secondary">
                Owner: {owner.name}
              </p>
            ) : null}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="p-5 pb-0">
          <CardHeader>
            <CardTitle>Deals</CardTitle>
            <CardDescription>Deals linked to this customer</CardDescription>
          </CardHeader>
        </div>
        {data.deals.length === 0 ? (
          <p className="px-5 pb-5 text-body text-text-secondary">
            No deals yet.
          </p>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Deal</TH>
                <TH>Stage</TH>
                <TH>Value</TH>
                <TH>Expected close</TH>
              </TR>
            </THead>
            <TBody>
              {data.deals.map((deal) => (
                <TR key={deal.id}>
                  <TD className="font-medium">{deal.title}</TD>
                  <TD>
                    <Badge variant={stageVariant[deal.stage]}>{deal.stage}</Badge>
                  </TD>
                  <TD>{formatCurrency(deal.value)}</TD>
                  <TD>{formatDate(deal.expectedCloseDate)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
          <CardDescription>Recent activity for this customer</CardDescription>
        </CardHeader>
        {data.activities.length === 0 ? (
          <p className="text-body text-text-secondary">No activity yet.</p>
        ) : (
          <ul className="space-y-3">
            {data.activities.map((activity) => (
              <li key={activity.id} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-body text-text-primary">{activity.message}</p>
                  <p className="text-small text-text-secondary">
                    {formatDate(activity.createdAt)}
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
