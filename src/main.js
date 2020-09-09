import App from './presenter/app';

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteBoardElement = document.querySelector(`.trip-events`);

const app = new App(siteHeaderElement, siteBoardElement);
app.init();
