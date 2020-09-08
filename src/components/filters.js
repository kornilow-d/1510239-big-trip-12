import AbstractComponent from '../abstract-component';

const getFiltersTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`<div class="trip-filters__filter">
      <input id="filter-${name}" 
        class="trip-filters__filter-input  visually-hidden" 
        type="radio" name="trip-filter" 
        value="${name}" 
        ${type === currentFilterType ? `checked` : ``} 
        ${count === 0 ? `disabled` : ``}
      />
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `);
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => getFiltersTemplate(filter, currentFilterType))
    .join(``);

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filters extends AbstractComponent {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
