import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'
import { customersApi } from '@/shared/api/customersApi'
import { dashboardApi } from '@/shared/api/dashboardApi'
import { dealsApi } from '@/shared/api/dealsApi'
import { tasksApi } from '@/shared/api/tasksApi'
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
void dealsApi
void tasksApi
void usersApi

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
