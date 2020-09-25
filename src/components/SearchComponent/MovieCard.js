import {
  Card,
  Typography,
  CardMedia,
  makeStyles,
  CardContent,
  CardHeader,
  Collapse,
  CardActions,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

// const style = {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     objectFit: 'cover'
// }
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const MovieCard = ({ movie }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={movie.Title} />
      <CardMedia
        component="img"
        className={classes.media}
        image={movie.Poster}
      />

      <CardContent>
        <Typography align="center">
          {movie.Year} {movie.Genre} {movie.Runtime}{" "}
        </Typography>
        {movie.Ratings.map((Ratings) => {
          return (
            <Typography align="center" key={Ratings.Source}>
              {" "}
              {Ratings.Source} : {Ratings.Value}{" "}
            </Typography>
          );
        })}
      </CardContent>
      <CardActions>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show More"
          className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align="center">{movie.Actors}</Typography>
          <Typography align="center"> BoxOffice: {movie.BoxOffice}</Typography>
          <Typography variant="body1" align="justify">
            {movie.Plot}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MovieCard;
