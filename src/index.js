import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap';
import * as yup from 'yup';
import { formData, showError, clearError } from './view';

// Создаем схему валидации для URL
const urlSchema = yup.object().shape({
  url: yup
    .string()
    .required('Поле обязательно для заполнения')
    .url('Некорректный URL'),
});

const feeds = [];

function addFeed(url) {
  if (feeds.includes(url)) {
    showError('Этот URL уже существует');
    return false;
  }

  feeds.push(url);
  clearError();
}

const form = document.querySelector('.rss-form');
const urlInput = form.querySelector('#url-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const url = urlInput.value.trim(); 

  urlSchema
    .validate({ url })
    .then(() => {
      if (addFeed(url)) {
        form.reset();
        urlInput.focus();
      }
    })
    .catch((err) => {
      if (err.errors[0] === 'Поле обязательно для заполнения') {
        showError('Поле обязательно для заполнения');
      } else if (err.errors[0] === 'Некорректный URL') {
        showError('Некорректный URL');
      }
    });
});