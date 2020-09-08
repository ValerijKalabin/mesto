import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const initialPlaces = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = document.querySelector('.elements');

const profile = document.querySelector('.profile');
const buttonOpenPopupProfile = profile.querySelector('.profile__edit-button');
const buttonOpenPopupPlace = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup_task_profile');
const popupProfileForm = document.forms.profile;
const popupProfileFormName = popupProfileForm.elements.username;
const popupProfileFormDescription = popupProfileForm.elements.description;

const popupPlace = document.querySelector('.popup_task_place');
const popupPlaceForm = document.forms.place;
const popupPlaceFormName = popupPlaceForm.elements.placename;
const popupPlaceFormLink = popupPlaceForm.elements.link;

const popupFormList = [popupProfileForm, popupPlaceForm];

const popupPicture = document.querySelector('.popup_task_picture');
const popupPictureImage = popupPicture.querySelector('.popup__image');
const popupPictureTitle = popupPicture.querySelector('.popup__image-title');

const escapePopup = function(evt) {
  if(evt.key === 'Escape') {
    closePopup();
  }
}

function addCard(place) {
  const newCard = new Card('#template-element', place);
  cards.prepend(newCard.generateCard());
}

function resetPopupForm(popupForm) {
  const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
  const errorList = Array.from(popupForm.querySelectorAll('.popup__error'));
  const buttonElement = popupForm.querySelector('.popup__button');
  popupForm.reset();
  inputList.forEach(inputElement => {
    inputElement.className = 'popup__input';
  });
  errorList.forEach(errorElement => {
    errorElement.className = 'popup__error';
    errorElement.textContent = '';
  });
  buttonElement.className = 'popup__button popup__button_disabled';
  if(!buttonElement.hasAttribute('disabled')) {
    buttonElement.setAttribute('disabled', true);
  }
}

function openPopup(popupElement) {
  document.addEventListener('keyup', escapePopup);
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    if(popupElement.classList.contains('popup_opened')) {
      popupElement.classList.remove('popup_opened');
      document.removeEventListener('keyup', escapePopup);
      if(popupElement.classList.contains('popup_task_profile') || popupElement.classList.contains('popup_task_place')) {
        const formElement = popupElement.querySelector('.popup__form');
        resetPopupForm(formElement);
      }
    }
  });
}

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfileFormName.value = profileTitle.textContent;
  popupProfileFormDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
});
popupProfileForm.addEventListener('submit', (evt) => {
  profileTitle.textContent = popupProfileFormName.value;
  profileDescription.textContent = popupProfileFormDescription.value;
  closePopup();
});

buttonOpenPopupPlace.addEventListener('click', () => {
  openPopup(popupPlace);
});
popupPlaceForm.addEventListener('submit', (evt) => {
  const newPlace = {
    name: popupPlaceFormName.value,
    link: popupPlaceFormLink.value
  };
  addCard(newPlace);
  closePopup();
});

document.addEventListener('click', (evt) => {
  const clickElement = evt.target;
  if(clickElement.classList.contains('popup') || clickElement.classList.contains('popup__icon-close')) {
    closePopup();
  }
});

popupFormList.forEach((popupForm) => {
  const newFormValidator = new FormValidator(initialSelectors, popupForm);
  newFormValidator.enableValidation();
});

initialPlaces.forEach((place) => {
  addCard(place);
});

export {popupPictureImage, popupPictureTitle, openPopup, popupPicture};
