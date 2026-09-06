import type { Deal, DealStage } from '@/entities/deal'

const stages: DealStage[] = [
  'lead',
  'qualified',
  'proposal',
  'negotiation',
  'won',
  'lost',
]

const customerIds = ['cust-1', 'cust-2', 'cust-3', 'cust-4', 'cust-5']
const ownerIds = ['user-1', 'user-2', 'user-3']

const seedDeals: Deal[] = [
  {
    id: 'deal-1',
    title: 'Nordic Soft — Enterprise license',
    customerId: 'cust-1',
    ownerId: 'user-2',
    value: 64000,
    stage: 'negotiation',
    probability: 70,
    expectedCloseDate: '2026-04-15',
    createdAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'deal-2',
    title: 'Atlas Finance — Analytics suite',
    customerId: 'cust-2',
    ownerId: 'user-3',
    value: 92000,
    stage: 'proposal',
    probability: 55,
    expectedCloseDate: '2026-05-01',
    createdAt: '2026-01-22T12:00:00.000Z',
  },
  {
    id: 'deal-3',
    title: 'Helix Health — Pilot rollout',
    customerId: 'cust-3',
    ownerId: 'user-3',
    value: 28000,
    stage: 'qualified',
    probability: 40,
    expectedCloseDate: '2026-04-30',
    createdAt: '2026-02-05T09:00:00.000Z',
  },
  {
    id: 'deal-4',
    title: 'Urban Retail — POS integration',
    customerId: 'cust-4',
    ownerId: 'user-2',
    value: 51000,
    stage: 'won',
    probability: 100,
    expectedCloseDate: '2026-03-01',
    createdAt: '2025-12-15T15:30:00.000Z',
  },
  {
    id: 'deal-5',
    title: 'SteelForm — Maintenance renewal',
    customerId: 'cust-5',
    ownerId: 'user-1',
    value: 18000,
    stage: 'lead',
    probability: 20,
    expectedCloseDate: '2026-06-10',
    createdAt: '2026-03-01T08:20:00.000Z',
  },
  {
    id: 'deal-6',
    title: 'Nordic Soft — Support upgrade',
    customerId: 'cust-1',
    ownerId: 'user-2',
    value: 22000,
    stage: 'won',
    probability: 100,
    expectedCloseDate: '2026-02-20',
    createdAt: '2026-01-05T11:00:00.000Z',
  },
]

const titles = [
  'Platform expansion',
  'Annual renewal',
  'Integration package',
  'Security add-on',
  'Training bundle',
  'Cloud migration',
  'API access tier',
  'Compliance module',
]

function buildGeneratedDeals(): Deal[] {
  const generated: Deal[] = []

  for (let i = 0; i < 24; i += 1) {
    const stage = stages[i % stages.length]
    const value = 8000 + (i % 12) * 7500
    const probabilityByStage: Record<DealStage, number> = {
      lead: 15 + (i % 3) * 5,
      qualified: 35 + (i % 3) * 5,
      proposal: 50 + (i % 3) * 5,
      negotiation: 65 + (i % 3) * 5,
      won: 100,
      lost: 0,
    }

    generated.push({
      id: `deal-gen-${i + 1}`,
      title: `${titles[i % titles.length]} #${i + 1}`,
      customerId: customerIds[i % customerIds.length],
      ownerId: ownerIds[i % ownerIds.length],
      value,
      stage,
      probability: probabilityByStage[stage],
      expectedCloseDate: `2026-${String((i % 9) + 4).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
      createdAt: new Date(Date.UTC(2025, 10, 1 + i)).toISOString(),
    })
  }

  return generated
}

export let deals: Deal[] = [...seedDeals, ...buildGeneratedDeals()]

export function resetDeals() {
  deals = [...seedDeals, ...buildGeneratedDeals()]
}

export function setDeals(next: Deal[]) {
  deals = next
}
