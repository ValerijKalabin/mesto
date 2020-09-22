export default class PopupWithImage extends Popup
{
  constructor(popupSelector, {imageSelector, titleSelector}) {
    super(popupSelector);
    this._popupImage = super._popup.querySelector(imageSelector);
    this._popupTitle = super._popup.querySelector(titleSelector);
  }

  open({cardSrc, cardText}) {
    this._popupImage.src = cardSrc;
    this._popupTitle.textContent = cardText;
    this._popupTitle.style.maxWidth = `${this._popupImage.clientWidth}px`;
    super.open();
  }
}
