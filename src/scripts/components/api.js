export { downloadServerPresonInfo, downloadServerCards, editServerProfileInfo, addServerCard, deleteServerCard, addLikeServerCard, deleteLikeServerCard, editAvatar}; 

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
      authorization: '86e74466-4942-4f44-bc06-0172fb0a4280',
      'Content-Type': 'application/json'
    }
};

//обработка возвращенного запроса
function returnResponse(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

//функция загрузки информации о пользователе с сервера (меняется био) (возвращает объект {about, avatar, cohort, name, _id})
const downloadServerPresonInfo = new Promise (function (resolve) {
    fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })

    .then((res) => {
        return returnResponse(res);
    })

    .then((result) => {
        resolve(result)
    })
    
    .catch((err) => {
        console.log(err);
    })  
})

// функция загрузки карточек с сервера (возвращает объект со всеми карточками, у которых есть link, name, likes {}, owner {}, _id)
const downloadServerCards = new Promise (function (resolve) {
    
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })    

    .then((res) => {
        return returnResponse(res);
    })

    .then((result) => {
        resolve(result);
    })

    .catch((err) => {
        console.log(err);
    })  
})

//функция редактирования профиля (отправляет на сервер изменения после кнопки сохранить в editProfile)
function editServerProfileInfo(inputName, inputDescription) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: inputName,
            about: inputDescription
          })
    })

    .then((res) => {
        return returnResponse(res);
    })

    .catch((err) => {
        console.log(err);
    })  
}

//функция добавления новой карточки
function addServerCard(data) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
    })

    .then((res) => {
        return returnResponse(res);
    })

    .catch((err) => {
        console.log(err);
    })  
}

//функция удаления карточки
function deleteServerCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })

    .then((res) => {
        return returnResponse(res);
    })

    .catch((err) => {
        console.log(err);
    })  
}

//функция постановки лайка карточки
function addLikeServerCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })

    .then((res) => {
        return returnResponse(res);
    })

    .catch((err) => {
        console.log(err);
    })   
}

//функция убрать лайк карточки
function deleteLikeServerCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })

    .then((res) => {
        return returnResponse(res);
    })

    .catch((err) => {
        console.log(err);
    })  
}

//функция обновления аватара пользователя
function editAvatar(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${url}`
        })
    })

    .then((res) => {
        return returnResponse(res);
    })  
       
    .catch((err) => {
        console.log(err);
    })
}