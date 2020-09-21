import Observer from "../utils/observer.js";
import {FilterType, EventType} from "../const.js";

export default class FiltersModel extends Observer {
  constructor() {
    super();
    this._current = FilterType.EVERYTHING;
  }

  setFilter(filter) {
    this._current = filter;
    this._notify(EventType.FILTER, filter);
  }

  getFilter() {
    return this._current;
  }
}
