export default class UserInfo
{
  constructor({ avatarClass, avatarAlt, titleSelector, subtitleSelector }) {
    this._avatar = document.createElement('img');
    this._avatar.className = avatarClass;
    this._avatar.alt = avatarAlt;
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return {
      titleText: this._titleText,
      subtitleText: this._subtitleText,
      userID: this._userID
    };
  }

  getAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
    return this._avatar;
  }

  saveUserInfo({ name, about, _id }) {
    this._titleText = name;
    this._subtitleText = about;
    this._userID = _id;
  }

  setUserInfo() {
    this._title.textContent = this._titleText;
    this._subtitle.textContent = this._subtitleText;
  }
}
