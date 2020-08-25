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
const templateCard = document.querySelector('#template-element').content;

const profile = document.querySelector('.profile');
const buttonOpenPopupProfile = profile.querySelector('.profile__edit-button');
const buttonOpenPopupPlace = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup_task_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileFormName = popupProfileForm.querySelector('[name="username"]');
const popupProfileFormDescription = popupProfileForm.querySelector('[name="description"]');

const popupPlace = document.querySelector('.popup_task_place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupPlaceFormName = popupPlaceForm.querySelector('[name="placename"]');
const popupPlaceFormLink = popupPlaceForm.querySelector('[name="link"]');

const popupPicture = document.querySelector('.popup_task_picture');
const popupPictureImage = popupPicture.querySelector('.popup__image');
const popupPictureTitle = popupPicture.querySelector('.popup__image-title');

function getCloneCard (place) {
  const cloneCard = templateCard.cloneNode(true);
  const cloneCardImage = cloneCard.querySelector('.element__image');
  const cloneCardTitle = cloneCard.querySelector('.element__title');
  cloneCardImage.src = place.link;
  cloneCardImage.alt = place.name;
  cloneCardTitle.textContent = place.name;
  return cloneCard;
}

function addCard(place) {
  cards.prepend(getCloneCard(place));
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfileFormName.value = profileTitle.textContent;
  popupProfileFormDescription.value = profileDescription.textContent;
  togglePopup(popupProfile);
});
popupProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileFormName.value;
  profileDescription.textContent = popupProfileFormDescription.value;
  togglePopup(popupProfile);
});
popupProfile.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup_task_profile') || evt.target.classList.contains('popup__icon-close')) {
    togglePopup(popupProfile);
  }
});

buttonOpenPopupPlace.addEventListener('click', () => {
  togglePopup(popupPlace);
});
popupPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newPlace = {
    name: popupPlaceFormName.value,
    link: popupPlaceFormLink.value
  };
  addCard(newPlace);
  togglePopup(popupPlace);
  popupPlaceForm.reset();
});
popupPlace.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup_task_place') || evt.target.classList.contains('popup__icon-close')) {
    togglePopup(popupPlace);
  }
});

popupPicture.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup_task_picture') || evt.target.classList.contains('popup__icon-close')) {
    togglePopup(popupPicture);
  }
});

cards.addEventListener('click', (evt) => {
  const clickElement = evt.target;
  if(clickElement.classList.contains('element__like')) {
    clickElement.classList.toggle('element__like_active');
  } else if(clickElement.classList.contains('element__trash')) {
    clickElement.parentElement.remove();
  } else if(clickElement.classList.contains('element__substrate')) {
    popupPictureImage.src = clickElement.previousElementSibling.src;
    popupPictureTitle.textContent = clickElement.nextElementSibling.querySelector('.element__title').textContent;
    popupPictureTitle.style.maxWidth = `${popupPictureImage.clientWidth}px`;
    togglePopup(popupPicture);
  }
});

initialPlaces.forEach((place) => {
  addCard(place);
});
