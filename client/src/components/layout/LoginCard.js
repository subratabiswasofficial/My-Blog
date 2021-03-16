// main
import React from "react";
import { useHistory } from "react-router-dom";

// ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Typography } from "@material-ui/core";

// css
const useStyles = makeStyles({
  root: {
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    marginBottom: "50px",
  },
  media: {
    width: "150px",
    height: "150px",
  },
  textBox: {
    textAlign: "center",
  },
});

const LoginCard = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper
      elevation={3}
      className={classes.root}
      onClick={() => {
        history.push("/editpost");
      }}
    >
      <table>
        <tbody>
          <tr>
            <td>
              <PostAddIcon className={classes.media} />
            </td>
          </tr>
          <tr>
            <td>
              <Typography variant="h6" className={classes.textBox}>
                Add Post
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Paper>
  );
};

export default LoginCard;
