const refs = {
    countryMenu: document.querySelector('#countryMenu'),
    dropdown: document.querySelector('.search-icon__icon-polygon-down'),
}

refs.dropdown.addEventListener('click',onMenu)

function onMenu() {
    refs.countryMenu.classList.toggle('open');
}