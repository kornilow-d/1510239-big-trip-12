import {createElement} from '../utils';

const getMenuTemplate = (value) => `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${value.map((item) => `
    <a class="trip-tabs__btn ${item.active === true ? `trip-tabs__btn--active` : ``}" href="#">${item.title}</a>
  `).join(``)}
</nav>`;

export default class Menu {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  _getTemplate() {
    return getMenuTemplate(this._value);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
