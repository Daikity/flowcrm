import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, Typography } from '@/shared/ui'
import {
  saveAuth,
  validateCredentials,
} from '../model/authStorage'

export function LoginForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from =
    typeof location.state === 'object' &&
    location.state !== null &&
    'from' in location.state &&
    typeof (location.state as { from: unknown }).from === 'string'
      ? (location.state as { from: string }).from
      : '/dashboard'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateCredentials(login.trim(), password)) {
      setError(t('auth.login.invalidCredentials'))
      return
    }

    saveAuth()
    navigate(from || '/dashboard', { replace: true })
  }

  return (
    <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label={t('auth.login.username')}
        name="login"
        autoComplete="username"
        value={login}
        onChange={(event) => {
          setLogin(event.target.value)
          setError('')
        }}
        placeholder={t('auth.login.placeholder')}
      />
      <Input
        label={t('auth.login.password')}
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
          setError('')
        }}
        placeholder={t('auth.login.placeholder')}
      />
      {error ? (
        <Typography variant="small" className="text-danger">
          {error}
        </Typography>
      ) : null}
      <Button type="submit" className="w-full">
        {t('auth.login.submit')}
      </Button>
    </form>
  )
}
