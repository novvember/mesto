import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /**
   * Отвечает за работу с попапом, содержащим увеличенное изображение
   * @constructor
   *
   * @param {string} popupSelector - Селектор элемента с попапом
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._figureElement = this._popup.querySelector('.popup__image');
    this._captionElement = this._popup.querySelector('.popup__image-caption');
  }

  /**
   * Заполняет попап нужными значениями и открывает его
   * @param {string} imageLink - Ссылка на картинку
   * @param {string} text - Подпись картинки
   */
  open(imageLink, text) {
    this._figureElement.src = imageLink;
    this._figureElement.alt = text;
    this._captionElement.textContent = text;
    super.open();
  }
}
