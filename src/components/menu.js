import {menuValues} from '../data';

export const getMenuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
${menuValues.map((item) => `
  <a class="trip-tabs__btn ${item.active === true ? `trip-tabs__btn--active` : ``}" href="#">${item.title}</a>
`).join(``)}
</nav>`;
