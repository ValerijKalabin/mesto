export default class Card
{
  constructor(templateID, place) {
    this._template = templateID;
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
    //this._setEventListeners();

  	return this._card;
  }
}
