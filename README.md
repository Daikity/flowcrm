# FlowCRM

B2B CRM для управления продажами: клиенты, сделки, задачи и аналитика.

## Стек

- React 19 + TypeScript + Vite
- Tailwind CSS
- Redux Toolkit + RTK Query
- React Router
- React Hook Form + Zod
- Recharts
- MSW (mock API)
- Vitest

## Архитектура

Feature-Sliced Design (`app` / `pages` / `widgets` / `features` / `entities` / `shared`).

Поток данных:

```text
UI → RTK Query → /api/* → MSW → mock data → cache → UI
```

## Этапы

### 1. Dashboard

- KPI, revenue chart, sales pipeline
- Recent deals / recent activity
- `GET /api/dashboard` через MSW + RTK Query
- loading / error / empty states

### 2. Customers

- CRUD: list, create, edit, delete, details
- search, filters, sorting, pagination
- состояние в URL query params
- формы на React Hook Form + Zod
- cache invalidation через RTK Query tags
- desktop table + mobile cards

### 3. Deals

- list: `GET /api/deals`, create: `POST`, update: `PATCH`
- search, фильтры по stage / owner, сортировка
- pagination в Table view
- переключатель Table / Kanban (одно и то же API, разный presentation)
- Kanban по стадиям: Lead → Qualified → Proposal → Negotiation → Won / Lost
- создание и редактирование сделки, смена stage через UI
- расчёт totals по pipeline
- loading / error / empty, responsive
- RTK Query cache invalidation + MSW с мутацией mock dataset

## Команды

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test:run
```

Демо-вход: `admin` / `admin`

После входа: `/dashboard`, `/customers`, `/deals`.
