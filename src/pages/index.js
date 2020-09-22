import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialSelectors,
  initialPlaces,
  buttonOpenPopupProfile,
  buttonOpenPopupPlace,
  profileTitle,
  profileDescription,
  popupProfileForm,
  popupProfileFormName,
  popupProfileFormDescription,
  popupPlaceForm
} from '../utils/constants.js';

const profileFormValidator = new FormValidator(initialSelectors, popupProfileForm);
const placeFormValidator = new FormValidator(initialSelectors, popupPlaceForm);

const userProfile = new UserInfo({
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__description'
});

const popupProfile = new PopupWithForm({
  handleFormSubmit: ({username, description}) => {
    profileTitle.textContent = username;
    profileDescription.textContent = description;
  }
}, '.popup_task_profile');

const popupPlace = new PopupWithForm({
  handleFormSubmit: ({placename, link}) => {
    const card = new Card(
      '#template-element',
      {
        name: placename,
        link: link
      },
      {
        handlePictureShow: (path, text) => {
          popupPicture.open(path, text);
        }
      });
    cardSection.addItem(card.generateCard());
  }
}, '.popup_task_place');

const popupPicture = new PopupWithImage({
    imageSelector: '.popup__image',
    titleSelector: '.popup__image-title'
}, '.popup_task_picture');

const cardSection = new Section({
  items: initialPlaces,
  renderer: (place) => {
    const card = new Card(
      '#template-element',
      place,
      {
        handlePictureShow: (path, text) => {
          popupPicture.open(path, text);
        }
      });
    cardSection.addItem(card.generateCard());
  }
}, '.elements');

buttonOpenPopupProfile.addEventListener('click', () => {
  profileFormValidator.resetForm(true);
  popupProfileFormName.value = profileTitle.textContent;
  popupProfileFormDescription.value = profileDescription.textContent;
  popupProfile.open();
});

buttonOpenPopupPlace.addEventListener('click', () => {
  placeFormValidator.resetForm(false);
  popupPlace.open();
});

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
popupProfile.setEventListeners();
popupPlace.setEventListeners();

cardSection.renderItems();
