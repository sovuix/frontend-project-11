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


const runApp = () => {
  const state = {
    feeds: [],
    errors: [],
  }

  initI18n()
    .then((i18n) => {
      setLocale({
        mixed: {
          required: 'errors.required',
          notOneOf: 'errors.duplicateUrl',
        },
        string: {
          url: 'errors.invalidUrl',
        },
      });
      const watchedState = watch(
        state,
        i18n,
        elements
      );
      if (elements.form) {
        elements.form.addEventListener('submit', (e) => handleFormSubmit(e, watchedState))
      }
    })

  function handleFormSubmit(e, watchedState) {
    e.preventDefault();
    const url = elements.urlInput.value.trim();

    const schema = yup.object().shape({
      url: yup
        .string()
        .required()
        .url()
        .notOneOf(watchedState.feeds)
    });

    schema
      .validate({ url })
      .then(() => {

        watchedState.feeds = [...watchedState.feeds, url];
        watchedState.errors = [];
        elements.urlInput.value = '';
        console.log(state.feeds);


      })
      .catch((error) => {
        watchedState.errors = error.errors;
      });
  }
}
runApp();












