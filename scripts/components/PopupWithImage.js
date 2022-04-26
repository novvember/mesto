import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /**
   * Класс отвечает за работу с попапом, содержащим увеличенное изображение
   *
   * Параметры:
   * popupSelector - селектор элемента с попапом
   */
  open(imageLink, text) {
    const figure = this._popup.querySelector('.popup__image');
    const caption = this._popup.querySelector('.popup__image-caption');

    figure.src = imageLink;
    figure.alt = text;
    caption.textContent = text;

    super.open();
  }
}
