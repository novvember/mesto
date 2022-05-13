export default class UserInfo {
  /**
   * Отвечает за хранение, доступ и вывод информации о пользователе
   * @constructor
   *
   * @param {object} Объект с элементами страницы с информацией о пользователе:
   * - nameElement - Текстовой элемент с именем пользователя
   * - jobElement - Текстовой элемент с описанием деятельности пользователя
   * - avatarElement - Элемент img с аватаром пользователя
   */
  constructor({nameElement, jobElement, avatarElement}) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._avatarElement = avatarElement;
  }

  /**
   * Сохраняет полученную информацию о пользователе
   * @param {object} Карточка ползователя
   */
  fill({name, about, avatar, cohort, _id}) {
    this._name = name;
    this._job = about;
    this._avatar = avatar;
    this._cohort = cohort;
    this.id = _id;
  }

  /**
   * Возвращает имя и род деятельности пользователя
   * @returns {object}
   */
  getUserInfo() {
    return {
      name: this._name,
      job: this._job
    }
  }

  /**
   * Выводит имя пользователя на страницу
   */
  renderName() {
    this._nameElement.textContent = this._name;
  }

  /**
   * Выводит род дейстельности пользователя на страницу
   */
  renderJob() {
    this._jobElement.textContent = this._job;
  }

  /**
   * Выводит аватар пользователя на страницу
   */
  renderAvatar() {
    this._avatarElement.src = this._avatar;
  }
}
