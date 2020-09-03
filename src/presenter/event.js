import Event from '../components/event';
import EditEvent from "../components/event-edit";
import {render, RenderPosition, replace, remove} from '../utils/render';

import {
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
} from "../data";

export default class Events {
  constructor(list, changeData) {
    this._list = list;
    this._changeData = changeData;

    this._eventComponent = null;
    this._editEventComponent = null;

    this._addEvent = this._addEvent.bind(this);
    // this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._rollupFormHadler = this._rollupFormHadler.bind(this);

    this._callback = {};
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEditEventComponent = this._editEventComponent;

    this._eventComponent = new Event(this._event);
    this._editEventComponent = new EditEvent(this._event, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS);
    this._setUpChildComponents();

    // this._editEventComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this._list, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._list.contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._list.contains(prevEditEventComponent.getElement())) {
      replace(this._editEventComponent, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editEventComponent);
  }

  // _handleFavoriteClick() {
  //   this._changeData(
  //     Object.assign(
  //       {},
  //       this._event,
  //       {
  //         isFavorite: !this._event.isFavorite
  //       }
  //     )
  //   );
  // }

  _setUpChildComponents() {
    this._addEvent(
      this._event,
      this._eventComponent,
      this._editEventComponent
    );
  }

  _addEvent(event, card, form) {
    this._setRollupFormHandler(() => {
      replace(form, card);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._editEventComponent.setSubmitFormHandler((data) => {
      replace(card, form);
      this._changeData(data);
    });

    this._editEventComponent.setResetFormHandler(() => {
      this._editEventComponent.reset(event);
      replace(card, form);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._editEventComponent.reset(event);
        replace(card, form);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  }

  // Handler
  _setRollupFormHandler(callback) {
    this._callback.rollupForm = callback;
    this._eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupFormHadler);
  }

  _rollupFormHadler(evt) {
    evt.preventDefault();
    this._callback.rollupForm();
  }
}