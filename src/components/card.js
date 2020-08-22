import Abstract from '../abstract';

import Event from './event';

const getCardTemplate = (dayIndex, date) => `<li class="trip-days__item day">
    <div class="day__info">
      <span class="day__counter">${dayIndex + 1}</span>
      <time class="day__date" datetime="${new Date(date).toString().slice(4, 11)}">${new Date(date).toString().slice(4, 11)}</time>
    </div>

    <ul class="trip-events__list"></ul>
  </li>`;

export default class List extends Abstract {
  constructor(index, date, events, transfer, activity, city, option) {
    super();
    this._index = index;
    this._date = date;
    this._events = events;
    this._transfer = transfer;
    this._activity = activity;
    this._city = city;
    this._option = option;
  }

  _getTemplate() {
    return getCardTemplate(this._index, this._date);
  }

  _setUpChildComponents() {
    const list = this._element.querySelector(`.trip-events__list`);
    this._createDayList().forEach((item) => list.appendChild(item));
  }

  _createDayList() {
    return this._events.map((event) => {
      return new Event(event).getElement();
    });
  }
}
