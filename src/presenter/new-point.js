import PointEditView from "../view/point-edit.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {isEscEvent} from "../utils/common.js";
import {UserAction, State} from "../const.js";

export default class NewPointPresenter {
  constructor(pointsModel, offersModel, changeData) {
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._changePointData = changeData;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  init(header, callback) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._destroyCallback = callback;

    this._pointEditComponent = new PointEditView(
        this._pointsModel.getDestinations(),
        this._offersModel.getOffers()
    );

    this._pointEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._pointEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    render(header, this._pointEditComponent, RenderPosition.AFTEREND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setViewState(state) {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.ABORTING:
        this._pointEditComponent.shake(resetFormState);
        break;
    }
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _formSubmitHandler(newPoint) {
    this._changePointData(
        UserAction.ADD_POINT,
        newPoint
    );
  }

  _deleteClickHandler() {
    this.destroy();
  }
}
