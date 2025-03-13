export { configEnableValidation, clearValidation, enableValidation}; 

//переменные для работы с валидацией
const configEnableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

function enableValidation({formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass}) {
    const formList = Array.from(document.querySelectorAll(`${formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        //получим все инпуты
        const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
        const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
        
        //изменим состояние кнопки
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    
        //проверим валидацию для каждого инпута и состояние кнопки меняется
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
                toggleButtonState(inputList, buttonElement, inactiveButtonClass);
            });
        });
    })
};

function clearValidation(formElement, configEnableValidation) {
    const inputList = Array.from(formElement.querySelectorAll(`${configEnableValidation.inputSelector}`));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, configEnableValidation.inputErrorClass, configEnableValidation.errorClass);
        toggleButtonState(inputList, formElement.querySelector(`${configEnableValidation.submitButtonSelector}`), configEnableValidation.inactiveButtonClass);
    });
};

//функция показать ошибку
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${errorClass}`);
};
  
//функция спрятать ошибку
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.classList.remove(`${errorClass}`);
    errorElement.textContent = '';
};
  
// функция проверки валидности инпута
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    } 
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

//изменить состояние кнопки
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${inactiveButtonClass}`);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(`${inactiveButtonClass}`);
        buttonElement.removeAttribute('disabled');
    }
};
    
//проверка на валидность всех форм
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};