import '../styles/index.css';
import { initialCards} from './cards.js';
import { deleteCard, likeCard, createCard } from './components/card.js';
import { closePopup, openProfileEditPopup, openPopup } from './components/modal.js';

const placeList = document.querySelector('.places__list');

//переменные попапа добавления карточек
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddCardInputName = document.querySelector('.popup__input_type_card-name');
const popupAddCardInputUrl = document.querySelector('.popup__input_type_url');
const formAddCard = document.forms['new-place'];
formAddCard.addEventListener('submit', submitAddCard);
const buttonCLosePopupAddCard = popupAddCard.querySelector('.popup__close');
buttonCLosePopupAddCard.addEventListener('click', function() {
    closePopup(popupAddCard)});

//переменные попапа изменения профиля
const popuProfileEdit = document.querySelector('.popup_type_edit');
const popuProfileEditInputDescription = document.querySelector('.popup__input_type_description');
const popuProfileEditInputTitle = document.querySelector('.popup__input_type_name');
const titlePageElement = document.querySelector('.profile__title');
const descriptionPageElement = document.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile'];
formEditProfile.addEventListener('submit', submitEditProfile);
const buttonCLoseProfileEdit = popuProfileEdit.querySelector('.popup__close');
buttonCLoseProfileEdit.addEventListener('click', function() {
    closePopup(popuProfileEdit)
});

//переменные попапа картинок
const popupPicture = document.querySelector('.popup_type_image');
const popupPictureImage = document.querySelector('.popup__image');
const popupPictureText = document.querySelector('.popup__caption');
const buttonCLosePopupPicture = popupPicture.querySelector('.popup__close');
buttonCLosePopupPicture.addEventListener('click', function() {
    closePopup(popupPicture)});

//переменные кнопок открытия попапа
const buttonProfileEdit = document.querySelector('.profile__edit-button');
buttonProfileEdit.addEventListener('click', function() {
    openProfileEditPopup(popuProfileEdit, popuProfileEditInputTitle, popuProfileEditInputDescription, titlePageElement, descriptionPageElement)});
const buttonAddCard = document.querySelector('.profile__add-button');
buttonAddCard.addEventListener('click', function() {
    openPopup(popupAddCard)});

//функция обработки отправки формы изменения профиля
function submitEditProfile(event) {
    event.preventDefault();

    //изменим значения на странице
    titlePageElement.textContent = popuProfileEditInputTitle.value;
    descriptionPageElement.textContent = popuProfileEditInputDescription.value;
    closePopup(popuProfileEdit);
}

//функция обработки отправки формы добавления новой карточки
function submitAddCard(event) {
    event.preventDefault();
    const newCardObj = {};
    newCardObj.name = popupAddCardInputName.value;
    newCardObj.link = popupAddCardInputUrl.value; 
    
    //добавление новой карточки на страницу
    placeList.prepend(createCard(newCardObj, deleteCard, likeCard, initialImagePopup))
    formAddCard.reset();
    closePopup(popupAddCard);
}

//функция инициализации попапа с картинкой
function initialImagePopup(event) {
    popupPictureImage.src = event.currentTarget.src;
    popupPictureImage.alt = event.currentTarget.alt;
    popupPictureText.textContent = popupPictureImage.alt;
    openPopup(popupPicture);
}

//вызов создания начальных карточек
initialCards.forEach(crd => {
    const card = createCard(crd, deleteCard, likeCard, initialImagePopup);
    placeList.append(card);
});