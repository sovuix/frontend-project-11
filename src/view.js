import onChange from 'on-change';


function showError(state, i18n, elements) {
  clearError();


  if (state.form.errors.length !== 0) {
    elements.feedback.textContent = state.form.errors.map(key => i18n.t(key)).join('\n');
    elements.urlInput.classList.add('is-invalid');
  }

}

function clearError() {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');

  feedback.textContent = '';
  urlInput.classList.remove('is-invalid');
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
        elements.posts.textContent = state.test;
        break;
    }
  })
};



