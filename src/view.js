import onChange from 'on-change';


function showError(state, i18n, elements) {
  clearError();
  if (state.errors.length !== 0) {
    elements.feedback.textContent = state.errors.map(key => i18n.t(key)).join('\n');
    elements.feedback.classList.add('text-danger');
  } else {
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = i18n.t('success');
  }
}

const clearError = () => {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');

  feedback.textContent = '';
  urlInput.classList.remove('is-invalid');
}

const renderTemplatePosts = (posts, elements, i18n) => {
  const container = elements.posts;
  const tmpl = elements.templatePosts;
  const container2 = tmpl.content.cloneNode(true);

  const textPosts = container2.querySelector('.card-title.h4');
  if (textPosts) {
    textPosts.textContent = i18n.t('posts');
  }

  const postsList = container2.querySelector('ul.list-group');

  const postsLi = postsList.querySelector('li');

  postsList.innerHTML = '';

  posts.forEach(post => {
    const li = postsLi.cloneNode(true);
    const link = li.querySelector('a.fw-bold');
    const button = li.querySelector('button');

    if (link && button) {
      link.href = post.link;
      link.textContent = post.title;
      link.dataset.id = post.id;
      button.dataset.id = post.id;
    }

    postsList.appendChild(li);
  });

  container.innerHTML = '';
  container.appendChild(container2);
};

const renderTemplateFeeds = (feeds, elements, i18n) => {
  const container = elements.feeds;
  const tmpl = elements.templateFeeds;
  const container2 = tmpl.content.cloneNode(true);


  const textFeeds = container2.querySelector('.card-title.h4');
  if (textFeeds) {
    textFeeds.textContent = i18n.t('feeds');
  }

  const feedsList = container2.querySelector('ul.list-group');
  const feedsLi = feedsList.querySelector('li');

  feedsList.innerHTML = '';

  feeds.forEach(feed => {
    const li = feedsLi.cloneNode(true);
    const title = li.querySelector('h3.h6');
    const description = li.querySelector('p.small');

    if (title && description) {
      title.textContent = feed.title;
      description.textContent = feed.description;
    }

    feedsList.appendChild(li);
  });

  container.innerHTML = '';
  container.appendChild(container2);

};



export const watch = (state, i18n, elements) => {
  return onChange(state, (path) => {
    switch (path) {
      case 'errors':
        showError(state, i18n, elements);
        break;
      case 'posts':
        renderTemplatePosts(state.posts, elements, i18n);
        break;
      case 'feeds':
        renderTemplateFeeds(state.feeds, elements, i18n);
        break;
    }
  })
};



