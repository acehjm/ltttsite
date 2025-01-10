import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nConfig } from './i18n.config';

import en from './locales/en.json';
import zh from './locales/zh.json';

if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...i18nConfig,
      resources: {
        en: {
          translation: en,
        },
        zh: {
          translation: zh,
        },
      },
      detection: {
        order: ['navigator', 'htmlTag'],
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
