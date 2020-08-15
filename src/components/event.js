import {createElement, replaceItem} from '../utils';

import EditEvent from "../components/event-edit";

import {
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
} from "../data";

const getEventTemplate = ({type, city, start, end, hours, minutes, price, offers}) => `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.split(` `)[0].toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${new Date(start).toString().slice(4, 21)}">${new Date(start).toTimeString().slice(0, 5)}</time>
          &mdash;
          <time class="event__end-time" datetime="${new Date(end).toString().slice(4, 21)}">${new Date(end).toTimeString().slice(0, 5)}</time>
        </p>
        <p class="event__duration">${hours}H ${minutes}M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${Array.from(offers).map((offer) => `<li class="event__offer">
          <span class="event__offer-title">${offer.option}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`).join(``)}
      </ul >

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
    </div >
  </li >`;

export default class Event {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  _getTemplate() {
    return getEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
      this._editElement = new EditEvent(this._event, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS).getElement();
    }
    // 
    this._addEvent(this._element, this._element.querySelector(`.event`), this._editElement);
    // 
    return this._element;
  }

  _addEvent(list, card, form) {
    this._element.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceItem(list, form, card);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._editElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceItem(list, card, form);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceItem(list, card, form);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  }

  removeElement() {
    this._element = null;
  }
}