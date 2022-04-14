import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


/** Элементы страницы */
const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const newCardButton = document.querySelector('.profile__button_type_add');
const cardsContainer = document.querySelector('.cards');

const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileNameInput = profileEditPopup.querySelector('.popup__input_type_name');
const profileJobInput = profileEditPopup.querySelector('.popup__input_type_job');

const newCardPopup = document.querySelector('.popup_type_add-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardTitle = newCardPopup.querySelector('.popup__input_type_title');
const newCardLink = newCardPopup.querySelector('.popup__input_type_link');

export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupFigure = imagePopup.querySelector('.popup__image');
export const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');


const popupCloseButtons = document.querySelectorAll('.popup__cancel-button');
const popups = document.querySelectorAll('.popup');


/** Функция открывает нужный попап */
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
}

/** Функция закрывает нужный попап */
function closePopup (popup) {
  const submitButtonElement = popup.querySelector('.popup__save-button');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
  if (submitButtonElement) {
    submitButtonElement.classList.add('popup__save-button_disabled');
    submitButtonElement.disabled = true;
  }
}

/** Обработчик для закрытия попапов по кнопке Esc */
function closePopupByKey (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

/** Функция сохраняет введенные данные (профиль пользователя) и закрывает попап */
function saveProfileInfo (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup (profileEditPopup);
}

/** Функция сохраняет введенные данные (добавление карточки) и закрывает попап */
function saveNewCard (event) {
  event.preventDefault();

  const card = {
    name: newCardTitle.value,
    link: newCardLink.value
  };

  renderCards(cardsContainer, card);
  closePopup(newCardPopup);
  newCardForm.reset();
}


/** Обработчки событий */
profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileNameInput.dispatchEvent(new Event('input'));
  profileJobInput.value = profileJob.textContent;
  profileJobInput.dispatchEvent(new Event('input'));
  openPopup(profileEditPopup);
});
profileEditForm.addEventListener('submit', saveProfileInfo);

newCardButton.addEventListener('click', function () {
  openPopup(newCardPopup);
});
newCardForm.addEventListener('submit', saveNewCard);

popupCloseButtons.forEach( button => button.addEventListener('click', evt => {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}) );

popups.forEach( popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget) closePopup(evt.target);
  });
});


/** Функция добавляет карточку/карточки на страницу
 *
 * Аргументы:
 * - контейнер для вставки,
 * - один или несколько объектов с карточкой (при вставке массива с объектами использовать spread-оператор, например: ...arrayOfObjects)
 *
 * Ожидаемый формат объекта карточки:
 * {  name: Строка с именем объекта (заголовок карточки),
 *    link: Строка с полным адресом изображения   }
 *
 * Шаблон карточки для генерации:
 * блок <template id="card">
 */
function renderCards (container, ...cards) {
  cards.forEach(cardData => {
    container.prepend( getCardElement (cardData) );
  });
}

/** Функция создает новый элемент карточки по ее содержанию */
function getCardElement (cardData) {
  const card = new Card(cardData, '#card');
  return card.generateCard();
}

/** Отобразить исходные карточки при загрузке страницы */
renderCards(cardsContainer, ...initialCards);


/** Функция запускает валидацию всех форм на странице */
function validateForms (formClasses) {
  const formElements = Array.from(document.querySelectorAll(formClasses.formSelector));
  formElements.forEach( (formElement) => {
    const form = new FormValidator(formClasses, formElement);
    form.enableValidation();
  });
}

/** Запустить валидацию форм на странице */
validateForms({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
