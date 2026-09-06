import { afterEach, beforeAll, afterAll, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node'
import type { TaskListItem, TasksResponse } from '@/entities/task'
import { handlers } from './handlers'
import { resetTasks } from './data/tasks'
import { todayIsoDate } from './tasks.logic'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetTasks()
})

afterAll(() => {
  server.close()
})

describe('MSW tasks handlers', () => {
  it('lists tasks with pagination', async () => {
    const response = await fetch('/api/tasks?page=1&limit=10')
    expect(response.status).toBe(200)

    const body = (await response.json()) as TasksResponse
    expect(body.items).toHaveLength(10)
    expect(body.page).toBe(1)
    expect(body.limit).toBe(10)
    expect(body.total).toBeGreaterThan(10)
    expect(body.totalPages).toBeGreaterThan(1)
    expect(typeof body.items[0].isOverdue).toBe('boolean')
  })

  it('filters tasks by status, priority and search', async () => {
    const response = await fetch(
      '/api/tasks?status=todo&priority=urgent&search=discovery&limit=50',
    )
    const body = (await response.json()) as TasksResponse

    expect(body.items.length).toBeGreaterThan(0)
    expect(body.items.every((item) => item.status === 'todo')).toBe(true)
    expect(body.items.every((item) => item.priority === 'urgent')).toBe(true)
    expect(
      body.items.every((item) =>
        item.title.toLowerCase().includes('discovery'),
      ),
    ).toBe(true)
  })

  it('filters overdue tasks', async () => {
    const today = todayIsoDate()
    const response = await fetch('/api/tasks?due=overdue&limit=50')
    const body = (await response.json()) as TasksResponse

    expect(body.items.length).toBeGreaterThan(0)
    expect(
      body.items.every(
        (item) =>
          item.status !== 'completed' &&
          item.dueDate < today &&
          item.isOverdue,
      ),
    ).toBe(true)
  })

  it('creates a task (POST)', async () => {
    const payload = {
      title: 'Test Task',
      status: 'todo',
      priority: 'medium',
      assigneeId: 'user-1',
      dueDate: todayIsoDate(),
      customerId: 'cust-1',
      dealId: 'deal-1',
    }

    const createResponse = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    expect(createResponse.status).toBe(201)
    const created = (await createResponse.json()) as TaskListItem
    expect(created.title).toBe('Test Task')
    expect(created.customerName).toBe('Nordic Soft')
    expect(created.dealTitle).toContain('Nordic Soft')

    const list = (await (
      await fetch('/api/tasks?search=Test Task&limit=50')
    ).json()) as TasksResponse
    expect(list.items.some((item) => item.id === created.id)).toBe(true)
  })

  it('updates task status (PATCH)', async () => {
    const response = await fetch('/api/tasks/task-5', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' }),
    })

    expect(response.status).toBe(200)
    const updated = (await response.json()) as TaskListItem
    expect(updated.status).toBe('completed')
    expect(updated.isOverdue).toBe(false)
  })

  it('returns 404 for unknown task', async () => {
    const response = await fetch('/api/tasks/missing', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'todo' }),
    })

    expect(response.status).toBe(404)
  })
})
