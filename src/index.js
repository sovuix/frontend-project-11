import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import * as yup from 'yup';
import { setLocale } from 'yup';
import initI18n from './i18n/i18n.js'
import { watch } from "./view.js";

import gettaUrl from './getRss.js';


const elements = {
  urlInput: document.querySelector('#url-input'),
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts')
};


const runApp = () => {
  const state = {
    form: {
      feeds: [],
      errors: [],
    },
    loading: {
      status: 'loading',
      error: '',
    },
    test: [],
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
      // тест
      watchedState.loading = true;
      gettaUrl()
        .then((resp) => watchedState.test = resp)
        .then(() => console.log(watchedState.test));


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
        .notOneOf(watchedState.form.feeds)
    });

    schema
      .validate({ url })
      .then(() => {

        watchedState.form = {
          feeds: [...watchedState.form.feeds, url],
          errors: []
        }
        elements.urlInput.value = '';
      })
      .catch((error) => {
        watchedState.form.errors = error.errors;
      });
  }


}
runApp();















