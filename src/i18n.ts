import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import { AppLanguages } from './constants/app.constants';

const resources = {
  en: {
    translation: en
  },
  ru: {
    translation: ru
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: AppLanguages.EN, // default language
    fallbackLng: AppLanguages.EN,

    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

export default i18n;
