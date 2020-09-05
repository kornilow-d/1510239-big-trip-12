import Event from '../components/event';
import EditEvent from "../components/event-edit";
import {render, RenderPosition, replace, remove} from '../utils/render';
import {escDown} from '../utils/utils';

import {
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
  Mode,
} from "../data";

export default class Events {
  constructor(list, changeData, changeMode) {
    this._list = list;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._editEventComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleResetForm = this._handleResetForm.bind(this);

    this._callback = {};
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEditEventComponent = this._editEventComponent;

    this._eventComponent = new Event(this._event);
    this._editEventComponent = new EditEvent(this._event, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._editEventComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editEventComponent.setResetFormHandler(this._handleResetForm);

    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this._list, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editEventComponent, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editEventComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._editEventComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._editEventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (escDown(evt.key)) {
      evt.preventDefault();
      this._editEventComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToCard();
  }

  _handleResetForm() {
    this._editEventComponent.reset(this._event);
    this._replaceFormToCard();
  }
}
