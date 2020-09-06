import EventsModal from '../modal/events';

import HeaderView from './header';
import TripView from './trip';

import {eventsData} from '../data';

const eventsModal = new EventsModal();
eventsModal.setEvents(eventsData);

export default class App {
  constructor(headContainer, bodyContainer) {
    this._headContainer = headContainer;
    this._bodyContainer = bodyContainer;
  }

  init() {
    new HeaderView(this._headContainer).init();
    new TripView(this._bodyContainer, eventsModal).init();
  }
}
