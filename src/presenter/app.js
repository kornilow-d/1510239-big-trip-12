import EventsModal from '../modal/events';
import FilterModal from "../modal/filter";

import HeaderView from './header';
import BoardView from './board';

import {eventsData} from '../data';

const eventsModal = new EventsModal();
eventsModal.setEvents(eventsData);

const filterModal = new FilterModal();

export default class App {
  constructor(siteHeaderElement, siteBoardElement) {
    this._siteHeaderElement = siteHeaderElement;
    this._siteBoardElement = siteBoardElement;

    this._headerComponent = new HeaderView(this._siteHeaderElement, eventsModal, filterModal);
    this._boardComponent = new BoardView(this._siteBoardElement, eventsModal, filterModal);
  }

  init() {
    this._headerComponent.init();
    this._boardComponent.init();

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._boardComponent.createTask();
    });
  }
}
