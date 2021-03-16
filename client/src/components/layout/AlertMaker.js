// main
import React from "react";
import { connect } from "react-redux";

// ui
import Alert from "@material-ui/lab/Alert";
import { Container, makeStyles } from "@material-ui/core";

// css
const useStyles = makeStyles({
  root: {
    marginBottom: "10px",
  },
});

const AlertMaker = ({ alerts }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert
            key={alert.id}
            severity={alert.alertType}
            variant="standard"
            className={classes.root}
          >
            {alert.msg}
          </Alert>
        ))}
    </Container>
  );
};

const mapStateToProp = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProp, null)(AlertMaker);
