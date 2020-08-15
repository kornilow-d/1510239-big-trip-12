import List from './card';
import {createElement} from '../utils';

const getDaysListTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class Day {
  constructor(events, dates, transfer, activity, cities, options) {
    this._events = events;
    this._dates = dates;
    this._transfer = transfer;
    this._activity = activity;
    this._cities = cities;
    this._options = options;
    this._element = null;
  }

  _getTemplate() {
    return getDaysListTemplate(this._events, this._dates, this._transfer, this._activity, this._cities, this._options);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    this._createEvents().forEach((item) => this._element.appendChild(item));
    return this._element;
  }

  _createEvents() {
    return Array.from(this._dates).map((date, index) => {
      const dayEvents = this._events.filter((event) => {
        const eventDate = `${new Date(event.start)}`.slice(4, 10);
        return eventDate === date;
      });
      return new List(index, date, dayEvents, this._transfer, this._activity, this._cities, this._options).getElement();
    });
  }

  removeElement() {
    this._element = null;
  }
}
