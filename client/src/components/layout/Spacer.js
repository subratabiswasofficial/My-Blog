// main
import React from "react";

// ui
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "80px",
  },
});

const Spacer = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};
export default Spacer;
