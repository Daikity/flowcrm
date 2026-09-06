import { useNavigate } from 'react-router-dom'
import { env } from '@/shared/config'
import { Button, Typography } from '@/shared/ui'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="flex max-w-lg flex-col items-center gap-6 text-center">
        <Typography variant="display">{env.appName}</Typography>
        <Typography muted>
          B2B Sales Management Platform. Управляйте клиентами, сделками и задачами
          в одном месте.
        </Typography>
        <Button size="lg" onClick={() => navigate('/login')}>
          Sign in
        </Button>
      </div>
    </div>
  )
}
