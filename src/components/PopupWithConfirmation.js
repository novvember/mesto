import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  /**
   * Отвечает за взаимодейстие с попапом-подвержденим действия (без формы)
   * @param {string} popupSelector - Селектор элемента попапа
   * @param {function} handleSubmit - Колбек для обработки нажатия на кнопку
   */
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._button = this._popup.querySelector('.popup__save-button');
  }

  /**
   * Устанавливает необходимые слушатели событий на элементы попапа
   */
  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', () => {
      this._handleSubmit(this._target);
    });
  }

  /**
   * Задает целевой параметр, с которым работает попап и котрое возвращает колбеку
   * @param {*} target - Целевой параметр
   */
  setTarget(target) {
    this._target = target;
  }
}
