import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /**
   * Отвечает за работу с попапом, содержащим форму
   * @constructor
   *
   * @param {string} popupSelector - Селектор элемента с попапом
   * @param {function} handleSubmit - Колбек для обработки отправки формы
   * @param {function} handleDisableSubmitButton - Колбек для отключения кнопки сабмита формы
   *
   */
  constructor(popupSelector, handleSubmit, handleDisableSubmitButton) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputValues = {};
    this._handleDisableSubmitButton = handleDisableSubmitButton;
    this.formName = this._form.getAttribute('name');
    this._allInputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__save-button');
  }

  /**
   * Сохраняет все поля ввода в объект
   * @returns {object}
   */
  _getInputValues() {
    this._allInputs.forEach(input => {
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
    const tempText = 'Сохранение...';
    const originalText = this._submitButton.textContent;

    this._submitButton.disabled = true;
    this._submitButton.textContent = tempText;
    this._handleSubmit(this._getInputValues())
      .then(() => {
        this._submitButton.textContent = originalText;
        this._submitButton.disabled = false;
      });
  }

  /**
   * Закрывает попап
   */
  close() {
    super.close();
    this._form.reset();
    this._handleDisableSubmitButton();
  }
}
