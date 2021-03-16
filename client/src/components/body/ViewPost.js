// main
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

// ui
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Grid,
} from "@material-ui/core";

// icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

// external
import {
  fetchSinglePost,
  likePost,
  unlikePost,
  addComment,
  removeComment,
} from "../../actions/post";

// css
const useStyles = makeStyles({
  root: {
    padding: "20px",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
  },
  commentBox: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  contentBox: {
    marginBottom: "20px",
  },
  imageVariation: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
  },
  buttonMargin: {
    marginRight: "10px",
  },
});

const ViewPost = ({
  match,
  post,
  fetchSinglePost,
  isAuthenticated,
  likePost,
  unlikePost,
  addComment,
  user,
  removeComment,
}) => {
  const classes = useStyles();
  const history = useHistory();

  // states
  const [commentText, setCommentText] = useState({
    comment: "",
  });
  const [count, setCount] = useState({
    likeCount: 0,
    commentCount: 0,
  });

  // handlers
  const onChangeHandler = (e) => {
    setCommentText({
      ...commentText,
      [e.target.name]: e.target.value,
    });
  };
  const fetchLikeAndComments = async () => {
    const res = await axios.get(
      `/api/posts/likesandcomments/${match.params.id}`
    );
    setCount({
      likeCount: res.data.likeCount + count.likeCount,
      commentCount: res.data.commentCount + count.commentCount,
    });
  };

  // use effects
  useEffect(() => {
    fetchSinglePost(match.params.id);
    fetchLikeAndComments();
  }, [match.params.id]);

  return (
    <Fragment>
      {!post.loading && (
        <Fragment>
          <Container maxWidth="md">
            <Paper elevation={4} className={classes.root}>
              <Typography variant="h4" componet="h4">
                {post.title}
              </Typography>
              {post.img && (
                <img
                  className={classes.imageVariation}
                  alt={post.title}
                  src={post.img}
                />
              )}
              <Typography
                variant="h6"
                componet="h6"
                className={classes.contentBox}
              >
                {post.content}
              </Typography>

              <Typography variant="h5" componet="h5">
                Comments
              </Typography>
              <hr />
              <List>
                {post.comments
                  .slice(0)
                  .reverse()
                  .map((item) => (
                    <ListItem key={item._id}>
                      <ListItemText primary={item.text} />
                      {user && item.user === user._id && (
                        <ListItemIcon
                          onClick={() => {
                            removeComment(match.params.id, item._id);
                            setCount({
                              ...count,
                              commentCount: count.commentCount - 1,
                            });
                          }}
                        >
                          <DeleteIcon />
                        </ListItemIcon>
                      )}
                    </ListItem>
                  ))}
                {post.comments.length === 0 && (
                  <Typography variant="body2" color="textSecondary">
                    No Comment Added
                  </Typography>
                )}
              </List>

              <Fragment>
                <hr />

                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography>
                      {count.likeCount} Likes {count.commentCount} Comments
                    </Typography>
                  </Grid>

                  {isAuthenticated && (
                    <Fragment>
                      <Grid item xs={12}>
                        {!post.didiliked ? (
                          <Button
                            variant="contained"
                            color="default"
                            endIcon={<ThumbUpIcon />}
                            className={classes.buttonMargin}
                            onClick={() => {
                              likePost(match.params.id);
                              setCount({
                                ...count,
                                likeCount: 1 + count.likeCount,
                              });
                            }}
                          >
                            Like
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="default"
                            endIcon={<ThumbDownIcon />}
                            className={classes.buttonMargin}
                            onClick={() => {
                              unlikePost(match.params.id);
                              setCount({
                                ...count,
                                likeCount: count.likeCount - 1,
                              });
                            }}
                          >
                            Unlike
                          </Button>
                        )}

                        {post.amiauthor && (
                          <Button
                            variant="contained"
                            color="default"
                            endIcon={<EditIcon />}
                            className={classes.buttonMargin}
                            onClick={() => {
                              history.push(`/editpost/${match.params.id}`);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                      </Grid>
                    </Fragment>
                  )}

                  {isAuthenticated && (
                    <Fragment>
                      <Grid item xs={12}>
                        <TextField
                          id="filled-secondary"
                          label="Add Comment"
                          variant="filled"
                          color="primary"
                          fullWidth
                          margin="normal"
                          name="comment"
                          value={commentText.comment}
                          onChange={onChangeHandler}
                          className={classes.contentBox}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="default"
                          onClick={() => {
                            addComment(match.params.id, commentText.comment);
                            setCommentText({ comment: "" });
                            setCount({
                              ...count,
                              commentCount: 1 + count.commentCount,
                            });
                          }}
                        >
                          Add Comment
                        </Button>
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              </Fragment>
            </Paper>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  post: state.singlepost,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  fetchSinglePost,
  likePost,
  unlikePost,
  addComment,
  removeComment,
})(ViewPost);
