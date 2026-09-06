import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../model/authStorage'

/** Для / и /login: если уже авторизован — на dashboard */
export function GuestRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
