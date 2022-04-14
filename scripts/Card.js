import {imagePopup, imagePopupFigure, imagePopupCaption, openPopup} from './index.js';

export default class Card {
  constructor (cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate () {
    const cardTemplate = document
                      .querySelector(this._templateSelector)
                      .content
                      .querySelector('.card')
                      .cloneNode(true);
    return cardTemplate;
  }


  generateCard () {
    this._element = this._getTemplate();

    // Заполнение содержимого
    const image = this._element.querySelector('.card__image');
    image.src = this._link;
    image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    // Обработчики нажатий
    this._setEventlisteners();

    return this._element;
  }


  _setEventlisteners () {
    this._element.querySelector('.card__image').addEventListener('click', () => this._showImagePopup() );
    this._element.querySelector('.card__like-button').addEventListener('click', this._likeCard);
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._deleteCard() );
  }


  _showImagePopup () {
    imagePopupFigure.src = this._link;
    imagePopupFigure.alt = this._name;
    imagePopupCaption.textContent = this._name;
    openPopup(imagePopup);
  }


  _likeCard (event) {
    event.target.classList.toggle('card__like-button_active');
  }


  _deleteCard () {
    this._element.remove();
    this._element = null;
  }
}
