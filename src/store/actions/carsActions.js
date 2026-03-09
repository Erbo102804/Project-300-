import { ADD_CAR, REMOVE_CAR, SET_FILTER } from './actionTypes';

// Action creator: добавить автомобиль в каталог
export const addCar = (car) => ({
  type: ADD_CAR,
  payload: car,
});

// Action creator: убрать автомобиль из каталога
export const removeCar = (carId) => ({
  type: REMOVE_CAR,
  payload: carId,
});

// Action creator: установить фильтр
export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
