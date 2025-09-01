import onChange from "on-change";

function showError(state, i18n, elements) {
  clearError();
  if (state.errors.length !== 0) {
    elements.feedback.textContent = state.errors
      .map((key) => i18n.t(key))
      .join("\n");
    elements.feedback.classList.add("text-danger");
  } else {
    elements.feedback.classList.replace("text-danger", "text-success");
    elements.feedback.textContent = i18n.t("success");
  }
}

function blockedButton(loadingState, elements) { 
  if (loadingState.status === "loading") {
    elements.submitButton.disabled = true;
    elements.urlInput.readOnly = true;
  } else {
    elements.submitButton.disabled = false;
    elements.urlInput.readOnly = false;
  }
}

const clearError = () => {
  const urlInput = document.querySelector("#url-input");
  const feedback = document.querySelector(".feedback");

  feedback.textContent = "";
  urlInput.classList.remove("is-invalid");
};

const renderTemplatePosts = (posts, elements, i18n, uiState) => {
  const container = elements.posts;
  const tmpl = elements.templatePosts;
  const clonedTemplate = tmpl.content.cloneNode(true);

  const textPosts = clonedTemplate.querySelector(".card-title.h4");
  if (textPosts) {
    textPosts.textContent = i18n.t("posts");
  }

  const postsList = clonedTemplate.querySelector("ul.list-group");

  const postsLi = postsList.querySelector("li");

  postsList.innerHTML = "";

  posts.forEach((post) => {
    const li = postsLi.cloneNode(true);
    const link = li.querySelector("a.fw-bold");
    const button = li.querySelector("button");

    if (link && button) {
      link.href = post.link;
      link.textContent = post.title;
      link.dataset.id = post.id;
      button.dataset.id = post.id;
    }
    if (uiState.viewedPostId.has(post.id)) {
      link.classList.remove("fw-bold");
      link.classList.add("fw-normal", "link-secondary");
    }

    postsList.appendChild(li);
  });

  container.innerHTML = "";
  container.appendChild(clonedTemplate);
};

const renderTemplateFeeds = (feeds, elements, i18n) => {
  const container = elements.feeds;
  const tmpl = elements.templateFeeds;
  const container2 = tmpl.content.cloneNode(true);

  const textFeeds = container2.querySelector(".card-title.h4");
  if (textFeeds) {
    textFeeds.textContent = i18n.t("feeds");
  }

  const feedsList = container2.querySelector("ul.list-group");
  const feedsLi = feedsList.querySelector("li");

  feedsList.innerHTML = "";

  feeds.forEach((feed) => {
    const li = feedsLi.cloneNode(true);
    const title = li.querySelector("h3.h6");
    const description = li.querySelector("p.small");

    if (title && description) {
      title.textContent = feed.title;
      description.textContent = feed.description;
    }

    feedsList.appendChild(li);
  });

  container.innerHTML = "";
  container.appendChild(container2);
};

const renderModal = (posts, uiState) => {
  if (!uiState.modalPostId) return;

  const post = posts.find((p) => p.id === uiState.modalPostId);
  if (!post) return;

  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  const btn = document.querySelector(".btn.btn-primary");

  if (modalTitle) modalTitle.textContent = post.title;
  if (modalBody) modalBody.textContent = post.description;
  if (btn) btn.href = post.link;

};

export const watch = (state, i18n, elements) => {
  return onChange(state, (path) => {
    switch (path) {
      case "errors":
        showError(state, i18n, elements);
        break;
      case "posts":
        renderTemplatePosts(state.posts, elements, i18n, state.uiState);
        break;
      case "feeds":
        renderTemplateFeeds(state.feeds, elements, i18n);
        break;
      case "uiState.modalPostId":
        renderModal(state.posts, state.uiState, elements);
        break;
      case "uiState.viewedPostId":
        renderTemplatePosts(state.posts, elements, i18n, state.uiState);
        break;
      case "loading.status":
        blockedButton(state.loading, elements);
        break;
    }
  });
};
