import '@/shared/config/i18n'
import { setupAuthBridge } from '@/features/auth'
import { StoreProvider } from './providers'
import { AppRouter } from './router'

setupAuthBridge()

export function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  )
}
