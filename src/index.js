import './sass/main.scss';
import './js/api-service';
import ApiService from './js/api-service';
import cardTemplate from './templates/card-image.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { locale, page, searchQuery } from './js/eventSearch';




const refs = {

  searchForm: document.querySelector('#js-input-country'),
  container: document.querySelector('.container-list'),
  btnNext: document.querySelector('.tui-page-btn tui-next'),

};

const apiService = new ApiService(locale, page, searchQuery);

apiService.fetchApi().then(res => {
  console.log(res.data);
  renderEvents(res.data._embedded.events);
  console.log(res.data._links.next)
  console.log(res.data.page)


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

function renderEvents(event) {
  refs.container.insertAdjacentHTML('beforeend', cardTemplate(event));
}



