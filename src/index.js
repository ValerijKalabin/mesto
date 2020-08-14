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
const buttonClosePopupProfile = popupProfile.querySelector('.popup__icon-close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileFormName = popupProfileForm.querySelector('[name="username"]');
const popupProfileFormDescription = popupProfileForm.querySelector('[name="description"]');

const popupPlace = document.querySelector('.popup_task_place');
const buttonClosePopupPlace = popupPlace.querySelector('.popup__icon-close');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupPlaceFormName = popupPlaceForm.querySelector('[name="placename"]');
const popupPlaceFormLink = popupPlaceForm.querySelector('[name="link"]');

const popupPicture = document.querySelector('.popup_task_picture');
const buttonClosePopupPicture = popupPicture.querySelector('.popup__icon-close');

function getCloneCard (place) {
  const cloneCard = templateCard.cloneNode(true);
  const cloneCardImage = cloneCard.querySelector('.element__image');
  const cloneCardTitle = cloneCard.querySelector('.element__title');
  const cloneCardLike = cloneCard.querySelector('.element__like');
  const cloneCardTrash = cloneCard.querySelector('.element__trash');
  const cloneCardSubstrate = cloneCard.querySelector('.element__substrate');

  cloneCardImage.src = place.link;
  cloneCardImage.alt = place.name;
  cloneCardTitle.textContent = place.name;
  cloneCardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  cloneCardTrash.addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });
  cloneCardSubstrate.addEventListener('click', togglePopupPicture);
  return cloneCard;
}

function addCard(place) {
  cards.prepend(getCloneCard(place));
}

function popupIsClosed(popup) {
  if (popup.classList.contains('popup_opened')) {
    return false;
  }
  return true;
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function togglePopupPicture(evt) {
  if (popupIsClosed(popupPicture)) {
    const popupPictureImage = popupPicture.querySelector('.popup__image');
    const popupPictureTitle = popupPicture.querySelector('.popup__image-title');

    popupPictureImage.src = evt.target.previousElementSibling.src;
    popupPictureTitle.textContent = evt.target.nextElementSibling.querySelector('.element__title').textContent;
    popupPictureTitle.style.maxWidth = `${popupPictureImage.clientWidth}px`;
  }
  togglePopup(popupPicture);
}

function editProfile(evt) {
  evt.preventDefault();

  if (popupProfileFormName.value && popupProfileFormDescription.value) {
    profileTitle.textContent = popupProfileFormName.value;
    profileDescription.textContent = popupProfileFormDescription.value;
  }
  togglePopup(popupProfile);
}

function createCard(evt) {
  evt.preventDefault();

  if (popupPlaceFormName.value && popupPlaceFormLink.value) {
    const newPlace = {
      name: popupPlaceFormName.value,
      link: popupPlaceFormLink.value
    };
    addCard(newPlace);
  }
  togglePopup(popupPlace);
}

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfileFormName.value = profileTitle.textContent;
  popupProfileFormDescription.value = profileDescription.textContent;
  togglePopup(popupProfile);
});
buttonOpenPopupPlace.addEventListener('click', () => {
  togglePopup(popupPlace);
});
buttonClosePopupProfile.addEventListener('click', () => {
  togglePopup(popupProfile);
});
buttonClosePopupPlace.addEventListener('click', () => {
  togglePopup(popupPlace);
});
buttonClosePopupPicture.addEventListener('click',togglePopupPicture);
popupProfileForm.addEventListener('submit', editProfile);
popupPlaceForm.addEventListener('submit', createCard);

initialPlaces.forEach((place) => {
  addCard(place);
});
