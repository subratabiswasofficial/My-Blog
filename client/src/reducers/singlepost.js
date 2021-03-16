import {
  LOAD_POST,
  POST_ERROR,
  POST_AUTHOR,
  POST_NOT_AUTH,
  POST_LIKE_LOAD,
  POST_LIKE_ERROR,
  COMMENT_ADDED,
  COMMENT_REMOVED,
  POST_CLEAR,
} from "../actions/types";

const initialState = {
  title: "Post Title",
  content: "Post Content",
  comments: [],
  imgurl: undefined,
  loading: true,
  user: null,
  amiauthor: false,
  didiliked: false,
};

const singlepostReducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_POST:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case POST_AUTHOR:
      return {
        ...state,
        amiauthor: true,
      };
    case POST_NOT_AUTH:
      return {
        ...state,
        amiauthor: false,
      };
    case POST_LIKE_LOAD:
      return {
        ...state,
        didiliked: true,
      };
    case POST_LIKE_ERROR:
      return {
        ...state,
        didiliked: false,
      };
    case COMMENT_ADDED:
      return {
        ...state,
        ...payload,
      };
    case COMMENT_REMOVED:
      return {
        ...state,
        ...payload,
      };
    case POST_ERROR:
    case POST_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default singlepostReducer;
