export const initialSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const initialPlaces = [
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

export const cards = document.querySelector('.elements');

export const profile = document.querySelector('.profile');
export const buttonOpenPopupProfile = profile.querySelector('.profile__edit-button');
export const buttonOpenPopupPlace = profile.querySelector('.profile__add-button');
export const profileTitle = profile.querySelector('.profile__title');
export const profileDescription = profile.querySelector('.profile__description');

export const popupProfile = document.querySelector('.popup_task_profile');
export const popupProfileForm = document.forms.profile;
export const popupProfileFormName = popupProfileForm.elements.username;
export const popupProfileFormDescription = popupProfileForm.elements.description;

export const popupPlace = document.querySelector('.popup_task_place');
export const popupPlaceForm = document.forms.place;
export const popupPlaceFormName = popupPlaceForm.elements.placename;
export const popupPlaceFormLink = popupPlaceForm.elements.link;

export const popupPicture = document.querySelector('.popup_task_picture');
export const popupPictureImage = popupPicture.querySelector('.popup__image');
export const popupPictureTitle = popupPicture.querySelector('.popup__image-title');
