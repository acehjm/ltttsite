import en from './locales/en.json';
import zh from './locales/zh.json';

export const i18nConfig = {
  supportedLngs: ['en', 'zh'],
  fallbackLng: 'en',
  defaultNS: 'translation',
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
};
