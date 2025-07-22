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



const renderTemplatePosts = (elements) => {
  let container = elements.posts;
  let tmpl = elements.templatePosts;
  container.append(tmpl.content.cloneNode(true));
  // document.body.append(container);
}

// const renderPosts = (posts, container) => {
//   if (!Array.isArray(posts)) {
//     console.log('oops');
//   }
//   const feedsHtml = posts.map(post =>
//     // `<h5>${post.title}</h5>
//     `<h6>${post.description}</h6>`
//   ).join('');
//   console.log('sdssdsd');

//   container.innerHTML = feedsHtml;


// }



export const watch = (state, i18n, elements) => {
  return onChange(state, (path) => {
    switch (path) {
      case 'feeds':
        break;
      case 'errors':
        showError(state, i18n, elements);
        break;
      case 'posts':
        // renderPosts(state.posts, elements.posts);
        renderTemplatePosts(elements);
        break;
      // case 'feeds':
      //   renderFeeds(state.feeds, elements.feeds);
      //   break;
    }
  })
};



