import { useTranslation } from 'react-i18next'
import {
  SUPPORTED_LOCALES,
  type AppLocale,
} from '@/shared/config/i18n'
import { Dropdown } from '@/shared/ui'

const LOCALE_CODES: Record<AppLocale, string> = {
  en: 'EN',
  ru: 'RU',
  de: 'DE',
  fr: 'FR',
}

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const current = (SUPPORTED_LOCALES.includes(i18n.language as AppLocale)
    ? i18n.language
    : 'en') as AppLocale

  return (
    <Dropdown
      triggerLabel={LOCALE_CODES[current]}
      variant="ghost"
      size="sm"
      align="end"
      ariaLabel={t('language.label')}
      items={SUPPORTED_LOCALES.map((locale) => ({
        id: locale,
        label: t(`language.${locale}`),
        onSelect: () => {
          void i18n.changeLanguage(locale)
        },
      }))}
    />
  )
}
