import {getRandomInteger, getRandomElement, getArrayImg, getRandomArray, getRandomDate} from "./utils/utils";

import {nanoid} from 'nanoid'

const EVENT_COUNT = 10;

// Data
export const CITIES = [`London`, `Liverpool`, `Birmingham`, `Oxford`, `Cambridge`, `Manchester`, `Nottingham`, `Sheffield`, `Leeds`, `Bristol`, `Newcastle`];
export const TYPES_OF_ACTIVITY = [`Check-in`, `Restaurant`, `Sightseeing`];
export const TYPES_OF_TRANSFER = [`Bus to`, `Drive to`, `Flight to`, `Ship to`, `Taxi to`, `Train to`, `Transport to`];
const TYPES_OF_EVENT = TYPES_OF_TRANSFER.concat(TYPES_OF_ACTIVITY);

const DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
const DAYS_COUNT = 5;

export const OPTIONS = [
  {id: `luggage`, option: `Add luggage`, price: 10},
  {id: `comfort`, option: `Switch to comfort class`, price: 150},
  {id: `meal`, option: `Add meal`, price: 2},
  {id: `seats`, option: `Choose seats`, price: 9},
];

export const menuProps = [
  {title: `Table`, active: true},
  {title: `Stats`, active: false},
];

export const filtersProps = [
  {title: `Everything`, active: true},
  {title: `Future`, active: false},
  {title: `Past`, active: false}
];

export const sortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

// Модель данных Event-а
const getEvent = () => {
  const start = getRandomDate(DAYS_COUNT);
  const residual = getRandomInteger(20, 180) * 60 * 1000;
  const residualInHours = residual / 1000 / 60 / 60;
  const hours = Math.trunc(residualInHours);
  const minutes = Math.trunc((residualInHours - hours) * 60);
  return {
    id: nanoid(),
    type: getRandomElement(TYPES_OF_EVENT),
    city: getRandomElement(CITIES),
    price: getRandomInteger(1, 1000),
    description: new Set(getRandomArray(1, 3, DESCRIPTIONS)),
    start,
    end: start + residual,
    hours,
    minutes,
    offers: new Set(getRandomArray(1, 2, OPTIONS)),
    urls: new Set(getArrayImg(3, 5)),
  };
};


// Получаем массив евентов
const getEventsData = (count) => {
  const events = new Array(count);
  return events.fill(``).map(getEvent);
};

// Получаем список городов
const getCities = () => {
  return eventsData.map((event) => event.city);
};

// Получаем первый город
const getDatesStart = () => {
  return eventsData.map((event) => new Date(event.start));
};

// Получаем последний город
const getDatesEnd = () => {
  return eventsData.map((event) => new Date(event.end));
};

// Получаем полную стоимость поездки
const totalCost = () => {
  const totalPrice = eventsData.reduce((acc, item) => acc + item.price, 0);
  const totalOffer = eventsData.reduce((acc, item) => acc + Array.from(item.offers).reduce((all, elem) => all + elem.price, 0), 0);
  return totalPrice + totalOffer;
};

export const eventsData = getEventsData(EVENT_COUNT);
export const tripDaysDates = new Set(getDatesStart().map((date) => `${date}`.slice(4, 10)));

export const headerProps = () => {
  return {
    cities: getCities(),
    startDate: getDatesStart(),
    endDate: getDatesEnd(),
    totalCost: totalCost()
  };
};
