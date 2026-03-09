import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, PLACE_ORDER } from '../actions/actionTypes';

// Начальное состояние корзины
const initialState = {
  items: [],         // автомобили в корзине
  orders: [],        // оформленные заказы
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Не добавляем одну и ту же машину дважды
      const alreadyInCart = state.items.find((item) => item.id === action.payload.id);
      if (alreadyInCart) return state;
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case PLACE_ORDER: {
      const newOrder = {
        id: Date.now(),
        cars: [...state.items],
        totalPrice: state.items.reduce((sum, car) => sum + car.price, 0),
        customerInfo: action.payload.customerInfo,
        orderedAt: action.payload.orderedAt,
        status: 'Ожидает обработки',
      };
      return {
        ...state,
        items: [],
        orders: [...state.orders, newOrder],
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
