import * as yup from "yup";
import "bootstrap";
import { setLocale } from "yup";
import initI18n from "./i18n/i18n.js";
import { watch } from "./view.js";
import getUrl from "./parser.js";
import _ from "lodash";

export const runApp = () => {
  const elements = {
    urlInput: document.querySelector("#url-input"),
    submitButton: document.querySelector("button[type='submit']"),
    form: document.querySelector(".rss-form"),
    feedback: document.querySelector(".feedback"),
    posts: document.querySelector(".posts"),
    feeds: document.querySelector(".feeds"),
    templatePosts: document.getElementById("posts"),
    templateFeeds: document.getElementById("feeds"),
  };
  const state = {
    feeds: [],
    errors: [],
    posts: [],
    uiState: {
      viewedPostId: new Set(),
      modalPostId: null,
    },
    loading: {
      status: "idle",
    },
    form: {
      status: "filling", 
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

    elements.posts.addEventListener("click", (e) => {
        const button = e.target.closest("button[data-id]");
        if (!button) return;

        const postId = button.dataset.id;
        if (!watchedState.uiState.viewedPostId.has(postId)) {
          watchedState.uiState.viewedPostId.add(postId);
        }
        watchedState.uiState.modalPostId = postId;
      },
      true
    );

    if (elements.form) {
      elements.form.addEventListener("submit", (e) =>
        handleFormSubmit(e, watchedState)
      );
    }

    setTimeout(() => updateFeeds(watchedState), 5000);
  });

  const updateFeeds = (watchedState) => {
    const feedPromises = watchedState.feeds.map((feed) =>
      getUrl(feed.url)
        .then((response) => {
          return _.differenceBy(response.posts, watchedState.posts, "link");
        })
        .catch(() => [])
    );

    Promise.all(feedPromises)
      .then((allNewPosts) => {
        const newPosts = _.flatten(allNewPosts);
        if (newPosts.length > 0) {
          watchedState.posts.unshift(...newPosts);
        }
      })
      .finally(() => {
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
        watchedState.loading.status = "loading";
        console.log(state.loading.status);

        getUrl(url)
          .then((response) => {
            watchedState.loading.status = "loaded";
            watchedState.errors = [];
            console.log(state.loading.status);

            watchedState.feeds.push({ url, ...response.feed });

            const postId = response.posts.map(post => ({
              ...post,
              id: _.uniqueId()
            }));
            watchedState.posts.push(...postId);
            elements.urlInput.value = "";
          })
          .catch((error) => {
            watchedState.errors = [error.message];
          });
      })
      .catch((error) => {
        watchedState.errors = error.errors;
      });
  }
};