import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
import Pagination from 'tui-pagination';

const apiService = new ApiService();

const refs = {
    country: document.querySelector('.dropdown'),
    container: document.querySelector('.container-list'),
};
startRender()

function startRender() {
    try {
        apiService.fetchApiStart().then(res => {
            if (typeof (res.data._embedded.events) === 'object') {

                removeEvents();
                render(res.data._embedded.events);
                let data = res.data.page
                if (data.totalElements >= 20) {
                    paginations(data);
                } else paginations();
            }

        });
    } catch (error) {
    }

};
function render(event) {
    refs.container.insertAdjacentHTML('beforeend', cardTemplate(event));
}
function removeEvents() {
    refs.container.innerHTML = ''
}
function paginations(data) {
    const options = {
        totalItems: data.totalElements,
        itemsPerPage: data.size,
        visiblePages: 5,
        page: (data.number || 1),
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
        startRender();
    });
}