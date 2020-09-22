export default class UserInfo
{
  constructor({titleSelector, subtitleSelector}) {
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    const userInfo = {
      titleText: this._title.textContent,
      subtitleText: this._subtitle.textContent
    };
    return userInfo;
  }

  setUserInfo(titleText, subtitleText) {
    this._title.textContent = titleText;
    this._subtitle.textContent = subtitleText;
  }
}
