import { createStore, combineReducers } from 'redux';
import carsReducer from './reducers/carsReducer';
import cartReducer from './reducers/cartReducer';
import testDriveReducer from './reducers/testDriveReducer';

// Объединяем все редьюсеры в один корневой
const rootReducer = combineReducers({
  cars: carsReducer,         // состояние каталога автомобилей
  cart: cartReducer,         // состояние корзины и заказов
  testDrive: testDriveReducer, // состояние тест-драйвов
});

// Создаём хранилище Redux
const store = createStore(
  rootReducer,
  // Подключаем Redux DevTools если доступны
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

export default store;
