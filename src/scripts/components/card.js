export { createCard, submitDeleteCard }; 

// функция создания карточки
function createCard(userId, item, submitDeleteCard, deleteServerCard, addLikeServerCard, deleteLikeServerCard, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const countLike = cardElement.querySelector('.like-count'); 
   
    //количество лайков
    countLike.textContent =  item.likes.length;
    
    //проверка на личное авторство для удаления только своих карточек
    cardElement.userId = item['owner']['_id'];
    if (cardElement.userId == userId) {
        // const cardId = item['_id']
        cardDeleteButton.style.visibility = 'visible';
        cardDeleteButton.addEventListener('click', function() {
            submitDeleteCard(item['_id'], deleteServerCard, cardElement);
        });
    }

    //чтобы лайк пользователя сразу был цветным, если он есть
    item.likes.some((arrLike) => {
        if (arrLike['_id'] == userId) {
            cardLikeButton.classList.add('card__like-button_is-active');
        }
    });

    cardTitle.textContent = item.name;

    cardLikeButton.addEventListener('click', function() {
        likeCard(addLikeServerCard, deleteLikeServerCard, cardLikeButton, item['_id'], countLike);
    });

    //работа с карточками картинок
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', openImagePopup);
    cardImage.src = item.link;
    cardImage.alt = item.name;

    return cardElement;
}

//функция удаления карточки
function submitDeleteCard(id, deleteServerCard, card) {
    deleteServerCard(id)
    .then((res)=>{
        card.remove();
    })

    .catch((err) => { 
        console.log(err); 
    })
}

// функция постановки и снятия лайка карточки
function likeCard(addLikeServerCard, deleteLikeServerCard, popupLikeButton, cardId, countLike) {
    if (popupLikeButton.classList.contains('card__like-button_is-active')) {
        deleteLikeServerCard(cardId)
        .then((res)=> {
            popupLikeButton.classList.remove('card__like-button_is-active');
            countLike.textContent =  res.likes.length;
        })

        .catch((err) => { 
            console.log(err); 
        })
    } else {
        addLikeServerCard(cardId)
        .then((res)=> {
            popupLikeButton.classList.add('card__like-button_is-active');
            countLike.textContent =  res.likes.length;
        })

        .catch((err) => { 
            console.log(err); 
        })
    }
}