// main
import React from "react";
import { connect } from "react-redux";

// ui
import { Container, Grid, Box, Button } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// externals
import { fetchMyPosts } from "../../actions/post";
import PostCard from "../layout/PostCard";
import LoginCard from "../layout/LoginCard";

// css
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
});

const MyPosts = ({ history, location, posts, fetchMyPosts }) => {
  // utils
  const classes = useStyles();
  const page = location.search.slice(6);

  // useEffect
  useEffect(() => {
    fetchMyPosts(page);
  }, [location.search]);

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {posts.map((item) => (
            <Grid
              key={item._id}
              item
              sm={12}
              md={6}
              lg={4}
              className={classes.root}
            >
              <PostCard
                imgurl={item.img}
                cardtitle={item.title}
                content={item.content}
                id={item._id}
                date={item.date}
              />
            </Grid>
          ))}
          {posts.length === 0 && (
            <Grid item xs={12} className={classes.root}>
              <LoginCard />
            </Grid>
          )}
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          className={classes.boxMargin}
        >
          <Box p={1} bgcolor="grey.300">
            <Button
              disabled={(Number(page) ? Number(page) : 0) === 0}
              onClick={() => {
                history.push(
                  `/myposts/?page=${Number(page) ? Number(page) - 1 : 0}`
                );
              }}
            >
              Prev
            </Button>
          </Box>
          <Box p={1} bgcolor="grey.300">
            <Button
              disabled={posts.length < 6}
              onClick={() => {
                history.push(
                  `/myposts/?page=${Number(page) ? Number(page) + 1 : 1}`
                );
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { fetchMyPosts })(MyPosts);
