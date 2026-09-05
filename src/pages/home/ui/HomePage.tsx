import { AppLayout } from '@/widgets/app-layout'

export function HomePage() {
  return (
    <AppLayout>
      <section className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          FlowCRM
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          B2B Sales Management Platform
        </h1>
        <p className="text-lg text-slate-600">
          Архитектура FSD готова. Добавляйте сущности, фичи и виджеты в
          соответствующие слои.
        </p>
      </section>
    </AppLayout>
  )
}
