import onChange from 'on-change';

// export const formData = {
//   url: ''
// };

function showError(state, i18n, elements) {
  // const urlInput = document.querySelector('#url-input');
  // const feedback = document.querySelector('.feedback');
  
  feedback.textContent = message;
  urlInput.classList.add('is-invalid');
}

function clearError() {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  
  feedback.textContent = '';
  urlInput.classList.remove('is-invalid');
}

export const watch = (state, i18n, elements) => {
  return onChange(state, (path, value) => {
    switch(path) {
      case 'feeds': 
        break;
      case 'errors':
        showError(state, i18n, elements); 
        break;
    }
    // if (path === 'feeds') {
    //   if (value.trim() === '') {
    //     showError('Поле обязательно для заполнения');
    //   } else {
    //     clearError();
    //   }
    // }
  })
};



