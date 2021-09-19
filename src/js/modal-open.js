const refs = {
  container: document.querySelector('.container-list'),
  modalContainer: document.querySelector('.lightbox'),
  closModal: document.querySelector('.close-modal'),
};

refs.container.addEventListener('click', imageContainerClick);
function imageContainerClick(event) {
  event.preventDefault();
  if (event.target.tagName !== 'IMG') {
    return;
  }
  console.log(event);
  refs.modalContainer.classList.add('is-open');
}

refs.closModal.addEventListener('click', closeModalClick);

function closeModalClick() {
  refs.modalContainer.classList.remove('is-open');
}
