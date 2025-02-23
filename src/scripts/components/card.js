export { createCard, displayCards, deleteCard, likeCard, addNewCardPrepend }; 

const placeList = document.querySelector('.places__list');

// функция создания карточки
function createCard(item, deleteCardItem, likeButton, openPopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardTitle.textContent = item.name;

    //действия с нипками карточки
    cardDeleteButton.addEventListener('click', function() {
        deleteCardItem(cardElement);
    });
    cardLikeButton.addEventListener('click', function() {
        likeButton(cardLikeButton);
    });

    //работа с карточками картинок
    const cardImage = cardElement.querySelectorAll('.card__image');
    cardImage.forEach(crd => {
        crd.addEventListener('click', openPopup);
        crd.src = item.link;
        crd.alt = item.name;
    })        

    return cardElement;
}

// функция выведения карточек на страницу
function displayCards(initialCardsFull, deleteCard, likeButton, openPopup) {
    for (const item of initialCardsFull) {
        const newCardElement = createCard(item, deleteCard, likeButton, openPopup);
        placeList.append(newCardElement);
    }
}

// функция удаления карточки
function deleteCard(element) {
    element.remove();
}

// функция лайка карточки
function likeCard(popupLikeButton) {
    popupLikeButton.classList.toggle('card__like-button_is-active');
}

// функция добавления новой карточки на страницу
function addNewCardPrepend(arr, deleteCardFunc, likeCardFunc, initialPopup) {
    if (arr.name != '') {
        placeList.prepend(createCard(arr, deleteCardFunc, likeCardFunc, initialPopup));
    }
}