import MenuView from '../view/menu';
import FilterPresenter from '../presenter/filter';
import TripHeaderInfoView from '../view/trip-info';

import {menuProps, headerProps} from '../data';
import {render, RenderPosition} from '../utils/render';

export default class Header {
  constructor(headerContainer, eventsModal, filterModel) {
    this._headerContainer = headerContainer;
    this._eventModel = eventsModal;
    this._filterModel = filterModel;
  }

  init() {

    this._menuComponent = new MenuView(menuProps);
    this._filterPresenter = new FilterPresenter(this._headerContainer, this._filterModel, this._eventModel).init();
    this._travelPanelComponent = new TripHeaderInfoView(headerProps());

    render(this._headerContainer, this._menuComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(this._headerContainer, this._travelPanelComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}
