import { LOAD_ALL_POSTS, LOAD_MY_POSTS, CLEAR_POSTS } from "../actions/types";

const initialState = {
  posts: [],
  loading: true,
};

const postReducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_ALL_POSTS:
    case LOAD_MY_POSTS:
      return {
        ...state,
        posts: [...payload],
        loading: false,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    default:
      return state;
  }
};

export default postReducer;
