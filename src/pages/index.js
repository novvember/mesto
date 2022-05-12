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
  profileAvatar,
  profileEditButton,
  profileNameInput,
  profileJobInput,
  profileEditPopupSelector,
  newCardButton,
  newCardForm,
  newCardPopupSelector,
  imagePopupSelector,
  apiConfig
} from '../utils/constants.js';
// import initialCards from '../utils/initialCards.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css'; // импорт css-стилей для сборки в Webpack

// Функции
const formValidators = {};

function validateForms (formClasses) {
  const formElements = Array.from(document.querySelectorAll(formClasses.formSelector));
  formElements.forEach(formElement => {
    const form = new FormValidator(formClasses, formElement);
    formValidators[formElement.getAttribute('name')] = form;
    form.enableValidation();
  });
}

const cards = {};

function renderCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  cards[data._id] = card;
  return card.generateCard();
}

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}


// Инициализация классов
const api = new Api(apiConfig);

const userInfo = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob,
  avatarElement: profileAvatar
});

api.getUserInfo()
  .then(res => {
    userInfo.fill(res);
    userInfo.renderName();
    userInfo.renderJob();
    userInfo.renderAvatar();
  });


const cardsSection = new Section({
  items: [],
  renderer: renderCard
}, cardsSelector);

api.getInitialCards()
  .then(res => {
    res.forEach(data => {
      const card = renderCard(data);
      cardsSection.addItem(card);
    });
});


const profileEditPopup = new PopupWithForm(profileEditPopupSelector, data => {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
});

const newCardPopup = new PopupWithForm(newCardPopupSelector, data => {
  cardsSection.addItem(renderCard(data));
  newCardPopup.close();
  formValidators[newCardForm.getAttribute('name')].disableButtonState();
});

const imagePopup = new PopupWithImage(imagePopupSelector);




// Установка слушателей событий
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

newCardPopup.setEventListeners();

newCardButton.addEventListener('click', function () {
  newCardPopup.open();
});

imagePopup.setEventListeners();

// Вызов функций и методов при загрузке страницы
validateForms({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
});
