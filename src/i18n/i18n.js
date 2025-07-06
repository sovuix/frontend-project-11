import i18next from 'i18next';
import en from '../../assets/locales/en.json';
import ru from '../../assets/locales/ru.json';

const translations = { en, ru };

const initI18n = () => {
  const lang = localStorage.getItem('lang') || 'ru';
  return i18next.init({
    lng: lang,
    debug: true,
    resources: {
      [lang]: { translation: translations[lang] }
    }
  }).then(() => i18next);
};

export default initI18n;


