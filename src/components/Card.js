export default class Card
{
  constructor({ handlePictureShow, handleCardDelete }, place, templateID, userID) {
    this._template = document.querySelector(templateID).content.children[0];
    this._handlePictureShow = handlePictureShow;
    this._handleCardDelete = handleCardDelete;
    this._title = place.name;
    this._image = place.link;
    this._likesCount = place.likes.length;
    this._cardUserID = place.owner._id;
    this._userID = userID;
  }

  _getCloneTemplate() {
  	const cloneTemplate = this._template.cloneNode(true);
    return cloneTemplate;
  }

  generateCard() {
    this._card = this._getCloneTemplate();
    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
    this._cardTrash = this._card.querySelector('.element__trash');
    this._cardLikesCount = this._card.querySelector('.element__like-count');
    if(this._cardUserID !== this._userID) {
      this._cardTrash.remove();
    }
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._cardLikesCount.textContent = this._likesCount;
    this._setEventListeners();
  	return this._card;
  }

  _setEventListeners() {
    this._cardLike = this._card.querySelector('.element__like');
    this._cardSubstrate = this._card.querySelector('.element__substrate');

    this._cardLike.addEventListener('click', () => {
      this._handleLikeToggle();
    });
    if(this._cardUserID === this._userID) {
      this._cardTrash.addEventListener('click', () => {
        this._handleCardDelete();
      });
    }
    this._cardSubstrate.addEventListener('click', () => {
      this._handlePictureShow(this._image, this._title);
    });
  }

  _handleLikeToggle() {
    this._cardLike.classList.toggle('element__like_active');
  }

  /*_handleCardDelete() {
    this._card.remove();
  }*/
}
