export const en = {
  app: {
    name: 'FlowCRM',
  },
  language: {
    label: 'Language',
    en: 'English',
    ru: 'Russian',
    de: 'German',
    fr: 'French',
  },
  nav: {
    dashboard: 'Dashboard',
    customers: 'Customers',
    customer: 'Customer',
    deals: 'Deals',
    tasks: 'Tasks',
    reports: 'Reports',
    settings: 'Settings',
  },
  home: {
    tagline:
      'B2B Sales Management Platform. Manage customers, deals and tasks in one place.',
    signIn: 'Sign in',
  },
  help: {
    title: 'Help',
    subtitle: 'Help and support.',
  },
  settings: {
    title: 'Settings',
    comingSoon: 'Coming soon...',
  },
  auth: {
    login: {
      subtitle: 'Sign in to continue',
      demoHint: 'demo: admin / admin',
      username: 'Username',
      password: 'Password',
      placeholder: 'admin',
      invalidCredentials: 'Invalid username or password',
      submit: 'Sign in',
    },
    logout: 'Log out',
  },
  header: {
    notifications: 'Notifications',
  },
  common: {
    retry: 'Try again',
    loading: 'Loading',
    select: {
      placeholder: 'Select',
    },
    modal: {
      close: 'Close',
    },
    datePicker: {
      placeholder: 'Select date',
      aria: 'Choose date',
      today: 'Today',
      clear: 'Clear',
    },
    calendar: {
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      weekdays: {
        mo: 'Mo',
        tu: 'Tu',
        we: 'We',
        th: 'Th',
        fr: 'Fr',
        sa: 'Sa',
        su: 'Su',
      },
    },
    actions: {
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      saveChanges: 'Save changes',
    },
    pagination: {
      prev: 'Prev',
      next: 'Next',
      pageOf: 'Page {{page}} of {{totalPages}} · {{total}} total',
    },
    filters: {
      allOwners: 'All owners',
    },
    error: {
      title: 'Something went wrong.',
    },
    errors: {
      generic: 'Something went wrong. Please try again.',
      notFound: 'Resource not found.',
      server: 'Server error. Please try again later.',
      network: 'Network error. Check your connection.',
    },
  },
  enums: {
    dealStage: {
      lead: 'Lead',
      qualified: 'Qualified',
      proposal: 'Proposal',
      negotiation: 'Negotiation',
      won: 'Won',
      lost: 'Lost',
    },
    taskStatus: {
      todo: 'To do',
      in_progress: 'In progress',
      completed: 'Completed',
    },
    taskPriority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent',
    },
    customerStatus: {
      active: 'Active',
      inactive: 'Inactive',
      lead: 'Lead',
    },
    industry: {
      Technology: 'Technology',
      Finance: 'Finance',
      Healthcare: 'Healthcare',
      Retail: 'Retail',
      Manufacturing: 'Manufacturing',
    },
    activityType: {
      customer_created: 'Customer',
      deal_created: 'Deal',
      deal_won: 'Won',
      task_completed: 'Task',
      note_updated: 'Note',
    },
  },
  validation: {
    ownerRequired: 'Owner is required',
    customer: {
      nameRequired: 'Name is required',
      companyRequired: 'Company is required',
      invalidEmail: 'Invalid email',
      invalidPhone: 'Invalid phone',
    },
    deal: {
      titleRequired: 'Title is required',
      customerRequired: 'Customer is required',
      valueMin: 'Value must be ≥ 0',
      probabilityMin: 'Min 0',
      probabilityMax: 'Max 100',
      closeDateRequired: 'Close date is required',
    },
    task: {
      titleRequired: 'Title is required',
      assigneeRequired: 'Assignee is required',
      dueDateRequired: 'Due date is required',
    },
  },
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Sales overview, pipeline and recent team activity.',
    kpi: {
      revenue: 'Revenue',
      deals: 'Deals',
      customers: 'Customers',
      conversion: 'Conversion',
      vsLastPeriod: 'vs last period',
    },
    revenue: {
      title: 'Revenue',
      description: 'Revenue dynamics over recent months',
    },
    pipeline: {
      title: 'Sales pipeline',
      description: 'Pipeline stages and deal volume',
    },
    recentDeals: {
      title: 'Recent deals',
      description: 'Latest deals in the pipeline',
      columns: {
        deal: 'Deal',
        stage: 'Stage',
        value: 'Value',
        created: 'Created',
      },
    },
    activity: {
      title: 'Recent activity',
      description: 'Latest CRM events',
    },
    empty: {
      title: 'No dashboard data',
      description: 'Once deals and activity appear, you will see an overview here.',
    },
    error: {
      title: 'Failed to load dashboard',
      description: 'Check your connection or try again.',
    },
  },
  customers: {
    title: 'Customers',
    subtitle: 'Manage CRM customer records',
    search: {
      placeholder: 'Search customers...',
      aria: 'Search customers',
    },
    filters: {
      allStatuses: 'All statuses',
      allIndustries: 'All industries',
    },
    table: {
      columns: {
        customer: 'Customer',
        company: 'Company',
        status: 'Status',
        industry: 'Industry',
        revenue: 'Revenue',
        owner: 'Owner',
        created: 'Created',
        actions: 'Actions',
      },
    },
    pagination: {
      count_one: '{{count}} customer',
      count_other: '{{count}} customers',
    },
    create: {
      button: '+ Add customer',
      modalTitle: 'Create Customer',
      submit: 'Create customer',
      error: 'Failed to create customer.',
    },
    edit: {
      modalTitle: 'Edit Customer',
      error: 'Failed to update customer.',
    },
    delete: {
      modalTitle: 'Delete customer?',
      confirm: 'Are you sure you want to delete {{company}}?',
      error: 'Failed to delete customer.',
    },
    form: {
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      industry: 'Industry',
      status: 'Status',
      owner: 'Owner',
    },
    details: {
      back: '← Back to customers',
      notFound: {
        title: 'Customer not found',
        description: 'This customer does not exist or was deleted.',
      },
      error: {
        description: 'Unable to load customer details.',
      },
      overview: {
        title: 'Overview',
        description: 'Key metrics for this customer',
      },
      metrics: {
        revenue: 'Revenue',
        deals: 'Deals',
        openDeals: 'Open deals',
        created: 'Created',
      },
      contact: {
        title: 'Contact',
        description: 'Primary contact details',
      },
      owner: 'Owner: {{name}}',
      deals: {
        title: 'Deals',
        description: 'Deals linked to this customer',
        empty: 'No deals yet.',
        columns: {
          deal: 'Deal',
          stage: 'Stage',
          value: 'Value',
          expectedClose: 'Expected close',
        },
      },
      activity: {
        title: 'Activity',
        description: 'Recent activity for this customer',
        empty: 'No activity yet.',
      },
    },
    empty: {
      title: 'No customers found.',
      filtered: 'Try changing your filters or create a new customer.',
      default: 'Create your first customer to get started.',
    },
    error: {
      description: 'Unable to load customers.',
    },
  },
  deals: {
    title: 'Deals',
    subtitle: 'Pipeline table and kanban board',
    view: {
      aria: 'Deals view',
      table: 'Table',
      kanban: 'Kanban',
    },
    search: {
      placeholder: 'Search deals...',
      aria: 'Search deals',
    },
    filters: {
      allStages: 'All stages',
    },
    table: {
      columns: {
        deal: 'Deal',
        customer: 'Customer',
        stage: 'Stage',
        value: 'Value',
        probability: 'Probability',
        owner: 'Owner',
        close: 'Close',
        actions: 'Actions',
      },
    },
    totals: {
      pipelineValue: 'Pipeline value',
      openOnly: 'Open stages only',
      totalValue: 'Total value',
      includingClosed: 'Including won / lost',
      byStage: 'By stage',
    },
    kanban: {
      emptyColumn: 'No deals',
    },
    pagination: {
      count_one: '{{count}} deal',
      count_other: '{{count}} deals',
    },
    create: {
      button: '+ Add deal',
      modalTitle: 'Create Deal',
      submit: 'Create deal',
      error: 'Failed to create deal.',
    },
    edit: {
      modalTitle: 'Edit Deal',
      error: 'Failed to update deal.',
    },
    changeStage: {
      aria: 'Change stage for {{title}}',
    },
    form: {
      title: 'Title',
      customer: 'Customer',
      owner: 'Owner',
      value: 'Value ($)',
      stage: 'Stage',
      probability: 'Probability (%)',
      expectedClose: 'Expected close date',
    },
    empty: {
      title: 'No deals found.',
      filtered: 'Try changing your filters or create a new deal.',
      default: 'Create your first deal to get started.',
    },
    error: {
      description: 'Unable to load deals.',
    },
  },
  tasks: {
    title: 'Tasks',
    subtitle: 'Track work linked to customers and deals',
    search: {
      placeholder: 'Search tasks...',
      aria: 'Search tasks',
    },
    filters: {
      allStatuses: 'All statuses',
      allPriorities: 'All priorities',
      allAssignees: 'All assignees',
      due: {
        any: 'Any due date',
        overdue: 'Overdue',
        today: 'Due today',
        thisWeek: 'This week',
        upcoming: 'Upcoming',
      },
    },
    sections: {
      overdue: 'Overdue',
      today: 'Today',
      upcoming: 'Upcoming',
      completed: 'Completed',
    },
    due: {
      today: 'Due today',
      overdue: 'Overdue · {{date}}',
    },
    pagination: {
      count_one: '{{count}} task',
      count_other: '{{count}} tasks',
    },
    create: {
      button: '+ New Task',
      modalTitle: 'Create Task',
      submit: 'Create task',
      error: 'Failed to create task.',
    },
    edit: {
      modalTitle: 'Edit Task',
      error: 'Failed to update task.',
    },
    changeStatus: {
      aria: 'Change status for {{title}}',
    },
    form: {
      title: 'Title',
      description: 'Description',
      status: 'Status',
      priority: 'Priority',
      assignee: 'Assignee',
      dueDate: 'Due date',
      customer: 'Customer',
      deal: 'Deal',
      noCustomer: 'No customer',
      noDeal: 'No deal',
    },
    empty: {
      title: 'No tasks found.',
      filtered: 'Try changing your filters or create a new task.',
      default: 'Create your first task to get started.',
    },
    error: {
      description: 'Unable to load tasks.',
    },
  },
  reports: {
    title: 'Sales Performance',
    subtitle: 'Revenue, win rate and pipeline — aggregated from deals with filters.',
    filters: {
      from: 'From',
      to: 'To',
      owner: 'Owner',
      stage: 'Stage',
      allStages: 'All stages',
    },
    kpi: {
      revenue: 'Revenue',
      wonDeals: 'Won Deals',
      winRate: 'Win Rate',
      pipelineValue: 'Pipeline Value',
    },
    revenue: {
      title: 'Revenue',
      description: 'Won deal revenue by close month',
      empty: 'No won deals in the selected range',
    },
    pipeline: {
      title: 'Pipeline by Stage',
      description: 'Deal volume and count by stage',
      empty: 'No deals for the pipeline',
    },
    byOwner: {
      title: 'By Owner',
      description: 'Revenue and deals by owner',
      empty: 'No owner data',
      columns: {
        owner: 'Owner',
        deals: 'Deals',
        won: 'Won',
        revenue: 'Revenue',
      },
    },
    empty: {
      title: 'No reports data',
      description: 'Change filters or add deals — analytics will appear here.',
    },
    error: {
      title: 'Failed to load reports',
      description: 'Check your connection or try again.',
    },
  },
}

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>
}

export type TranslationSchema = DeepString<typeof en>
