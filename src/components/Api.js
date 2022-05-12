export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._userInfoUrl = '/users/me';
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
    .then(res => {
      return res;
    })
    .catch(err => console.error(err));
  }
}
