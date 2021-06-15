  
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

import type { I18n, I18nOptions, Composer } from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'zh-cn']

export let i18n = createI18n({ locale: 'en' })

export function setupI18n(options: I18nOptions = { locale: 'en' }) {
  i18n = createI18n(options)
  setI18nLanguage(options.locale!)
  return i18n
}

export function setI18nLanguage(locale: string): void {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;((i18n.global as unknown) as Composer).locale.value = locale
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')!.setAttribute('lang', locale)
}

export async function loadLocaleMessages(locale: string) {
  // load locale messages
  const messages = await import(/* @vite-ignore */ `./lang/${locale}.ts`)

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}
