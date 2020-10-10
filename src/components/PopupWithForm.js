import Popup from './Popup.js';
export default class PopupWithForm extends Popup
{
  constructor({ resetPopupForm, handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._resetPopupForm = resetPopupForm;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__button');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  open() {
    this.setSubmitButtonText('Сохранить');
    this._resetPopupForm();
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this.setSubmitButtonText('Сохранение...');
      this._handleFormSubmit(this._getInputValues());
    })
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setSubmitButtonText(textContent) {
    this._button.textContent = textContent;
  }
}
