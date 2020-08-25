const initialSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};

function setEventListeners(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

function toggleButtonState(inputList, buttonElement, selectors) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

function hasInvalidInput (inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

function checkInputValidity(inputElement, selectors) {
  const errorElement = inputElement.nextElementSibling;
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(inputElement, errorElement, selectors);
  }
};

function showInputError(inputElement, errorElement, errorMessage, selectors) {
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

function hideInputError(inputElement, errorElement, selectors) {
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

enableValidation(initialSelectors);
