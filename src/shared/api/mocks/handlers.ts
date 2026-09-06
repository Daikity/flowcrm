import { http, HttpResponse } from 'msw'
import { dashboardData } from './data/dashboard'

export const handlers = [
  http.get('/api/dashboard', async () => {
    await delay(400)
    return HttpResponse.json(dashboardData)
  }),
]

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
