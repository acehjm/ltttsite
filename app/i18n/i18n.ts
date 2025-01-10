import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nConfig } from './i18n.config';

import en from './locales/en.json';
import zh from './locales/zh.json';

// 检查是否已经初始化
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
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
        order: ['localStorage', 'navigator', 'htmlTag'],
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage'],
      },
      fallbackLng: 'en',
      load: 'languageOnly',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((error) => {
      console.error('Error initializing i18n:', error);
    });
}

export default i18n;
