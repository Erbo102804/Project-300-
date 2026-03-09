import { REGISTER, LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = {
  currentUser: null,  // { id, name, email, phone }
  users: [],          // зарегистрированные пользователи
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER: {
      const exists = state.users.find((u) => u.email === action.payload.email);
      if (exists) {
        return { ...state, error: 'Пользователь с таким email уже существует' };
      }
      const newUser = action.payload;
      return {
        ...state,
        users: [...state.users, newUser],
        currentUser: newUser,
        error: null,
      };
    }
    case LOGIN: {
      const user = state.users.find(
        (u) => u.email === action.payload.email && u.password === action.payload.password
      );
      if (!user) {
        return { ...state, error: 'Неверный email или пароль' };
      }
      return { ...state, currentUser: user, error: null };
    }
    case LOGOUT:
      return { ...state, currentUser: null, error: null };
    default:
      return state;
  }
}

export default authReducer;
