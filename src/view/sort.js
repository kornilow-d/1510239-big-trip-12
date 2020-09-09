import AbstractComponent from '../abstract-component';

import {sortType} from '../data';

const createSortTemplate = (sortTypes, currentSortType) => {
  const {type, name} = sortTypes;

  return (`<div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-${name}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${type === currentSortType ? `checked` : ``}>
    <label class="trip-sort__btn" for="sort-${name}" data-sort-type="${type}">${name}</label>
  </div>`);
};

const getSortTemplate = (sortTypes, currentSortType) => {
  const sortItemsTemplate = sortTypes.map((sort) => createSortTemplate(sort, currentSortType)).join(``);

  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <span class="trip-sort__item  trip-sort__item--day">Day</span>
  
  ${sortItemsTemplate}
  
  <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`);
};

export default class Sort extends AbstractComponent {
  constructor(currentSortType) {
    super();

    this._sortType = this._getSortItems();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _getTemplate() {
    return getSortTemplate(this._sortType, this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  _getSortItems() {
    return [
      {
        type: sortType.DEFAULT,
        name: `EVENT`,
      },
      {
        type: sortType.TIME,
        name: `TIME`,
      },
      {
        type: sortType.PRICE,
        name: `PRICE`,
      }
    ];
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
