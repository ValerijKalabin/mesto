import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup
{
  constructor({ handleButtonConfirm }, popupSelector) {
    super(popupSelector);
    this._handleButtonConfirm = handleButtonConfirm;
  }

  setEventListeners() {
    this._button = this._popup.querySelector('.popup__button');
    this._button.addEventListener('click', () => {
      this._handleButtonConfirm(this._cardID, this._card);
      super._close();
    })
  }

  open(cardID, card) {
    this._cardID = cardID;
    this._card = card;
    super.open();
  }
}
