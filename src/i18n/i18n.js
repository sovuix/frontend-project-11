import i18next from 'i18next';
import en from '../../assets/locales/en.json';
import ru from '../../assets/locales/ru.json';

const translations = { en, ru };

const initI18n = () => {
  const lang = localStorage.getItem('lang') || 'ru';
  const i18nInstance = i18next.createInstance();
  return i18nInstance
    .init({
      lng: lang,
      debug: true,
      resources: {
        [lang]: { translation: translations[lang] },
      },
    })
    .then(() => i18nInstance);
};

export default initI18n;
