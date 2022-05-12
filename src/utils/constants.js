/**
 * Элементы страницы и их селекторы
 */

// Контейнер с карточками
export const cardsSelector = '.cards';
export const cardTemplateSelector = '#card';

// Общие элементы форм
export const formSelector = '.popup__form';
export const inputSelector = '.popup__input';
export const submitButtonSelector = '.popup__save-button';
export const inactiveButtonClass = 'popup__save-button_disabled';
export const inputErrorClass = 'popup__input_type_error';
export const errorClass = 'popup__input-error_visible';

// Редактирование информации о пользователе
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileEditButton = document.querySelector('.profile__button_type_edit');
export const profileEditPopupSelector = '.popup_type_edit-profile';
const profileEditPopupElement = document.querySelector(profileEditPopupSelector);
export const profileNameInput = profileEditPopupElement.querySelector('.popup__input_type_name');
export const profileJobInput = profileEditPopupElement.querySelector('.popup__input_type_job');

// Добавление новых карточек
export const newCardButton = document.querySelector('.profile__button_type_add');
export const newCardPopupSelector = '.popup_type_add-card';
const newCardPopupElement = document.querySelector(newCardPopupSelector);
export const newCardForm = newCardPopupElement.querySelector(formSelector);

 // Попап с увеличенным изображением
export const imagePopupSelector = '.popup_type_image';

// Попап с подтверждением
export const confirmationPopupSelector = '.popup_type_confirm';

// Настройки для подключения к серверу
const token = 'b5024e97-68ca-4480-bf36-543078de24a2';
const cohortId = 'cohort-41';
export const apiConfig = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};
