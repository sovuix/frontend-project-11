import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import * as yup from 'yup';
// import { watch } from './view';
// import initI18n from './i18n/i18n.js';
// import { initI18n, i18next } from './i18n/i18n.js';

// // Создаем схему валидации для URL. Добавить приверку уникаьлности добавленных url
// const urlSchema = yup.object().shape({
//   url: yup
//     .string()
//     .required(t('errors.requred')) // вынести в i18n. Вместо строки используем ключ в переводах
//     .url(t('errors.')), // вынести в i18n
// });

const elements = {
  urlInput: document.querySelector('#url-input'),
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback')
  // form: ,
}

/*
Модель:
- данные feed
*/

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const url = elements.urlInput.value.trim();

  const dataToValidate = { url };

  initI18n().then(() => {
    const urlSchema = yup.object().shape({
      url: yup
        .string()
        .required(() => i18next.t('errors.required')) 
        .url(() => i18next.t('errors')),
    });

    urlSchema
      .validate(dataToValidate) 
      .then(() => {
        console.log('Validation passed');
        elements.feedback.textContent = ''; 
      })
      .catch((err) => {
        console.error('Validation error:', err.errors);
        elements.feedback.textContent = err.errors.map((error) => i18next.t(error)).join(', '); 
      });
  });
});


// const feeds = []; // опишем как состояние
// формат
const state = {
  feeds: [], // урлы которые мы добавляем
  errors: [], // массив ошибок, ключи из i18n
};



const watchedState = watch(
  state,
  {}, // i18n
  elements
);

function addFeed(url) {
  if (state.feeds.includes(url)) { // давай попробуем добоавить это все в urlSchema
    showError('Этот URL уже существует');
    return false;
  }

  watchedState.feeds.push(url);
  clearError();
}

const form = document.querySelector('.rss-form');
const urlInput = form.querySelector('#url-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const url = urlInput.value.trim(); 

  // urlSchema
  //   .validate({ url })
  //   .then(() => {
  //     // if (addFeed(url)) {
  //       // мы должны обработатать ошибки
  //       // 1. загрузки
  //       // 2. там не xml

  //       state.feeds.push(url);
  //       form.reset();
  //       urlInput.focus();
  //     // }
  //   })
  //   .catch((err) => {
  //     state.errors.push(...err.errors);
  //     // if (err.errors[0] === 'Поле обязательно для заполнения') {
  //     //   showError('Поле обязательно для заполнения');
  //     // } else if (err.errors[0] === 'Некорректный URL') {
  //     //   showError('Некорректный URL');
  //     // }
  //   });
});



