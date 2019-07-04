import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, SHOW_MODAL, HIDE_MODAL } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    timeout
  );
};

export const showModal = (modalProps, modalType) => dispatch => {
  dispatch({
    type: SHOW_MODAL,
    modalProps,
    modalType
  });
};

export const hideModal = () => dispatch => {
  dispatch({
    type: HIDE_MODAL
  });
};
