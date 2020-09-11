import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialSelectors,
  initialPlaces,
  cards,
  buttonOpenPopupProfile,
  buttonOpenPopupPlace,
  profileTitle,
  profileDescription,
  popupProfile,
  popupProfileForm,
  popupProfileFormName,
  popupProfileFormDescription,
  popupPlace,
  popupPlaceForm,
  popupPlaceFormName,
  popupPlaceFormLink
} from './constants.js';

const profileFormValidator = new FormValidator(initialSelectors, popupProfileForm);
const placeFormValidator = new FormValidator(initialSelectors, popupPlaceForm);

const escapeClosePopup = function(evt) {
  if(evt.key === 'Escape') {
    closePopup();
  }
}

const clickClosePopup = function(evt) {
  const clickElement = evt.target;
  if(clickElement.classList.contains('popup') || clickElement.classList.contains('popup__icon-close')) {
    closePopup();
  }
}

const openPopup = function(popupElement) {
  document.addEventListener('keyup', escapeClosePopup);
  document.addEventListener('click', clickClosePopup);
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  const popupElement = document.querySelector('.popup_opened');
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('click', clickClosePopup);
  document.removeEventListener('keyup', escapeClosePopup);
}

function addCard(place) {
  const newCard = new Card('#template-element', openPopup, place);
  cards.prepend(newCard.generateCard());
}

buttonOpenPopupProfile.addEventListener('click', () => {
  profileFormValidator.resetForm();
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
  placeFormValidator.resetForm();
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

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

initialPlaces.forEach((place) => {
  addCard(place);
});
