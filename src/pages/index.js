import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialSelectors,
  buttonOpenPopupProfile,
  buttonOpenPopupPlace,
  buttonOpenPopupAvatar,
  popupProfileForm,
  popupProfileFormName,
  popupProfileFormDescription,
  popupPlaceForm,
  popupAvatarForm
} from '../utils/constants.js';
import './index.css';
import errAvatar from '../images/avatar-error.jpg';
import errCard from '../images/card-error.jpg';


const profileFormValidator = new FormValidator(initialSelectors, popupProfileForm);
const placeFormValidator = new FormValidator(initialSelectors, popupPlaceForm);
const avatarFormValidator = new FormValidator(initialSelectors, popupAvatarForm);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7',
    'Content-Type': 'application/json'
  }
});

const userProfile = new UserInfo({
  avatarSelector: '.profile__avatar',
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__description'
});

const popupProfile = new PopupWithForm(
  {
    resetPopupForm: () => {
      profileFormValidator.resetForm(true);
    },
    handleFormSubmit: (dataUser) => {
      api.saveUserInfo(dataUser)
        .then((profile) => {
          userProfile.saveUserInfo(profile);
          userProfile.setTitle();
          popupProfile.close();
        })
        .catch ((err) => {
          alert(`Ошибка записи данных пользователя ${err.status}`);
        });
    }
  },
  '.popup_task_profile'
);

const popupAvatar = new PopupWithForm(
  {
    resetPopupForm: () => {
      avatarFormValidator.resetForm(false);
    },
    handleFormSubmit: (dataAvatar) => {
      api.saveUserAvatar(dataAvatar)
        .then((profile) => {
          userProfile.saveUserInfo(profile);
          userProfile.setAvatar();
          popupAvatar.close();
        })
        .catch ((err) => {
          alert(`Ошибка записи аватара пользователя ${err.status}`)
        });
    }
  },
  '.popup_task_avatar'
);

const popupPlace = new PopupWithForm(
  {
    resetPopupForm: () => {
      placeFormValidator.resetForm(false);
    },
    handleFormSubmit: (dataCard) => {
      api.saveNewCard(dataCard)
        .then((place) => {
          cardsSection.renderItems([place]);
          popupPlace.close();
        })
        .catch ((err) => {
          alert(`Ошибка записи данных нового места ${err.status}`)
        });
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

const popupConfirm = new PopupWithConfirmation(
  {
    handleButtonConfirm: (cardID, card) => {
     api.deleteCard(cardID)
        .then(() => {
          card.remove();
          popupConfirm.close();
        })
        .catch((err) => {
          alert(`Ошибка при удалении карточки на сервере: ${err.status}`)
        });
    }
  },
  '.popup_task_confirm'
)

const getCard = (item) => {
  const card = new Card(
    {
      handlePictureShow: (path, text) => {
        popupPicture.open(path, text);
      },
      handleCardDelete: (cardID, card) => {
        popupConfirm.open(cardID, card);
      },
      handleLikePut: (cardID) => {
        api.putLike(cardID)
          .then((res) => {
            card.handleLikeToggle();
            card.setLike(res.likes);
          })
          .catch(() => {
            alert('Не удалось поставить лайк. Попробуйте ещё раз.');
          });
      },
      handleLikeDelete: (cardID) => {
        api.deleteLike(cardID)
          .then((res) => {
            card.handleLikeToggle();
            card.setLike(res.likes);
          })
          .catch(() => {
            alert('Не удалось убрать лайк. Попробуйте ещё раз.');
          });
      }
    },
    item,
    '#template-element',
    userProfile.getUserInfo().userID
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

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfile.open();
  const userInfo = userProfile.getUserInfo();
  popupProfileFormName.value = userInfo.titleText;
  popupProfileFormDescription.value = userInfo.subtitleText;
});

buttonOpenPopupPlace.addEventListener('click', () => {
  popupPlace.open();
});

buttonOpenPopupAvatar.addEventListener('click', () => {
  popupAvatar.open();
})

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();

api.getUserProfile()
  .then((profile) => {
    userProfile.saveUserInfo(profile);
    userProfile.setAvatar();
    userProfile.setTitle();
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
  })
  .catch((err) => {
    userProfile.saveUserInfo({
      avatar: errAvatar,
      name: err.status ? err.status : 'Error',
      about: err.statusText ? err.statusText : 'There is no Internet connection',
      _id: ''
    });
    userProfile.setAvatar();
    userProfile.setTitle();
  });
