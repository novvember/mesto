let editButton = document.querySelector('.profile__button_type_edit');
let popupCancelButton = document.querySelector('.popup__cancel-button');

editButton.addEventListener('click', openPopup);
popupCancelButton.addEventListener('click', closePopup);

function openPopup () {
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
}

function closePopup (event) {
  let popup = document.querySelector('.popup');
  event.preventDefault();
  popup.classList.remove('popup_opened');
}


