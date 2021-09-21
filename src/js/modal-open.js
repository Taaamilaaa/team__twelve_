const refs = {
  container: document.querySelector('.container-list'),
  modalOverlay: document.querySelector('.lightbox'),
  closModal: document.querySelector('.close-modal'),
  lightbox: document.querySelector('.lightbox'),
  containerModal: document.querySelector('.modal'),
};

document.addEventListener('keydown', closeModalWindow);
refs.container.addEventListener('click', imageContainerClick);
refs.closModal.addEventListener('click', closeModalClick);
refs.lightbox.addEventListener('click', closelightboxClick);

function imageContainerClick() {
  refs.modalOverlay.classList.add('is-open');
}

function closeModalWindow(event) {
  if (event.key === 'Escape') {
    closeModalClick();
  }
}

function closeModalClick() {
  refs.modalOverlay.classList.remove('is-open');
  removeEvents()
}

function closelightboxClick(event) {
  if (event.target.nodeName !== 'SECTION') {
    return;
  }
  closeModalClick();
}

function removeEvents() {
  refs.containerModal.innerHTML = ''
};