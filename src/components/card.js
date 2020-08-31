import AbstractComponent from '../abstract-component';

const getCardTemplate = (dayIndex, date) => `<li class="trip-days__item day">
    <div class="day__info">
      <span class="day__counter">${dayIndex + 1}</span>
      <time class="day__date" datetime="${new Date(date).toString().slice(4, 11)}">${new Date(date).toString().slice(4, 11)}</time>
    </div>

    <ul class="trip-events__list"></ul>
  </li>`;

export default class List extends AbstractComponent {
  constructor(index, date, events) {
    super();
    this._index = index;
    this._date = date;
  }

  _getTemplate() {
    return getCardTemplate(this._index, this._date);
  }
}
