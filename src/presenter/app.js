import HeaderView from './header';
import TripView from './trip';

export default class App {
  constructor(headContainer, bodyContainer) {
    this._headContainer = headContainer;
    this._bodyContainer = bodyContainer;
  }

  init() {
    new HeaderView(this._headContainer).init();
    new TripView(this._bodyContainer).init();
  }
}
