import type { ReportsData, ReportsParams } from '@/entities/report'
import { baseApi } from './baseApi'

function toQuery(params: ReportsParams) {
  const query: Record<string, string> = {}
  if (params.from) query.from = params.from
  if (params.to) query.to = params.to
  if (params.ownerId) query.ownerId = params.ownerId
  if (params.stage) query.stage = params.stage
  return query
}

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReports: build.query<ReportsData, ReportsParams | void>({
      query: (params) => ({
        url: '/reports',
        params: params ? toQuery(params) : undefined,
      }),
      providesTags: ['Report'],
    }),
  }),
})

export const { useGetReportsQuery } = reportsApi
