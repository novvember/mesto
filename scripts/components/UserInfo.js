export default class UserInfo {
  /**
   * Класс отвечает за получение и изменение информации о пользователе
   *
   * Параметры:
   * nameElement - элемент с именем пользователя
   * jobElement - элемент с описанием деятельности пользователя
   */
  constructor({nameElement, jobElement}) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  setUserInfo({name, job}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
