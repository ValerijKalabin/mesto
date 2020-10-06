export default class Card
{
  constructor({ handlePictureShow }, place, templateID) {
    this._template = document.querySelector(templateID).content.children[0];
    this._handlePictureShow = handlePictureShow;
    this._title = place.name;
    this._image = place.link;
  }

  _getCloneTemplate() {
  	const cloneTemplate = this._template.cloneNode(true);
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
      this._handlePictureShow(this._image, this._title);
    });
  }

  _handleLikeToggle() {
    this._cardLike.classList.toggle('element__like_active');
  }

  _handleCardDelete() {
    this._card.remove();
  }
}