export default class Api
{
  constructor({ cardsUrl, userUrl, token }) {
    this._cardsUrl = cardsUrl;
    this._userUrl = userUrl;
    this._token = token;
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
  }

  getUserProfile() {
    return fetch(this._userUrl, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
  }

  saveUserInfo({ username, description }) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        about: description
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
  }
}
