import type { User } from '@/entities/user'
import { baseApi } from './baseApi'

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => '/users',
    }),
  }),
})

export const { useGetUsersQuery } = usersApi
