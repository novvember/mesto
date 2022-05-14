export default class Card {
  /**
   * Отвечает за создание и функционирование карточки
   * @constructor
   *
   * @param {object} Объект с данными карточки:
   * - name - Отображаемый заголовок карточки
   * - link - Ссылка на изображение
   * - likes - Массив с объектами пользователей, поставившими лайк
   * - owner - Объект пользователя-владельца
   * - createdAt - Время создания карточки
   * - _id - id карточки
   * @param {string} templateSelector - Селектор template-элемента с шаблоном карточки
   * @param {function} handleCardClick - Функция-обработчик для клика по картинке
   * @param {function} handleDeleteCard - Функция-обработчик для кнопки удаления карточки
   * @param {function} handleLikeCard - Функция-обработчик для лайка карточки
   * @param {string} userId - ID текущего пользователя
   */
  constructor (
    {name, link, likes, owner, createdAt, _id},
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

  /**
   * Получает шаблон создаваемой карточки из разметки
   * @returns {object} Пустой элемент, созданный из шаблона
   */
  _getTemplate () {
    const cardTemplate = document
                      .querySelector(this._templateSelector)
                      .content
                      .querySelector('.card')
                      .cloneNode(true);
    return cardTemplate;
  }

  /**
   * Создает заполненную по исходным данным карточку
   * @returns {object} Карточка, готовая для вставки в разметку
   */
  generateCard () {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');

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

  /**
   * Устанавливает необходимые слушатели событий на элементы карточки
   */
  _setEventlisteners () {
    // Лайк карточки
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._likeCard());

    // Клик по картинке
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick(this._link, this._name));

    // Кнопка удаления карточки, при наличии
    if (this._element.querySelector('.card__delete-button')) {
        this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDelete());
      }
  }

  /**
   * Обрабатывает лайк карточки
   */
  _likeCard () {
    this._handleLikeCard(this._id, this._isLiked)
  }

  /**
   * Блокирует кнопку лайка
   */
  blockLikeButton() {
    this._likeButton.disabled = true;
  }

  /**
   * Разблокирует кнопку лайка
   */
  unblockLikeButton() {
    this._likeButton.disabled = false;
  }

  /**
   * Обрабатывает нажатие на удаление карточки
   */
   _handleDelete () {
      this._handleDeleteCard(this._id);
  }

  /**
   * Определяет, есть ли лайк пользователя на карточке
   * @returns {boolean}
   */
  _checkIsLiked() {
      return this._likes.some(person => person._id === this._userId);
  }

  /**
   * Обрабатывает массив лайков карточки:
   * - при наличии аргумента сохраняет новые лайки
   * - записывает количество лайков в разметку
   * - сохраняет и показывает в разметке текущее состяние лайка пользователя
   *
   * @param {Array} likes - Новые лайки карточки (необязательный параметр)
   */
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

  /**
   * Удаляет карточку из раметки
   */
  delete () {
    this._element.remove();
    this._element = null;
  }
}
