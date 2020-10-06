import Popup from './Popup.js';
export default class PopupWithForm extends Popup
{
  constructor({ resetPopupForm, handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._resetPopupForm = resetPopupForm;
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    this._resetPopupForm();
    super.open();
  }

  setEventListeners() {
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      super._close();
    })
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
}