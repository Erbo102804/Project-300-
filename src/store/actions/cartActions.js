import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, PLACE_ORDER } from './actionTypes';

// Action creator: добавить автомобиль в корзину
export const addToCart = (car) => ({
  type: ADD_TO_CART,
  payload: car,
});

// Action creator: убрать автомобиль из корзины
export const removeFromCart = (carId) => ({
  type: REMOVE_FROM_CART,
  payload: carId,
});

// Action creator: очистить корзину
export const clearCart = () => ({
  type: CLEAR_CART,
});

// Action creator: оформить заказ
export const placeOrder = (customerInfo) => ({
  type: PLACE_ORDER,
  payload: {
    customerInfo,
    orderedAt: new Date().toISOString(),
  },
});
