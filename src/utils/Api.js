import {key} from './utils.js';
class Api {
  constructor(option) {
    this._baseURL = option.baseURL;
    this._headers = option.headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    else return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseURL+'/users/me', {
      method: 'GET',
      headers: this._headers
    })
        .then(res => this._checkResponse(res)).then(data => data)
  }
  getCardInfo() {
    return fetch(this._baseURL+'/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  setUserInfo({name, about}) {
    return fetch(this._baseURL+'/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "about": about
      })
    })
      .then(res => this._checkResponse(res));
  }

  changeAvatar(avatar) {
    return fetch(this._baseURL+`/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "avatar": avatar,
      })
    }).then(res => this._checkResponse(res));
  }

  setNewCardInfo({name, link}) {
    return fetch(this._baseURL+'/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "link": link
      })
    })
      .then(res => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(this._baseURL+`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkResponse(res));
  }

  _likedCard(cardId) {
    return fetch(this._baseURL+`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => this._checkResponse(res));
  }

  _unlikedCard(cardId) {
    return fetch(this._baseURL+`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkResponse(res));
  }


	changeLikeCardStatus(cardId, isLiked) {
    return !isLiked ? this._likedCard(cardId) : this._unlikedCard(cardId);
	}
}


// Создание Апи
export const api = new Api({
  baseURL: 'https://nomoreparties.co/v1/cohort-41',
  headers: key
});