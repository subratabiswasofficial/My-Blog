import React from "react";
import spinner from "../gifs/spinner.gif";

// UI
import { makeStyles } from "@material-ui/core/styles";

// css
const useStyles = makeStyles({
  root: {
    width: "100px",
  },
  boxMargin: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.boxMargin}>
      <img src={spinner} className={classes.root} />
    </div>
  );
};

export default Spinner;
