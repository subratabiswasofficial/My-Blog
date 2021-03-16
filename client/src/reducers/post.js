import { LOAD_ALL_POSTS, LOAD_MY_POSTS } from "../actions/types";

const initialState = [];

const postReducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_ALL_POSTS:
    case LOAD_MY_POSTS:
      return [...payload];
    default:
      return state;
  }
};

export default postReducer;
