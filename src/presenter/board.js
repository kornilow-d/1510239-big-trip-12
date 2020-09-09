import SortView from '../view/sort';
import DayView from '../view/day';
import List from '../view/list';
import NoPoint from '../view/no-point';

import EventsPresenter from './event';
import NewEventPresenter from './event-new';

import {render, RenderPosition, sortCardTime, sortCardPrice, remove} from '../utils/render';
import {getDataList, sortType, UpdateType, UserAction} from '../data';
import {filter} from "../utils/filter";

export default class Board {
  constructor(boardContainer, eventsModal, filterModal) {
    this._boardContainer = boardContainer;
    this._eventsModal = eventsModal;
    this._filterModel = filterModal;

    this._nowEvent = [];
    this._eventsPresenter = {};
    this._callback = {};

    this._sortComponent = null;
    this._trevelComponent = null;

    this._noPointComponent = new NoPoint();

    this._currentSortType = sortType.DEFAULT;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._eventsModal.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._newEventPresenter = new NewEventPresenter(this._boardContainer, this._handleViewAction);
  }

  init() {
    this._currentSortType = sortType.DEFAULT;
    this._renderTripsBoard();
  }

  update() {
    this._clearTripsBoard();
    this._renderTripsBoard();
  }

  createTask() {
    this._currentSortType = sortType.DEFAULT;
    // this._filterModel.setFilter(UpdateType.MAJOR, filtersProps);
    this._newEventPresenter.init();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModal.getEvents();
    const filtredTasks = filter[filterType](events);

    switch (this._currentSortType) {
      case sortType.TIME:
        return filtredTasks.sort(sortCardTime);
      case sortType.PRICE:
        return filtredTasks.sort(sortCardPrice);
      default:
        return filtredTasks;
    }
  }

  _clearTripsBoard({resetSortType = false} = {}) {
    this._newEventPresenter.destroy();
    Object
      .values(this._eventsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventsPresenter = {};

    remove(this._trevelComponent);
    remove(this._sortComponent);

    if (resetSortType) {
      this._currentSortType = sortType.DEFAULT;
    }
  }

  _handleModeChange() {
    this._newEventPresenter.destroy();
    Object
      .values(this._eventsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderTripsBoard() {
    if (this._trevelComponent !== null) {
      this._trevelComponent = null;
    }

    this._trevelComponent = new DayView();

    render(this._boardContainer, this._trevelComponent, RenderPosition.BEFOREEND);
    this._renderSort();

    const countEvent = this._getEvents().length;
    if (countEvent === 0) {
      render(this._boardContainer, this._noPointComponent, RenderPosition.BEFOREEND);
    } else {
      this._renderDaysList();
    }
  }

  _renderDaysList() {
    this._createDaysList().forEach((item) => {
      render(this._trevelComponent, item, RenderPosition.BEFOREEND);
    });
  }

  _createDaysList() {
    this._dates = getDataList(this._getEvents()).sort();

    return Array.from(this._dates).map((date, index) => {
      this._nowEvent = this._getNowEvents(this._getEvents(), date);
      this._list = new List(index, date).getElement();
      this._tripList = this._list.querySelector(`.trip-events__list`);
      this._renderPoints(this._nowEvent);
      return this._list;
    });
  }

  _renderPoints(events) {
    events.forEach((item) => {
      const point = new EventsPresenter(this._tripList, this._handleViewAction, this._handleModeChange);
      point.init(item);
      this._eventsPresenter[item.id] = point;
      return;
    });
  }

  _getNowEvents(events, date) {
    return events.filter((event) => {
      const eventDate = `${new Date(event.start)}`.slice(4, 10);
      return eventDate === date;
    });
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType, sortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _handleSortTypeChange(type) {
    if (this._currentSortType === type) {
      return;
    }
    this._currentSortType = type;
    this._clearTripsBoard();
    this._renderTripsBoard();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._eventsModal.updateEvent(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._eventsModal.addEvent(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._eventsModal.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventsPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripsBoard();
        this._renderTripsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearTripsBoard({resetSortType: true});
        this._renderTripsBoard();
        break;
    }
  }
}
