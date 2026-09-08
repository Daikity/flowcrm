# FlowCRM

B2B CRM для управления продажами: клиенты, сделки, задачи и аналитика.

## Стек

- React 19 + TypeScript + Vite
- Tailwind CSS
- Redux Toolkit + RTK Query
- React Router
- React Hook Form + Zod
- Recharts
- i18next / react-i18next (en, ru, de, fr)
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

### 4. Tasks

- list: `GET /api/tasks`, create: `POST`, update: `PATCH`
- search; фильтры status / priority / assignee / due date; сортировка; pagination
- UI: секции Overdue / Today / Upcoming / Completed (не таблица)
- создание и редактирование, смена status, priority badges, overdue state
- привязка к customer / deal
- URL query params, loading / error / empty, responsive
- RTK Query cache invalidation + MSW stateful + тесты handlers

### 5. Reports / Analytics

- `GET /api/reports` — агрегация поверх deals (не отдельный CRUD)
- фильтры: date range, owner, stage (в URL query params)
- KPI: Revenue, Won Deals, Win Rate, Pipeline Value
- Recharts: Area (revenue по месяцам) + Bar (pipeline by stage)
- breakdown by owner, loading / error / empty, responsive
- derived data в MSW + RTK Query + тесты handlers

### 6. i18n

- `react-i18next` + локали `en` / `ru` / `de` / `fr`
- переключатель языка в header
- UI-строки (auth, dashboard, customers, deals, tasks, reports, shared UI) через `t(...)`
- zod-схемы форм — factory с `TFunction` для локализованных ошибок валидации
- даты и валюта через `Intl` с учётом выбранной локали

### 7. Hardening

- Reports: Zod-валидация URL-фильтров (`stage`, ISO dates, `from <= to` swap), `useReportsFilters`, controlled `ReportFilters`
- Auth ↔ API: session facade над `authStorage`, `Authorization` headers, 401 → logout (без navigate в API), MSW `/api/auth/probe`
- Reports UX: empty по датасетам, локальный refetch indicator
- Quality: `npm run typecheck`, `npm run check`, GitHub Actions CI

## Команды

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test:run
npm run check
```

Демо-вход: `admin` / `admin`

После входа: `/dashboard`, `/customers`, `/deals`, `/tasks`, `/reports`.

## Портфолио / Docker

- Vite `base`: `/demos/flowcrm/`
- Router `basename`: из `import.meta.env.BASE_URL`
- MSW включён и в production (демо без бэкенда)
- Образ: `Dockerfile` → nginx SPA

В стеке портфолио: http://localhost/demos/flowcrm/
