import AbstractComponent from '../abstract-component';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (element instanceof AbstractComponent) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const replaceItem = (list, firstItem, secondItem) => {
  list.replaceChild(firstItem, secondItem);
};

export const remove = (component) => {
  if (!(component instanceof AbstractComponent)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const sortCardTime = (cardA, cardB) => {
  return cardA.start - cardB.start;
};

export const sortCardPrice = (cardA, cardB) => {
  return cardA.price - cardB.price;
};
