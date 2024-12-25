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
        deleteCard(cardElement);
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
