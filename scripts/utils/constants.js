/**
 * Элементы страницы и их селекторы
 */

// Контейнер с карточками
 export const cardsSelector = '.cards';
 export const cardTemplateSelector = '#card';

 // Редаткирование информации о пользователе
 export const profileName = document.querySelector('.profile__name');
 export const profileJob = document.querySelector('.profile__job');
 export const profileEditButton = document.querySelector('.profile__button_type_edit');
 export const profileEditPopupElement = document.querySelector('.popup_type_edit-profile');
 export const profileNameInput = profileEditPopupElement.querySelector('.popup__input_type_name');
 export const profileJobInput = profileEditPopupElement.querySelector('.popup__input_type_job');
 export const profileEditPopupSelector = '.popup_type_edit-profile';

 // Добавление новых карточек
 export const newCardButton = document.querySelector('.profile__button_type_add');
 export const newCardPopupElement = document.querySelector('.popup_type_add-card');
 export const newCardForm = newCardPopupElement.querySelector('.popup__form');
 export const newCardPopupSelector = '.popup_type_add-card';

 // Попап с увеличенным изображением
 export const imagePopupSelector = '.popup_type_image';
