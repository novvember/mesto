export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._userInfoUrl = '/users/me';
    this._cardsUrl = '/cards';
  }

  getUserInfo() {
    const url =  this._baseUrl + this._userInfoUrl;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`Can't get user info from the server`);
    })
    .catch(err => console.error(err));
  }

  getInitialCards() {
    const url =  this._baseUrl + this._cardsUrl;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`Can't get initial cards from the server`);
    })
    .catch(err => console.error(err));
  }

  setUserInfo({name, job}) {
    const url =  this._baseUrl + this._userInfoUrl;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: job
      })
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`Can't send user info to the server`);
    })
    .catch(err => console.error(err));
  }

  addNewCard({name, link}) {
    const url =  this._baseUrl + this._cardsUrl;

    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`Can't send new card to the server`);
    })
    .catch(err => console.error(err));
  }

  deleteCard(cardId) {
    const url =  this._baseUrl + this._cardsUrl + '/' + cardId;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return Promise.resolve();
      throw new Error(`Can't delete card from the server`);
    })
    .catch(err => console.error(err));
  }

  _setLike(cardId) {
    const url =  this._baseUrl + this._cardsUrl + '/' + cardId + '/likes';

    return fetch(url, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`Can't send like to the server`);
    })
    .then(res => {
      return res.likes;
    })
    .catch(err => console.error(err));
  }

  _deleteLike(cardId) {
    const url =  this._baseUrl + this._cardsUrl + '/' + cardId + '/likes';

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`Can't delete like from the server`);
    })
    .then(res => {
      return res.likes;
    })
    .catch(err => console.error(err));
  }

  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLike(cardId);
    } else {
      return this._setLike(cardId);
    }
  }
}
