let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let buttonClose = popup.querySelector('.popup__icon-close');
let popupForm = popup.querySelector('.popap__form')

function togglePopap() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  let inputName = popupForm.querySelector('#username');
  let inputDescription = popupForm.querySelector('#description');

  let profileTitle = profile.querySelector('.profile__title');
  let profileDescription = profile.querySelector('.profile__description');

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  togglePopap();
}

buttonEdit.addEventListener('click', togglePopap);
buttonClose.addEventListener('click', togglePopap);
popupForm.addEventListener('submit', formSubmitHandler);
