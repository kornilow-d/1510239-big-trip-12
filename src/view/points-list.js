import AbstractView from "./abstract.js";

export default class PointsListView extends AbstractView {
  constructor(index) {
    super();
    this._index = index;
  }

  getTemplate() {
    return (
      `<ul class="trip-events__list" id="trip-events__list-${this._index}"></ul>`
    );
  }
}
