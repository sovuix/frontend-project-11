import onChange from 'on-change';

export const formData = {
  url: ''
};

export function showError(message) {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  
  feedback.textContent = message;
  urlInput.classList.add('is-invalid');
}

export function clearError() {
  const urlInput = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  
  feedback.textContent = '';
  urlInput.classList.remove('is-invalid');
}

export const watchedData = onChange(formData, (path, value) => {
  if (path === 'url') {
    if (value.trim() === '') {
      showError('Поле обязательно для заполнения');
    } else {
      clearError();
    }
  }
});
