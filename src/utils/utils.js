const TIME_IN_MS = 60 * 60 * 24 * 1000;

export const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const getArrayImg = (min, max) => {
  const newArray = [];
  const newArrayLenght = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLenght; i++) {
    newArray.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return newArray;
};

export const getRandomArray = (min, max, array) => {
  const newArray = [];
  const newArrayLength = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(getRandomElement(array));
  }
  return newArray;
};

// Дата в диапазоне от сегодняшнего
export const getRandomDate = (days) => {
  // console.log(new Date(2020, 8, 5).getTime());
  return new Date(2020, 8, 5).getTime() + (getRandomInteger(0, (days * 24))) * TIME_IN_MS / 24;
};

export const escDown = (event) => {
  return event === `Escape` || event === `Esc`;
};

export const isEventFuture = (start) => {
  if (start === null) {
    return false;
  }

  const currentDate = new Date();

  return currentDate < start;
};

export const isEventPast = (start) => {
  if (start === null) {
    return false;
  }

  const currentDate = new Date();

  return currentDate > start;
};