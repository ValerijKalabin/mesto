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
const templateCard = cards.querySelector('#template-element').content;

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
  cloneCard.querySelector('.element__image').src = place.link;
  cloneCard.querySelector('.element__image').alt = place.name;
  cloneCard.querySelector('.element__title').textContent = place.name;
  cloneCard.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  cloneCard.querySelector('.element__trash').addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });
  cloneCard.querySelector('.element__substrate').addEventListener('click', togglePopupPicture);
  return cloneCard;
}

function togglePopupProfile() {
  if (!popupProfile.classList.contains('popup_opened')) {
    popupProfile.classList.add('popup_opened');
    popupProfileFormName.value = profileTitle.textContent;
    popupProfileFormDescription.value = profileDescription.textContent;
  } else {
    popupProfile.classList.remove('popup_opened');
  }
}

function togglePopupPlace() {
  popupPlace.classList.toggle('popup_opened');
}

function togglePopupPicture (evt) {
  if (popupPicture.classList.contains('popup_opened')) {
    popupPicture.classList.remove('popup_opened');
  } else {
    popupPicture.querySelector('.popup__image').src = evt.target.previousElementSibling.src;
    popupPicture.querySelector('.popup__image-title').textContent = evt.target.nextElementSibling.querySelector('.element__title').textContent;
    popupPicture.classList.add('popup_opened');
  }
}

function editProfile (evt) {
  evt.preventDefault();

  if (popupProfileFormName.value && popupProfileFormDescription.value) {
    profileTitle.textContent = popupProfileFormName.value;
    profileDescription.textContent = popupProfileFormDescription.value;
  }

  togglePopupProfile();
}

function createCard (evt) {
  evt.preventDefault();

  if (popupPlaceFormName.value && popupPlaceFormLink.value) {
    const newPlace = {};
    newPlace.name = popupPlaceFormName.value;
    newPlace.link = popupPlaceFormLink.value;
    cards.prepend(getCloneCard(newPlace));
  }

  togglePopupPlace();
}


initialPlaces.forEach((place) => {
  cards.append(getCloneCard(place));
});


buttonOpenPopupProfile.addEventListener('click', togglePopupProfile);
buttonOpenPopupPlace.addEventListener('click', togglePopupPlace);
buttonClosePopupProfile.addEventListener('click', togglePopupProfile);
buttonClosePopupPlace.addEventListener('click', togglePopupPlace);
buttonClosePopupPicture.addEventListener('click',togglePopupPicture);
popupProfileForm.addEventListener('submit', editProfile);
popupPlaceForm.addEventListener('submit', createCard);
