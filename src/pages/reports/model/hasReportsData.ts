export function hasReportsData(data: {
  revenue: unknown[]
  byOwner: unknown[]
  pipeline: Array<{ count: number }>
}) {
  return (
    data.revenue.length > 0 ||
    data.byOwner.length > 0 ||
    data.pipeline.some((item) => item.count > 0)
  )
}
