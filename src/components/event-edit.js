import {createElement} from '../utils';

const getEditEventTemplate = ({type, start, end, price, offers, urls, city}, typesOfTransfer, typesOfActivity, cities, options) => `<form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type.split(` `)[0].toLowerCase()}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>

                  ${typesOfTransfer.map((transfer) => `
                    <div class="event__type-item">
                      <input id="event-type-${transfer.split(` `)[0].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${transfer.split(` `)[0].toLowerCase()}">
                      <label class="event__type-label  event__type-label--${transfer.split(` `)[0].toLowerCase()}" for="event-type-${transfer.split(` `)[0].toLowerCase()}-1">${transfer.split(` `)[0]}</label>
                    </div>
                  `).join(``)}
                  
                </fieldset>

                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>

                  ${typesOfActivity.map((activity) => `
                  <div class="event__type-item">
                    <input id="event-type-${activity.split(` `)[0].toLowerCase()}-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${activity.split(` `)[0].toLowerCase()}">
                    <label class="event__type-label  event__type-label--${activity.split(` `)[0].toLowerCase()}" for="event-type-${activity.split(` `)[0].toLowerCase()}-1">${activity.split(` `)[0]}</label>
                  </div>
                  `).join(``)}

                </fieldset >
              </div >
            </div >

<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-1">
  ${type}
  </label>
  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${cities.map((item) => `<option value="${item}"></option>`)}
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">
      From
              </label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${new Date(start).toTimeString().slice(0, 5)}">
      &mdash;
              <label class="visually-hidden" for="event-end-time-1">
        To
              </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${new Date(end).toTimeString().slice(0, 5)}">
            </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
                &euro;
              </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
            </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
          </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">

            ${options.map((option) => `
            <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${option.id}" ${(Array.from(offers).filter((offer) => offer.option === option.option)).length > 0 ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-${option.id}-1">
                <span class="event__offer-title">${option.option}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
              </label>
            </div>
            `).join(``)}

                    </div>
            </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${Array.from(urls).map((url) => `<img class="event__photo" src="${url}" alt="Event photo">`)}
                </div>
              </div>
            </section>
          </section>
        </form>`;

export default class EditEvent {
  constructor(event, transfer, activity, cities, options) {
    this._event = event;
    this._transfer = transfer;
    this._activity = activity;
    this._cities = cities;
    this._options = options;
    this._element = null;
  }

  _getTemplate() {
    return getEditEventTemplate(this._event, this._transfer, this._activity, this._cities, this._options);
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
