# FlowCRM

B2B Sales Management Platform.

## Стек

- React 19 + TypeScript + Vite
- Tailwind CSS
- Redux Toolkit + RTK Query
- React Router
- React Hook Form + Zod
- Recharts
- MSW + Vitest

## Структура (FSD)

```
src/
├── app/        # инициализация приложения, провайдеры, роутер, store
├── pages/      # страницы (композиция виджетов)
├── widgets/    # самостоятельные блоки UI
├── features/   # пользовательские сценарии
├── entities/   # бизнес-сущности
└── shared/     # переиспользуемый код (ui, api, lib, config)
```

## Команды

```bash
npm install
npm run dev      # разработка
npm run build    # продакшен-сборка
npm run lint     # ESLint
npm run test     # Vitest
```

## Переменные окружения

Скопируйте `.env` и при необходимости измените:

- `VITE_API_BASE_URL` — базовый URL API
- `VITE_APP_NAME` — название приложения
