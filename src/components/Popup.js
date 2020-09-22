export default class Popup
{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keyup', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handleClickClose.bind(this));
    this._popup.classList.add('popup_opened');
  }

  _close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('click', this._handleEscClose.bind(this));
    document.removeEventListener('keyup', this._handleClickClose.bind(this));
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this._close();
    }
  }

  _handleClickClose(evt) {
    const clickElement = evt.target;
    if(clickElement.classList.contains('popup') || clickElement.classList.contains('popup__icon-close')) {
      this._close();
    }
  }
}
