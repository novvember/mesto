/** Элементы страницы, блок profile */
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let editButton = document.querySelector('.profile__button_type_edit');

/** Элементы попапа для редактирования профиля */
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let closePopupButton = document.querySelector('.popup__cancel-button');


/** Функция открывает попап, предварительно установив текущие значения */
function openPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

/** Функция закрывает попап */
function closePopup () {
  popup.classList.remove('popup_opened');
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveProfileInfo (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup ();
}

/** Обработчики событий для кнопок */
editButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', saveProfileInfo);
closePopupButton.addEventListener('click', closePopup);
