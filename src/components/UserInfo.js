export default class UserInfo {
  /**
   * Класс отвечает за получение и изменение информации о пользователе
   *
   * Параметры:
   * nameElement - элемент с именем пользователя
   * jobElement - элемент с описанием деятельности пользователя
   */
  constructor({nameElement, jobElement, avatarElement}) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() { // убрать
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  setUserInfo({name, job}) { // убрать
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  fill({name, about, avatar, cohort, _id}) {
    this._name = name;
    this._job = about;
    this._avatar = avatar;
    this._cohort = cohort;
    this.id = _id;
  }

  renderName() {
    this._nameElement.textContent = this._name;
  }

  renderJob() {
    this._jobElement.textContent = this._job;
  }

  renderAvatar() {
    this._avatarElement.src = this._avatar;
  }


}
