import type {
  CreateCustomerInput,
  Customer,
  CustomerDetails,
  CustomersParams,
  CustomersResponse,
  UpdateCustomerInput,
} from '@/entities/customer'
import { baseApi } from './baseApi'

export const customersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query<CustomersResponse, CustomersParams>({
      query: (params) => ({
        url: '/customers',
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Customer' as const, id: 'LIST' },
              ...result.items.map((customer) => ({
                type: 'Customer' as const,
                id: customer.id,
              })),
            ]
          : [{ type: 'Customer' as const, id: 'LIST' }],
    }),

    getCustomer: build.query<CustomerDetails, string>({
      query: (id) => `/customers/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Customer', id }],
    }),

    createCustomer: build.mutation<Customer, CreateCustomerInput>({
      query: (body) => ({
        url: '/customers',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
    }),

    updateCustomer: build.mutation<
      Customer,
      { id: string; data: UpdateCustomerInput }
    >({
      query: ({ id, data }) => ({
        url: `/customers/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Customer', id },
        { type: 'Customer', id: 'LIST' },
      ],
    }),

    deleteCustomer: build.mutation<void, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Customer', id },
        { type: 'Customer', id: 'LIST' },
      ],
    }),
  }),
})

function cleanParams(params: CustomersParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      return value !== undefined && value !== ''
    }),
  )
}

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi
