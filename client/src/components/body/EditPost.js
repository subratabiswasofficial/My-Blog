// main
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

// ui
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

// externals
import { setAlert } from "../../actions/alert";
import {
  createPost,
  updatePost,
  deletePost,
  clearSinglePost,
} from "../../actions/post";
import Spinner from "../layout/Spinner";

// css
const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
  commentBox: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  contentBox: {
    marginBottom: "25px",
  },
  imageVariation: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
  },
  buttonMargin: {
    marginRight: "20px",
    marginBottom: "20px",
  },
});

const EditPost = ({
  createPost,
  history,
  match,
  updatePost,
  setAlert,
  deletePost,
  loading,
  clearSinglePost,
}) => {
  // utils
  const classes = useStyles();

  // states
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    content: "",
  });

  // fetchpost
  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/auth/${match.params.id}`);
      const { title, content, img } = res.data;
      setFormData({ title, content, img, loading: false });
    } catch (err) {
      setAlert("Not Authorised", "error");
      history.push(`/post/${match.params.id}`);
    }
  };

  useEffect(() => {
    if (match.params.id) {
      clearSinglePost();
      fetchPost();
    }
  }, [match.params.id]);

  const { title, img, content } = formData;

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Container maxWidth="md">
        <Paper elevation={4} className={classes.root}>
          <Typography variant="h4" componet="h4">
            {match.params.id ? "Edit" : "Add"} Post
          </Typography>
          <hr />
          <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
            <TextField
              id="filled-secondary"
              label="Title"
              variant="filled"
              color="primary"
              fullWidth
              margin="normal"
              name="title"
              value={title}
              onChange={onChangeHandler}
            />
            <TextField
              id="filled-secondary"
              label="Image Link"
              variant="filled"
              color="primary"
              fullWidth
              margin="normal"
              name="img"
              value={img}
              onChange={onChangeHandler}
            />
            <TextField
              id="filled-secondary"
              label="Description"
              variant="filled"
              color="primary"
              fullWidth
              margin="normal"
              name="content"
              value={content}
              className={classes.contentBox}
              onChange={onChangeHandler}
              multiline
              rows={10}
            />
            {match.params.id ? (
              <Fragment>
                <Button
                  type="submit"
                  variant="contained"
                  color="default"
                  className={classes.buttonMargin}
                  onClick={() => {
                    updatePost(match.params.id, formData, history);
                  }}
                >
                  Update Post
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="default"
                  className={classes.buttonMargin}
                  onClick={() => {
                    deletePost(match.params.id, history);
                  }}
                >
                  Delete Post
                </Button>
              </Fragment>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="default"
                className={classes.buttonMargin}
                onClick={() => {
                  createPost(formData, history);
                }}
              >
                Add Post
              </Button>
            )}
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};

EditPost.propTypes = {
  createPost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.singlepost.loading,
});

export default connect(mapStateToProps, {
  createPost,
  setAlert,
  updatePost,
  deletePost,
  clearSinglePost,
})(withRouter(EditPost));
