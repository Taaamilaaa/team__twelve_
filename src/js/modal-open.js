const refs = {
  container: document.querySelector('.container-list'),
  modalContainer: document.querySelector('.lightbox'),
  closModal: document.querySelector('.close-modal'),
  lightbox: document.querySelector('.lightbox'),
};

refs.container.addEventListener('click', imageContainerClick);
function imageContainerClick(event) {
  if (event.target.tagName !== 'IMG' && event.target.className !== 'container-before') {
    return;
  }
  if (event.target.tagName === 'A') {
    return;
  }
  refs.modalContainer.classList.add('is-open');
}
refs.closModal.addEventListener('click', closeModalClick);

document.addEventListener('keydown', closeModalWindow);

function closeModalWindow(event) {
  if (event.key === 'Escape') {
    closeModalClick();
  }
}

refs.lightbox.addEventListener('click', closelightboxClick);

function closeModalClick() {
  refs.modalContainer.classList.remove('is-open');
}

function closelightboxClick(event) {
  console.log(event);
  if (event.target.nodeName !== 'SECTION') {
    return;
  }
  closeModalClick();
}
