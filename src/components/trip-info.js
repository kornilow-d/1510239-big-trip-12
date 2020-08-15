import {createElement} from '../utils';

const getTripInfoTemplate = (city, startDay, endDay, total) => `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${city[0]} &mdash; ... &mdash; ${city[city.length - 1]}</h1>
    <p class="trip-info__dates">${new Date(startDay[0]).toDateString().slice(4)}&nbsp;&mdash;&nbsp;${new Date(endDay[endDay.length - 1]).toDateString().slice(4)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>
</section>`;

export default class TripHeaderInfo {
  constructor(city, startDay, endDay, total) {
    this._city = city;
    this._startDay = startDay;
    this._endDay = endDay;
    this._total = total;
    this._element = null;
  }

  _getTemplate() {
    return getTripInfoTemplate(this._city, this._startDay, this._endDay, this._total);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}