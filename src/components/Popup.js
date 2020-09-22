export default class Popup
{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keyup', this._handleEscClose);
    document.addEventListener('click', this._handleClickClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('click', this._handleEscClose);
    document.removeEventListener('keyup', this._handleClickClose);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    const clickElement = evt.target;
    if(clickElement.classList.contains('popup') || clickElement.classList.contains('popup__icon-close')) {
      this.close();
    }
  }
}
