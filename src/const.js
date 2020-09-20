export const AUTHORIZATION = `Basic eo0w590ik29889a`;
export const API_URL = `https://12.ecmascript.pages.academy/big-trip/`;
export const STORE_PREFIX = `bigtrip-localstorage`;
export const STORE_VER = `v12`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
export const OFFLINE_TITLE = ` [offline]`;
export const SERVICE_WORKER_ERROR_MESSAGE = `ServiceWorker isn't available`;

export const SHAKE_ANIMATION_TIMEOUT = 600;
export const MILISECONDS_NUMBER = 1000;

export const PointCategory = {
  TRANSFER: `Transfer`,
  ACTIVITY: `Activity`
};

export const POINT_TYPES = new Map([
  [PointCategory.TRANSFER, [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`
  ]],
  [PointCategory.ACTIVITY, [
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ]]
]);

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SortType = {
  DEFAULT: `Event`,
  TIME: `Time`,
  PRICE: `Price`
};

export const EventType = {
  FILTER: `filter`,
  POINT: `point`,
  INIT: `init`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
  NEW_POINT: `New Point`
};

export const TypeEmoji = new Map([
  [`Taxi`, `🚕`],
  [`Bus`, `🚌`],
  [`Train`, `🚂`],
  [`Ship`, `🚢`],
  [`Transport`, `🚆`],
  [`Drive`, `🚗`],
  [`Flight`, `✈️`],
  [`Check-in`, `🏨`],
  [`Sightseeing`, `🏛`],
  [`Restaurant`, `🍴`]
]);

export const ChartType = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME_SPENT: `TIME SPENT`,
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};
