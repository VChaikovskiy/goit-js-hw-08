import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const formData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };

  console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function cheksStorage() {
  const parseSavedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (parseSavedData) {
    refs.input.value = parseSavedData.email;
    refs.textarea.value = parseSavedData.message;
  } else {
    refs.input.value = '';
    refs.textarea.value = '';
  }
}

cheksStorage();

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
