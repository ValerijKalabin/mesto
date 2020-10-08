export default class Api
{
  constructor({ cardsUrl, userUrl, token }) {
    this._cardsUrl = cardsUrl;
    this._userUrl = userUrl;
    this._token = token;
  }

  getUserProfile() {
    return fetch(this._userUrl, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponseData);
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
      .then(this._getResponseData);
  }

  saveUserAvatar(dataAvatar) {
    return fetch(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataAvatar)
    })
      .then(this._getResponseData);
  }

  saveNewCard(dataCard) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataCard)
    })
      .then(this._getResponseData);
  }

  deleteCard(cardID) {
    return fetch(`${this._cardsUrl}/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponseData);
  }

  putLike(cardID) {
    return fetch(`${this._cardsUrl}/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponseData);
  }

  deleteLike(cardID) {
    return fetch(`${this._cardsUrl}/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}
