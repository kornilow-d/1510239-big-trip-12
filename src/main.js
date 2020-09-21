import MenuView from "./view/menu.js";
import TripPresenter from "./presenter/trip.js";
import FiltersPresenter from "./presenter/filters.js";
import InformationPresenter from "./presenter/information.js";
import StatisticsPresenter from "./presenter/statistics.js";
import OffersModel from "./model/offers.js";
import PointsModel from "./model/points.js";
import FiltersModel from "./model/filters.js";
import {render, RenderPosition} from "./utils/render.js";
import {FilterType, MenuItem} from "./const.js";

import {AUTHORIZATION, API_URL, STORE_NAME, OFFLINE_TITLE, SERVICE_WORKER_ERROR_MESSAGE} from "./const.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const headerElement = document.querySelector(`.trip-main`);
const menuHeaderElement = headerElement.querySelector(`.mjs-menu-header`);
const filtersHeaderElement = headerElement.querySelector(`.mjs-filter-header`);
const boardContainerElement = document.querySelector(`.trip-events`);
const tripHeader = boardContainerElement.querySelector(`h2`);
const newPointButton = headerElement.querySelector(`.trip-main__event-add-btn`);

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
      menuHeaderElement,
      siteMenuComponent,
      RenderPosition.AFTEREND
  );

  siteMenuComponent.setMenuItemClickHandler(handleMenuClick);
  newPointButton.addEventListener(`click`, newPointButtonClickHandler);
  newPointButton.disabled = false;
};

const api = new Api(API_URL, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const offersModel = new OffersModel();
const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const siteMenuComponent = new MenuView();
const filtersPresenter = new FiltersPresenter(
    filtersHeaderElement,
    pointsModel,
    filtersModel
);
const tripPresenter = new TripPresenter(
    boardContainerElement,
    tripHeader,
    pointsModel,
    offersModel,
    filtersModel,
    apiWithProvider
);
const informationPresenter = new InformationPresenter(
    headerElement,
    pointsModel,
    filtersModel
);
const statisticsPresenter = new StatisticsPresenter(
    boardContainerElement,
    pointsModel
);

newPointButton.disabled = true;

informationPresenter.init();
tripPresenter.init();
filtersPresenter.init();

Promise.all([
  apiWithProvider.getOffers(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getPoints(),
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .catch(() => {
      window.console.log(SERVICE_WORKER_ERROR_MESSAGE); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(OFFLINE_TITLE, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += OFFLINE_TITLE;
});
