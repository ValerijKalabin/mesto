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
      avatarUrl: this._avatarUrl,
      titleText: this._titleText,
      subtitleText: this._subtitleText,
      userID: this._userID
    };
  }

  getAvatar() {
    this._avatar.src = this._avatarUrl;
    return this._avatar;
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
