export default class Popup {
  /**
   * Отвечает за открытие и закрытие попапа
   * @constructor
   * @param {string} popupSelector - Селектор элемента попапа
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this._popup.querySelector('.popup__cancel-button');
  }

  /**
   * Открывает попап
   */
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  /**
   * Закрывает попап
   */
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  /**
   * Обрабатывает нажатия на Escape для закрытия попапа
   * @param {object} evt - Событие, получаемое из слушателя
   */
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Устанавливает слушатели событий на элементы попапа для управления его закрытием
   */
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) this.close();
    });

    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}
