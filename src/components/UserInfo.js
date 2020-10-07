export default class UserInfo
{
  constructor({ avatarContainerSelector, avatarClass, titleSelector, subtitleSelector }) {
    this._avatarContainer = document.querySelector(avatarContainerSelector);
    this._avatar = document.createElement('img');
    this._avatar.className = avatarClass;
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
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
        this._avatarContainer.prepend(this._avatar);
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
