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
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-16/cards',
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-16/users/me',
  token: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
});

const userProfile = new UserInfo({
  avatarClass: 'profile__avatar',
  avatarAlt: 'Аватар',
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
          userProfile.setUserInfo();
        })
        .catch ((err) => {
          alert(`Ошибка записи данных пользователя ${err.status}`);
        })
        .finally(() => {
          popupProfile.close();
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
          avatarSection.renderItems([profile.avatar]);
        })
        .catch ((err) => {
          alert(`Ошибка записи аватара пользователя ${err.status}`)
        })
        .finally(() => {
          popupAvatar.close();
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
        })
        .catch ((err) => {
          alert(`Ошибка записи данных нового места ${err.status}`)
        })
        .finally(() => {
          popupPlace.close();
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
        })
        .catch((err) => {
          alert(`Ошибка при удалении карточки на сервере: ${err.status}`)
        })
        .finally(() => {
          popupConfirm.close();
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
          .catch(() => {
            card.handleLikeToggle();
            card.reduceNumberLikes();
          });
      },
      handleLikeDelete: (cardID) => {
        api.deleteLike(cardID)
          .catch(() => {
            card.handleLikeToggle();
            card.increaseNumberLikes();
          });
      }
    },
    item,
    '#template-element',
    userProfile.getUserInfo().userID
  );
  return card.generateCard();
};

const avatarSection = new Section(
  {
    renderer: (item) => {
      avatarSection.addItem(userProfile.getAvatar(item));
    }
  },
  '.profile__avatar-button'
);

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
    avatarSection.renderItems([profile.avatar]);
    userProfile.setUserInfo();
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
      name: err.status ? err.status : 'Error',
      about: err.statusText ? err.statusText : 'There is no Internet connection',
      _id: ''
    });
    avatarSection.renderItems([errAvatar]);
    userProfile.setUserInfo();
  });
