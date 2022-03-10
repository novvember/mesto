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



/**
 *
 * Раздел с карточками
 *
 * */

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

/** Функция генерирует карточки и вставляет их на страницу
 *
 * Ожидаемые аргументы на вход:
 * один или несколько объектов с карточкой через запятую
 * (при вставке массива с объектами использовать spread-оператор, например: ...arrayOfObjects)
 *
 * Ожидаемый формат объекта карточки:
 * {  name: Строка с именем объекта (заголовок карточки),
 *    link: Строка с полным адресом изображения   }
 *
 * Шаблон карточки для генерации:
 * блок <template id="cards">
 *
 * Результат функции:
 * вставляет сгенерированные карточки на страницу в блок .cards в обратном порядке (то есть вставляет в начало блока)
 */
function drawCards (...cards) {
  const cardsElement = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card').content;

  cards.forEach( card => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    cardsElement.prepend(cardElement);
  } )
}

/** Отобразить исходные карточки при загрузке страницы */
drawCards( ...initialCards );
