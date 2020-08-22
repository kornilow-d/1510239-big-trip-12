import AbstractComponent from '../abstract-component';

const noPointTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoPoint extends AbstractComponent {
  _getTemplate() {
    return noPointTemplate();
  }
}
