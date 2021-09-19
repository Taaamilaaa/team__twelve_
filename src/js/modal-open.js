const refs = {
  container: document.querySelector('.container-list'),
  modalContainer: document.querySelector('.lightbox'),
  closModal: document.querySelector('.close-modal'),
};

refs.container.addEventListener('click', imageContainerClick);
function imageContainerClick(event) {
  // event.preventDefault();
  console.log(event);
  if (event.target.tagName !== 'IMG' && event.target.className !== 'container-items') {
    return;
  }
  if (event.target.tagName === 'A') {
    return;
  }
  refs.modalContainer.classList.add('is-open');
}
refs.closModal.addEventListener('click', closeModalClick);

function closeModalClick() {
  refs.modalContainer.classList.remove('is-open');
}
