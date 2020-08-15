import {createElement} from '../utils';

const getFiltersTemplate = (filters) => `<form class="trip-filters" action="#" method="get">
  ${filters.map((item) => `
    <div class="trip-filters__filter">
      <input id="filter-${item.title.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.title.toLowerCase()}" ${item.active === true ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${item.title.toLowerCase()}">${item.title}</label>
    </div>
  `).join(``)}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  _getTemplate() {
    return getFiltersTemplate(this._filters);
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
