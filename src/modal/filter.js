import Observer from '../utils/observer';
import {filtersProps} from '../data';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = filtersProps.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
