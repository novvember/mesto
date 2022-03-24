/** Функция включает валидацию форм
 *
 * Аргумент - объект с классами элементов формы, например:
 * {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
 */
function enableValidation (formClasses) {
  const formElements = Array.from(document.querySelectorAll(formClasses.formSelector));
  formElements.forEach( (formElement) => {
    setEventListeners(formElement, formClasses);
  });
}


  function setEventListeners (formElement, formClasses) {
    const inputElements = Array.from(formElement.querySelectorAll(formClasses.inputSelector));
    const buttonElement = formElement.querySelector(formClasses.submitButtonSelector);

    inputElements.forEach( inputElement => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, formClasses);
        toggleButtonState(inputElements, buttonElement, formClasses);
      });
    });
    toggleButtonState(inputElements, buttonElement, formClasses);
  }


    function isValid (formElement, inputElement, formClasses) {
      if ( inputElement.validity.valid ) {
        hideInputError(formElement, inputElement, formClasses);
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, formClasses);
      }
    }


      function showInputError (formElement, inputElement, errorMessage, formClasses) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(formClasses.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(formClasses.errorClass);
      }


      function hideInputError (formElement, inputElement, formClasses) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(formClasses.inputErrorClass);
        errorElement.classList.remove(formClasses.errorClass);
        errorElement.textContent = '';
      }


  function toggleButtonState (inputElements, buttonElement, formClasses) {
    if (hasInvalidInput(inputElements)) {
      buttonElement.classList.add(formClasses.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(formClasses.inactiveButtonClass);
    }
  }


    function hasInvalidInput (inputElements) {
      return inputElements.some( inputElement => inputElement.validity.valid === false);
    }


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});




