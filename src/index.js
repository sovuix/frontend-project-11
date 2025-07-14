import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import * as yup from 'yup';
import { setLocale } from 'yup';
import initI18n from './i18n/i18n.js'
import { watch } from "./view.js";


const elements = {
  urlInput: document.querySelector('#url-input'),
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
};




const runApp = (i18n) => {
initI18n()
  .then((i18n) => {
    setLocale({
      mixed: {
        // required: (count) => ({key: 'errors.required', count}),
        // notOneOf: () => 'errors.duplicateUrl',
        required: 'errors.required',
        notOneOf: 'errors.duplicateUrl',
      },
      string: {
        // url: () => i18n.t('errors.invalidUrl'),
        url: 'errors.invalidUrl',
      },
    });
    runApp(i18n);

    if (elements.form) {
      elements.form.addEventListener('submit', handleFormSubmit);
    }
  })
  .catch((error) => {
    console.error('Initialization failed:', error);
  });

function handleFormSubmit(e) {
  e.preventDefault();
  const url = elements.urlInput.value.trim();

  const schema = yup.object().shape({
    url: yup
    .string()
    .required()
    .url()
    .notOneOf(state.feeds)
  });

  schema
    .validate({ url })
    .then(() => {
      state.feeds.push(url); 
    console.log('Добавленные фиды:', state.feeds);
    

    // elements.feedback.textContent = '';
    // elements.urlInput.style.borderColor = '';
    // elements.urlInput.value = ''; 

    })
    .catch((error) => {
      console.error('Validation error:', error.message);
      state.errors = error.errors;
      // error.inner.forEach(err => {
        // state.errors.push(err.message); // message теперь содержит ключ из yup
      // });
      console.log(state.errors);
      
      // идет во view
      // elements.feedback.textContent = error.message;
      // elements.urlInput.style.borderColor = 'red';
      // elements.urlInput.value = '';
      // elements.urlInput.focus();
      
    });
}



  const state = {
    feeds: [], 
    errors: [],
  }


  // ЗАКОММЕНТИРОВАЛ

  const watchedState = watch(
    state,
    i18n,
    elements
  );
  // console.log('1.')
  // watchedState.feeds = [];
  // console.log('2.')
  // watchedState.feeds.push('url');

  // console.log('3.')
  // watchedState.innerObj.a.b = 1;


  // function addFeed(url) {
  //   if (state.feeds.includes(url)) { // давай попробуем добоавить это все в urlSchema
  //     showError('Этот URL уже существует');
  //     return false;
  //   }

  //   watchedState.feeds.push(url);
  //   clearError();
  // }
}






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



/*
const i18nInstance = i18n.createInstance()

const runApp = () => {
    const watchedState = watch(state, elements, i18nInstance);
}

i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
}).then(() => {
    runApp();
})
*/


