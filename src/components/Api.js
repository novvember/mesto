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
}
