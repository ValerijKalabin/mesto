import Popup from './Popup.js';
export default class PopupWithForm extends Popup
{
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      super.close();
    })
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
}
