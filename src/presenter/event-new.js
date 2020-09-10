import EditEventView from "../view/event-edit";
import {nanoid} from 'nanoid';
import {render, RenderPosition, remove} from '../utils/render';
import {UpdateType, UserAction} from '../data';

import {
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
} from "../data";

const BLANK_POINT = {
  type: TYPES_OF_TRANSFER[0],
  start: ``,
  end: ``,
  price: 0,
  description: ``,
  offers: [],
  urls: [],
  city: ``,
  isFavorite: false,
};

export default class NewEventPresenter {
  constructor(boardContainer, changeData) {
    this._boardContainer = boardContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EditEventView(BLANK_POINT, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._boardContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(event) {
    this._changeData(UserAction.ADD_TASK, UpdateType.MINOR, Object.assign({id: nanoid()}, event));
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
