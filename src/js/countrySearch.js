import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
// import { number } from 'joi';
const debounce = require('lodash.debounce');
const apiService = new ApiService();
let searchEvent = '';
let eventCountry = '';
// console.log(number)
const refs = {
    country: document.querySelector('.dropdown'),
    searchFormCountry: document.querySelector('#js-input-country'),
    container: document.querySelector('.container-list'),
    searchFormEvent: document.querySelector('#js-input-event'),
};
refs.country.addEventListener('click', debounce((onSearch), 500));
refs.searchFormEvent.addEventListener('input', debounce ((onSearchEvent),500));

function onSearchEvent(event) {
    event.preventDefault();
    if (refs.searchFormEvent.value) {
         searchEvent = refs.searchFormEvent.value;
         onSearchCountry()
      }
};
function onSearch(event) {
    event.preventDefault();
    if (event.target.classList.contains('dropdown__item')) {
        eventCountry = event.target.dataset.value;
        console.log( event.target.dataset.value);
        refs.searchFormCountry.value = event.target.dataset.value;
        onSearchCountry()
    }
};

function onSearchCountry() {
    apiService.query = searchEvent;
    apiService.queryCountry = eventCountry;
    apiService.resetPage();
    apiServisesRenderTui();
};

function renderEvents(event) {
    refs.container.insertAdjacentHTML('beforeend', cardTemplate(event))
};

function removeEvents() {
    refs.container.innerHTML = ''
};
async function apiServisesRenderTui() {
    try {
        await apiService.fetchApi().then(res => {

            if (typeof (res.data._embedded) === 'object') {
                 let data = res.data.page
                pagination(data);
                removeEvents();
                logicPagination(data);
               renderEvents(res.data._embedded.events);                          
            }
        });
    } catch (error) {
        console.dir(error.stack);
    }
};

export default function pagination(data) {
    // console.log('in paginetion', data);
    const options = {
        totalItems: data.totalElements,
        itemsPerPage: data.size,
        visiblePages: 5,
        page:( data.number || 1 ),
        centerAlign: true,
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
    pagination.on('afterMove', (event) => {
        console.log('in pagination.on', options);
        const currentPage = event.page;
        console.log(currentPage);
        apiService.Page = currentPage;
        apiServisesRenderTui();
    });
};

function logicPagination(data) {
    if (data.totalElements >= 12) {
        visiblePagination();
       
    } else 
    hiddenPagination();
    return
};
function hiddenPagination() {
   const paginationContainer = document.querySelector('#pagination');
   paginationContainer.classList.remove('is-visible-tui');  
   paginationContainer.classList.add('is-hidden-tui');
};
function visiblePagination() {
    const paginationContainer = document.querySelector('#pagination');
    paginationContainer.classList.remove('is-hidden-tui');
    paginationContainer.classList.add('is-visible-tui');  
};