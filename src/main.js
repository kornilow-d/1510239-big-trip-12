const EVENT_COUNT = 16;

import MenuView from './components/menu';
import FiltersView from './components/filters';
import TripHeaderInfoView from './components/trip-info';
import SortView from './components/sort';
import DayView from './components/days-list';
// import {getAddEventTemplate} from './components/event-add';

import {render, RenderPosition} from './utils';

import {
  menuProps,
  filtersProps,
  getEventsData,
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
} from "./data.js";

const eventsData = getEventsData(EVENT_COUNT);

const getCities = () => {
  return eventsData.map((event) => event.city);
};

const getDatesStart = () => {
  return eventsData.map((event) => new Date(event.start));
};

const getDatesEnd = () => {
  return eventsData.map((event) => new Date(event.end));
};
const tripDaysDates = new Set(getDatesStart().map((date) => `${date}`.slice(4, 10)));

const totalCost = () => {
  const totalPrice = eventsData.reduce((acc, item) => acc + item.price, 0);
  const totalOffer = eventsData.reduce((acc, item) => acc + Array.from(item.offers).reduce((all, elem) => all + elem.price, 0), 0);
  return totalPrice + totalOffer;
};

const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripControls, new MenuView(menuProps).getElement(), RenderPosition.AFTERBEGIN);
render(tripControls, new FiltersView(filtersProps).getElement(), RenderPosition.BEFOREEND);

render(document.querySelector(`.trip-main`), new TripHeaderInfoView(getCities(), getDatesStart(), getDatesEnd(), totalCost()).getElement(), RenderPosition.AFTERBEGIN);

render(tripEvents, new SortView().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new DayView(eventsData, tripDaysDates, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS).getElement(), RenderPosition.BEFOREEND);
