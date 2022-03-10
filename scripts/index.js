
/**
 *
 * Общие элементы для всех попапов
 *
 */

/** Элементы попапа */
const popupCloseButtons = document.querySelectorAll('.popup__cancel-button');

/** Функция открывает нужный попап
 *
 * Ожидаемый аргумент:
 * строка с классом нужного попапа, например: '.popup_type_edit-profile'
 */
function openPopup (popupName) {
  document.querySelector(popupName).classList.add('popup_opened');
}

/** Функция закрывает текущий попап */
function closePopup (event) {
  const popup = event.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

/** Обработчик нажатия одинаковых кнопок */
popupCloseButtons.forEach( button => button.addEventListener('click', closePopup) );


/**
 *
 * Раздел с профилем пользователя
 *
 */

/** Элементы страницы, блок profile */
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__button_type_edit');

/** Элементы попапа для редактирования профиля */
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileNameInput = profileEditPopup.querySelector('.popup__input_type_name');
const profileJobInput = profileEditPopup.querySelector('.popup__input_type_job');

/** Функция сохраняет введенные данные и закрывает попап */
function saveProfileInfo (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup (event);
}

/** Обработчики нажатий кнопок */
profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup('.popup_type_edit-profile');
});
profileEditForm.addEventListener('submit', saveProfileInfo);


/**
 *
 * Форма с добавлением карточки
 *
 */

/** Элементы страницы */
const newCardButton = document.querySelector('.profile__button_type_add');

/** Элементы попапа для добавления карточки */
const newCardPopup = document.querySelector('.popup_type_add-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardTitle = newCardPopup.querySelector('.popup__input_type_title');
const newCardLink = newCardPopup.querySelector('.popup__input_type_link');

/** Функция сохраняет введенные данные и закрывает попап */
function saveNewCard (event) {
  event.preventDefault();

  const card = {};
  card.name = newCardTitle.value;
  card.link = newCardLink.value;
  drawCards(card);

  closePopup(event);
  newCardTitle.value = '';
  newCardLink.value = '';
}

/** Обработчики нажатий кнопок */
newCardButton.addEventListener('click', function () {
  openPopup('.popup_type_add-card');
});
newCardForm.addEventListener('submit', saveNewCard);


/**
 *
 * Попап с увеличенной картинкой
 *
 */

/** Элементы страницы */
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupFigure = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

/** Функция открывает попап с увеличенной картинкой */
function showImagePopup (event) {
  imagePopupFigure.src = event.target.src;
  imagePopupFigure.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;

  openPopup('.popup_type_image');
}


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
    // Создание элемента
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // Заполнение содержимого
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    // Обработчики нажатий
    cardElement.querySelector('.card__image').addEventListener('click', showImagePopup);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    // Вставка элемента в DOM
    cardsElement.prepend(cardElement);
  } );
}

/** Функция реакции нажатия на лайк */
function likeCard (event) {
  event.target.closest('.card__like-button').classList.toggle('card__like-button_active');
}

/** Функция удаляет карточку при нажатии на кнопку */
function deleteCard (event) {
  event.target.closest('.card').remove();
}

/** Отобразить исходные карточки при загрузке страницы */
drawCards( ...initialCards );
