export const profileEditButton = document.querySelector('.profile__button_type_edit');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const newCardButton = document.querySelector('.profile__button_type_add');
export const cardsSelector = '.cards';
export const cardTemplateSelector = '#card';

export const profileEditPopup = document.querySelector('.popup_type_edit-profile');
export const profileEditForm = profileEditPopup.querySelector('.popup__form');
export const profileNameInput = profileEditPopup.querySelector('.popup__input_type_name');
export const profileJobInput = profileEditPopup.querySelector('.popup__input_type_job');

export const newCardPopup = document.querySelector('.popup_type_add-card');
export const newCardForm = newCardPopup.querySelector('.popup__form');
export const newCardTitle = newCardPopup.querySelector('.popup__input_type_title');
export const newCardLink = newCardPopup.querySelector('.popup__input_type_link');

export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupFigure = imagePopup.querySelector('.popup__image');
export const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');


export const popupCloseButtons = document.querySelectorAll('.popup__cancel-button');
export const popups = document.querySelectorAll('.popup');







import {} from '../utils/constants.js';
import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';



const formValidators = {}; // Экземпляры класса FormValidator, чтобы снаружи обращаться к их методам


/** Функция открывает нужный попап */
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
}

/** Функция закрывает нужный попап */
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
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

  const cardData = {
    name: newCardTitle.value,
    link: newCardLink.value
  };

  const card = new Card(cardData, cardTemplateSelector);
  cardsContainer.addItem(card.generateCard());

  closePopup(newCardPopup);
  newCardForm.reset();
  formValidators[newCardForm.name].disableButtonState();
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


// /** Функция добавляет карточку на страницу
//  *
//  * Аргументы:
//  * - контейнер для вставки,
//  * - объект с карточкой
//  * {  name: Строка с именем объекта (заголовок карточки),
//  *    link: Строка с полным адресом изображения   }
//  *
//  * Шаблон карточки для генерации:
//  * блок <template id="card">
//  */
// function renderCard (container, cardData) {
//   container.prepend(getCardElement(cardData));
// }

// /** Функция создает новый элемент карточки по ее содержанию */
// function getCardElement (cardData) {
//   const card = new Card(cardData, '#card');
//   return card.generateCard();
// }

// /** Отобразить исходные карточки при загрузке страницы */
// initialCards.forEach(card => renderCard (cardsContainer, card));


// Отображение исходных карточек
const cardsContainer = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, cardTemplateSelector);
    return card.generateCard();
  }
}, cardsSelector);

cardsContainer.renderItems();









/** Функция запускает валидацию всех форм на странице */
function validateForms (formClasses) {
  const formElements = Array.from(document.querySelectorAll(formClasses.formSelector));
  formElements.forEach( formElement => {
    const form = new FormValidator(formClasses, formElement);
    formValidators[formElement.getAttribute('name')] = form;
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
