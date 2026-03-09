import { BOOK_TEST_DRIVE, CANCEL_TEST_DRIVE } from '../actions/actionTypes';

const initialState = {
  bookings: [],
};

function testDriveReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_TEST_DRIVE:
      return { ...state, bookings: [...state.bookings, action.payload] };
    case CANCEL_TEST_DRIVE:
      return { ...state, bookings: state.bookings.filter((b) => b.id !== action.payload) };
    default:
      return state;
  }
}

export default testDriveReducer;
