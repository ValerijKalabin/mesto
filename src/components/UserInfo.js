export default class UserInfo
{
  constructor({ avatarSelector, titleSelector, subtitleSelector }) {
    this._avatar = document.querySelector(avatarSelector);
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

  saveUserInfo({ avatar, name, about, _id }) {
    this._avatarUrl = avatar;
    this._titleText = name;
    this._subtitleText = about;
    this._userID = _id;
  }

  setAvatar() {
    this._avatar.src = this._avatarUrl;
  }

  setTitle() {
    this._title.textContent = this._titleText;
    this._subtitle.textContent = this._subtitleText;
  }
}
