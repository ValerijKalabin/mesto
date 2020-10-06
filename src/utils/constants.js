export const initialSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const profile = document.querySelector('.profile');
export const buttonOpenPopupProfile = profile.querySelector('.profile__edit-button');
export const buttonOpenPopupPlace = profile.querySelector('.profile__add-button');

export const popupProfileForm = document.forms.profile;
export const popupProfileFormName = popupProfileForm.elements.username;
export const popupProfileFormDescription = popupProfileForm.elements.description;

export const popupPlaceForm = document.forms.place;
