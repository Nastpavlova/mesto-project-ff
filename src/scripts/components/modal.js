export { closePopup, openProfileEditPopup, openPopup, closePopupOverlay, closePopupEsc}; 

//функция открытия попапа изменения профиля
function openProfileEditPopup(popup, inputTitlePopup, inputDescriptionPopup, titlePopupElement, descriptionPopupElement) {
    inputTitlePopup.value = titlePopupElement.textContent;
    inputDescriptionPopup.value = descriptionPopupElement.textContent;
    openPopup(popup);
}

// функция открытия попапа
function openPopup(popup) {

    popup.classList.add('popup_is-opened');

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
    if (evt.keyCode == '27') {
        const popupElForClose = document.querySelector('.popup_is-opened');
        closePopup(popupElForClose);
    }
}