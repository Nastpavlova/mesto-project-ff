import { deleteCard, likeCard, addNewCardPrepend } from './card.js';

export { initialPopup, openPopup, closePopup, closePopupOverlay, closePopupEsc, editProfilePopup, handleFormEditSubmit, editCardsPopup, handleFormAddSubmit }; 

//функция определения попапа
function initialPopup(event) {
    const targetElement = event.target;
    let popup = '';

    if (targetElement.classList.contains('profile__add-button')) {
        popup = document.querySelector('.popup_type_new-card');
    } else if (targetElement.classList.contains('profile__edit-button')){
        popup = document.querySelector('.popup_type_edit');
    } else {
        popup = document.querySelector('.popup_type_image');
        const popupImage = document.querySelector('.popup__image');
        const popupText = document.querySelector('.popup__caption');
        popupImage.src = event.currentTarget.src;
        popupImage.alt = event.currentTarget.alt;
        popupText.innerHTML = popupImage.alt;
    }
    return popup;
}

// функция открытия попапа
function openPopup(event) {
    const popup = initialPopup(event);
    popup.classList.add('popup_is-opened');

    //переменные инпутов
    const inputDescriptionPopup = document.querySelector('.popup__input_type_description');
    const inputTitlePopup = document.querySelector('.popup__input_type_name');

    //переменные текста с шапки страницы
    const titlePopupElement = document.querySelector('.profile__title');
    const descriptionPopupElement = document.querySelector('.profile__description');

    //функция изменения попапа профиля
    editProfilePopup(popup, inputTitlePopup, inputDescriptionPopup, titlePopupElement, descriptionPopupElement);

    //функция изменения карточек
    editCardsPopup(popup);
    
    //переменные кнопок закрытия попапа
    const buttonPopupClose = popup.querySelector('.popup__close');
    buttonPopupClose.addEventListener('click', function() {
        closePopup(popup)
    });

    //добавление слушателя оверлей
    popup.addEventListener('click', closePopupOverlay);

    //добавление слушателя Ecs
    document.addEventListener('keydown', closePopupEsc);
}

// функция закрытия попапа через крестик
function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');

    //удаление слушателя Ecs
    document.removeEventListener('keydown', closePopupEsc);

    //удаление слушателя оверлей
    popupElement.removeEventListener('click', closePopupOverlay);
}

// функция закрытия попапа через оверлей
function closePopupOverlay(event) {
    if (event.target === event.currentTarget ) {
        closePopup(event.target);
    }
}

// функция закрытия попапа через Esc
function closePopupEsc(evt) {
    const popupElForClose = document.querySelector('.popup_is-opened');

    if (evt.keyCode == '27') {
        closePopup(popupElForClose);
    }
}

//функция изменения попапа профиля
function editProfilePopup(popupEditProfileElement, inputTitle, inputDescription, textTitle, textDescription) {

    if (popupEditProfileElement.classList.contains('popup_type_edit')) {
        //присваивание значений 
        inputTitle.value = textTitle.textContent;
        inputDescription.value = textDescription.textContent;

        const formSave = document.forms['edit-profile'];

        //навешаем слушатель на форму 
        formSave.addEventListener('submit', function(evt){
            //отменим стандартную отправку формы
            evt.preventDefault();
            
            //вызовем функцию обработки формы
            handleFormEditSubmit(popupEditProfileElement, inputTitle, inputDescription, textTitle, textDescription)});
    }
}

//функция обработки формы
function handleFormEditSubmit(popup, titleInp, descriptionInp, titleText, descriptionText) {

    //изменим значения на странице
    titleText.textContent = titleInp.value;
    descriptionText.textContent = descriptionInp.value;

    //закроем окно после отправки
    closePopup(popup);
}

//функция редактирования попапа добавления карточек
function editCardsPopup(popupEditCardsElement) {
    if (popupEditCardsElement.classList.contains('popup_type_new-card')) {

        const formAdd = document.forms['new-place'];

        // навешаем слушатель на форму 
        formAdd.addEventListener('submit', function(event) {
            handleFormAddSubmit(event, popupEditCardsElement)});
    }
}

//функция обработки формы в попапе добавления карточек
function handleFormAddSubmit(ev, popup) {
    ev.preventDefault();

    const newCardObj = {};
    const inputCardNamePopup = document.querySelector('.popup__input_type_card-name');
    const inputCardUrlPopup = document.querySelector('.popup__input_type_url');

    newCardObj.name = inputCardNamePopup.value;
    newCardObj.link = inputCardUrlPopup.value;

    //вызов функции добавления новой карточки на страницу
    addNewCardPrepend(newCardObj, deleteCard, likeCard, openPopup);

    inputCardNamePopup.value = ''
    inputCardUrlPopup.value = ''

    closePopup(popup);
}