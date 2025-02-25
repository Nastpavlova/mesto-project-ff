import '../styles/index.css';
import { initialCards} from './cards.js';
import { deleteCard, likeCard, createCard } from './components/card.js';
import { closePopup, openPopup } from './components/modal.js';

//переменные элементов страницы
const placeList = document.querySelector('.places__list');
const titlePageElement = document.querySelector('.profile__title');
const descriptionPageElement = document.querySelector('.profile__description');

//переменные форм
const formAddCard = document.forms['new-place'];
const formEditProfile = document.forms['edit-profile'];

//переменные попапов
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddCardInputName = document.querySelector('.popup__input_type_card-name');
const popupAddCardInputUrl = document.querySelector('.popup__input_type_url');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditInputDescription = document.querySelector('.popup__input_type_description');
const popupProfileEditInputTitle = document.querySelector('.popup__input_type_name');
const popupPicture = document.querySelector('.popup_type_image');
const popupPictureImage = document.querySelector('.popup__image');
const popupPictureText = document.querySelector('.popup__caption');

//переменные кнопок
const buttonCLosePopupAddCard = popupAddCard.querySelector('.popup__close');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonCLosePopupPicture = popupPicture.querySelector('.popup__close');
const buttonCLoseProfileEdit = popupProfileEdit.querySelector('.popup__close');

//функция обработки отправки формы изменения профиля
function submitEditProfile(event) {
    event.preventDefault();

    //изменим значения на странице
    titlePageElement.textContent = popupProfileEditInputTitle.value;
    descriptionPageElement.textContent = popupProfileEditInputDescription.value;
    closePopup(popupProfileEdit);
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

//функция открытия попапа изменения профиля
function openProfileEditPopup(popup, inputTitlePopup, inputDescriptionPopup, titlePopupElement, descriptionPopupElement) {
    inputTitlePopup.value = titlePopupElement.textContent;
    inputDescriptionPopup.value = descriptionPopupElement.textContent;
    openPopup(popup);
}

//вызов создания начальных карточек
initialCards.forEach(crd => {
    const card = createCard(crd, deleteCard, likeCard, initialImagePopup);
    placeList.append(card);
});

//слушатели форм
formAddCard.addEventListener('submit', submitAddCard);
formEditProfile.addEventListener('submit', submitEditProfile);

//слушатели кнопок
buttonCLosePopupAddCard.addEventListener('click', function() {
    closePopup(popupAddCard)
});
buttonProfileEdit.addEventListener('click', function() {
    openProfileEditPopup(popupProfileEdit, popupProfileEditInputTitle, popupProfileEditInputDescription, titlePageElement, descriptionPageElement)
});
buttonCLosePopupPicture.addEventListener('click', function() {
    closePopup(popupPicture)
});
buttonAddCard.addEventListener('click', function() {
    openPopup(popupAddCard)
});
buttonCLoseProfileEdit.addEventListener('click', function() {
    closePopup(popupProfileEdit)
});