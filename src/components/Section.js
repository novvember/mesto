export default class Section {
  /**
   * Отвечает за вывод элементов на страницу в определенном блоке
   * @constructor
   *
   * @param {function} renderer - Функция, которая отвечает за создание и отрисовку данных на странице
   * @param {string} containerSelector - Селектор контейнера, в который нужно добавлять созданные элементы
   */
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Создает и добавляет элементы на страницу
   * @param {array} items - Массив с данными, необходимыми для создания карточек
   */
  renderItems(items) {
    items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    })
  }

  /**
   * Добвляет элемент на страницу
   * @param {object} item - Элемент для добавления
   * @param {boolean} isInversed - Определяет порядок вставки, по умолчанию - в конец контейнера
   */
  addItem(item, isInversed = false) {
    if (isInversed) {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }
}
