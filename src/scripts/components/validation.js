export { configEnableValidation, clearValidation, enableValidation }; 

//переменные для работы с валидацией
const configEnableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

function clearValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`${configEnableValidation.inputSelector}`));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
        toggleButtonState(inputList, formElement.querySelector(`${configEnableValidation.submitButtonSelector}`));
    });
};

//функция показать ошибку
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${configEnableValidation.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${configEnableValidation.errorClass}`);
};
  
//функция спрятать ошибку
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${configEnableValidation.inputErrorClass}`);
    errorElement.classList.remove(`${configEnableValidation.errorClass}`);
    errorElement.textContent = '';
};
  
// функция проверки валидности инпута
function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    } 
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

//изменить состояние кнопки
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${configEnableValidation.inactiveButtonClass}`);
    } else {
        buttonElement.classList.remove(`${configEnableValidation.inactiveButtonClass}`);
    }
};
  
function enableValidation() {
    const formList = Array.from(document.querySelectorAll(`${configEnableValidation.formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        //получим все инпуты
        const inputList = Array.from(formElement.querySelectorAll(`${configEnableValidation.inputSelector}`));
        const buttonElement = formElement.querySelector(`${configEnableValidation.submitButtonSelector}`);
        
        //изменим состояние кнопки
        toggleButtonState(inputList, buttonElement);
    
        //проверим валидацию для каждого инпута и состояние кнопки меняется
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            });
        });
    })
};
    
//проверка на валидность всех форм
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};