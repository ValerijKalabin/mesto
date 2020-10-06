export default class UserInfo
{
  constructor({profileSelector, avatarClass, titleSelector, subtitleSelector}) {
    this._profile = document.querySelector(profileSelector);
    this._avatar = document.createElement('img');
    this._avatar.className = avatarClass;
    this._title = this._profile.querySelector(titleSelector);
    this._subtitle = this._profile.querySelector(subtitleSelector);
  }

  getUserInfo() {
    const userInfo = {
      avatarPath: this._avatar.src,
      titleText: this._title.textContent,
      subtitleText: this._subtitle.textContent,
      userID: this._userID
    };
    return userInfo;
  }

  setUserInfo(avatarUrl, titleText, subtitleText, userID = '') {
    this._loadImage(avatarUrl)
      .then(() => {
        this._profile.prepend(this._avatar);
        this._title.textContent = titleText;
        this._subtitle.textContent = subtitleText;
        this._userID = userID;
      })
      .catch(() => {
        this._title.textContent = 'Ошибка';
        this._subtitle.textContent = 'Не удалось загрузить аватар пользователя';
      });
  }

  _loadImage(imageUrl) {
    return new Promise((resolve, reject) => {
      this._avatar.src = imageUrl;
      this._avatar.onload = resolve;
      this._avatar.onerror = reject;
    });
  }
}
