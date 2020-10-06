import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialSelectors,
  buttonOpenPopupProfile,
  buttonOpenPopupPlace,
  popupProfileForm,
  popupProfileFormName,
  popupProfileFormDescription,
  popupPlaceForm
} from '../utils/constants.js';
import './index.css';
import errAvatar from '../images/avatar-error.jpg';
import errCard from '../images/card-error.jpg';


const profileFormValidator = new FormValidator(initialSelectors, popupProfileForm);
const placeFormValidator = new FormValidator(initialSelectors, popupPlaceForm);

const api = new Api({
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-16/cards',
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-16/users/me',
  token: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
});

const userProfile = new UserInfo({
  profileSelector: '.profile',
  avatarClass: 'profile__avatar',
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__description'
});

const popupProfile = new PopupWithForm(
  {
    resetPopupForm: () => {
      profileFormValidator.resetForm(true);
    },
    handleFormSubmit: (userData) => {
      api.saveUserInfo(userData)
        .then((profile) => {
          userProfile.setUserInfo(profile.avatar, profile.name, profile.about);
        })
        .catch ((err) => {
          alert(`Ошибка записи данных пользователя ${err.status}`)
        });
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
    renderer: (item) => {
      cardsSection.addItem(getCard(item));
    }
  },
  '.elements'
);

api.getUserProfile()
  .then((profile) => {
    userProfile.setUserInfo(profile.avatar, profile.name, profile.about);
  })
  .catch((err) => {
    userProfile.setUserInfo(errAvatar, err.status, err.statusText);
  });

api.getInitialCards()
  .then((places) => {
    cardsSection.renderItems(places);
  })
  .catch((err) => {
    cardsSection.renderItems([{
      link: errCard,
      name: err.status
    }]);
  });

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfile.open();
  const userInfo = userProfile.getUserInfo();
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
