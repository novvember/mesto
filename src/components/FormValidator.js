export default class FormValidator {
/**
   * Отвечает за валидацию формы, отображение/скрытие ошибок, отображение кнопки отправки
   * @constructor
   *
   * @param {object} formClasses - Cелекторы и классы элементов формы, формат:
   * {
   *   formSelector,
   *   inputSelector,
   *   submitButtonSelector,
   *   inactiveButtonClass,
   *   inputErrorClass,
   *   errorClass
   * }
   * @param {object} formElement - Элемент формы
   */

  constructor (formClasses, formElement) {
    // Форма
    this._formElement = formElement;
    // Селекторы и классы
    this._formSelector = formClasses.formSelector;
    this._inputSelector = formClasses.inputSelector;
    this._submitButtonSelector = formClasses.submitButtonSelector;
    this._inactiveButtonClass = formClasses.inactiveButtonClass;
    this._inputErrorClass = formClasses.inputErrorClass;
    this._errorClass = formClasses.errorClass;
    // Элементы формы
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  /**
   * Инициирует валидацию
   */
  enableValidation () {
      this._setEventListeners();
  }

  /**
   * Устанавливает все слушатели событий на форму
   */
  _setEventListeners () {
    this._inputElements.forEach( inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });

    // Определяет исходное положение кнопки
    this._toggleButtonState();
  }

  /**
   * Проверяет элемент формы на валидности и скрывает/отображает ошибку
   * @param {object} inputElement - Элемент формы
   */
  _isValid (inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  /**
   * Показывает ошибку у поля вввода
   * @param {object} inputElement - элемент формы
   * @param {string} errorMessage - Текст ошибки для отображения
   */
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  /**
   * Скрывает ошибку у поля вввода
   * @param {object} inputElement - элемент формы
   */
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  /**
   * Переключает состояние кнопки сабмита формы
   */
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButtonState();
    } else {
      this._enableButtonState();
    }
  }

  /**
   * Отключает кнопку сабмита формы
   */
  disableButtonState () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  /**
   * Включает кнопку сабмита формы
   */
  _enableButtonState () {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  /**
   * Проверяет форму на наличие невалидных полей
   * @returns {boolean}
   */
  _hasInvalidInput () {
    return this._inputElements.some( inputElement => inputElement.validity.valid === false);
  }
}
