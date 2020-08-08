const DAYS_QUANTITY = 3;
const EVENT_COUNT = 16;

import {getMenuTemplate} from `./components/menu.js`;
import {getFiltersTemplate} from `./components/filters.js`;
import {getTripInfoTemplate} from `./components/trip-info.js`;
import {getSortTemplate} from `./components/sort.js`;
import {getAddEventTemplate} from `./components/event-add.js`;
import {getDaysListTemplate} from `./components/days-list.js`;

import {
  getEventsData,
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
} from "./data.js";

const eventsData = getEventsData(EVENT_COUNT);
console.log(eventsData);

const getCities = () => {
  return eventsData.map((event) => event.city);
};
// массив с датами начала события
const getDatesStart = () => {
  return eventsData.map((event) => new Date(event.start));
};
// массив с датами окончания события
const getDatesEnd = () => {
  return eventsData.map((event) => new Date(event.end));
};
const tripDaysDates = new Set(getDatesStart().map((date) => `${date}`.slice(4, 10)));

const renderComponent = function (element, component, where) {
  element.insertAdjacentHTML(where, component);
};

const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

renderComponent(tripControls.querySelector(`h2`), getMenuTemplate(), `afterend`);
renderComponent(tripControls, getFiltersTemplate(), `beforeend`);
renderComponent(document.querySelector(`.trip-info`), getTripInfoTemplate(), `afterbegin`);
renderComponent(tripEvents, getSortTemplate(), `beforeend`);
renderComponent(tripEvents, getAddEventTemplate(), `beforeend`);
renderComponent(tripEvents, getDaysListTemplate(eventsData, tripDaysDates, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS), `beforeend`);