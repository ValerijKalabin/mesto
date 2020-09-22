export default class PopupWithImage extends Popup
{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open({ isActiveButton, resetForm }) {
    resetForm(isActiveButton);
    super.open();
  }

  setEventListeners() {
    this._form = super._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    })
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
}
