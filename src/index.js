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

function resetPopupForm(popapForm) {
  const inputList = Array.from(popapForm.querySelectorAll('.popup__input'));
  const errorList = Array.from(popapForm.querySelectorAll('.popup__error'));
  const battonElement = popapForm.querySelector('.popup__button');
  popapForm.reset();
  inputList.forEach(inputElement => {
    inputElement.className = 'popup__input';
  });
  errorList.forEach(errorElement => {
    errorElement.className = 'popup__error';
    errorElement.textContent = '';
  });
  battonElement.className = 'popup__button popup__button_disabled';
  if(!battonElement.hasAttribute('disabled')) {
    battonElement.setAttribute('disabled', true);
  }
}

function closePopup() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    if(popupElement.classList.contains('popup_opened')) {
      togglePopup(popupElement);
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
  togglePopup(popupProfile);
});
popupProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileFormName.value;
  profileDescription.textContent = popupProfileFormDescription.value;
  togglePopup(popupProfile);
  resetPopupForm(popupProfileForm);
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
  resetPopupForm(popupPlaceForm);
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

document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__icon-close')) {
    closePopup();
  }
});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    closePopup();
  }
});

initialPlaces.forEach((place) => {
  addCard(place);
});
