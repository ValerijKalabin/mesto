export default class Section
{
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, isManyElements) {
    if (isManyElements) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems(items) {
    let numberItems = items.length;
    items.forEach((item) => {
      this._renderer(item, numberItems);
    });
  }
}
