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
const cardTemplate = document.querySelector('#card').content;

const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileNameInput = profileEditPopup.querySelector('.popup__input_type_name');
const profileJobInput = profileEditPopup.querySelector('.popup__input_type_job');

const newCardPopup = document.querySelector('.popup_type_add-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardTitle = newCardPopup.querySelector('.popup__input_type_title');
const newCardLink = newCardPopup.querySelector('.popup__input_type_link');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupFigure = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

const popupCloseButtons = document.querySelectorAll('.popup__cancel-button');


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
 * блок <template id="cards">
 */
function renderCards (container, ...cards) {
  cards.forEach( card => {
    container.prepend( getNewCard(card.name, card.link) );
  });
}

/** Функция создает из шаблона элемент с новой карточкой и возвращает его */
 function getNewCard (name, link) {
  // Создание элемента из шаблона
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  // Заполнение содержимого
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__title').textContent = name;

  // Обработчики нажатий
  card.querySelector('.card__image').addEventListener('click', showImagePopup);
  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return card;
}

/** Функция нажатия на лайк */
function likeCard (event) {
  event.target.closest('.card__like-button').classList.toggle('card__like-button_active');
}

/** Функция удаления карточки при нажатии на кнопку */
function deleteCard (event) {
  event.target.closest('.card').remove();
}

/** Функция открывает нужный попап */
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

/** Функция закрывает текущий попап */
function closePopup (event) {
  event.target.closest('.popup').classList.remove('popup_opened');
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveProfileInfo (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup (event);
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveNewCard (event) {
  event.preventDefault();

  const card = {
    name: newCardTitle.value,
    link: newCardLink.value
  };

  renderCards(cardsContainer, card);
  closePopup(event);
  newCardForm.reset();
}

/** Функция открывает попап с увеличенной картинкой */
function showImagePopup (event) {
  imagePopupFigure.src = event.target.src;
  imagePopupFigure.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;

  openPopup(imagePopup);
}


/** Обработчки событий */
profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profileEditPopup);
});
profileEditForm.addEventListener('submit', saveProfileInfo);

newCardButton.addEventListener('click', function () {
  openPopup(newCardPopup);
});
newCardForm.addEventListener('submit', saveNewCard);

popupCloseButtons.forEach( button => button.addEventListener('click', closePopup) );


/** Отобразить исходные карточки при загрузке страницы */
renderCards(cardsContainer, ...initialCards);
