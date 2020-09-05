import SortView from '../components/sort';
import DayView from '../components/days-list';
import List from '../components/card';
import NoPoint from '../components/no-point';

import EventsComponent from '../presenter/event';

import {render, RenderPosition, sortCardTime, sortCardPrice, remove, updateItem} from '../utils/render';
import {eventsData, getDataList, sortType} from '../data';

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._nowEvent = [];
    this._eventsPresenter = {};
    this._callback = {};

    this._sortComponent = new SortView();
    this._trevelComponent = new DayView();
    this._noPointComponent = new NoPoint();

    this._currentSortType = sortType.DEFAULT;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleEventsChange = this._handleEventsChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    this._eventsData = eventsData.slice();
    this._sourcedTripEvents = this._eventsData.slice();

    this._sortEvents(sortType.TIME);
    this._renderTripsBoard();
  }

  update() {
    this._clearEvents();
    this._renderTripsBoard();
  }

  _handleModeChange() {
    Object
      .values(this._eventsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // Рендер всей доски
  _renderTripsBoard() {
    render(this._boardContainer, this._trevelComponent, RenderPosition.BEFOREEND);
    this._renderSort();

    if (this._eventsData.length === 0) {
      render(this._boardContainer, this._noPointComponent, RenderPosition.BEFOREEND);
    } else {
      this._renderDaysList();
    }
  }

  // Рендер дней
  _renderDaysList() {
    this._createDaysList().forEach((item) => {
      render(this._trevelComponent, item, RenderPosition.BEFOREEND);
    });
  }

  _createDaysList() {
    this._dates = getDataList(this._eventsData).sort();

    return Array.from(this._dates).map((date, index) => {
      this._nowEvent = this._eventsData.filter((event) => {
        const eventDate = `${new Date(event.start)}`.slice(4, 10);
        return eventDate === date;
      });

      this._list = new List(index, date).getElement();
      this._tripList = this._list.querySelector(`.trip-events__list`);

      this._nowEvent.forEach((item) => {
        const point = new EventsComponent(this._tripList, this._handleEventsChange, this._handleModeChange);
        point.init(item);
        this._eventsPresenter[item.id] = point;
        return;
      });

      return this._list;
    });
  }

  // Рендер сортировки
  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(type) {
    if (this._currentSortType === type) {
      return;
    }
    this._sortEvents(type);
    this._clearEvents();
    this._renderTripsBoard();
  }

  _sortEvents(type) {
    switch (type) {
      case sortType.TIME:
        this._eventsData.sort(sortCardTime);
        break;
      case sortType.PRICE:
        this._eventsData.sort(sortCardPrice);
        break;
      default:
        this._eventsData = this._sourcedTripEvents.slice();
    }
    this._currentSortType = type;
  }

  // Чистка доски
  _clearEvents() {
    remove(this._trevelComponent);
    Object
      .values(this._eventsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventsPresenter = {};
  }

  _handleEventsChange(updatedEvent) {
    this._eventsData = updateItem(this._eventsData, updatedEvent);
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
    this._eventsPresenter[updatedEvent.id].init(updatedEvent);
  }

  // _getTotalInfo(data) {
  //   return {
  //     city: data.map((item) => item.city),
  //     firstCity: data[0].city,
  //     lastCity: data[data.length - 1].city,
  //     startDate: new Date(data[0].start),
  //     endDate: new Date(data[data.length - 1].end),
  //     totalCost: totalCostExp(data)
  //   };
  // }
}
