export const getTripInfoTemplate = (city, startDay, endDay) => `<div class="trip-info__main">
<h1 class="trip-info__title">${city[0]} &mdash; ... &mdash; ${city[city.length - 1]}</h1>

<p class="trip-info__dates">${new Date(startDay[0]).toDateString().slice(4)}&nbsp;&mdash;&nbsp;${new Date(endDay[0]).toDateString().slice(4)}</p>
</div>`;
