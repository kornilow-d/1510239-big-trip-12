import AbstractComponent from '../abstract-component';

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

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite">
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

                      <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                      </button>
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

export default class EditEvent extends AbstractComponent {
  constructor(event, transfer, activity, cities, options) {
    super();
    this._event = event;
    this._transfer = transfer;
    this._activity = activity;
    this._cities = cities;
    this._options = options;

    this._submitFormHandler = this._submitFormHandler.bind(this);
    this._resetFormHandler = this._resetFormHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _getTemplate() {
    return getEditEventTemplate(this._event, this._transfer, this._activity, this._cities, this._options);
  }

  setSubmitFormHandler(callback) {
    this._callback.submitForm = callback;
    this.getElement().addEventListener(`submit`, this._submitFormHandler);
  }

  _submitFormHandler(evt) {
    evt.preventDefault();
    this._callback.submitForm(this._event);
  }

  setResetFormHandler(callback) {
    this._callback.resetForm = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._resetFormHandler);
  }

  _resetFormHandler(evt) {
    evt.preventDefault();
    this._callback.resetForm();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
