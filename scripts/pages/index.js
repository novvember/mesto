export const cardsSelector = '.cards';
export const cardTemplateSelector = '#card';

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileEditButton = document.querySelector('.profile__button_type_edit');
export const profileEditPopupElement = document.querySelector('.popup_type_edit-profile');
export const profileNameInput = profileEditPopupElement.querySelector('.popup__input_type_name');
export const profileJobInput = profileEditPopupElement.querySelector('.popup__input_type_job');
export const profileEditPopupSelector = '.popup_type_edit-profile';

export const newCardButton = document.querySelector('.profile__button_type_add');
export const newCardPopupElement = document.querySelector('.popup_type_add-card');
export const newCardForm = newCardPopupElement.querySelector('.popup__form');
export const newCardPopupSelector = '.popup_type_add-card';

export const imagePopupSelector = '.popup_type_image';


// Импорт данных из других модулей
import {} from '../utils/constants.js';
import initialCards from '../utils/initialCards.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';


// Инициализация Section, добавление исходных карточек
function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

const cardsSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, cardTemplateSelector, handleCardClick);
    return card.generateCard();
  }
}, cardsSelector);

cardsSection.renderItems();


// Инициализация Popup с редактированием информации о пользователе
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, data => {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
});

profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', function () {
  ({
    name: profileNameInput.value,
    job: profileJobInput.value
  } = userInfo.getUserInfo());
  profileNameInput.dispatchEvent(new Event('input'));
  profileJobInput.dispatchEvent(new Event('input'));
  profileEditPopup.open();
});


// Инициализация Popup с добавлением новой карточки
const newCardPopup = new PopupWithForm(newCardPopupSelector, data => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  cardsSection.addItem(card.generateCard());
  newCardPopup.close();
  formValidators[newCardForm.getAttribute('name')].disableButtonState();
});

newCardPopup.setEventListeners();

newCardButton.addEventListener('click', function () {
  newCardPopup.open();
});


// Инициализация Popup с увеличенным изображением
const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();


// Инициализация FormValidator
const formValidators = {};

function validateForms (formClasses) {
  const formElements = Array.from(document.querySelectorAll(formClasses.formSelector));
  formElements.forEach( formElement => {
    const form = new FormValidator(formClasses, formElement);
    formValidators[formElement.getAttribute('name')] = form;
    form.enableValidation();
  });
}

validateForms({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});


// Инициализация UserInfo
const userInfo = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob
});









