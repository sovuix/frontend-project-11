// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import * as yup from 'yup';
import { setLocale } from 'yup';
import initI18n from './i18n/i18n.js'
import { watch } from "./view.js";

import getUrl from './rssFeedParcer.js';


const elements = {
  urlInput: document.querySelector('#url-input'),
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
  templatePosts: document.getElementById('posts'),
  templateFeeds: document.getElementById('feeds'),
};


const runApp = () => {
  const state = {
    feeds: [],
    errors: [],
    posts: [],
    loading: {
      status: 'idle',
      // error: '',
    },
    form: {
      status: 'filling', // 
      // error: '' // 
    }
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
    watchedState.form.status = 'submitted';
    watchedState.loading.status = 'idle';
    const url = elements.urlInput.value.trim();

    const schema = yup.object().shape({
      url: yup
        .string()
        .required()
        .url()
        .notOneOf(watchedState.feeds.map(feed => feed.url))
    });

    schema
      .validate({ url })
      .then(() => {

        // watchedState.feeds = [...watchedState.feeds, url];
        watchedState.errors = [];

        watchedState.loading.status = 'loading';
        console.log(state.loading.status);
        
        getUrl(url)
          .then((response) => {
            watchedState.loading.status = 'loaded';
            watchedState.errors = [];
            console.log(state.loading.status);


            // проверка
            watchedState.feeds.push(response.feed);
            // тоже надо делать push
            // watchedState.posts = response.posts;
            watchedState.posts.push(...response.posts)
            // watchedState.loading.status = false;
            // console.log(watchedState.posts[0]);
            // console.log(watchedState.feeds[0]);
            watchedState.feeds.map(feed => console.log(feed.url))
          })
          .catch((error) => {
            watchedState.errors = [error.message];
            // watchedState.loading.error = error.message;
            // watchedState.loading.status = false;
          });

        // console.log(watchedState.feeds);


        elements.urlInput.value = '';
      })
      .catch((error) => {
        watchedState.errors = error.errors;
      });
  }


}
runApp();















