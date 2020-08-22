import SortView from '../components/sort';
import DayView from '../components/days-list';

import {render, RenderPosition} from '../utils/render';

import {
  eventsData,
  tripDaysDates,
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
} from "../data.js";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._sortComponent = new SortView();
    this._trevelComponent = new DayView(eventsData, tripDaysDates, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS);
  }

  init() {
    render(this._boardContainer, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(this._boardContainer, this._trevelComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
