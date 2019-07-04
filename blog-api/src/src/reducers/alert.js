import {
  SET_ALERT,
  REMOVE_ALERT,
  SHOW_MODAL,
  HIDE_MODAL
} from '../actions/types';

const initialState = {
  modalProps: {},
  modalType: null
};

export default (state = initialState, action) => {
  const { type, payload, modalProps, modalType } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    case SHOW_MODAL:
      return {
        modalProps: modalProps,
        modalType: modalType,
        type: type
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};
