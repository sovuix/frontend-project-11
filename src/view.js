import onChange from 'on-change';


function showError(state, i18n, elements) {
  clearError();


  if (state.form.errors.length !== 0) {
    elements.feedback.textContent = state.form.errors.map(key => i18n.t(key)).join('\n');
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
    container.textContent = '';
    return;
  }

  const postsHtml = posts.map(post => `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${post.title || 'Без названия'}</h5>
        ${post.description ? `<p class="card-text">${post.description}</p>` : ''}
        <a href="${post.link || '#'}" target="_blank" class="btn btn-primary">Читать</a>
      </div>
    </div>
  `).join('');

  container.innerHTML = postsHtml;
}

export const watch = (state, i18n, elements) => {
  return onChange(state, (path) => {
    switch (path) {
      case 'form.feeds':
        break;
      case 'form.errors':
        showError(state, i18n, elements);
        break;
      case 'test':
        // elements.posts.textContent = state.test;
        renderPosts(state.test, elements.posts);
        break;
    }
  })
};



