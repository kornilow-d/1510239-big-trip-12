import SortView from '../components/sort';
import DayView from '../components/days-list';

import {render, RenderPosition, sortCardTime, sortCardPrice, remove} from '../utils/render';
import {sortType} from '../data';

import {
  eventsData,
  tripDaysDates,
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
} from "../data.js";

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._eventsData = eventsData;

    this._sortComponent = new SortView();
    this._trevelComponent = new DayView(this._eventsData, tripDaysDates, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS);

    this._currentSortType = sortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._sourcedTripEvents = this._eventsData.slice();
    this._renderTripsBoard();
  }

  _renderTripsBoard() {
    render(this._boardContainer, this._trevelComponent.getElement(), RenderPosition.BEFOREEND);
    this._renderSort();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(type) {
    if (this._currentSortType === type) {
      return;
    }
    this._sortEvents(type);
    this._clearEvents();
    this._renderEvents();
  }

  _sortEvents(type) {
    switch (type) {
      case sortType.TIME:
        console.log(1);
        this._eventsData.sort(sortCardTime);
        break;
      case sortType.PRICE:
        console.log(2);
        this._eventsData.sort(sortCardPrice);
        break;
      default:
        console.log(3);
        this._eventsData = this._sourcedTripEvents.slice();
    }
    this._currentSortType = type;
  }

  _clearEvents() {
    remove(this._trevelComponent);
  }

  _renderEvents() {
    console.log(`Render`, this._eventsData);
    render(this._boardContainer, this._trevelComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
