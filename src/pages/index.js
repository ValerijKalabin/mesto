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
  popupProfileForm,
  popupProfileFormName,
  popupProfileFormDescription,
  popupPlaceForm
} from '../utils/constants.js';
import './index.css';


const profileFormValidator = new FormValidator(initialSelectors, popupProfileForm);
const placeFormValidator = new FormValidator(initialSelectors, popupPlaceForm);

const userProfile = new UserInfo({
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__description'
});

const popupProfile = new PopupWithForm(
  {
    resetPopupForm: () => {
      profileFormValidator.resetForm(true);
    },
    handleFormSubmit: ({ username, description }) => {
      userProfile.setUserInfo(username, description);
    }
  },
  '.popup_task_profile'
);

const popupPlace = new PopupWithForm(
  {
    resetPopupForm: () => {
      placeFormValidator.resetForm(false);
    },
    handleFormSubmit: (item) => {
      cardsSection.addItem(getCard(item));
    }
  },
  '.popup_task_place'
);

const popupPicture = new PopupWithImage(
  {
    imageSelector: '.popup__image',
    titleSelector: '.popup__image-title'
  },
  '.popup_task_picture'
);

const getCard = (item) => {
  const card = new Card(
    {
      handlePictureShow: (path, text) => {
        popupPicture.open(path, text);
      }
    },
    item,
    '#template-element'
  );
  return card.generateCard();
};

const cardsSection = new Section(
  {
    items: initialPlaces,
    renderer: (item) => {
      cardsSection.addItem(getCard(item));
    }
  },
  '.elements'
);

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfile.open();
  const userInfo = userProfile.getUserInfo()
  popupProfileFormName.value = userInfo.titleText;
  popupProfileFormDescription.value = userInfo.subtitleText;
});

buttonOpenPopupPlace.addEventListener('click', () => {
  popupPlace.open();
});

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
cardsSection.renderItems();
