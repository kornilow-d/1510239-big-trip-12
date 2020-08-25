import AbstractComponent from '../abstract-component';

import List from './card';
import NoPoint from './no-point';

const getDaysListTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class Day extends AbstractComponent {
  constructor(events, dates, transfer, activity, cities, options) {
    super();
    this._events = events;
    this._dates = dates;
    this._transfer = transfer;
    this._activity = activity;
    this._cities = cities;
    this._options = options;
  }

  _getTemplate() {
    console.log('Используется', this._events);
    return getDaysListTemplate(this._events, this._dates, this._transfer, this._activity, this._cities, this._options);
  }

  _setUpChildComponents() {
    if (this._events.length === 0) {
      this._element.appendChild(new NoPoint().getElement());
    } else {
      this._createEvents().forEach((item) => this._element.appendChild(item));
    }
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
}
