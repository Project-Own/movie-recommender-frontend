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
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import LikeButton from "../LikeButton";
import { Skeleton } from "@material-ui/lab";

// const style = {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     objectFit: 'cover'
// }
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  media: {
    width: "100%",
    maxHeight: 400,
    objectFit: "cover",
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

const MovieCard = (props) => {
  const { movie, index = 69, loading = false } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            movie?.Title ?? "Unknown"
          )
        }
      />
      {loading ? (
        <Skeleton animation="wave" variant="rect" />
      ) : (
        <CardMedia
          component="img"
          className={classes.media}
          image={movie?.Poster}
        />
      )}

      <CardContent>
        {loading ? (
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          </>
        ) : (
          <>
            <LikeButton data={movie} index={index} />
            <Typography align="center">
              {movie?.Year ?? "Unknown"} {movie?.Genre ?? "Unknown"}
              {movie?.Runtime ?? "Unknown"}
            </Typography>
            {movie?.Ratings?.map((Ratings, index) => {
              return (
                <Typography align="center" key={Ratings?.Source ?? index}>
                  {Ratings?.Source ?? "Unknown"}: {Ratings?.Value ?? index}
                </Typography>
              );
            })}
          </>
        )}
      </CardContent>
      <CardActions>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show More"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {loading ? (
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            </>
          ) : (
            <>
              <Typography align="center">
                {movie?.Actors ?? "Unknown"}
              </Typography>
              <Typography align="center">
                BoxOffice: {movie?.BoxOffice ?? "Unknown"}
              </Typography>
              <Typography variant="body1" align="justify">
                {movie?.Plot ?? "Unknown"}
              </Typography>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default React.memo(MovieCard);
