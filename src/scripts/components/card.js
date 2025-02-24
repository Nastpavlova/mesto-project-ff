export { createCard, deleteCard, likeCard }; 

// функция создания карточки
function createCard(item, deleteCardItem, likeButton, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardTitle.textContent = item.name;

    //действия с кнопками карточки
    cardDeleteButton.addEventListener('click', function() {
        deleteCardItem(cardElement);
    });
    cardLikeButton.addEventListener('click', function() {
        likeButton(cardLikeButton);
    });

    //работа с карточками картинок
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', openImagePopup);
    cardImage.src = item.link;
    cardImage.alt = item.name;

    return cardElement;
}

// функция удаления карточки
function deleteCard(element) {
    element.remove();
}

// функция лайка карточки
function likeCard(popupLikeButton) {
    popupLikeButton.classList.toggle('card__like-button_is-active');
}