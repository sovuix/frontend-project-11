import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import * as yup from 'yup';
import { setLocale } from 'yup';
import initI18n from './i18n/i18n.js'


const elements = {
  urlInput: document.querySelector('#url-input'),
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
};

initI18n()
  .then((i18n) => {
    setLocale({
      mixed: {
        required: () => i18n.t('errors.required'),
        notOneOf: () => i18n.t('errors.duplicateUrl'),
      },
      string: {
        url: () => i18n.t('errors.invalidUrl'),
      },
    });

    if (elements.form) {
      elements.form.addEventListener('submit', handleFormSubmit);
    }
  })
  .catch((error) => {
    console.error('Initialization failed:', error);
    if (elements.feedback) {
      elements.feedback.textContent = 'Failed to load translations';
    }
  });

function handleFormSubmit(e) {
  e.preventDefault();
  const url = elements.urlInput.value.trim();

  const schema = yup.object().shape({
    url: yup
    .string()
    .required()
    .url()
    .notOneOf(state.feeds),
  });

  schema
    .validate({ url })
    .then(() => {
      state.feeds.push(url); 
    console.log('Добавленные фиды:', state.feeds);
    

    elements.feedback.textContent = '';
    elements.urlInput.style.borderColor = '';
    elements.urlInput.value = ''; 

    })
    .catch((error) => {
      console.error('Validation error:', error.message);
      elements.feedback.textContent = error.message;
      elements.urlInput.style.borderColor = 'red';
      elements.urlInput.value = '';
      elements.urlInput.focus();
    });
}


const state = {
  feeds: [], // урлы которые мы добавляем
  errors: [], // массив ошибок, ключи из i18n
};


// ЗАКОММЕНТИРОВАЛ

// const watchedState = watch(
//   state,
//   {}, // i18n
//   elements
// );

// function addFeed(url) {
//   if (state.feeds.includes(url)) { // давай попробуем добоавить это все в urlSchema
//     showError('Этот URL уже существует');
//     return false;
//   }

//   watchedState.feeds.push(url);
//   clearError();
// }







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






