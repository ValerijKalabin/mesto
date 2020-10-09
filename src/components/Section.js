export default class Section
{
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item, isManyItems) {
    if (isManyItems) {
      this._container.append(item);
    } else {
      this._container.prepend(item);
    }
  }

  renderItems(items) {
    items.forEach((item, index, items) => {
      this._renderer(item, items.length);
    });
  }
}
