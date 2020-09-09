import AbstractComponent from '../abstract-component';

const getDaysListTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class Day extends AbstractComponent {
  _getTemplate() {
    return getDaysListTemplate();
  }
}
