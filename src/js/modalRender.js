import cardModal from '../templates/card-modal.hbs';
import ApiService from './api-service';
import cardTemplate from '../templates/card-image.hbs';
import closeModalClick from './modal-open'

const apiService = new ApiService();


const refs = {
    containerModal: document.querySelector('.modal'),
    modalOverlay: document.querySelector('.lightbox'),
    container: document.querySelector('.container-list'),
    onWindowClick: document.querySelector('.container-list')
};

refs.onWindowClick.addEventListener('click', onRenderCard);
let NAME = '';
function onRenderCard(event) {

    apiService.id = event.target.parentNode.id || event.target.parentNode.parentNode.id;
    apiServisesRenderId();
}


async function apiServisesRenderId() {
    try {
        await apiService.fetchApiId().then(res => {
            NAME = res.data.name
            if (typeof (res.data) === 'object') {
                renderEvents(res.data);
            }
        });
    } catch (error) {
    }
};


function renderEvents(event) {
    refs.containerModal.insertAdjacentHTML('beforeend', cardModal(event))
    moreAuthorBtn = document.querySelector('.button-form__inform')
        .addEventListener('click', moreAuthorSearch)
};

function moreAuthorSearch() {
    apiService.query = NAME;

    apiService.fetchApi().then(res => {
        removeEvents()
        renderMoreEvents(res.data._embedded.events);
        closeModalClick()
    });

}

function renderMoreEvents(event) {
    refs.container.insertAdjacentHTML('beforeend', cardTemplate(event))
};
function removeEvents() {
    refs.container.innerHTML = ''
};