export default class Card
{
  constructor({ handlePictureShow, handleCardDelete, handleLikePut, handleLikeDelete }, place, templateID, userID) {
    this._template = document.querySelector(templateID).content.children[0];
    this._handlePictureShow = handlePictureShow;
    this._handleCardDelete = handleCardDelete;
    this._handleLikePut = handleLikePut;
    this._handleLikeDelete = handleLikeDelete;
    this._title = place.name;
    this._image = place.link;
    this._usersID = place.likes ? place.likes.map(user => user._id) : [];
    this._likesCount = place.likes ? place.likes.length : 0;
    this._cardID = place._id ? place._id : 0;
    this._cardUserID = place.owner ? place.owner._id : 0;
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
    this._cardLike = this._card.querySelector('.element__like');
    this._cardLikesCount = this._card.querySelector('.element__like-count');
    this._cardSubstrate = this._card.querySelector('.element__substrate');
    if(this._cardUserID !== this._userID) {
      this._cardTrash.remove();
    }
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._cardLikesCount.textContent = this._likesCount;
    this._setEventListeners();
    if(this._cardIsLiked()) {
      this.handleLikeToggle()
    }
  	return this._card;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this.handleLikeToggle();
      if(this._cardIsLiked()) {
        this._handleLikeDelete(this._cardID);
        this.reduceNumberLikes();
      } else {
        this._handleLikePut(this._cardID);
        this.increaseNumberLikes();
      }
    });

    if(this._cardUserID === this._userID) {
      this._cardTrash.addEventListener('click', () => {
        this._handleCardDelete(this._cardID, this._card);
      });
    }

    this._cardSubstrate.addEventListener('click', () => {
      this._handlePictureShow(this._image, this._title);
    });
  }

  handleLikeToggle() {
    this._cardLike.classList.toggle('element__like_active');
  }

  increaseNumberLikes() {
    this._likesCount += 1;
    this._cardLikesCount.textContent = this._likesCount;
    this._usersID.push(this._userID);
  }

  reduceNumberLikes() {
    this._likesCount -= 1;
    this._cardLikesCount.textContent = this._likesCount;
    this._usersID = this._usersID.filter(id => id !== this._userID);
  }

  _cardIsLiked() {
    return this._usersID.some(id => id === this._userID);
  }
}
