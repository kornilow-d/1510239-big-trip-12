import Abstract from '../abstract';

const getMenuTemplate = (value) => `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${value.map((item) => `
    <a class="trip-tabs__btn ${item.active === true ? `trip-tabs__btn--active` : ``}" href="#">${item.title}</a>
  `).join(``)}
</nav>`;

export default class Menu extends Abstract {
  constructor(value) {
    super();
    this._value = value;
  }

  _getTemplate() {
    return getMenuTemplate(this._value);
  }
}
