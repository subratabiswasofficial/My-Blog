import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

const alertReducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((item) => item.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
