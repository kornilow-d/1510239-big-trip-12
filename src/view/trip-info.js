import AbstractComponent from "../abstract-component";

const getTripInfoTemplate = ({cities, startDate, endDate, totalCost}) => `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}</h1>
    <p class="trip-info__dates">${new Date(startDate[0]).toDateString().slice(4)}&nbsp;&mdash;&nbsp;${new Date(endDate[endDate.length - 1]).toDateString().slice(4)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>
</section>`;

export default class TripHeaderInfo extends AbstractComponent {
  constructor(headerProps) {
    super();
    this._data = headerProps;
  }

  _getTemplate() {
    return getTripInfoTemplate(this._data);
  }
}
