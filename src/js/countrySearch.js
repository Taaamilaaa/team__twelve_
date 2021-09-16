import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const apiService = new ApiService();

const refs = {
    searchFormCountry: document.querySelector('#js-input-country'),
    container: document.querySelector('.container-list'),
    searchFormEvent: document.querySelector('#js-input-event')
};

refs.searchFormCountry.addEventListener('input', onSearchCountry)

function onSearchCountry(event) {
    event.preventDefault();
    apiService.queryCountry = refs.searchFormCountry.value.toUpperCase()

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

function renderEvents(event) {
    refs.container.insertAdjacentHTML('beforeend', cardTemplate(event))
}
function removeEvents() {
    refs.container.innerHTML = ''
}
