import type { TranslationSchema } from './en'

export const de: TranslationSchema = {
  app: {
    name: 'FlowCRM',
  },
  language: {
    label: 'Sprache',
    en: 'Englisch',
    ru: 'Russisch',
    de: 'Deutsch',
    fr: 'Französisch',
  },
  nav: {
    dashboard: 'Dashboard',
    customers: 'Kunden',
    customer: 'Kunde',
    deals: 'Deals',
    tasks: 'Aufgaben',
    reports: 'Berichte',
    settings: 'Einstellungen',
  },
  home: {
    tagline:
      'B2B-Vertriebsplattform. Verwalten Sie Kunden, Deals und Aufgaben an einem Ort.',
    signIn: 'Anmelden',
  },
  help: {
    title: 'Hilfe',
    subtitle: 'Hilfe und Support.',
  },
  settings: {
    title: 'Einstellungen',
    comingSoon: 'Demnächst...',
  },
  auth: {
    login: {
      subtitle: 'Melden Sie sich an, um fortzufahren',
      demoHint: 'demo: admin / admin',
      username: 'Benutzername',
      password: 'Passwort',
      placeholder: 'admin',
      invalidCredentials: 'Ungültiger Benutzername oder Passwort',
      submit: 'Anmelden',
    },
    logout: 'Abmelden',
  },
  header: {
    notifications: 'Benachrichtigungen',
  },
  common: {
    retry: 'Erneut versuchen',
    loading: 'Wird geladen',
    select: {
      placeholder: 'Auswählen',
    },
    modal: {
      close: 'Schließen',
    },
    datePicker: {
      placeholder: 'Datum wählen',
      aria: 'Datum auswählen',
      today: 'Heute',
      clear: 'Löschen',
    },
    calendar: {
      prevMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      weekdays: {
        mo: 'Mo',
        tu: 'Di',
        we: 'Mi',
        th: 'Do',
        fr: 'Fr',
        sa: 'Sa',
        su: 'So',
      },
    },
    actions: {
      view: 'Ansehen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      saveChanges: 'Speichern',
    },
    pagination: {
      prev: 'Zurück',
      next: 'Weiter',
      pageOf: 'Seite {{page}} von {{totalPages}} · {{total}} gesamt',
    },
    filters: {
      allOwners: 'Alle Besitzer',
    },
    error: {
      title: 'Etwas ist schiefgelaufen.',
    },
    errors: {
      generic: 'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
      notFound: 'Ressource nicht gefunden.',
      server: 'Serverfehler. Bitte später erneut versuchen.',
      network: 'Netzwerkfehler. Verbindung prüfen.',
    },
  },
  enums: {
    dealStage: {
      lead: 'Lead',
      qualified: 'Qualifiziert',
      proposal: 'Angebot',
      negotiation: 'Verhandlung',
      won: 'Gewonnen',
      lost: 'Verloren',
    },
    taskStatus: {
      todo: 'Offen',
      in_progress: 'In Bearbeitung',
      completed: 'Erledigt',
    },
    taskPriority: {
      low: 'Niedrig',
      medium: 'Mittel',
      high: 'Hoch',
      urgent: 'Dringend',
    },
    customerStatus: {
      active: 'Aktiv',
      inactive: 'Inaktiv',
      lead: 'Lead',
    },
    industry: {
      Technology: 'Technologie',
      Finance: 'Finanzen',
      Healthcare: 'Gesundheitswesen',
      Retail: 'Einzelhandel',
      Manufacturing: 'Produktion',
    },
    activityType: {
      customer_created: 'Kunde',
      deal_created: 'Deal',
      deal_won: 'Gewonnen',
      task_completed: 'Aufgabe',
      note_updated: 'Notiz',
    },
  },
  validation: {
    ownerRequired: 'Besitzer ist erforderlich',
    customer: {
      nameRequired: 'Name ist erforderlich',
      companyRequired: 'Unternehmen ist erforderlich',
      invalidEmail: 'Ungültige E-Mail',
      invalidPhone: 'Ungültige Telefonnummer',
    },
    deal: {
      titleRequired: 'Titel ist erforderlich',
      customerRequired: 'Kunde ist erforderlich',
      valueMin: 'Wert muss ≥ 0 sein',
      probabilityMin: 'Min. 0',
      probabilityMax: 'Max. 100',
      closeDateRequired: 'Abschlussdatum ist erforderlich',
    },
    task: {
      titleRequired: 'Titel ist erforderlich',
      assigneeRequired: 'Zuständiger ist erforderlich',
      dueDateRequired: 'Fälligkeitsdatum ist erforderlich',
    },
  },
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Verkaufsübersicht, Pipeline und aktuelle Teamaktivität.',
    kpi: {
      revenue: 'Umsatz',
      deals: 'Deals',
      customers: 'Kunden',
      conversion: 'Conversion',
      vsLastPeriod: 'ggü. Vorperiode',
    },
    revenue: {
      title: 'Umsatz',
      description: 'Umsatzentwicklung der letzten Monate',
    },
    pipeline: {
      title: 'Verkaufspipeline',
      description: 'Pipeline-Stufen und Deal-Volumen',
    },
    recentDeals: {
      title: 'Aktuelle Deals',
      description: 'Neueste Deals in der Pipeline',
      columns: {
        deal: 'Deal',
        stage: 'Stufe',
        value: 'Wert',
        created: 'Erstellt',
      },
    },
    activity: {
      title: 'Aktuelle Aktivität',
      description: 'Neueste CRM-Ereignisse',
    },
    empty: {
      title: 'Keine Dashboard-Daten',
      description: 'Sobald Deals und Aktivität erscheinen, sehen Sie hier eine Übersicht.',
    },
    error: {
      title: 'Dashboard konnte nicht geladen werden',
      description: 'Prüfen Sie die Verbindung oder versuchen Sie es erneut.',
    },
  },
  customers: {
    title: 'Kunden',
    subtitle: 'CRM-Kundendaten verwalten',
    search: {
      placeholder: 'Kunden suchen...',
      aria: 'Kunden suchen',
    },
    filters: {
      allStatuses: 'Alle Status',
      allIndustries: 'Alle Branchen',
    },
    table: {
      columns: {
        customer: 'Kunde',
        company: 'Unternehmen',
        status: 'Status',
        industry: 'Branche',
        revenue: 'Umsatz',
        owner: 'Besitzer',
        created: 'Erstellt',
        actions: 'Aktionen',
      },
    },
    pagination: {
      count_one: '{{count}} Kunde',
      count_other: '{{count}} Kunden',
    },
    create: {
      button: '+ Kunde hinzufügen',
      modalTitle: 'Kunde erstellen',
      submit: 'Kunde erstellen',
      error: 'Kunde konnte nicht erstellt werden.',
    },
    edit: {
      modalTitle: 'Kunde bearbeiten',
      error: 'Kunde konnte nicht aktualisiert werden.',
    },
    delete: {
      modalTitle: 'Kunde löschen?',
      confirm: 'Möchten Sie {{company}} wirklich löschen?',
      error: 'Kunde konnte nicht gelöscht werden.',
    },
    form: {
      name: 'Name',
      company: 'Unternehmen',
      email: 'E-Mail',
      phone: 'Telefon',
      industry: 'Branche',
      status: 'Status',
      owner: 'Besitzer',
    },
    details: {
      back: '← Zurück zu Kunden',
      notFound: {
        title: 'Kunde nicht gefunden',
        description: 'Dieser Kunde existiert nicht oder wurde gelöscht.',
      },
      error: {
        description: 'Kundendetails konnten nicht geladen werden.',
      },
      overview: {
        title: 'Übersicht',
        description: 'Kennzahlen zu diesem Kunden',
      },
      metrics: {
        revenue: 'Umsatz',
        deals: 'Deals',
        openDeals: 'Offene Deals',
        created: 'Erstellt',
      },
      contact: {
        title: 'Kontakt',
        description: 'Primäre Kontaktdaten',
      },
      owner: 'Besitzer: {{name}}',
      deals: {
        title: 'Deals',
        description: 'Mit diesem Kunden verknüpfte Deals',
        empty: 'Noch keine Deals.',
        columns: {
          deal: 'Deal',
          stage: 'Stufe',
          value: 'Wert',
          expectedClose: 'Erwarteter Abschluss',
        },
      },
      activity: {
        title: 'Aktivität',
        description: 'Aktuelle Aktivität zu diesem Kunden',
        empty: 'Noch keine Aktivität.',
      },
    },
    empty: {
      title: 'Keine Kunden gefunden.',
      filtered: 'Filter ändern oder neuen Kunden erstellen.',
      default: 'Erstellen Sie Ihren ersten Kunden, um zu starten.',
    },
    error: {
      description: 'Kunden konnten nicht geladen werden.',
    },
  },
  deals: {
    title: 'Deals',
    subtitle: 'Pipeline-Tabelle und Kanban-Board',
    view: {
      aria: 'Deal-Ansicht',
      table: 'Tabelle',
      kanban: 'Kanban',
    },
    search: {
      placeholder: 'Deals suchen...',
      aria: 'Deals suchen',
    },
    filters: {
      allStages: 'Alle Stufen',
    },
    table: {
      columns: {
        deal: 'Deal',
        customer: 'Kunde',
        stage: 'Stufe',
        value: 'Wert',
        probability: 'Wahrscheinlichkeit',
        owner: 'Besitzer',
        close: 'Abschluss',
        actions: 'Aktionen',
      },
    },
    totals: {
      pipelineValue: 'Pipeline-Wert',
      openOnly: 'Nur offene Stufen',
      totalValue: 'Gesamtwert',
      includingClosed: 'Inkl. gewonnen / verloren',
      byStage: 'Nach Stufe',
    },
    kanban: {
      emptyColumn: 'Keine Deals',
    },
    pagination: {
      count_one: '{{count}} Deal',
      count_other: '{{count}} Deals',
    },
    create: {
      button: '+ Deal hinzufügen',
      modalTitle: 'Deal erstellen',
      submit: 'Deal erstellen',
      error: 'Deal konnte nicht erstellt werden.',
    },
    edit: {
      modalTitle: 'Deal bearbeiten',
      error: 'Deal konnte nicht aktualisiert werden.',
    },
    changeStage: {
      aria: 'Stufe ändern für {{title}}',
    },
    form: {
      title: 'Titel',
      customer: 'Kunde',
      owner: 'Besitzer',
      value: 'Wert ($)',
      stage: 'Stufe',
      probability: 'Wahrscheinlichkeit (%)',
      expectedClose: 'Erwartetes Abschlussdatum',
    },
    empty: {
      title: 'Keine Deals gefunden.',
      filtered: 'Filter ändern oder neuen Deal erstellen.',
      default: 'Erstellen Sie Ihren ersten Deal, um zu starten.',
    },
    error: {
      description: 'Deals konnten nicht geladen werden.',
    },
  },
  tasks: {
    title: 'Aufgaben',
    subtitle: 'Arbeit zu Kunden und Deals verfolgen',
    search: {
      placeholder: 'Aufgaben suchen...',
      aria: 'Aufgaben suchen',
    },
    filters: {
      allStatuses: 'Alle Status',
      allPriorities: 'Alle Prioritäten',
      allAssignees: 'Alle Zuständigen',
      due: {
        any: 'Beliebiges Fälligkeitsdatum',
        overdue: 'Überfällig',
        today: 'Heute fällig',
        thisWeek: 'Diese Woche',
        upcoming: 'Bevorstehend',
      },
    },
    sections: {
      overdue: 'Überfällig',
      today: 'Heute',
      upcoming: 'Bevorstehend',
      completed: 'Erledigt',
    },
    due: {
      today: 'Heute fällig',
      overdue: 'Überfällig · {{date}}',
    },
    pagination: {
      count_one: '{{count}} Aufgabe',
      count_other: '{{count}} Aufgaben',
    },
    create: {
      button: '+ Neue Aufgabe',
      modalTitle: 'Aufgabe erstellen',
      submit: 'Aufgabe erstellen',
      error: 'Aufgabe konnte nicht erstellt werden.',
    },
    edit: {
      modalTitle: 'Aufgabe bearbeiten',
      error: 'Aufgabe konnte nicht aktualisiert werden.',
    },
    changeStatus: {
      aria: 'Status ändern für {{title}}',
    },
    form: {
      title: 'Titel',
      description: 'Beschreibung',
      status: 'Status',
      priority: 'Priorität',
      assignee: 'Zuständiger',
      dueDate: 'Fälligkeitsdatum',
      customer: 'Kunde',
      deal: 'Deal',
      noCustomer: 'Kein Kunde',
      noDeal: 'Kein Deal',
    },
    empty: {
      title: 'Keine Aufgaben gefunden.',
      filtered: 'Filter ändern oder neue Aufgabe erstellen.',
      default: 'Erstellen Sie Ihre erste Aufgabe, um zu starten.',
    },
    error: {
      description: 'Aufgaben konnten nicht geladen werden.',
    },
  },
  reports: {
    title: 'Verkaufsleistung',
    subtitle: 'Umsatz, Win-Rate und Pipeline — aggregiert aus Deals mit Filtern.',
    filters: {
      from: 'Von',
      to: 'Bis',
      owner: 'Besitzer',
      stage: 'Stufe',
      allStages: 'Alle Stufen',
    },
    kpi: {
      revenue: 'Umsatz',
      wonDeals: 'Gewonnene Deals',
      winRate: 'Win-Rate',
      pipelineValue: 'Pipeline-Wert',
    },
    revenue: {
      title: 'Umsatz',
      description: 'Umsatz gewonnener Deals nach Abschlussmonat',
      empty: 'Keine gewonnenen Deals im gewählten Zeitraum',
    },
    pipeline: {
      title: 'Pipeline nach Stufe',
      description: 'Deal-Volumen und Anzahl nach Stufe',
      empty: 'Keine Deals für die Pipeline',
    },
    byOwner: {
      title: 'Nach Besitzer',
      description: 'Umsatz und Deals nach Besitzer',
      empty: 'Keine Besitzerdaten',
      columns: {
        owner: 'Besitzer',
        deals: 'Deals',
        won: 'Gewonnen',
        revenue: 'Umsatz',
      },
    },
    empty: {
      title: 'Keine Berichtsdaten',
      description: 'Filter ändern oder Deals hinzufügen — Analysen erscheinen hier.',
    },
    error: {
      title: 'Berichte konnten nicht geladen werden',
      description: 'Prüfen Sie die Verbindung oder versuchen Sie es erneut.',
    },
  },
}
