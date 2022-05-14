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
    this._originalButtonText = this._submitButton.textContent;
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
   * Выполняет необхоимые действия при сабмите формы
   */
  _submit() {
    this._handleSubmit(this._getInputValues());
  }

  /**
   * Блокирует кнопку отправки во время выполнения запроса
   * @param {string} blockedButtonText - Текст, отображаемый на кнопке
   */
  blockSubmitButton(blockedButtonText = 'Сохранение...') {
    this._blockedButtonText = blockedButtonText;
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._blockedButtonText;
  }

  /**
   * Возвращает состояние кнопки отправки после блокировки
   */
  unblockSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._originalButtonText;
  }

  /**
   * Закрывает попап
   */
  close() {
    super.close();
    this._form.reset();
  }

  /**
   * Открывает попап
   */
  open() {
    super.open();
    this._handleDisableSubmitButton();
  }
}
