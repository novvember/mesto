import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /**
   * Отвечает за работу с попапом, содержащим форму
   * @constructor
   *
   * @param {string} popupSelector - Селектор элемента с попапом
   * @param {function} handleSubmit - Колбек для обработки отправки формы
   */
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputValues = {};
  }

  /**
   * Сохраняет все поля ввода в объект
   * @returns {object}
   */
  _getInputValues() {
    this._form.querySelectorAll('.popup__input').forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  /**
   * Устанавливает необходимые слушатели на элементы попапа
   */
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
    });
  }

  /**
   * Выполняет действия при сабмите формы и вызывает колбек
   */
  _submit() {
    const button = this._form.querySelector('.popup__save-button');
    const tempText = 'Сохранение...';
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = tempText;
    this._handleSubmit(this._getInputValues())
      .then(() => {
        button.textContent = originalText;
        button.disabled = false;
      });
  }

  /**
   * Закрывает попап
   */
  close() {
    super.close();
    this._form.reset();
  }
}
