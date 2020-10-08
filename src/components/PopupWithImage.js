import Popup from './Popup.js';
export default class PopupWithImage extends Popup
{
  constructor({imageSelector, titleSelector}, popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(imageSelector);
    this._popupTitle = this._popup.querySelector(titleSelector);
  }

  open(path, text) {
    this._popupImage.src = path;
    this._popupImage.alt = text;
    this._popupTitle.textContent = text;
    this._popupTitle.style.maxWidth = `${this._popupImage.clientWidth}px`;
    super.open();
  }
}
