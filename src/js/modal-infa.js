import ApiService from './api-service';
import cardModal from '../templates/card-modal.hbs';
const apiService = new ApiService();
const refs = {
  containerModal: document.querySelector('.modal'),
  containerListModal: document.querySelector('.container-list'),
};
refs.containerListModal.addEventListener('click', openModalInfo);
function openModalInfo(event) {
  if (event.target.tagName !== 'IMG') {
    return;
  }
  apiService.fetchApi().then(city => {
    refs.containerModal.insertAdjacentHTML('beforeend', cardModal(city.data._embedded.events));
  });
}
