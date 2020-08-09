export const getTripInfoTemplate = (city, startDay, endDay, total) => `<div class="trip-info__main">
  <h1 class="trip-info__title">${city[0]} &mdash; ... &mdash; ${city[city.length - 1]}</h1>
  <p class="trip-info__dates">${new Date(startDay[0]).toDateString().slice(4)}&nbsp;&mdash;&nbsp;${new Date(endDay[endDay.length - 1]).toDateString().slice(4)}</p>
</div>
<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
</p>
`;
