import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/index.css'

export { App } from './App'

async function enableMocking() {
  // Моки нужны и в Docker-демо (бэкенда нет)
  const { worker } = await import('@/shared/api/mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  })
}

void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    createElement(StrictMode, null, createElement(App)),
  )
})
