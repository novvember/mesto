export default class Card {
  constructor (cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', this._likeCard);

    this._element
      .querySelector('.card__delete-button')
      .addEventListener('click', () => this._deleteCard());

    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  _likeCard (event) {
    event.target.classList.toggle('card__like-button_active');
  }


  _deleteCard () {
    this._element.remove();
    this._element = null;
  }
}
