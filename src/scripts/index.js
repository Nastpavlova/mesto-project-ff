import '../styles/index.css';

import { initialCards } from './cards.js';
import { displayCards, deleteCard, likeCard } from './components/card.js';
import { openPopup } from './components/modal.js';


//переменные кнопок открытия попапа
const buttonProfileEdit = document.querySelector('.profile__edit-button');
buttonProfileEdit.addEventListener('click', openPopup);
const buttonAddCard = document.querySelector('.profile__add-button');
buttonAddCard.addEventListener('click', openPopup);



//вызываем функцию
displayCards(initialCards, deleteCard, likeCard, openPopup);



