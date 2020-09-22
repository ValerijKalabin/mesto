import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
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

const popupProfile = new PopupWithForm({
  handleFormSubmit: ({username, description}) => {
    return username + ' ' + description;
  }
}, '.popup_task_profile');

const popupPlace = new PopupWithForm({
  handleFormSubmit: ({placename, link}) => {
    return placename + ' ' + link;
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

/*popupProfileForm.addEventListener('submit', (evt) => {
  profileTitle.textContent = popupProfileFormName.value;
  profileDescription.textContent = popupProfileFormDescription.value;
  closePopup();
});

popupPlaceForm.addEventListener('submit', (evt) => {
  const newPlace = {
    name: popupPlaceFormName.value,
    link: popupPlaceFormLink.value
  };
  addCard(newPlace);
  closePopup();
});*/

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

cardSection.renderItems();
