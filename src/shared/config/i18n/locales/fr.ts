import type { TranslationSchema } from './en'

export const fr: TranslationSchema = {
  app: {
    name: 'FlowCRM',
  },
  language: {
    label: 'Langue',
    en: 'Anglais',
    ru: 'Russe',
    de: 'Allemand',
    fr: 'Français',
  },
  nav: {
    dashboard: 'Tableau de bord',
    customers: 'Clients',
    customer: 'Client',
    deals: 'Affaires',
    tasks: 'Tâches',
    reports: 'Rapports',
    settings: 'Paramètres',
  },
  home: {
    tagline:
      'Plateforme B2B de gestion des ventes. Clients, affaires et tâches au même endroit.',
    signIn: 'Se connecter',
  },
  help: {
    title: 'Aide',
    subtitle: 'Aide et support.',
  },
  settings: {
    title: 'Paramètres',
    comingSoon: 'Bientôt...',
  },
  auth: {
    login: {
      subtitle: 'Connectez-vous pour continuer',
      demoHint: 'demo: admin / admin',
      username: 'Identifiant',
      password: 'Mot de passe',
      placeholder: 'admin',
      invalidCredentials: 'Identifiant ou mot de passe incorrect',
      submit: 'Se connecter',
    },
    logout: 'Se déconnecter',
  },
  header: {
    notifications: 'Notifications',
  },
  common: {
    retry: 'Réessayer',
    select: {
      placeholder: 'Sélectionner',
    },
    modal: {
      close: 'Fermer',
    },
    datePicker: {
      placeholder: 'Choisir une date',
      aria: 'Choisir une date',
      today: "Aujourd'hui",
      clear: 'Effacer',
    },
    calendar: {
      prevMonth: 'Mois précédent',
      nextMonth: 'Mois suivant',
      weekdays: {
        mo: 'Lu',
        tu: 'Ma',
        we: 'Me',
        th: 'Je',
        fr: 'Ve',
        sa: 'Sa',
        su: 'Di',
      },
    },
    actions: {
      view: 'Voir',
      edit: 'Modifier',
      delete: 'Supprimer',
      cancel: 'Annuler',
      saveChanges: 'Enregistrer',
    },
    pagination: {
      prev: 'Préc.',
      next: 'Suiv.',
      pageOf: 'Page {{page}} sur {{totalPages}} · {{total}} au total',
    },
    filters: {
      allOwners: 'Tous les propriétaires',
    },
    error: {
      title: "Une erreur s'est produite.",
    },
    errors: {
      generic: "Une erreur s'est produite. Veuillez réessayer.",
      notFound: 'Ressource introuvable.',
      server: 'Erreur serveur. Réessayez plus tard.',
      network: 'Erreur réseau. Vérifiez votre connexion.',
    },
  },
  enums: {
    dealStage: {
      lead: 'Lead',
      qualified: 'Qualifié',
      proposal: 'Proposition',
      negotiation: 'Négociation',
      won: 'Gagnée',
      lost: 'Perdue',
    },
    taskStatus: {
      todo: 'À faire',
      in_progress: 'En cours',
      completed: 'Terminée',
    },
    taskPriority: {
      low: 'Basse',
      medium: 'Moyenne',
      high: 'Haute',
      urgent: 'Urgente',
    },
    customerStatus: {
      active: 'Actif',
      inactive: 'Inactif',
      lead: 'Lead',
    },
    industry: {
      Technology: 'Technologie',
      Finance: 'Finance',
      Healthcare: 'Santé',
      Retail: 'Commerce',
      Manufacturing: 'Industrie',
    },
    activityType: {
      customer_created: 'Client',
      deal_created: 'Affaire',
      deal_won: 'Gagnée',
      task_completed: 'Tâche',
      note_updated: 'Note',
    },
  },
  validation: {
    ownerRequired: 'Le propriétaire est requis',
    customer: {
      nameRequired: 'Le nom est requis',
      companyRequired: "L'entreprise est requise",
      invalidEmail: 'E-mail invalide',
      invalidPhone: 'Téléphone invalide',
    },
    deal: {
      titleRequired: 'Le titre est requis',
      customerRequired: 'Le client est requis',
      valueMin: 'La valeur doit être ≥ 0',
      probabilityMin: 'Min. 0',
      probabilityMax: 'Max. 100',
      closeDateRequired: 'La date de clôture est requise',
    },
    task: {
      titleRequired: 'Le titre est requis',
      assigneeRequired: "L'assigné est requis",
      dueDateRequired: "La date d'échéance est requise",
    },
  },
  dashboard: {
    title: 'Tableau de bord',
    subtitle: "Vue d'ensemble des ventes, pipeline et activité récente de l'équipe.",
    kpi: {
      revenue: 'Revenu',
      deals: 'Affaires',
      customers: 'Clients',
      conversion: 'Conversion',
      vsLastPeriod: 'vs période précédente',
    },
    revenue: {
      title: 'Revenu',
      description: 'Dynamique du revenu sur les derniers mois',
    },
    pipeline: {
      title: 'Pipeline commercial',
      description: 'Étapes du pipeline et volume des affaires',
    },
    recentDeals: {
      title: 'Affaires récentes',
      description: 'Dernières affaires du pipeline',
      columns: {
        deal: 'Affaire',
        stage: 'Étape',
        value: 'Valeur',
        created: 'Créée',
      },
    },
    activity: {
      title: 'Activité récente',
      description: 'Derniers événements CRM',
    },
    empty: {
      title: 'Aucune donnée pour le tableau de bord',
      description:
        "Dès que des affaires et de l'activité apparaîtront, vous verrez un aperçu ici.",
    },
    error: {
      title: 'Échec du chargement du tableau de bord',
      description: 'Vérifiez votre connexion ou réessayez.',
    },
  },
  customers: {
    title: 'Clients',
    subtitle: 'Gérer les fiches clients CRM',
    search: {
      placeholder: 'Rechercher des clients...',
      aria: 'Rechercher des clients',
    },
    filters: {
      allStatuses: 'Tous les statuts',
      allIndustries: 'Tous les secteurs',
    },
    table: {
      columns: {
        customer: 'Client',
        company: 'Entreprise',
        status: 'Statut',
        industry: 'Secteur',
        revenue: 'Revenu',
        owner: 'Propriétaire',
        created: 'Créé',
        actions: 'Actions',
      },
    },
    pagination: {
      count_one: '{{count}} client',
      count_other: '{{count}} clients',
    },
    create: {
      button: '+ Ajouter un client',
      modalTitle: 'Créer un client',
      submit: 'Créer le client',
      error: 'Échec de la création du client.',
    },
    edit: {
      modalTitle: 'Modifier le client',
      error: 'Échec de la mise à jour du client.',
    },
    delete: {
      modalTitle: 'Supprimer le client ?',
      confirm: 'Voulez-vous vraiment supprimer {{company}} ?',
      error: 'Échec de la suppression du client.',
    },
    form: {
      name: 'Nom',
      company: 'Entreprise',
      email: 'E-mail',
      phone: 'Téléphone',
      industry: 'Secteur',
      status: 'Statut',
      owner: 'Propriétaire',
    },
    details: {
      back: '← Retour aux clients',
      notFound: {
        title: 'Client introuvable',
        description: "Ce client n'existe pas ou a été supprimé.",
      },
      error: {
        description: 'Impossible de charger les détails du client.',
      },
      overview: {
        title: 'Aperçu',
        description: 'Indicateurs clés de ce client',
      },
      metrics: {
        revenue: 'Revenu',
        deals: 'Affaires',
        openDeals: 'Affaires ouvertes',
        created: 'Créé',
      },
      contact: {
        title: 'Contact',
        description: 'Coordonnées principales',
      },
      owner: 'Propriétaire : {{name}}',
      deals: {
        title: 'Affaires',
        description: 'Affaires liées à ce client',
        empty: 'Aucune affaire pour le moment.',
        columns: {
          deal: 'Affaire',
          stage: 'Étape',
          value: 'Valeur',
          expectedClose: 'Clôture prévue',
        },
      },
      activity: {
        title: 'Activité',
        description: 'Activité récente pour ce client',
        empty: "Aucune activité pour le moment.",
      },
    },
    empty: {
      title: 'Aucun client trouvé.',
      filtered: 'Modifiez les filtres ou créez un nouveau client.',
      default: 'Créez votre premier client pour commencer.',
    },
    error: {
      description: 'Impossible de charger les clients.',
    },
  },
  deals: {
    title: 'Affaires',
    subtitle: 'Tableau pipeline et kanban',
    view: {
      aria: 'Vue des affaires',
      table: 'Tableau',
      kanban: 'Kanban',
    },
    search: {
      placeholder: 'Rechercher des affaires...',
      aria: 'Rechercher des affaires',
    },
    filters: {
      allStages: 'Toutes les étapes',
    },
    table: {
      columns: {
        deal: 'Affaire',
        customer: 'Client',
        stage: 'Étape',
        value: 'Valeur',
        probability: 'Probabilité',
        owner: 'Propriétaire',
        close: 'Clôture',
        actions: 'Actions',
      },
    },
    totals: {
      pipelineValue: 'Valeur du pipeline',
      openOnly: 'Étapes ouvertes uniquement',
      totalValue: 'Valeur totale',
      includingClosed: 'Y compris gagnées / perdues',
      byStage: 'Par étape',
    },
    kanban: {
      emptyColumn: 'Aucune affaire',
    },
    pagination: {
      count_one: '{{count}} affaire',
      count_other: '{{count}} affaires',
    },
    create: {
      button: '+ Ajouter une affaire',
      modalTitle: 'Créer une affaire',
      submit: "Créer l'affaire",
      error: "Échec de la création de l'affaire.",
    },
    edit: {
      modalTitle: "Modifier l'affaire",
      error: "Échec de la mise à jour de l'affaire.",
    },
    changeStage: {
      aria: "Changer l'étape pour {{title}}",
    },
    form: {
      title: 'Titre',
      customer: 'Client',
      owner: 'Propriétaire',
      value: 'Valeur ($)',
      stage: 'Étape',
      probability: 'Probabilité (%)',
      expectedClose: 'Date de clôture prévue',
    },
    empty: {
      title: 'Aucune affaire trouvée.',
      filtered: 'Modifiez les filtres ou créez une nouvelle affaire.',
      default: 'Créez votre première affaire pour commencer.',
    },
    error: {
      description: 'Impossible de charger les affaires.',
    },
  },
  tasks: {
    title: 'Tâches',
    subtitle: 'Suivre le travail lié aux clients et affaires',
    search: {
      placeholder: 'Rechercher des tâches...',
      aria: 'Rechercher des tâches',
    },
    filters: {
      allStatuses: 'Tous les statuts',
      allPriorities: 'Toutes les priorités',
      allAssignees: 'Tous les assignés',
      due: {
        any: "Toute date d'échéance",
        overdue: 'En retard',
        today: "Échéance aujourd'hui",
        thisWeek: 'Cette semaine',
        upcoming: 'À venir',
      },
    },
    sections: {
      overdue: 'En retard',
      today: "Aujourd'hui",
      upcoming: 'À venir',
      completed: 'Terminées',
    },
    due: {
      today: "Échéance aujourd'hui",
      overdue: 'En retard · {{date}}',
    },
    pagination: {
      count_one: '{{count}} tâche',
      count_other: '{{count}} tâches',
    },
    create: {
      button: '+ Nouvelle tâche',
      modalTitle: 'Créer une tâche',
      submit: 'Créer la tâche',
      error: 'Échec de la création de la tâche.',
    },
    edit: {
      modalTitle: 'Modifier la tâche',
      error: 'Échec de la mise à jour de la tâche.',
    },
    changeStatus: {
      aria: 'Changer le statut pour {{title}}',
    },
    form: {
      title: 'Titre',
      description: 'Description',
      status: 'Statut',
      priority: 'Priorité',
      assignee: 'Assigné',
      dueDate: "Date d'échéance",
      customer: 'Client',
      deal: 'Affaire',
      noCustomer: 'Aucun client',
      noDeal: 'Aucune affaire',
    },
    empty: {
      title: 'Aucune tâche trouvée.',
      filtered: 'Modifiez les filtres ou créez une nouvelle tâche.',
      default: 'Créez votre première tâche pour commencer.',
    },
    error: {
      description: 'Impossible de charger les tâches.',
    },
  },
  reports: {
    title: 'Performance commerciale',
    subtitle:
      'Revenu, taux de gain et pipeline — agrégés à partir des affaires avec filtres.',
    filters: {
      from: 'Du',
      to: 'Au',
      owner: 'Propriétaire',
      stage: 'Étape',
      allStages: 'Toutes les étapes',
    },
    kpi: {
      revenue: 'Revenu',
      wonDeals: 'Affaires gagnées',
      winRate: 'Taux de gain',
      pipelineValue: 'Valeur du pipeline',
    },
    revenue: {
      title: 'Revenu',
      description: 'Revenu des affaires gagnées par mois de clôture',
      empty: 'Aucune affaire gagnée dans la plage sélectionnée',
    },
    pipeline: {
      title: 'Pipeline par étape',
      description: 'Volume et nombre d’affaires par étape',
      empty: 'Aucune affaire pour le pipeline',
    },
    byOwner: {
      title: 'Par propriétaire',
      description: 'Revenu et affaires par propriétaire',
      empty: 'Aucune donnée propriétaire',
      columns: {
        owner: 'Propriétaire',
        deals: 'Affaires',
        won: 'Gagnées',
        revenue: 'Revenu',
      },
    },
    empty: {
      title: 'Aucune donnée de rapports',
      description:
        'Modifiez les filtres ou ajoutez des affaires — les analyses apparaîtront ici.',
    },
    error: {
      title: 'Échec du chargement des rapports',
      description: 'Vérifiez votre connexion ou réessayez.',
    },
  },
}
