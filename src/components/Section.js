export default class Section {
  /**
   * Отвечает за вывод элементов на страницу в определенном блоке
   * @constructor
   *
   * @param {object} Объект с параметрами:
   * - items - Массив данных, которые нужно добавить на страницу при инициализации класса,
   * - renderer - Функция, которая отвечает за создание и отрисовку данных на странице,
   * @param {string} containerSelector - Селектор контейнера, в который нужно добавлять созданные элементы
   */
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Добавляет все исходные элементы на страницу
   */
  renderItems() {
    this._items.forEach(item => {
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
