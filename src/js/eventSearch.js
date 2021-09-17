import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
const debounce = require('lodash.debounce');
const apiService = new ApiService();
const refs = {
  searchFormCountry: document.querySelector('#js-input-country'),
  container: document.querySelector('.container-list'),
  searchFormEvent: document.querySelector('#js-input-event')
};


refs.searchFormEvent.addEventListener('input', debounce ((onSearchEvent),500))

function onSearchEvent() {

  if (refs.searchFormCountry.value) {
    // console.log(refs.searchFormCountry.value);
  apiService.queryCountry = refs.searchFormCountry.value;
}
  apiService.query = refs.searchFormEvent.value

  apiService.fetchApi().then(res => {
    if (res.data) {
      removeEvents();
    }
    renderEvents(res.data._embedded.events);
  });
}

function renderEvents(event) {
  refs.container.insertAdjacentHTML('beforeend', cardTemplate(event));
}

function removeEvents() {
  refs.container.innerHTML = ''
}
