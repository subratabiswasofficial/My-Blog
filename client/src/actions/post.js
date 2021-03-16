import axios from "axios";
import { setAlert } from "../actions/alert";
import {
  LOAD_ALL_POSTS,
  LOAD_MY_POSTS,
  LOAD_POST,
  POST_ERROR,
  POST_AUTHOR,
  POST_NOT_AUTH,
  POST_LIKE_LOAD,
  POST_LIKE_ERROR,
  COMMENT_ADDED,
  COMMENT_REMOVED,
  CLEAR_POSTS,
  POST_CLEAR,
} from "./types";

// Post Create
export const createPost = ({ title, img, content }, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ title, img, content });
  try {
    const res = await axios.post("/api/posts", body, config);
    dispatch(setAlert("Post Created", "success"));
    history.push(`/post/${res.data._id}`);
  } catch (err) {
    err.response.data.errors.forEach((item) =>
      dispatch(setAlert(item.msg, "error"))
    );
    console.log(err.response);
  }
};

// Post Update
export const updatePost = (id, { title, img, content }, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ title, img, content });
  try {
    const res = await axios.post(`/api/posts/update/${id}`, body, config);
    dispatch(setAlert("Post Updated", "success"));
    history.push(`/post/${res.data._id}`);
  } catch (err) {
    err.response.data.errors.forEach((item) =>
      dispatch(setAlert(item.msg, "error"))
    );
    console.log(err.response);
  }
};

// Post Delete
export const deletePost = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch(setAlert("Post Deleted", "success"));
    history.push("/");
  } catch (err) {
    err.response.data.errors.forEach((item) =>
      dispatch(setAlert(item.msg, "error"))
    );
    console.log(err.response);
  }
};

// Load All posts
export const fetchAllposts = (page = 0) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/allposts?page=${page}`);
    dispatch({
      type: LOAD_ALL_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Error Loding Post", "error"));
  }
};

// Clear All posts
export const clearAllposts = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_POSTS,
    });
  } catch (err) {
    dispatch(setAlert("Error Clearing Post", "error"));
  }
};

// load My Posts
export const fetchMyPosts = (page = 0) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/myposts?page=${page}`);
    dispatch({
      type: LOAD_MY_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Error Loding Post", "error"));
  }
};

// load single post
export const fetchSinglePost = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: LOAD_POST,
      payload: res.data,
    });
    // fetch author info
    if (getState().auth.user) {
      if (getState().auth.user._id === getState().singlepost.user._id) {
        dispatch({
          type: POST_AUTHOR,
        });
      } else {
        dispatch({
          type: POST_NOT_AUTH,
        });
      }
    }
    // fetch like info
    try {
      await axios.get(`/api/posts/didiliked/${id}`);
      dispatch({
        type: POST_LIKE_LOAD,
      });
    } catch (err) {
      dispatch({
        type: POST_LIKE_ERROR,
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert("No Post Found", "error"));
  }
};

// Clear single post
export const clearSinglePost = () => (dispatch) => {
  try {
    dispatch({
      type: POST_CLEAR,
    });
  } catch (error) {
    dispatch(setAlert("Error Clearing Post", "error"));
  }
};

// like post
export const likePost = (id) => async (dispatch) => {
  try {
    await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: POST_LIKE_LOAD,
    });
    dispatch(setAlert("Post Liked", "success"));
  } catch (err) {
    dispatch({
      type: POST_LIKE_ERROR,
    });
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert("No Post Found", "error"));
  }
};

// unlike post
export const unlikePost = (id) => async (dispatch) => {
  try {
    await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: POST_LIKE_ERROR,
    });
    dispatch(setAlert("Post Unliked", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert("No Post Found", "error"));
  }
};

// add comment
export const addComment = (id, text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ text });
    const res = await axios.post(`/api/posts/comment/${id}`, body, config);
    dispatch({
      type: COMMENT_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert("No Post Found", "error"));
  }
};

// remove comment
export const removeComment = (post_id, comment_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/posts/comment/${post_id}/${comment_id}`
    );
    dispatch({
      type: COMMENT_REMOVED,
      payload: res.data,
    });
    dispatch(setAlert("Comment Removes", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert("No Post Found", "error"));
  }
};
