import App from './presenter/app';

const headComponent = document.querySelector(`.trip-main`);
const bodyComponent = document.querySelector(`.trip-events`);

const app = new App(headComponent, bodyComponent);
app.init();
