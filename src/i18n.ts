import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import { LanguageCode } from './constants/app.constants';
import { STORAGE_KEYS } from './constants/storage';

const resources = {
  en: {
    translation: en
  },
  ru: {
    translation: ru
  }
};

const selectedLanguage = window.localStorage.getItem(STORAGE_KEYS.APP_LANGUAGE) ?? LanguageCode.EN;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: selectedLanguage, // default language
    fallbackLng: LanguageCode.EN,

    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

export default i18n;
