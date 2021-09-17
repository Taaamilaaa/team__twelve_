import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';

const apiService = new ApiService();
const refs = {
  searchFormCountry: document.querySelector('#js-input-country'),
  container: document.querySelector('.container-list'),
  searchFormEvent: document.querySelector('#js-input-event')
};


refs.searchFormEvent.addEventListener('input', onSearchEvent)

function onSearchEvent() {
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
