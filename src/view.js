import onChange from 'on-change';


function showError(state, i18n, elements) {
  clearError();
  if (state.errors.length !== 0) {
    elements.feedback.textContent = state.errors.map(key => i18n.t(key)).join('\n');
    elements.urlInput.classList.add('is-invalid');
  } 

}

const clearError = () => {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');

  feedback.textContent = '';
  urlInput.classList.remove('is-invalid');
}

const renderTemplatePosts = (posts, elements, i18n) => {
  elements.feedback.classList.replace('text-danger','text-success');
  elements.feedback.textContent = i18n.t('success'); 
  const container = elements.posts;
  const tmpl = elements.templatePosts;

  const postsList = tmpl.content.querySelector('ul.list-group');

  const postsLi = postsList.querySelector('li');
  // const title = document.querySelector(".card-title.h4");
  // title.textContent = i18n.t('posts');

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
  container.appendChild(tmpl.content.cloneNode(true));
};


export const watch = (state, i18n, elements) => {
  return onChange(state, (path) => {
    switch (path) {
      case 'feeds':
        break;
      case 'errors':
        showError(state, i18n, elements);
        break;
      case 'posts':
        renderTemplatePosts(state.posts, i18n, elements);
        break;
      // case 'feeds':
      //   renderFeeds(state.feeds, elements.feeds);
      //   break;
    }
  })
};



