// Кнопка редактирования профиля
let editButton = document.querySelector('.profile__button_type_edit');
// Форма изменения профиля в попапе
let popupForm = document.querySelector('.popup__form');
// Кнопка закрытия попапа
let closePopupButton = document.querySelector('.popup__cancel-button');

// Открыть попап
function openPopup () {
  let popup = document.querySelector('.popup');

  // Сбросить значения в попапе до установленных
  resetPopup ();
  // Открыть попап
  popup.classList.add('popup_opened');
}

// Закрыть попап
function closePopup () {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

// Сбросить значения полей в попапе на сохраненные
function resetPopup () {
  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_job');

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Сохранить значения из попапа в профиль
function saveProfileInfo () {
  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_job');

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

// Закрыть попав С сохранрением информации в профиль
function closePopupWithSave (evt) {
  evt.preventDefault();
  saveProfileInfo ();
  closePopup ();
}

// Закрыть попав БЕЗ сохранрениея информации
function closePopupWithoutSave () {
  resetPopup ();
  closePopup ();
}

// Обработчики событий кнопок
editButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', closePopupWithSave);
closePopupButton.addEventListener('click', closePopupWithoutSave);
