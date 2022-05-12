import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._button = this._popup.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', () => {
      this._handleSubmit(this._target);
    });
  }

  setTarget(target) {
    this._target = target;
  }
}
