import EventsModal from '../modal/events';
import FilterModel from "../modal/filter";

import HeaderView from './header';
import TripView from './trip';

import {eventsData} from '../data';

const eventsModal = new EventsModal();
eventsModal.setEvents(eventsData);

const filterModel = new FilterModel();

export default class App {
  constructor(headContainer, bodyContainer) {
    this._headContainer = headContainer;
    this._bodyContainer = bodyContainer;

    this._tripComponent = new TripView(this._bodyContainer, eventsModal, filterModel);
    this._headerComponent = new HeaderView(this._headContainer, eventsModal);
  }

  init() {
    this._headerComponent.init();
    this._tripComponent.init();
  }
}
