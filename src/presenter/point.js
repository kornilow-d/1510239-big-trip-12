
import PointView from "../view/point.js";
import PointEditView from "../view/point-edit.js";
import {replace, append, remove} from "../utils/render.js";
import {isEscEvent} from "../utils/common.js";
import {UserAction, State} from "../data.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class PointPresenter {
  constructor(
      container,
      pointsModel,
      offersModel,
      pointDataChangeHandler,
      resetPointDataChangesHandler
  ) {
    this._contaier = container;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._changePointData = pointDataChangeHandler;
    this._resetPointDataChanges = resetPointDataChangesHandler;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(this._offersModel.getOffers(), point);
    
    this._pointEditComponent = new PointEditView(
        this._pointsModel.getDestinations(),
        this._offersModel.getOffers(),
        point
    );

    this._pointComponent.setEditClickHandler(this._editClickHandler);
    this._pointEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._pointEditComponent.setFormCloseHandler(this._formCloseHandler);
    this._pointEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    if (!prevPointComponent || !prevPointEditComponent) {
      append(this._contaier, this._pointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._pointEditComponent.reset(this._point);
      this._replaceFormToPoint();
    }
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
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._pointEditComponent.shake(resetFormState);
        break;
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDITING;
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.resetView();
    }
  }

  _editClickHandler() {
    this._resetPointDataChanges();
    this._replacePointToForm();
  }

  _formSubmitHandler(newPointData) {
    this._changePointData(UserAction.UPDATE_POINT, newPointData);
  }

  _formCloseHandler() {
    this.resetView();
  }

  _deleteClickHandler(point) {
    this._changePointData(UserAction.DELETE_POINT, point);
  }
}
