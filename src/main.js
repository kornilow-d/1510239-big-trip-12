// Methonds
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

import {createSiteMenuTemplate} from "./view/site-menu";
import {createFilterTemplate} from "./view/filter";
import {createBoardTemplate} from "./view/board";
import {createTaskTemplate} from "./view/task";
import {createTaskEditTemplate} from "./view/task-edit";

const createLoadMoreButtonTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

// Main Control Elements
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

// Board Elements
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate(), `beforeend`);

// Tasks
const TASK_COUNT = 3;
for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(), `beforeend`);
}

// Other Elements
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
