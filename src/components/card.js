import {getEventTemplate} from `./event`;
import {getEditEventTemplate} from `./event-edit`;

export const getCardTemplate = (dayIndex, date, dayEvents, transfer, activity, cities, options) =>
  `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${dayIndex + 1}</span>
    <time class="day__date" datetime="${new Date(date).toString().slice(4, 11)}">${new Date(date).toString().slice(4, 11)}</time>
  </div>

  <ul class="trip-events__list">
  ${dayEvents.map((event, index) => {
    if (dayIndex === 0 && index === 0) {
      return getEditEventTemplate(event, transfer, activity, cities, options);
    }
    return getEventTemplate(event);
  }).join(``)}
  </ul >
</li > `;
