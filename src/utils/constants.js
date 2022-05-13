/**
 * Элементы страницы и их селекторы
 */

// Контейнер с карточками
export const cardsSelector = '.cards';
export const cardTemplateSelector = '#card';

// Общие элементы форм
const formSelector = '.popup__form';
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__save-button';
const inactiveButtonClass = 'popup__save-button_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__input-error_visible';
export const formSelectors = {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
};


// Информация о пользователе
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar-image');
export const profileElements = {
  name: profileName,
  job: profileJob,
  avatar: profileAvatar
}


// Попап с изменением информации о пользователе
export const profileEditButton = document.querySelector('.profile__button_type_edit');
export const profileEditPopupSelector = '.popup_type_edit-profile';
const profileEditPopupElement = document.querySelector(profileEditPopupSelector);
export const profileNameInput = profileEditPopupElement.querySelector('.popup__input_type_name');
export const profileJobInput = profileEditPopupElement.querySelector('.popup__input_type_job');

// Попап с обновлением аватара
export const avatarChangeButton = document.querySelector('.profile__avatar-button');
export const avatarChangePopupSelector = '.popup_type_change-avatar';

// Попап с добавлением новых карточек
export const newCardButton = document.querySelector('.profile__button_type_add');
export const newCardPopupSelector = '.popup_type_add-card';
const newCardPopupElement = document.querySelector(newCardPopupSelector);
export const newCardForm = newCardPopupElement.querySelector(formSelector);

 // Попап с увеличенным изображением
export const imagePopupSelector = '.popup_type_image';

// Попап с подтверждением
export const confirmationPopupSelector = '.popup_type_confirm';
