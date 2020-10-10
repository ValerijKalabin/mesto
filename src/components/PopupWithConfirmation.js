import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup
{
  constructor({ handleButtonConfirm }, popupSelector) {
    super(popupSelector);
    this._handleButtonConfirm = handleButtonConfirm;
    this._button = this._popup.querySelector('.popup__button');
  }

  open(cardID, card) {
    this._cardID = cardID;
    this._card = card;
    this.setSubmitButtonText('Да');
    super.open();
  }

  setEventListeners() {
    this._button.addEventListener('click', () => {
      this.setSubmitButtonText('Удаление...');
      this._handleButtonConfirm(this._cardID, this._card);
    })
  }

  setSubmitButtonText(textContent) {
    this._button.textContent = textContent;
  }
}
