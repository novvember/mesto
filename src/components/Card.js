export default class Card {
  /**
   * Класс отвечает за создание карточки
   *
   * Параметры:
   * name - отображаемый заголовок карточки
   * link - ссылка на изображение
   * templateSelector - селектор template-элемента с шаблоном карточки
   * handleCardClick - обработчик нажатия на изображение карточки
   */
  constructor ({name, link, likes, owner, createdAt, _id},
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    userId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._createdAt = createdAt;
    this._id = _id;
    this._userId = userId;
    this._isLiked = this._checkIsLiked();

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
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

    this.setLikes();

    if (this._owner._id !== this._userId) {
      this._element.querySelector('.card__delete-button').remove();
    }

    // Обработчики нажатий
    this._setEventlisteners();

    return this._element;
  }

  _setEventlisteners () {
    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', (event) => this._likeCard(event));

    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => this._handleCardClick(this._link, this._name));

    if (this._element.querySelector('.card__delete-button')) {
        this._element
        .querySelector('.card__delete-button')
        .addEventListener('click', () => this._handleDelete());
      }
  }

  _likeCard (event) {
    event.target.disabled = true;

    this._handleLikeCard(this._id, this._isLiked)
      .then(() => {
        event.target.disabled = false;
      })
  }

  setLikes(likes) {
    const likeCount = this._element.querySelector('.card__like-count');
    const likeButton = this._element.querySelector('.card__like-button');

    if (likes) {
      this._likes = likes;
      this._isLiked = this._checkIsLiked();
    }

    likeCount.textContent = this._likes.length;

    if (this._isLiked) {
      likeButton.classList.add('card__like-button_active');
    } else {
      likeButton.classList.remove('card__like-button_active');
    }
  }

  _checkIsLiked() {
    return this._likes.some(person => person._id === this._userId);
  }

  _handleDelete () {
    this._handleDeleteCard(this._id);
  }

  delete () {
    this._element.remove();
    this._element = null;
  }
}
