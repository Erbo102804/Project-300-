import initialCars from '../../data/cars';
import { ADD_CAR, REMOVE_CAR, SET_FILTER } from '../actions/actionTypes';

// Начальное состояние каталога
const initialState = {
  list: initialCars,       // список всех автомобилей
  filter: 'all',           // текущий фильтр (all / bodyType)
};

const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAR:
      return {
        ...state,
        list: [...state.list, { ...action.payload, id: Date.now() }],
      };

    case REMOVE_CAR:
      return {
        ...state,
        list: state.list.filter((car) => car.id !== action.payload),
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export default carsReducer;
