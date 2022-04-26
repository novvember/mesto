export default class FormValidator {
  /**
   * Класс отвечает за валидацию формы, отображение/скрытие ошибок, отображение кнопки отправки
   *
   * Параметры:
   * formClasses - селекторы и классы элементов формы, формат:
   * {
   *   formSelector,
   *   inputSelector,
   *   submitButtonSelector,
   *   inactiveButtonClass,
   *   inputErrorClass,
   *   errorClass
   * }
   * formElement - элемент с валидируемой формой
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

  enableValidation () {
      this._setEventListeners();
  }

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

  _isValid (inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButtonState();
    } else {
      this._enableButtonState();
    }
  }

  disableButtonState () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButtonState () {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _hasInvalidInput () {
    return this._inputElements.some( inputElement => inputElement.validity.valid === false);
  }
}
