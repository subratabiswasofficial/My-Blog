// main
import React from "react";
import { useHistory } from "react-router";
import moment from "moment";

// ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// css
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
  },
  media: {
    height: 140,
  },
});

export default function PostCard({ imgurl, cardtitle, content, id, date }) {
  // utils
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {imgurl && (
          <CardMedia
            className={classes.media}
            image={imgurl}
            title={cardtitle}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {cardtitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content.slice(0, 50)}
            {"..."}
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            Posted at {moment(date).format("MMM Do YY")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            history.push(`/post/${id}`);
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
