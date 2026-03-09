import { BOOK_TEST_DRIVE, CANCEL_TEST_DRIVE } from './actionTypes';

export const bookTestDrive = (booking) => ({
  type: BOOK_TEST_DRIVE,
  payload: { ...booking, id: Date.now(), status: 'Ожидает подтверждения' },
});

export const cancelTestDrive = (id) => ({
  type: CANCEL_TEST_DRIVE,
  payload: id,
});
