import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /** Probe endpoint for auth headers / 401 handling (MSW). */
    authProbe: build.query<{ ok: boolean }, void>({
      query: () => '/auth/probe',
    }),
  }),
})

export const { useAuthProbeQuery, useLazyAuthProbeQuery } = authApi
