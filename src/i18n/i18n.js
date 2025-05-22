// import i18next from 'i18next';

// const loadTranslations = (lang) => {
//     return fetch(`/assets/locales/${lang}.json`)
//     .then(response => response.json());
// }

// const initI18n = () => {
//     const lang = localStorage.getItem('lang') || 'ru';

//     return loadTranslations(lang)
//     .then(translations => {
//         return i18next.init({
//             lng: lang,
//             debug: true,
//             resources: {
//                 translation: translations
//             }
//         })
//     })
// }

// export default initI18n;
import i18next from 'i18next';
import en from '../../assets/locales/en.json';
import ru from '../../assets/locales/ru.json';

const translations = { en, ru };

const initI18n = () => {
    const lang = localStorage.getItem('lang') || 'ru';
    const resources = translations[lang] || translations.ru;

    return i18next.init({
        lng: lang,
        debug: true,
        resources: {
            translation: resources
        }
    });
};

export default initI18n;


