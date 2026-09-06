import { useSyncExternalStore } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {
  getServerSnapshot,
  getSnapshot,
  isAuthenticated,
  subscribe,
} from '../model/session'

/** Для / и /login: если уже авторизован — на dashboard */
export function GuestRoute() {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
