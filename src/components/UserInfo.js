export default class UserInfo {
  /**
   * Класс отвечает за получение и изменение информации о пользователе
   *
   * Параметры:
   * nameElement - текстовой элемент с именем пользователя
   * jobElement - текстовой элемент с описанием деятельности пользователя
   * avatarElement - элемент img с аватаром пользователя
   *
   */
  constructor({nameElement, jobElement, avatarElement}) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job
    }
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
