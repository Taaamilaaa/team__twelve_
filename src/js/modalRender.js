import cardModal from '../templates/card-modal.hbs';
import ApiService from './api-service';
const apiService = new ApiService();
const onWindowClick = document.querySelector('.container-list');

const refs = {
    containerModal: document.querySelector('.modal'),
    modalOverlay: document.querySelector('.lightbox'),
    //     closModal: document.querySelector('.close-modal'),
    //     lightbox: document.querySelector('.lightbox'),
};

onWindowClick.addEventListener('click', onRenderCard);

function onRenderCard(event) {
    // console.log(refs.container);
    apiService.id = event.target.parentNode.id || event.target.parentNode.parentNode.id;
    // apiService.id =  'K8vZ917Gbf0';
    apiServisesRenderId();
}


async function apiServisesRenderId() {
    try {
        await apiService.fetchApiId().then(res => {
            // console.log(res.data);

            if (typeof (res.data) === 'object') {
                console.log(res.data);
                // let data = res.data.page
                // removeEvents();
                renderEvents(res.data);

            }
        });
    } catch (error) {
        // console.dir(error.stack);
    }
};


function renderEvents(event) {
    refs.containerModal.insertAdjacentHTML('beforeend', cardModal(event))
};
// fetchApiId()