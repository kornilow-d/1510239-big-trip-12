import MenuView from '../components/menu';
import FiltersView from '../components/filters';
import TripHeaderInfoView from '../components/trip-info';

import {menuProps, filtersProps, headerProps} from '../data';

import {render, RenderPosition} from '../utils/render';

export default class Header {
    constructor(headerContainer) {
        this._headerContainer = headerContainer;

        this._menuComponent = new MenuView(menuProps);
        this._filterComponent = new FiltersView(filtersProps);
        this._travelPanelComponent = new TripHeaderInfoView(headerProps());
    }

    init() {
        render(this._headerContainer, this._menuComponent.getElement(), RenderPosition.AFTERBEGIN);
        render(this._headerContainer, this._filterComponent.getElement(), RenderPosition.BEFOREEND);
        render(document.querySelector(`.trip-main`), this._travelPanelComponent.getElement(), RenderPosition.AFTERBEGIN);
    }
}
