import { useSyncExternalStore } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {
  getServerSnapshot,
  getSnapshot,
  isAuthenticated,
  subscribe,
} from '../model/session'

export function ProtectedRoute() {
  const location = useLocation()
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
