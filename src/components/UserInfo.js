export default class UserInfo
{
  constructor({ avatarClass, avatarAlt, buttonSelector, titleSelector, subtitleSelector }) {
    this._avatar = document.createElement('img');
    this._avatar.className = avatarClass;
    this._avatar.alt = avatarAlt;
    this._button = document.querySelector(buttonSelector);
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return {
      avatarUrl: this._avatarUrl,
      titleText: this._titleText,
      subtitleText: this._subtitleText,
      userID: this._userID
    };
  }

  rendererAvatar() {
    new Promise((resolve, reject) => {
      this._avatar.src = this._avatarUrl;
      this._avatar.onload = resolve;
      this._avatar.onerror = reject;
    })
      .then(() => {
        this._button.prepend(this._avatar);
      })
      .catch(() => {
        this._title.textContent = 'Ошибка';
        this._subtitle.textContent = 'Не удалось загрузить аватар пользователя';
      });
  }

  saveUserInfo({ avatar, name, about, _id }) {
    this._avatarUrl = avatar;
    this._titleText = name;
    this._subtitleText = about;
    this._userID = _id;
  }

  setUserInfo() {
    this._title.textContent = this._titleText;
    this._subtitle.textContent = this._subtitleText;
  }
}
