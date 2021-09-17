import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
const debounce = require('lodash.debounce');
const apiService = new ApiService();
// let eventCountry = '';
const refs = {
    country: document.querySelector('.dropdown'),
    searchFormCountry: document.querySelector('#js-input-country'),
    container: document.querySelector('.container-list'),
    searchFormEvent: document.querySelector('#js-input-event')
};

// refs.searchFormCountry.addEventListener('input', debounce((onSearchCountry), 500));
refs.country.addEventListener('click', debounce((onSearchCountry), 500))
function onSearchCountry(event) {
    event.preventDefault();

if (event.target.classList.contains('dropdown__item')) {
   const eventCountry = event.target.dataset.value;
   onSearchCountry(eventCountry)
     }
    // apiService.queryCountry = refs.searchFormCountry.value.toUpperCase();

  function onSearchCountry(eventCountry){
    // console.log(eventCountry);

if (refs.searchFormEvent.value) {
    // console.log(refs.searchFormEvent.value);
    apiService.query = refs.searchFormEvent.value
}

refs.searchFormCountry.value = eventCountry;

    apiService.queryCountry = eventCountry;
    apiService.fetchApi().then(res => {
        if (res.data) {
            removeEvents();
        }
        renderEvents(res.data._embedded.events);
        const options = {
            totalItems: res.data.page.totalElements,
            itemsPerPage: res.data.page.size,
            visiblePages: 5,
            page: res.data.page.number,
            centerAlign: false,
            firstItemClassName: 'tui-first-child',
            lastItemClassName: 'tui-last-child',
            template: {
                page: '<a href="#" class="tui-page-btn">{{page}}</a>',
                currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
                moveButton:
                    '<a href="#" class="tui-page-btn tui-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                    '</a>',
                disabledMoveButton:
                    '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                    '</span>',
                moreButton:
                    '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                    '<span class="tui-ico-ellip">...</span>' +
                    '</a>'
            }
        };
        const pagination = new Pagination('.tui-pagination', options);
    });
}
    
}
   



function renderEvents(event) {
    refs.container.insertAdjacentHTML('beforeend', cardTemplate(event))
}

function removeEvents() {
  refs.container.innerHTML = ''
}
