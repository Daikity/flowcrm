import type { Customer, CustomerIndustry, CustomerStatus } from '@/entities/customer'

const industries: CustomerIndustry[] = [
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
]

const statuses: CustomerStatus[] = ['active', 'inactive', 'lead']
const ownerIds = ['user-1', 'user-2', 'user-3']

const seedCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Elena Volkova',
    company: 'Nordic Soft',
    email: 'elena@nordicsoft.io',
    phone: '+47 21 00 11 22',
    industry: 'Technology',
    status: 'active',
    ownerId: 'user-2',
    revenue: 128000,
    createdAt: '2025-11-12T10:00:00.000Z',
  },
  {
    id: 'cust-2',
    name: 'James Carter',
    company: 'Atlas Finance',
    email: 'j.carter@atlasfin.com',
    phone: '+44 20 7946 0958',
    industry: 'Finance',
    status: 'active',
    ownerId: 'user-3',
    revenue: 214000,
    createdAt: '2025-12-03T09:30:00.000Z',
  },
  {
    id: 'cust-3',
    name: 'Sofia Mendes',
    company: 'Helix Health',
    email: 'sofia@helix.health',
    phone: '+351 21 234 5678',
    industry: 'Healthcare',
    status: 'lead',
    ownerId: 'user-3',
    revenue: 45000,
    createdAt: '2026-01-18T14:15:00.000Z',
  },
  {
    id: 'cust-4',
    name: 'Marco Rossi',
    company: 'Urban Retail Group',
    email: 'm.rossi@urg.eu',
    phone: '+39 02 1234 5678',
    industry: 'Retail',
    status: 'active',
    ownerId: 'user-2',
    revenue: 96000,
    createdAt: '2026-02-02T11:45:00.000Z',
  },
  {
    id: 'cust-5',
    name: 'Priya Sharma',
    company: 'SteelForm Industries',
    email: 'priya@steelform.in',
    phone: '+91 22 4000 1200',
    industry: 'Manufacturing',
    status: 'inactive',
    ownerId: 'user-1',
    revenue: 32000,
    createdAt: '2025-09-21T08:00:00.000Z',
  },
]

const firstNames = [
  'Alex',
  'Maria',
  'Noah',
  'Olivia',
  'Liam',
  'Emma',
  'Lucas',
  'Ava',
  'Ethan',
  'Mia',
  'Owen',
  'Chloe',
  'Leo',
  'Grace',
  'Hugo',
]

const lastNames = [
  'Bennett',
  'Nguyen',
  'Silva',
  'Kowalski',
  'Andersen',
  'Murphy',
  'Sato',
  'Dubois',
  'Costa',
  'Novak',
  'Fischer',
  'Moreau',
  'Keller',
  'Berg',
  'Ivanova',
]

const companies = [
  'Brightwave Labs',
  'Summit Analytics',
  'Cedar Medical',
  'Harbor Commerce',
  'Forge Dynamics',
  'Quantum Ledger',
  'Pulse Clinics',
  'Marketlane Co',
  'Apex Fabrication',
  'Cloudnest Systems',
  'Riverbank Capital',
  'Greenfield Care',
  'Shopora Group',
  'Titan Assemblies',
  'Nimbus Software',
  'Vertex Banking',
  'Vitalis Health',
  'Retailio Hub',
  'MechaWorks',
  'Orbit Digital',
  'Lumen Finance',
  'CarePath Inc',
  'Boutique City',
  'Ironline Mfg',
  'Pixelcraft Studio',
  'BlueOak Capital',
  'Medora Group',
  'Shelfwise Retail',
  'Precision Cast',
  'Syntho Tech',
  'Northstar Bank',
  'Wellspring Health',
  'Cartify Stores',
  'Alloy Partners',
  'Datavault Inc',
  'Prime Equity',
  'Clinicora',
  'Trendrack',
  'Buildright Co',
  'Stackflow AI',
  'Horizon Wealth',
  'BioNest Labs',
  'Urban Basket',
  'Gearsmith Ltd',
  'AppForge',
]

function buildGeneratedCustomers(): Customer[] {
  const generated: Customer[] = []

  for (let index = 0; index < 45; index += 1) {
    const firstName = firstNames[index % firstNames.length]
    const lastName = lastNames[(index * 3) % lastNames.length]
    const company = companies[index % companies.length]
    const idNum = index + 6

    generated.push({
      id: `cust-${idNum}`,
      name: `${firstName} ${lastName}`,
      company,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')
        .slice(0, 12)}.com`,
      phone: `+1 555 ${String(100 + index).padStart(3, '0')} ${String(2000 + index).slice(-4)}`,
      industry: industries[index % industries.length],
      status: statuses[index % statuses.length],
      ownerId: ownerIds[index % ownerIds.length],
      revenue: 12000 + ((index * 7349) % 240000),
      createdAt: new Date(Date.UTC(2025, index % 12, (index % 27) + 1, 9, 0, 0)).toISOString(),
    })
  }

  return generated
}

export let customers: Customer[] = [...seedCustomers, ...buildGeneratedCustomers()]

export function resetCustomers() {
  customers = [...seedCustomers, ...buildGeneratedCustomers()]
}

export function setCustomers(next: Customer[]) {
  customers = next
}
