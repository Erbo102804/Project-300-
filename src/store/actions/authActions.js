import { REGISTER, LOGIN, LOGOUT } from './actionTypes';

export const register = (userData) => ({
  type: REGISTER,
  payload: { ...userData, id: Date.now() },
});

export const login = (credentials) => ({
  type: LOGIN,
  payload: credentials,
});

export const logout = () => ({ type: LOGOUT });
