import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Typography } from '@/shared/ui'
import {
  saveAuth,
  validateCredentials,
} from '../model/authStorage'

export function LoginForm() {
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateCredentials(login.trim(), password)) {
      setError('Неверный логин или пароль')
      return
    }

    saveAuth(login.trim(), password)
    navigate('/dashboard', { replace: true })
  }

  return (
    <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Логин"
        name="login"
        autoComplete="username"
        value={login}
        onChange={(event) => {
          setLogin(event.target.value)
          setError('')
        }}
        placeholder="admin"
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
          setError('')
        }}
        placeholder="admin"
      />
      {error ? (
        <Typography variant="small" className="text-danger">
          {error}
        </Typography>
      ) : null}
      <Button type="submit" className="w-full">
        Войти
      </Button>
    </form>
  )
}
