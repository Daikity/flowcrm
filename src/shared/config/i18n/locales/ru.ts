import type { TranslationSchema } from './en'

export const ru: TranslationSchema = {
  app: {
    name: 'FlowCRM',
  },
  language: {
    label: 'Язык',
    en: 'Английский',
    ru: 'Русский',
    de: 'Немецкий',
    fr: 'Французский',
  },
  nav: {
    dashboard: 'Панель управления',
    customers: 'Клиенты',
    customer: 'Клиент',
    deals: 'Сделки',
    tasks: 'Задачи',
    reports: 'Отчёты',
    settings: 'Настройки',
  },
  home: {
    tagline:
      'B2B-платформа управления продажами. Клиенты, сделки и задачи в одном месте.',
    signIn: 'Войти',
  },
  help: {
    title: 'Справка',
    subtitle: 'Справка и поддержка.',
  },
  settings: {
    title: 'Настройки',
    comingSoon: 'Скоро...',
  },
  auth: {
    login: {
      subtitle: 'Войдите, чтобы продолжить',
      demoHint: 'demo: admin / admin',
      username: 'Логин',
      password: 'Пароль',
      placeholder: 'admin',
      invalidCredentials: 'Неверный логин или пароль',
      submit: 'Войти',
    },
    logout: 'Выйти',
  },
  header: {
    notifications: 'Уведомления',
  },
  common: {
    retry: 'Повторить',
    select: {
      placeholder: 'Выберите',
    },
    modal: {
      close: 'Закрыть',
    },
    datePicker: {
      placeholder: 'Выберите дату',
      aria: 'Выбрать дату',
      today: 'Сегодня',
      clear: 'Очистить',
    },
    calendar: {
      prevMonth: 'Предыдущий месяц',
      nextMonth: 'Следующий месяц',
      weekdays: {
        mo: 'Пн',
        tu: 'Вт',
        we: 'Ср',
        th: 'Чт',
        fr: 'Пт',
        sa: 'Сб',
        su: 'Вс',
      },
    },
    actions: {
      view: 'Открыть',
      edit: 'Изменить',
      delete: 'Удалить',
      cancel: 'Отмена',
      saveChanges: 'Сохранить',
    },
    pagination: {
      prev: 'Назад',
      next: 'Далее',
      pageOf: 'Страница {{page}} из {{totalPages}} · всего {{total}}',
    },
    filters: {
      allOwners: 'Все владельцы',
    },
    error: {
      title: 'Что-то пошло не так.',
    },
    errors: {
      generic: 'Что-то пошло не так. Попробуйте ещё раз.',
      notFound: 'Ресурс не найден.',
      server: 'Ошибка сервера. Попробуйте позже.',
      network: 'Ошибка сети. Проверьте соединение.',
    },
  },
  enums: {
    dealStage: {
      lead: 'Лид',
      qualified: 'Квалификация',
      proposal: 'Предложение',
      negotiation: 'Переговоры',
      won: 'Выиграно',
      lost: 'Проиграна',
    },
    taskStatus: {
      todo: 'К выполнению',
      in_progress: 'В работе',
      completed: 'Выполнена',
    },
    taskPriority: {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      urgent: 'Срочный',
    },
    customerStatus: {
      active: 'Активный',
      inactive: 'Неактивный',
      lead: 'Лид',
    },
    industry: {
      Technology: 'Технологии',
      Finance: 'Финансы',
      Healthcare: 'Здравоохранение',
      Retail: 'Ритейл',
      Manufacturing: 'Производство',
    },
    activityType: {
      customer_created: 'Клиент',
      deal_created: 'Сделка',
      deal_won: 'Выиграно',
      task_completed: 'Задача',
      note_updated: 'Заметка',
    },
  },
  validation: {
    ownerRequired: 'Владелец обязателен',
    customer: {
      nameRequired: 'Имя обязательно',
      companyRequired: 'Компания обязательна',
      invalidEmail: 'Некорректный email',
      invalidPhone: 'Некорректный телефон',
    },
    deal: {
      titleRequired: 'Название обязательно',
      customerRequired: 'Клиент обязателен',
      valueMin: 'Сумма должна быть ≥ 0',
      probabilityMin: 'Мин. 0',
      probabilityMax: 'Макс. 100',
      closeDateRequired: 'Дата закрытия обязательна',
    },
    task: {
      titleRequired: 'Название обязательно',
      assigneeRequired: 'Исполнитель обязателен',
      dueDateRequired: 'Срок обязателен',
    },
  },
  dashboard: {
    title: 'Дашборд',
    subtitle: 'Обзор продаж, воронки и недавней активности команды.',
    kpi: {
      revenue: 'Выручка',
      deals: 'Сделки',
      customers: 'Клиенты',
      conversion: 'Конверсия',
      vsLastPeriod: 'к прошлому периоду',
    },
    revenue: {
      title: 'Выручка',
      description: 'Динамика выручки за последние месяцы',
    },
    pipeline: {
      title: 'Воронка продаж',
      description: 'Стадии воронки и объём сделок',
    },
    recentDeals: {
      title: 'Недавние сделки',
      description: 'Последние сделки в пайплайне',
      columns: {
        deal: 'Сделка',
        stage: 'Стадия',
        value: 'Сумма',
        created: 'Создана',
      },
    },
    activity: {
      title: 'Недавняя активность',
      description: 'Свежие события по CRM',
    },
    empty: {
      title: 'Нет данных для dashboard',
      description: 'Как только появятся сделки и активность, здесь будет обзор.',
    },
    error: {
      title: 'Не удалось загрузить dashboard',
      description: 'Проверьте соединение или попробуйте ещё раз.',
    },
  },
  customers: {
    title: 'Клиенты',
    subtitle: 'Управление клиентами CRM',
    search: {
      placeholder: 'Поиск клиентов...',
      aria: 'Поиск клиентов',
    },
    filters: {
      allStatuses: 'Все статусы',
      allIndustries: 'Все отрасли',
    },
    table: {
      columns: {
        customer: 'Клиент',
        company: 'Компания',
        status: 'Статус',
        industry: 'Отрасль',
        revenue: 'Выручка',
        owner: 'Владелец',
        created: 'Создан',
        actions: 'Действия',
      },
    },
    pagination: {
      count_one: '{{count}} клиент',
      count_other: '{{count}} клиентов',
    },
    create: {
      button: '+ Добавить клиента',
      modalTitle: 'Новый клиент',
      submit: 'Создать клиента',
      error: 'Не удалось создать клиента.',
    },
    edit: {
      modalTitle: 'Редактировать клиента',
      error: 'Не удалось обновить клиента.',
    },
    delete: {
      modalTitle: 'Удалить клиента?',
      confirm: 'Вы уверены, что хотите удалить {{company}}?',
      error: 'Не удалось удалить клиента.',
    },
    form: {
      name: 'Имя',
      company: 'Компания',
      email: 'Email',
      phone: 'Телефон',
      industry: 'Отрасль',
      status: 'Статус',
      owner: 'Владелец',
    },
    details: {
      back: '← К списку клиентов',
      notFound: {
        title: 'Клиент не найден',
        description: 'Этот клиент не существует или был удалён.',
      },
      error: {
        description: 'Не удалось загрузить данные клиента.',
      },
      overview: {
        title: 'Обзор',
        description: 'Ключевые метрики клиента',
      },
      metrics: {
        revenue: 'Выручка',
        deals: 'Сделки',
        openDeals: 'Открытые сделки',
        created: 'Создан',
      },
      contact: {
        title: 'Контакты',
        description: 'Основные контактные данные',
      },
      owner: 'Владелец: {{name}}',
      deals: {
        title: 'Сделки',
        description: 'Сделки этого клиента',
        empty: 'Сделок пока нет.',
        columns: {
          deal: 'Сделка',
          stage: 'Стадия',
          value: 'Сумма',
          expectedClose: 'Ожидаемое закрытие',
        },
      },
      activity: {
        title: 'Активность',
        description: 'Недавняя активность по клиенту',
        empty: 'Активности пока нет.',
      },
    },
    empty: {
      title: 'Клиенты не найдены.',
      filtered: 'Измените фильтры или создайте нового клиента.',
      default: 'Создайте первого клиента, чтобы начать.',
    },
    error: {
      description: 'Не удалось загрузить клиентов.',
    },
  },
  deals: {
    title: 'Сделки',
    subtitle: 'Таблица пайплайна и канбан',
    view: {
      aria: 'Вид сделок',
      table: 'Таблица',
      kanban: 'Канбан',
    },
    search: {
      placeholder: 'Поиск сделок...',
      aria: 'Поиск сделок',
    },
    filters: {
      allStages: 'Все стадии',
    },
    table: {
      columns: {
        deal: 'Сделка',
        customer: 'Клиент',
        stage: 'Стадия',
        value: 'Сумма',
        probability: 'Вероятность',
        owner: 'Владелец',
        close: 'Закрытие',
        actions: 'Действия',
      },
    },
    totals: {
      pipelineValue: 'Объём пайплайна',
      openOnly: 'Только открытые стадии',
      totalValue: 'Общая сумма',
      includingClosed: 'Включая won / lost',
      byStage: 'По стадиям',
    },
    kanban: {
      emptyColumn: 'Нет сделок',
    },
    pagination: {
      count_one: '{{count}} сделка',
      count_other: '{{count}} сделок',
    },
    create: {
      button: '+ Добавить сделку',
      modalTitle: 'Новая сделка',
      submit: 'Создать сделку',
      error: 'Не удалось создать сделку.',
    },
    edit: {
      modalTitle: 'Редактировать сделку',
      error: 'Не удалось обновить сделку.',
    },
    changeStage: {
      aria: 'Сменить стадию для {{title}}',
    },
    form: {
      title: 'Название',
      customer: 'Клиент',
      owner: 'Владелец',
      value: 'Сумма ($)',
      stage: 'Стадия',
      probability: 'Вероятность (%)',
      expectedClose: 'Ожидаемая дата закрытия',
    },
    empty: {
      title: 'Сделки не найдены.',
      filtered: 'Измените фильтры или создайте новую сделку.',
      default: 'Создайте первую сделку, чтобы начать.',
    },
    error: {
      description: 'Не удалось загрузить сделки.',
    },
  },
  tasks: {
    title: 'Задачи',
    subtitle: 'Работа, связанная с клиентами и сделками',
    search: {
      placeholder: 'Поиск задач...',
      aria: 'Поиск задач',
    },
    filters: {
      allStatuses: 'Все статусы',
      allPriorities: 'Все приоритеты',
      allAssignees: 'Все исполнители',
      due: {
        any: 'Любой срок',
        overdue: 'Просроченные',
        today: 'На сегодня',
        thisWeek: 'На этой неделе',
        upcoming: 'Предстоящие',
      },
    },
    sections: {
      overdue: 'Просроченные',
      today: 'Сегодня',
      upcoming: 'Предстоящие',
      completed: 'Выполненные',
    },
    due: {
      today: 'На сегодня',
      overdue: 'Просрочено · {{date}}',
    },
    pagination: {
      count_one: '{{count}} задача',
      count_other: '{{count}} задач',
    },
    create: {
      button: '+ Новая задача',
      modalTitle: 'Новая задача',
      submit: 'Создать задачу',
      error: 'Не удалось создать задачу.',
    },
    edit: {
      modalTitle: 'Редактировать задачу',
      error: 'Не удалось обновить задачу.',
    },
    changeStatus: {
      aria: 'Сменить статус для {{title}}',
    },
    form: {
      title: 'Название',
      description: 'Описание',
      status: 'Статус',
      priority: 'Приоритет',
      assignee: 'Исполнитель',
      dueDate: 'Срок',
      customer: 'Клиент',
      deal: 'Сделка',
      noCustomer: 'Без клиента',
      noDeal: 'Без сделки',
    },
    empty: {
      title: 'Задачи не найдены.',
      filtered: 'Измените фильтры или создайте новую задачу.',
      default: 'Создайте первую задачу, чтобы начать.',
    },
    error: {
      description: 'Не удалось загрузить задачи.',
    },
  },
  reports: {
    title: 'Эффективность продаж',
    subtitle: 'Выручка, win rate и pipeline — агрегация по сделкам с фильтрами.',
    filters: {
      from: 'С',
      to: 'По',
      owner: 'Владелец',
      stage: 'Стадия',
      allStages: 'Все стадии',
    },
    kpi: {
      revenue: 'Выручка',
      wonDeals: 'Выигранные сделки',
      winRate: 'Win Rate',
      pipelineValue: 'Объём пайплайна',
    },
    revenue: {
      title: 'Выручка',
      description: 'Выручка won-сделок по месяцам закрытия',
      empty: 'Нет won-сделок в выбранном диапазоне',
    },
    pipeline: {
      title: 'Воронка по стадиям',
      description: 'Объём и количество сделок по стадиям',
      empty: 'Нет сделок для воронки',
    },
    byOwner: {
      title: 'По владельцам',
      description: 'Выручка и сделки по владельцам',
      empty: 'Нет данных по владельцам',
      columns: {
        owner: 'Владелец',
        deals: 'Сделки',
        won: 'Выиграно',
        revenue: 'Выручка',
      },
    },
    empty: {
      title: 'Нет данных для reports',
      description: 'Измените фильтры или добавьте сделки — здесь появится аналитика.',
    },
    error: {
      title: 'Не удалось загрузить reports',
      description: 'Проверьте соединение или попробуйте ещё раз.',
    },
  },
}
