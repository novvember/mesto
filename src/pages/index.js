// Импорт данных из других модулей
import {
  cardsSelector,
  cardTemplateSelector,
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
  profileName,
  profileJob,
  profileEditButton,
  profileNameInput,
  profileJobInput,
  profileEditPopupSelector,
  newCardButton,
  newCardForm,
  newCardPopupSelector,
  imagePopupSelector
} from '../utils/constants.js';
import initialCards from '../utils/initialCards.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'; // импорт css-стилей для сборки в Webpack

function renderCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  return card.generateCard();
}


// Инициализация Section, добавление исходных карточек
function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

const cardsSection = new Section({
  items: initialCards,
  renderer: renderCard
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
  cardsSection.addItem(renderCard(data));
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
  formElements.forEach(formElement => {
    const form = new FormValidator(formClasses, formElement);
    formValidators[formElement.getAttribute('name')] = form;
    form.enableValidation();
  });
}

validateForms({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
});


// Инициализация UserInfo
const userInfo = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob
});
