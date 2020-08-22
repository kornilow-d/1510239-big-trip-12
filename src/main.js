import TripView from './presenter/trip';
import HeaderView from './presenter/header';

const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const HeaderPresenter = new HeaderView(tripControls);
HeaderPresenter.init();

const TripPresenter = new TripView(tripEvents);
TripPresenter.init();
