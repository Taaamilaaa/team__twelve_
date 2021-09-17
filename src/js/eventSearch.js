import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
import pagination from './countrySearch';
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
  apiService.queryCountry = refs.searchFormCountry.value;
}

  apiService.query = refs.searchFormEvent.value;

  apiServisesRender ()

};

async function apiServisesRender () {
  try {
  await apiService.fetchApi().then(res => {
      if (typeof (res.data._embedded) === 'object') {
        removeEvents();
        console.log(res.data);
        renderEvents(res.data._embedded.events);
        let data = res.data.page
        if (data.totalElements >= 12) {
           pagination(data);
        } else pagination();
      }
      
    });
  } catch (error) {
    
  }
};
function renderEvents(event) {
  refs.container.insertAdjacentHTML('beforeend', cardTemplate(event));
}

function removeEvents() {
  refs.container.innerHTML = ''
}
