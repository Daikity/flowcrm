import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './providers/router'
import { store } from './store'

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
