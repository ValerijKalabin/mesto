let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileDescription = profile.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let buttonClose = popup.querySelector('.popup__icon-close');
let popupForm = popup.querySelector('.popup__form')
let inputName = popupForm.querySelector('[name="username"]');
let inputDescription = popupForm.querySelector('[name="description"]');

function togglePopap() {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent;
  } else {
    popup.classList.remove('popup_opened');
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  togglePopap();
}

buttonEdit.addEventListener('click', togglePopap);
buttonClose.addEventListener('click', togglePopap);
popupForm.addEventListener('submit', formSubmitHandler);
