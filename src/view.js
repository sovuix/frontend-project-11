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


const renderPosts = (posts, container) => {
  if (!Array.isArray(posts)) {
    console.log('oops');
    
    container.textContent = '';
    return;
  }

  // const postsHtml = posts.map(post => `
  //   <div class="card mb-3">
  //     <div class="card-body">
  //       <h5 class="card-title">${post.title}</h5>
  //       ${post.description ? `<p class="card-text">${post.description}</p>` : ''}
  //       <a href="${post.link || '#'}" target="_blank" class="btn btn-primary">Читать</a>
  //     </div>
  //   </div>
  // `).join('');

  const postsHtml = posts.map(post => 
    // `<h5>${post.title}</h5>
    `<h6>${post.title}</h6>`
  ).join('');

  container.innerHTML = postsHtml;
}

const renderFeeds = (feeds, container) => {
  if (!Array.isArray(posts)) {
    container.textContent = '';
    return;
  }

  const feedsHtml = feeds.map(feed => 
    // `<h5>${post.title}</h5>
    `<h6>${feed.title}</h6>`
  ).join('');

  container.innerHTML = postsHtml;
}

export const watch = (state, i18n, elements) => {
  return onChange(state, (path) => {
    switch (path) {
      case 'feeds':
        break;
      case 'errors':
        showError(state, i18n, elements);
        break;
      case 'posts':
        renderPosts(state.posts, elements.posts);
        break;
      // case 'feeds':
      //   renderFeeds(state.feeds, elements.feeds);
      //   break;
    }
  })
};



