const TIME_IN_MS = 60 * 60 * 24 * 1000;

// Случайное число в диапазоне
export const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Случайный элемент массива
export const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

// Набор фотографий
export const getArrayImg = (min, max) => {
  const newArray = [];
  const newArrayLenght = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLenght; i++) {
    newArray.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return newArray
}

// Массив случайных элементов из набора
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
  return Date.now() + (getRandomInteger(0, (days * 24))) * TIME_IN_MS / 24;
};