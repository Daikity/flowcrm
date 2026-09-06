import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/index.css'

export { App } from './App'

async function enableMocking() {
  if (import.meta.env.PROD) {
    return
  }

  const { worker } = await import('@/shared/api/mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    createElement(StrictMode, null, createElement(App)),
  )
})
