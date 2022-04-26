export default class Section {
  /**
   * Класс отвечает за отрисовку элементов на странице
   *
   * Параметры:
   * items - массив данных, которые нужно добавить на страницу при инициализации класса,
   * renderer - функция, которая отвечает за создание и отрисовку данных на странице,
   * containerSelector - селектор контейнера, в который нужно добавлять созданные элементы
   */
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    })
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
