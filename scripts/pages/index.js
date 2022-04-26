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
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const formValidators = {}; // Экземпляры класса FormValidator, чтобы снаружи обращаться к их методам


const userInfo = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob
});





/** Обработчки событий */
profileEditButton.addEventListener('click', function () {
  profileNameInput.value = userInfo.getUserInfo().name;
  profileJobInput.value = userInfo.getUserInfo().job;
  profileNameInput.dispatchEvent(new Event('input'));
  profileJobInput.dispatchEvent(new Event('input'));
  popupEditInfo.open();
});





const popupEditInfo = new PopupWithForm('.popup_type_edit-profile', data => {
  userInfo.setUserInfo(data);
  popupEditInfo.close();
});
popupEditInfo.setEventListeners();



const popupAddCard = new PopupWithForm('.popup_type_add-card', data => {
  const card = new Card(data, cardTemplateSelector);
  cardsContainer.addItem(card.generateCard());
  popupAddCard.close();
  formValidators[newCardForm.getAttribute('name')].disableButtonState();
});
popupAddCard.setEventListeners();




newCardButton.addEventListener('click', function () {
  popupAddCard.open();
});




const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();




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
