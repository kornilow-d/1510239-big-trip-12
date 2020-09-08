import MenuView from '../components/menu';
import FilterPresenter from '../presenter/filter';
import TripHeaderInfoView from '../components/trip-info';

import FilterModel from "../modal/filter";

import {menuProps, headerProps} from '../data';
import {render, RenderPosition} from '../utils/render';

export default class Header {
  constructor(headerContainer, eventsModal) {
    this._headerContainer = headerContainer;
    this._eventModel = eventsModal;
  }

  init() {
    this._filterModel = new FilterModel();

    this._menuComponent = new MenuView(menuProps);
    this._filterPresenter = new FilterPresenter(this._headerContainer, this._filterModel, this._eventModel).init();
    this._travelPanelComponent = new TripHeaderInfoView(headerProps());

    render(this._headerContainer, this._menuComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(this._headerContainer, this._travelPanelComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}
