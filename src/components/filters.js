import Abstract from '../abstract';

const getFiltersTemplate = (filters) => `<form class="trip-filters" action="#" method="get">
  ${filters.map((item) => `
    <div class="trip-filters__filter">
      <input id="filter-${item.title.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.title.toLowerCase()}" ${item.active === true ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${item.title.toLowerCase()}">${item.title}</label>
    </div>
  `).join(``)}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

export default class Filters extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _getTemplate() {
    return getFiltersTemplate(this._filters);
  }
}
