/**
 * Импорт данных из других модулей
 */
import {
  cardsSelector,
  cardTemplateSelector,
  formSelectors, // селекторы и классы элементов формы
  profileElements, // элементы страницы с информацией о пользователе
  profileEditButton,
  profileNameInput,
  profileJobInput,
  profileEditPopupSelector,
  avatarChangeButton,
  avatarChangePopupSelector,
  newCardButton,
  newCardForm,
  newCardPopupSelector,
  imagePopupSelector,
  confirmationPopupSelector,
} from '../utils/constants.js';

import {apiConfig} from '../utils/apiConfig.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css'; // импорт css-стилей для сборки в Webpack


/**
 * Переменные страницы
 */
const formValidators = {}; // хранение экземпляров валидаторов форм
const cards = {}; // хранение полученных карточек


/**
 * Дополнительные функции
 */

/**
 * Запускает валидацию всех форм на странице
 * @param {object} formSelectors - Объект с классами и селекторами элементов форм:
 * - formSelector,
 * - inputSelector,
 * - submitButtonSelector,
 * - inactiveButtonClass,
 * - inputErrorClass,
 * - errorClass
 */
function validateForms (formSelectors) {
  const formElements = Array.from(document.querySelectorAll(formSelectors.formSelector));
  formElements.forEach(formElement => {
    const form = new FormValidator(formSelectors, formElement);
    formValidators[formElement.getAttribute('name')] = form;
    form.enableValidation();
  });
}

/**
 * Создает элемент карточки
 * @param {object} data - Объект с содержимым карточки
 * @returns {object}
 */
function renderCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick, handleDeleteCard, handleLikeCard, userInfo.id);
  cards[data._id] = card;
  return card.generateCard();
}

/**
 * Обрабатывает нажатие на картинку карточки
 * @param {string} imageLink - Ссылка на картинку
 * @param {string} text - Описание картинки
 */
function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

/**
 * Обрабатывает нажатие на удаление карточки
 * @param {string} cardId - ID карточки
 */
function handleDeleteCard(cardId) {
  popupWithConfirmation.setTarget(cardId);
  popupWithConfirmation.open();
}

/**
 * Обрабатывает нажатие на лайк в карточке
 * @param {string} cardId - ID карточки
 * @param {boolean} isLiked - Текущий статус лайка
 * @returns {Promise}
 */
function handleLikeCard(cardId, isLiked) {
  return api.toggleLike(cardId, isLiked)
    .then(likes => {
      cards[cardId].setLikes(likes);
    });
}


/**
 * Инициализация классов
 */
const api = new Api(apiConfig);

const userInfo = new UserInfo({
  nameElement: profileElements.name,
  jobElement: profileElements.job,
  avatarElement: profileElements.avatar
});

const cardsSection = new Section({
  items: [],
  renderer: renderCard
}, cardsSelector);

// Попапы
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, data => {
  return api.setUserInfo(data)
    .then(res => {
      userInfo.fill(res);
      userInfo.renderName();
      userInfo.renderJob();
      profileEditPopup.close();
    });
});

const avatarChangePopup = new PopupWithForm(avatarChangePopupSelector, data => {
  return api.changeAvatar(data.link)
    .then((res) => {
      userInfo.fill(res);
      userInfo.renderAvatar();
      avatarChangePopup.close();
    });
});

const newCardPopup = new PopupWithForm(newCardPopupSelector, data => {
  return api.addNewCard(data)
    .then(res => {
      cardsSection.addItem(renderCard(res), true);
      newCardPopup.close();
      formValidators[newCardForm.getAttribute('name')].disableButtonState();
    });
});

const imagePopup = new PopupWithImage(imagePopupSelector);

const popupWithConfirmation = new PopupWithConfirmation(confirmationPopupSelector, (cardId) => {
  api.deleteCard(cardId)
    .then(() => {
      cards[cardId].delete();
      popupWithConfirmation.close();
    })
});


/**
 * Первоначальное получение данных от сервера
 */
api.getUserInfo()
  .then(res => {
    userInfo.fill(res);
    userInfo.renderName();
    userInfo.renderJob();
    userInfo.renderAvatar();
  })
  .then(() => {
    return api.getInitialCards();
  })
  .then(res => {
    res.forEach(data => {
      const card = renderCard(data);
      cardsSection.addItem(card);
    });
  });


/**
 * Установка слушателей для работы попапов
 */
// Попап редактирования информации
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

// Попап обновления аватара
avatarChangePopup.setEventListeners();

avatarChangeButton.addEventListener('click', () => {
  avatarChangePopup.open();
});

// Попап добавления новой карточки
newCardPopup.setEventListeners();

newCardButton.addEventListener('click', function () {
  newCardPopup.open();
});

// Попап с подтвержденим информации
popupWithConfirmation.setEventListeners();

// Попап с увеличенным изображением
imagePopup.setEventListeners();


/**
 * Включение валидации форм
 */
validateForms(formSelectors);
