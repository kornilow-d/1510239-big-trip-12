import {getCardTemplate} from './card';

export const getDaysListTemplate = (events, dates, transfer, activity, cities, options) =>
  `<ul class="trip-days">
    ${Array.from(dates).map((date, index) => {
    const dayEvents = events.filter((event) => {
      const eventDate = `${new Date(event.start)}`.slice(4, 10);
      return eventDate === date;
    });
    return getCardTemplate(index, date, dayEvents, transfer, activity, cities, options);
  }).join(``)}
</ul>`;
