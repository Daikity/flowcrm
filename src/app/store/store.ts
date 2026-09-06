import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'
import { customersApi } from '@/shared/api/customersApi'
import { dashboardApi } from '@/shared/api/dashboardApi'
import { usersApi } from '@/shared/api/usersApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// регистрируем injectEndpoints
void dashboardApi
void customersApi
void usersApi

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
