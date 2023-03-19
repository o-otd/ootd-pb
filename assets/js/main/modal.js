import closest from "../util/closest.js";

const card = document.querySelector('.card');
const modalCloseElem = document.querySelector('.modal');

export const modalOpen = ({ target }) => closest(target, 'card-item') && document.body.classList.add('card-modal');
export const modalClose = ({ target }) => closest(target, 'modal-close') && document.body.classList.remove('card-modal');

card.addEventListener('click', modalOpen);
modalCloseElem.addEventListener('click', modalClose);