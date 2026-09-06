import { useState } from 'react'
import {
  AppShell,
  Avatar,
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  DatePicker,
  Dropdown,
  EmptyState,
  Input,
  Modal,
  Select,
  ShellHeader,
  ShellSidebar,
  Skeleton,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Typography,
} from '@/shared/ui'

const colorTokens = [
  { name: 'Background', className: 'bg-background', value: '#F3F5F7' },
  { name: 'Surface', className: 'bg-surface', value: '#FFFFFF' },
  {
    name: 'Surface secondary',
    className: 'bg-surface-secondary',
    value: '#E9EEF3',
  },
  { name: 'Border', className: 'bg-border', value: '#D5DDE5' },
  { name: 'Text primary', className: 'bg-text-primary', value: '#101828' },
  { name: 'Text secondary', className: 'bg-text-secondary', value: '#667085' },
  { name: 'Primary', className: 'bg-primary', value: '#2563EB' },
  { name: 'Success', className: 'bg-success', value: '#12B76A' },
  { name: 'Warning', className: 'bg-warning', value: '#F79009' },
  { name: 'Danger', className: 'bg-danger', value: '#E15A52' },
]

export function UiFoundationPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [demoDate, setDemoDate] = useState('2026-03-15')

  return (
    <AppShell
      sidebar={
        <ShellSidebar>
          <div className="flex h-14 items-center border-b border-border px-4">
            <Typography variant="h3">FlowCRM</Typography>
          </div>
          <nav className="flex flex-col gap-1 p-3">
            <Button variant="secondary" className="justify-start">
              UI Foundation
            </Button>
            <Button variant="ghost" className="justify-start" disabled>
              Dashboard
            </Button>
          </nav>
        </ShellSidebar>
      }
      header={
        <ShellHeader className="justify-between">
          <Typography variant="small" muted>
            UI Foundation preview
          </Typography>
          <Avatar name="Igor Edison" />
        </ShellHeader>
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="space-y-2">
          <Typography variant="display">UI Foundation</Typography>
          <Typography muted>
            Проверка цветовой системы, типографики, базовых компонентов и layout.
          </Typography>
        </section>

        <section className="space-y-4">
          <Typography variant="h2">1. Color system</Typography>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {colorTokens.map((token) => (
              <Card key={token.name} className="p-3">
                <div
                  className={`mb-3 h-16 rounded-md border border-border ${token.className}`}
                />
                <Typography variant="small">{token.name}</Typography>
                <Typography variant="caption" muted>
                  {token.value}
                </Typography>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <Typography variant="h2">2. Typography</Typography>
          <Card className="space-y-3">
            <Typography variant="display">Display</Typography>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="body">
              Body — основной текст интерфейса для описаний и контента.
            </Typography>
            <Typography variant="small" muted>
              Small — вторичный текст и подписи к полям.
            </Typography>
            <Typography variant="caption" muted>
              Caption
            </Typography>
          </Card>
        </section>

        <section className="space-y-4">
          <Typography variant="h2">3. Components</Typography>

          <Card>
            <CardHeader>
              <CardTitle>Button / Input / Select / DatePicker</CardTitle>
              <CardDescription>Базовые контролы формы</CardDescription>
            </CardHeader>
            <div className="flex flex-wrap items-end gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Delete</Button>
              <Input label="Email" placeholder="name@company.com" className="max-w-xs" />
              <Select
                label="Status"
                className="max-w-xs"
                placeholder="Выберите статус"
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'lead', label: 'Lead' },
                ]}
              />
              <DatePicker
                label="Date"
                value={demoDate}
                onChange={setDemoDate}
                className="w-44"
              />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badge / Avatar / Dropdown / Modal</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Avatar name="Anna Petrova" size="sm" />
              <Avatar name="Boris Ivanov" />
              <Avatar name="Clara Novak" size="lg" />
              <Dropdown
                triggerLabel="Actions"
                items={[
                  { id: 'edit', label: 'Edit', onSelect: () => undefined },
                  { id: 'delete', label: 'Delete', onSelect: () => undefined },
                ]}
              />
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                Open modal
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Table / Skeleton / EmptyState</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <Table>
                <THead>
                  <TR>
                    <TH>Customer</TH>
                    <TH>Status</TH>
                    <TH>Owner</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR>
                    <TD>Acme Corp</TD>
                    <TD>
                      <Badge variant="success">Active</Badge>
                    </TD>
                    <TD>Anna P.</TD>
                  </TR>
                  <TR>
                    <TD>Nordic Soft</TD>
                    <TD>
                      <Badge variant="warning">Lead</Badge>
                    </TD>
                    <TD>Boris I.</TD>
                  </TR>
                </TBody>
              </Table>

              <div className="flex flex-col gap-2">
                <Skeleton height={16} width="40%" />
                <Skeleton height={16} width="70%" />
                <Skeleton height={16} width="55%" />
              </div>

              <EmptyState
                title="Пока нет данных"
                description="Здесь появится список сущностей после подключения API."
                action={<Button size="sm">Создать</Button>}
              />
            </div>
          </Card>
        </section>

        <section className="space-y-2">
          <Typography variant="h2">4. Layout</Typography>
          <Typography muted>
            Эта страница уже рендерится внутри AppShell → Sidebar / Header / Main.
          </Typography>
        </section>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Пример Modal">
        <Typography muted>
          Контент модального окна. Закрывается по ✕, Escape или клику на backdrop.
        </Typography>
      </Modal>
    </AppShell>
  )
}
