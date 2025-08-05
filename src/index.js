// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import * as yup from "yup";
import { setLocale } from "yup";
import initI18n from "./i18n/i18n.js";
import { watch } from "./view.js";

import getUrl from "./rssFeedParcer.js";
import _ from "lodash";

const elements = {
  urlInput: document.querySelector("#url-input"),
  form: document.querySelector(".rss-form"),
  feedback: document.querySelector(".feedback"),
  posts: document.querySelector(".posts"),
  feeds: document.querySelector(".feeds"),
  templatePosts: document.getElementById("posts"),
  templateFeeds: document.getElementById("feeds"),
};

const runApp = () => {
  const state = {
    feeds: [],
    errors: [],
    posts: [],
    loading: {
      status: "idle",
      // error: '',
    },
    form: {
      status: "filling", //
      // error: '' //
    },
  };

  initI18n().then((i18n) => {
    setLocale({
      mixed: {
        required: "errors.required",
        notOneOf: "errors.duplicateUrl",
      },
      string: {
        url: "errors.invalidUrl",
      },
    });

    const watchedState = watch(state, i18n, elements);

    if (elements.form) {
      elements.form.addEventListener("submit", (e) =>
        handleFormSubmit(e, watchedState)
      );
    }

    setTimeout(() => updateFeeds(watchedState), 5000);
  });

  // const updateFeeds = (watchedState) => {
  //   watchedState.feeds.forEach((feed) => {
  //     getUrl(feed.url)
  //       .then((response) => {
  //         const newPosts = _.differenceBy(
  //           response.posts,
  //           watchedState.posts,
  //           "link"
  //         );

  //         if (newPosts.length > 0) {
  //           watchedState.posts.unshift(...newPosts);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error.message);
  //       });
  //   });
  // };

  const updateFeeds = (watchedState) => {
    const feedPromises = watchedState.feeds.map((feed) =>
      getUrl(feed.url).then((response) => {
        return _.differenceBy(response.posts, watchedState.posts, "link");
      })
      .catch(() => [])
    );

    Promise.all(feedPromises).then((allNewPosts) => {
      console.log('получили все фиды', allNewPosts)
      console.log('фиды', watchedState.feeds)
      const newPosts = _.flatten(allNewPosts);
      if (newPosts.length > 0) {
        watchedState.posts.unshift(...newPosts);
      }
    })
    .finally(() => {
      console.log('перезапустили таймер')
      setTimeout(() => updateFeeds(watchedState), 5000);
    });
  };

  function handleFormSubmit(e, watchedState) {
    e.preventDefault();
    watchedState.form.status = "submitted";
    watchedState.loading.status = "idle";
    const url = elements.urlInput.value.trim();

    const schema = yup.object().shape({
      url: yup
        .string()
        .required()
        .url()
        .notOneOf(watchedState.feeds.map((feed) => feed.url)),
    });

    schema
      .validate({ url })
      .then(() => {
        watchedState.errors = [];

        watchedState.loading.status = "loading";
        console.log(state.loading.status);

        getUrl(url)
          .then((response) => {
            watchedState.loading.status = "loaded";
            watchedState.errors = [];
            console.log(state.loading.status);

            watchedState.feeds.push(response.feed);
            watchedState.posts.push(...response.posts);

            // setTimeout(() => updateFeeds(watchedState), 5000);
          })
          .catch((error) => {
            watchedState.errors = [error.message];
          });
          // .finally(() => {
          //   updateFeeds(watchedState);
          // });

        elements.urlInput.value = "";
      })
      .catch((error) => {
        watchedState.errors = error.errors;
      });
  }
};

runApp();
