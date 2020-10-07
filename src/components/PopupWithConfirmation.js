import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup
{
  constructor({ handleButtonConfirm }, popupSelector) {
    super(popupSelector);
    this._handleButtonConfirm = handleButtonConfirm;
  }

  open(cardID, card) {
    this._cardID = cardID;
    this._card = card;
    this._setSubmitButtonText('Да');
    super.open();
  }

  setEventListeners() {
    this._button = this._popup.querySelector('.popup__button');
    this._button.addEventListener('click', () => {
      this._setSubmitButtonText('Удаление...');
      this._handleButtonConfirm(this._cardID, this._card);
    })
  }

  _setSubmitButtonText(textContent) {
    this._button.textContent = textContent;
  }
}
