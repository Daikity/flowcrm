import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { de } from './locales/de'
import { en } from './locales/en'
import { fr } from './locales/fr'
import { ru } from './locales/ru'

export const SUPPORTED_LOCALES = ['en', 'ru', 'de', 'fr'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const LOCALE_STORAGE_KEY = 'flowcrm.locale'

export const LOCALE_TO_INTL: Record<AppLocale, string> = {
  en: 'en-GB',
  ru: 'ru-RU',
  de: 'de-DE',
  fr: 'fr-FR',
}

function readStoredLocale(): AppLocale {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && SUPPORTED_LOCALES.includes(stored as AppLocale)) {
    return stored as AppLocale
  }
  return 'en'
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    de: { translation: de },
    fr: { translation: fr },
  },
  lng: readStoredLocale(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  if (SUPPORTED_LOCALES.includes(lng as AppLocale)) {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, lng)
    document.documentElement.lang = lng
  }
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language
}

export { i18n }
export type { TranslationSchema } from './locales/en'
