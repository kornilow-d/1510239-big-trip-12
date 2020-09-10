import FilterView from '../view/filters';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {filter} from '../utils/filter';
import {filtersProps, UpdateType} from '../data';

export default class Filter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._currentFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filtersProp) {
    if (this._currentFilter === filtersProp) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filtersProp);
  }

  _getFilters() {
    const events = this._eventsModel.getEvents();

    return [
      {
        type: filtersProps.ALL,
        name: `ALL`,
        count: filter[filtersProps.ALL](events).length
      },
      {
        type: filtersProps.FUTURE,
        name: `FUTURE`,
        count: filter[filtersProps.FUTURE](events).length
      },
      {
        type: filtersProps.PAST,
        name: `PAST`,
        count: filter[filtersProps.PAST](events).length
      }
    ];
  }
}
