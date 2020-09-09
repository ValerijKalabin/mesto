export default class Card
{
  constructor(templateID, openPopup, place) {
    this._template = templateID;
    this._openPopup = openPopup;
    this._title = place.name;
    this._image = place.link;
  }

  _getCloneTemplate() {
  	const cloneTemplate = document
      .querySelector(this._template)
      .content
      .cloneNode(true);

    return cloneTemplate;
  }

  generateCard() {
    this._card = this._getCloneTemplate();
    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._setEventListeners();
  	return this._card;
  }

  _setEventListeners() {
    this._cardLike = this._card.querySelector('.element__like');
    this._cardTrash = this._card.querySelector('.element__trash');
    this._cardSubstrate = this._card.querySelector('.element__substrate');

    this._cardLike.addEventListener('click', () => {
      this._handleLikeToggle();
    });
    this._cardTrash.addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._cardSubstrate.addEventListener('click', () => {
      this._handlePictureShow();
    });
  }

  _handleLikeToggle() {
    this._cardLike.classList.toggle('element__like_active');
  }

  _handleCardDelete() {
    this._cardTrash.parentElement.remove();
  }

  _handlePictureShow() {
    const popupPicture = document.querySelector('.popup_task_picture');
    const popupPictureImage = popupPicture.querySelector('.popup__image');
    const popupPictureTitle = popupPicture.querySelector('.popup__image-title');
    popupPictureImage.src = this._image;
    popupPictureTitle.textContent = this._title;
    popupPictureTitle.style.maxWidth = `${popupPictureImage.clientWidth}px`;
    this._openPopup(popupPicture);
  }
}
