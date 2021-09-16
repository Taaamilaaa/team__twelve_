import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';

let  locale = 'FR';
let page = 0;
let searchQuery = '';

const refs = {

  searchForm: document.querySelector('#js-input-country'),
  container: document.querySelector('.container-list'),
  searchForm: document.querySelector('#js-input-event')

};

console.log(refs.searchForm);

refs.searchForm.addEventListener ('input', onSearch)

function onSearch() {
searchQuery  = refs.searchForm.value
 console.log(searchQuery);

 const apiService = new ApiService( locale, page, searchQuery);
console.log(apiService);

apiService.fetchApi().then(res => {
  console.log(...res.data._embedded.events);
  if (res.data) {
    remuveEvents();
  }
  renderEvents(res.data._embedded.events);
});
}

function renderEvents(event) {
  refs.container.insertAdjacentHTML('beforeend', cardTemplate(event));
}

function remuveEvents() {
  refs.container.innerHTML = ''
}
export {locale, page, searchQuery};