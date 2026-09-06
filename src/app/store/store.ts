import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'
import { dashboardApi } from '@/shared/api/dashboardApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// регистрируем injectEndpoints
void dashboardApi

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
