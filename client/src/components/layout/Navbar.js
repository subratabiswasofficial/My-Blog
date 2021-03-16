// main
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

// ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CropFreeIcon from "@material-ui/icons/CropFree";

// externals
import { logout } from "../../actions/auth";
import { List, ListItem, ListItemText } from "@material-ui/core";

//css
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    marginLeft: "10px",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
  },
  drawerList: {
    width: "200px",
    paddingLeft: "20px",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerComponentMargin: {
    marginLeft: "20px",
  },
}));

const Navbar = ({ isAuthenticated, logout }) => {
  // utils
  const history = useHistory();
  const classes = useStyles();
  // states
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (state) => () => {
    setDrawerState(state);
  };
  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={drawerState}
        onClick={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        {!isAuthenticated ? (
          <Fragment>
            <List className={classes.drawerList}>
              <ListItem
                button
                onClick={() => {
                  history.push("/");
                }}
              >
                <ListItemText primary={"Home"} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  history.push("/signin");
                }}
              >
                <ListItemText primary={"Login"} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  history.push("/signup");
                }}
              >
                <ListItemText primary={"Register"} />
              </ListItem>
            </List>
          </Fragment>
        ) : (
          <Fragment>
            <List className={classes.drawerList}>
              <ListItem
                button
                onClick={() => {
                  history.push("/");
                }}
              >
                <ListItemText primary={"Home"} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  history.push("/myposts");
                }}
              >
                <ListItemText primary={"My Posts"} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  history.push("/editpost");
                }}
              >
                <ListItemText primary={"Add Post"} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  logout();
                  history.push("/signin");
                }}
              >
                <ListItemText primary={"Logout"} />
              </ListItem>
            </List>
          </Fragment>
        )}
      </SwipeableDrawer>

      <div className={classes.grow}>
        <AppBar position="fixed">
          <Toolbar>
            <CropFreeIcon />
            <Typography className={classes.title} variant="h5" noWrap>
              My Blogs
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {isAuthenticated ? (
                <Fragment>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        history.push("/");
                      }}
                      color="inherit"
                    >
                      Home
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        history.push("/myposts");
                      }}
                      color="inherit"
                    >
                      My Posts
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        history.push("/editpost");
                      }}
                      color="inherit"
                    >
                      Add Post
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        logout();
                        history.push("/signin");
                      }}
                      color="inherit"
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Fragment>
              ) : (
                <Fragment>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        history.push("/");
                      }}
                      color="inherit"
                    >
                      Home
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        history.push("/signin");
                      }}
                      color="inherit"
                    >
                      Login
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        history.push("/signup");
                      }}
                      color="inherit"
                    >
                      Register
                    </Button>
                  </MenuItem>
                </Fragment>
              )}
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </Fragment>
  );
};

const mapStateToPrpos = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToPrpos, { logout })(Navbar);
