import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
import { Notify } from 'notiflix';
import Pagination from 'tui-pagination';

const debounce = require('lodash.debounce');
const apiService = new ApiService();


const refs = {
    searchFormCountry: document.querySelector('#js-select-country'),
    container: document.querySelector('.container-list'),
    searchFormEvent: document.querySelector('#js-input-event'),
};

refs.searchFormCountry.addEventListener('change', debounce((onSearch), 500));
refs.searchFormEvent.addEventListener('input', debounce((onSearchEvent), 500));

function onSearchEvent(event) {
    event.preventDefault();
    apiService.query = refs.searchFormEvent.value
    apiService.resetPage();
    apiServisesRenderTui()
};
function onSearch() {
    let selectedEl = refs.searchFormCountry.
        options[refs.searchFormCountry.options.selectedIndex].value;
    apiService.queryCountry = selectedEl;

    console.log(selectedEl);
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
            // if (res.data.page.totalElements > 0) {
            //     Notify.success(`Hooray! We found ${res.data.page.totalElements} events`,
            //         { useGoogleFont: true, timeout: 3000, width: "310px", distance: "20px", borderRadius: "10px", fontFamily: "Montserrat", fontSize: "15px" });
            // }
            if (res.data.page.totalElements === 0) {
                Notify.failure(`Ops! We couldn't found events. Please, use new keyword or choose other сountry.`,
                    { width: "310px", distance: "20px", borderRadius: "10px", fontFamily: "Montserrat", fontSize: "15px", useGoogleFont: true, timeout: 5000, });
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
        page: data.number,
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