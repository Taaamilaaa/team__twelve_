import './sass/main.scss';
import './js/api-service';
import ApiService from './js/api-service';
import cardTemplate from './templates/card-image.hbs';
import {locale, page, searchQuery} from './js/eventSearch';
const refs = {

    searchForm: document.querySelector('#js-input-country'),
    container: document.querySelector('.container-list')

 
};

const apiService = new ApiService(locale, page, searchQuery);

apiService.fetchApi().then(res => {
  console.log(...res.data._embedded.events);
  renderEvents(res.data._embedded.events);
});

function renderEvents(event) {
  refs.container.insertAdjacentHTML('beforeend', cardTemplate(event));
}
