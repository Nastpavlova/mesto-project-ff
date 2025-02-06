// @todo: Темплейт карточки
const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(item, deleteCardItem) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    cardDeleteButton.addEventListener('click', function() {
        deleteCardItem(cardElement);
    });
    return cardElement;
}

// @todo: Вывести карточки на страницу
function displayCards(initialCardsFull, deleteCard) {
    for (const item of initialCardsFull) {
        const newCardElement = createCard(item, deleteCard);
        placeList.append(newCardElement);
    }
}


// @todo: Функция удаления карточки
function deleteCard(element) {
    element.remove();
}

//вызываем функцию
displayCards(initialCards, deleteCard);









//переменные кнопок открытия попапа
const buttonProfileEdit = document.querySelector('.profile__edit-button');
buttonProfileEdit.addEventListener('click', openPopup);

const buttonAddCard = document.querySelector('.profile__add-button');
buttonAddCard.addEventListener('click', openPopup);

const buttonOpenImage = document.querySelectorAll('.card__image');
buttonOpenImage.forEach(btn => {
    btn.addEventListener('click', openPopup);
});


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
    }
    
    return popup;
}

// функция открытия попапа
function openPopup(event) {
    const popup = initialPopup(event);
    popup.classList.add('popup_is-opened');

    //функция изменения попапа профиля
    editProfilePopup(popup);

    //функция изменения карточек
    editCardsPopup(popup);
    
    //переменные кнопок закрытия попапа
    const buttonPopupClose = popup.querySelector('.popup__close');
    buttonPopupClose.addEventListener('click', function() {
        closePopup(popup)});

    //добавление слушателя оверлей
    popup.addEventListener('click', closePopupOverlay);

    //добавление слушателя Ecs
    document.addEventListener('keydown', closePopupEsc);
}

//функция закрытия попапа через крестик
function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');

    //удаление слушателя Ecs
    document.removeEventListener('keydown', closePopupEsc);

    //удаление слушателя оверлей
    popupElement.removeEventListener('click', closePopupOverlay);
}

//функция закрытия попапа через оверлей
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


//переменные текста со страницы
const titlePopupElement = document.querySelector('.profile__title');
const descriptionPopupElement = document.querySelector('.profile__description');

//переменные инпута
const inputTitlePopup = document.querySelector('.popup__input_type_name');
const inputDescriptionPopup = document.querySelector('.popup__input_type_description');


//функция изменения попапа профиля
function editProfilePopup(popupEditProfileElement) {

    if (popupEditProfileElement.classList.contains('popup_type_edit')) {
        //присваивание значений 
        inputTitlePopup.value = titlePopupElement.textContent;
        inputDescriptionPopup.value = descriptionPopupElement.textContent;

        const formSave = document.forms['edit-profile'];

        //навешаем слушатель на форму 
        formSave.addEventListener('submit', function(evt){
            //отменим стандартную отправку формы
            evt.preventDefault();
            
            //вызовем функцию обработки формы
            handleFormEditSubmit(popupEditProfileElement)});
    }
}

//функция обработки формы
function handleFormEditSubmit(popup) {

    //изменим значения на странице
    titlePopupElement.textContent = inputTitlePopup.value;
    descriptionPopupElement.textContent = inputDescriptionPopup.value;

    //закроем окно после отправки
    closePopup(popup);
}


// А диалоговое окно после добавления автоматически закрывалось и очищалась форма.



//переменные инпута
const inputCardNamePopup = document.querySelector('.popup__input_type_card-name');
const inputCardUrlPopup = document.querySelector('.popup__input_type_url');

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

    newCardObj.name = inputCardNamePopup.value;
    newCardObj.link = inputCardUrlPopup.value;

    //вызов функции добавления новой карточки на страницу
    addNewCardPrepend(newCardObj, deleteCard);

    inputCardNamePopup.value = ''
    inputCardUrlPopup.value = ''

    closePopup(popup);
}

// функция добавления новой карточки на страницу
function addNewCardPrepend(arr, deleteCardFunc) {
    if (arr.name != '') {
        placeList.prepend(createCard(arr, deleteCardFunc));
    }
}