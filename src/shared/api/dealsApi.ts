import type {
  CreateDealInput,
  DealListItem,
  DealsParams,
  DealsResponse,
  UpdateDealInput,
} from '@/entities/deal'
import { baseApi } from './baseApi'

export const dealsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDeals: build.query<DealsResponse, DealsParams>({
      query: (params) => ({
        url: '/deals',
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Deal' as const, id: 'LIST' },
              ...result.items.map((deal) => ({
                type: 'Deal' as const,
                id: deal.id,
              })),
            ]
          : [{ type: 'Deal' as const, id: 'LIST' }],
    }),

    createDeal: build.mutation<DealListItem, CreateDealInput>({
      query: (body) => ({
        url: '/deals',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Deal', id: 'LIST' },
        'Dashboard',
      ],
    }),

    updateDeal: build.mutation<
      DealListItem,
      { id: string; data: UpdateDealInput }
    >({
      query: ({ id, data }) => ({
        url: `/deals/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Deal', id },
        { type: 'Deal', id: 'LIST' },
        'Dashboard',
      ],
    }),
  }),
})

function cleanParams(params: DealsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      return value !== undefined && value !== ''
    }),
  )
}

export const {
  useGetDealsQuery,
  useCreateDealMutation,
  useUpdateDealMutation,
} = dealsApi
