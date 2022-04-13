import {imagePopup, imagePopupFigure, imagePopupCaption, openPopup} from './index.js';

export default class Card {
  constructor (cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate () {
    this._element = document
                      .querySelector(this._templateSelector)
                      .content
                      .querySelector('.card')
                      .cloneNode(true);
    return this._element;
  }


  generateCard () {
    const card = this._getTemplate();

    // Заполнение содержимого
    card.querySelector('.card__image').src = this._link;
    card.querySelector('.card__image').alt = this._name;
    card.querySelector('.card__title').textContent = this._name;

    // Обработчики нажатий
    this._setEventlisteners();

    return card;
  }


  _setEventlisteners () {
    this._element.querySelector('.card__image').addEventListener('click', this._showImagePopup);
    this._element.querySelector('.card__like-button').addEventListener('click', this._likeCard);
    this._element.querySelector('.card__delete-button').addEventListener('click', this._deleteCard);
  }


  _showImagePopup (event) {
    imagePopupFigure.src = event.target.src;
    imagePopupFigure.alt = event.target.alt;
    imagePopupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
    openPopup(imagePopup);
  }


  _likeCard (event) {
    event.target
      .closest('.card__like-button')
      .classList
      .toggle('card__like-button_active');
  }


  _deleteCard (event) {
    event.target
      .closest('.card')
      .remove();
  }
}
