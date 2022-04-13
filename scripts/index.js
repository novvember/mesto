import Card from './Card.js';

/** Исходные карточки для загрузки */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


/** Элементы страницы */
const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const newCardButton = document.querySelector('.profile__button_type_add');
const cardsContainer = document.querySelector('.cards');

const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileNameInput = profileEditPopup.querySelector('.popup__input_type_name');
const profileJobInput = profileEditPopup.querySelector('.popup__input_type_job');

const newCardPopup = document.querySelector('.popup_type_add-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardTitle = newCardPopup.querySelector('.popup__input_type_title');
const newCardLink = newCardPopup.querySelector('.popup__input_type_link');

export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupFigure = imagePopup.querySelector('.popup__image');
export const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');


const popupCloseButtons = document.querySelectorAll('.popup__cancel-button');
const popups = document.querySelectorAll('.popup');








/** Функция открывает нужный попап */
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
}

/** Функция закрывает нужный попап */
function closePopup (popup) {
  const submitButtonElement = popup.querySelector('.popup__save-button');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
  if (submitButtonElement) {
    submitButtonElement.classList.add('popup__save-button_disabled');
    submitButtonElement.disabled = true;
  }
}

/** Обработчик для закрытия попапов по кнопке Esc */
function closePopupByKey (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveProfileInfo (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup (profileEditPopup);
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveNewCard (event) {
  event.preventDefault();

  const card = {
    name: newCardTitle.value,
    link: newCardLink.value
  };

  renderCards(cardsContainer, card);
  closePopup(newCardPopup);
  newCardForm.reset();
}




/** Обработчки событий */
profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileNameInput.dispatchEvent(new Event('input'));
  profileJobInput.value = profileJob.textContent;
  profileJobInput.dispatchEvent(new Event('input'));
  openPopup(profileEditPopup);
});
profileEditForm.addEventListener('submit', saveProfileInfo);

newCardButton.addEventListener('click', function () {
  openPopup(newCardPopup);
});
newCardForm.addEventListener('submit', saveNewCard);

popupCloseButtons.forEach( button => button.addEventListener('click', evt => {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}) );

popups.forEach( popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget) closePopup(evt.target);
  });
});



/** Функция добавляет карточку/карточки на страницу
 *
 * Аргументы:
 * - контейнер для вставки,
 * - один или несколько объектов с карточкой (при вставке массива с объектами использовать spread-оператор, например: ...arrayOfObjects)
 *
 * Ожидаемый формат объекта карточки:
 * {  name: Строка с именем объекта (заголовок карточки),
 *    link: Строка с полным адресом изображения   }
 *
 * Шаблон карточки для генерации:
 * блок <template id="card">
 */
 function renderCards (container, ...cards) {
  cards.forEach(cardData => {
    const card = new Card(cardData, '#card');
    container.prepend( card.generateCard() );
  });
}


/** Отобразить исходные карточки при загрузке страницы */
renderCards(cardsContainer, ...initialCards);
