import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(imageLink, text) {
    const figure = this._popup.querySelector('.popup__image');
    const caption = this._popup.querySelector('.popup__image-caption');

    figure.src = imageLink;
    figure.alt = text;
    caption.textContent = text;

    super.open();
  }
}
