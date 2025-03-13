import '../styles/index.css';
import { submitDeleteCard, createCard } from './components/card.js';
import { closePopup, openPopup } from './components/modal.js';
import { downloadServerPresonInfo, downloadServerCards, editServerProfileInfo, addServerCard, deleteServerCard, addLikeServerCard, deleteLikeServerCard, editAvatar } from './components/api.js';
import { configEnableValidation, clearValidation, enableValidation } from './components/validation.js';

//переменные элементов страницы
const placeList = document.querySelector('.places__list');
const titlePageElement = document.querySelector('.profile__title');
const descriptionPageElement = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

//переменные форм
const formAddCard = document.forms['new-place'];
const formEditProfile = document.forms['edit-profile'];
const formAvatarEdit = document.forms['edit-avatar'];

//переменные попапа добавления карт
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddCardInputName = document.querySelector('.popup__input_type_card-name');
const popupAddCardInputUrl = document.querySelector('.popup__input_type_url');

//переменные попапа изменения профиля
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditInputDescription = document.querySelector('.popup__input_type_description');
const popupProfileEditInputTitle = document.querySelector('.popup__input_type_name');

//переменные попапа картинки
const popupPicture = document.querySelector('.popup_type_image');
const popupPictureImage = document.querySelector('.popup__image');
const popupPictureText = document.querySelector('.popup__caption');

//переменные попапа изменения аватара
const popupAvatarEdit = document.querySelector('.popup_type_avatar');
const popupAvatarEditInputUrl = popupAvatarEdit.querySelector('.popup__input_type_url');

//переменные кнопок закрытия попапов
const buttonCLosePopupAddCard = popupAddCard.querySelector('.popup__close');
const buttonCLosePopupPicture = popupPicture.querySelector('.popup__close');
const buttonCLoseProfileEdit = popupProfileEdit.querySelector('.popup__close');
const buttonClosePopupAvatarEdit = popupAvatarEdit.querySelector('.popup__close');

//переменные кнопок открытия попапов
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditAvatar= document.querySelector('.edit-profile-button');

//функция улучшения UX
function renderLoading(isLoading, popup) {
    const buttonLoading = popup.querySelector('.popup__button');
    
    if (isLoading) {
        buttonLoading.textContent = 'Сохранение...';
    } else {
        buttonLoading.textContent = 'Сохранить';
    }
};

//функция обработки отправки формы изменения профиля
function submitEditProfile(event) {
    event.preventDefault();

    //функция улучшения UX
    renderLoading(true, popupProfileEdit);

    //отправка изменения профиля на сервер
    editServerProfileInfo(popupProfileEditInputTitle.value, popupProfileEditInputDescription.value)
    .then(({name, about})=>{
        //изменим значения на странице
        titlePageElement.textContent = name;
        descriptionPageElement.textContent = about;
        closePopup(popupProfileEdit);
    })
    .finally(() => {
        renderLoading(false, popupProfileEdit)
    }); 
};

//функция обработки отправки формы добавления новой карточки
function submitAddCard(event) {
    event.preventDefault();

    //функция улучшения UX
    renderLoading(true, popupAddCard);

    const newCardObj = {};
    newCardObj.name = popupAddCardInputName.value;
    newCardObj.link = popupAddCardInputUrl.value; 
    newCardObj.likes = [];

    //получим id пользователя и добавим карточку на страницу
    downloadServerPresonInfo
    .then((res)=>{
        const userId = res['_id'];

        //добавим карточку
        addServerCard(newCardObj)
        .then ((card) => {
            placeList.prepend(createCard(userId, card, submitDeleteCard, deleteServerCard, addLikeServerCard, deleteLikeServerCard, initialImagePopup));
        
            //добавление новой карточки на страницу
            formAddCard.reset();

            closePopup(popupAddCard);
        })

        .finally(()=>{
            renderLoading(false, popupAddCard);
        });
    })
};

//функция обработки формы изменения аватара профиля
function submitAvatarEdit(event) {
    event.preventDefault();

    renderLoading(true, popupAvatarEdit);

    editAvatar(popupAvatarEditInputUrl.value)
    .then ((res)=>{
        profileImage.style.backgroundImage = `url('${res.avatar}')`;
        formAvatarEdit.reset();
        closePopup(popupAvatarEdit);
    })

    .finally(()=>{
        renderLoading(false, popupAvatarEdit);
    })
};

//функция инициализации попапа с картинкой
function initialImagePopup(event) {
    popupPictureImage.src = event.currentTarget.src;
    popupPictureImage.alt = event.currentTarget.alt;
    popupPictureText.textContent = popupPictureImage.alt;
    openPopup(popupPicture);
};

//слушатели форм
formAddCard.addEventListener('submit', submitAddCard);
formEditProfile.addEventListener('submit', submitEditProfile);
formAvatarEdit.addEventListener('submit', submitAvatarEdit);

//слушатели кнопок закрытия попапа
buttonCLosePopupAddCard.addEventListener('click', function() {
    closePopup(popupAddCard);
});
buttonCLosePopupPicture.addEventListener('click', function() {
    closePopup(popupPicture);
});
buttonCLoseProfileEdit.addEventListener('click', function() {
    closePopup(popupProfileEdit);
});
buttonClosePopupAvatarEdit.addEventListener('click', function() {
    closePopup(popupAvatarEdit);
});

//слушатели кнопок открытия попапа
buttonProfileEdit.addEventListener('click', function() {
    openPopup(popupProfileEdit);
    clearValidation(popupProfileEdit.querySelector(`${configEnableValidation.formSelector}`)); 
    popupProfileEditInputTitle.value = titlePageElement.textContent;
    popupProfileEditInputDescription.value = descriptionPageElement.textContent;
    enableValidation()

});
buttonAddCard.addEventListener('click', function() {
    openPopup(popupAddCard);
    clearValidation(popupAddCard.querySelector(`${configEnableValidation.formSelector}`)); 

});
buttonEditAvatar.addEventListener('click', function() {
    openPopup(popupAvatarEdit);   
    clearValidation(popupAvatarEdit.querySelector(`${configEnableValidation.formSelector}`)); 
});

//промисы
Promise.all([downloadServerPresonInfo, downloadServerCards])
.then(([serverPersonInfo, serverCardsInfo]) => {
    titlePageElement.textContent = serverPersonInfo.name;
    descriptionPageElement.textContent = serverPersonInfo.about;
    profileImage.style.backgroundImage = `url('${serverPersonInfo.avatar}')`;
    const id = serverPersonInfo['_id'];

    serverCardsInfo.forEach(crd => {
        const card = createCard(id, crd, submitDeleteCard, deleteServerCard, addLikeServerCard, deleteLikeServerCard, initialImagePopup);
        placeList.append(card);
    });
});

enableValidation();