import FilterView from "../view/filters.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";

export default class FiltersPresenter {
  constructor(filterHeader, pointsModel, filtersModel) {
    this._header = filterHeader;
    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;

    this._filterComponent = null;

    this._changeTypeFilter = this._changeTypeFilter.bind(this);
    this._updateView = this._updateView.bind(this);

    this._filtersModel.addObserver(this._updateView);
    this._pointsModel.addObserver(this._updateView);
  }

  init(filtersEnabled = true) {
    if (this._filterComponent) {
      remove(this._filterComponent);
      this._filterComponent = null;
    }

    this._filterComponent = new FilterView(
        this._filtersModel.getFilter(),
        this._getFiltersNumber(),
        filtersEnabled
    );

    this._filterComponent.setFilterTypeChangeHandler(this._changeTypeFilter);

    render(
        this._header,
        this._filterComponent,
        RenderPosition.AFTEREND
    );
  }

  _changeTypeFilter(filterType) {
    this._filtersModel.setFilter(filterType);
  }

  _getFiltersNumber() {
    const points = this._pointsModel.getPoints();

    return Object.entries(filter)
    .map(([key, value]) => ({[key]: value(points).length}))
    .reduce((result, element) => Object.assign(result, element), {});
  }

  _updateView() {
    this.init();
  }
}
