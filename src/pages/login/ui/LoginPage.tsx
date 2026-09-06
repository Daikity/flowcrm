import { LoginForm } from '@/features/auth'
import { env } from '@/shared/config'
import { Card, Typography } from '@/shared/ui'

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Typography variant="h2">{env.appName}</Typography>
          <Typography muted>Войдите, чтобы продолжить</Typography>
        </div>
        <LoginForm />
        <Typography variant="caption" muted className="block text-center normal-case tracking-normal">
          demo: admin / admin
        </Typography>
      </Card>
    </div>
  )
}
