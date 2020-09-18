import MenuView from "./view/menu.js";
import TripPresenter from "./presenter/trip.js";
import FiltersPresenter from "./presenter/filters.js";
import InformationPresenter from "./presenter/information.js";
import StatisticsPresenter from "./presenter/statistics.js";
import OffersModel from "./model/offers.js";
import PointsModel from "./model/points.js";
import FiltersModel from "./model/filters.js";
import {render, RenderPosition} from "./utils/render.js";
import {FilterType, MenuItem, AUTHORIZATION, END_POINT} from "./data.js";
import Api from "./api.js";

const headerNode = document.querySelector(`.trip-main`);
const menuHeaderNode = headerNode.querySelector(`.mjs-menu-header`);
const filtersHeaderNode = headerNode.querySelector(`.mjs-filter-header`);
const boardContainerNode = document.querySelector(`.trip-events`);
const tripHeader = boardContainerNode.querySelector(`h2`);
const newPointButton = headerNode.querySelector(`.trip-main__event-add-btn`);

const newPointButtonClickHandler = (evt) => {
  evt.preventDefault();
  handleMenuClick(MenuItem.NEW_POINT);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

const newPointFormCloseHandler = () => {
  newPointButton.disabled = false;
};

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_POINT:
      statisticsPresenter.destroy();
      tripPresenter.destroy();
      filtersModel.setFilter(FilterType.EVERYTHING);
      tripPresenter.init();
      filtersPresenter.init();
      tripPresenter.createPoint(newPointFormCloseHandler);
      newPointButton.disabled = true;
      break;
    case MenuItem.TABLE:
      statisticsPresenter.destroy();
      tripPresenter.init();
      filtersPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      filtersModel.setFilter(FilterType.EVERYTHING);
      filtersPresenter.init(false);
      statisticsPresenter.init();
  }
};

const enableMenu = () => {
  render(
      menuHeaderNode,
      siteMenuComponent,
      RenderPosition.AFTEREND
  );

  siteMenuComponent.setMenuItemClickHandler(handleMenuClick);
  newPointButton.addEventListener(`click`, newPointButtonClickHandler);
  newPointButton.disabled = false;
};

const api = new Api(END_POINT, AUTHORIZATION);
const offersModel = new OffersModel();
const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const siteMenuComponent = new MenuView();
const filtersPresenter = new FiltersPresenter(
    filtersHeaderNode,
    pointsModel,
    filtersModel
);
const tripPresenter = new TripPresenter(
    boardContainerNode,
    tripHeader,
    pointsModel,
    offersModel,
    filtersModel,
    api
);
const informationPresenter = new InformationPresenter(
    headerNode,
    pointsModel,
    filtersModel
);
const statisticsPresenter = new StatisticsPresenter(
    boardContainerNode,
    pointsModel
);

newPointButton.disabled = true;

informationPresenter.init();
tripPresenter.init();
filtersPresenter.init();

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getPoints(),
])
  .then(([offers, destinations, points]) => {
    offersModel.setOffersFromServer(offers);
    pointsModel.setDestinations(destinations);
    pointsModel.setPoints(points);
    enableMenu();
  })
.catch(() => {
  pointsModel.setPoints([]);
  enableMenu();
});
