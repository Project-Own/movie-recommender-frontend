import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import Axios from "axios";
import React, { Component, lazy } from "react";
import { Slug, Fade } from "../../components/Grid/Primitives";
import FlipCard from "../FlipCard/FlipCard";
import FloatCard from "../FloatCard/FloatCard";
import LikeButton from "../LikeButton/LikeButton";

const Cell = (props) => {
  const {
    index,
    title,
    imdbId,
    genres,
    popularity,
    voteAverage,
    voteCount,
    height,
    width,
    posterPath,
    searchMovie,
  } = props;
  const theme = useTheme();
  console.log(props);
  return (
    <FloatCard height={height} width={width}>
      <FlipCard
        height={height}
        width={width}
        front={
          <>
            <img
              // onClick={() => {
              //   searchMovie(movie);
              // }}
              style={{ height: height, width: width }}
              src={posterPath}
              alt="Poster"
            />
          </>
        }
        back={
          <Card style={{ height: height, width: width }}>
            <CardContent>
              <Typography>{genres}}</Typography>
              <Typography>{voteAverage}</Typography>
              <Typography>{voteCount}</Typography>
              <Typography>{popularity}</Typography>
              <Typography>s</Typography>
              <Typography>s</Typography>
              <Typography>s</Typography>
              <Typography>s</Typography>
            </CardContent>
          </Card>
        }
      />

      <Grid
        container
        style={{
          width: width + 20,
          background: theme.palette.primary.main,
          position: "absolute",
          marginTop: -50,
          marginLeft: -5,

          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Grid item xs={8}>
          <Typography
            onClick={() => {
              searchMovie(imdbId, index);
            }}
            style={{ padding: 20, cursor: "pointer" }}
          >
            <Link color="textPrimary">{title}</Link>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LikeButton index={index} />
        </Grid>
      </Grid>
    </FloatCard>
  );
};

export default Cell;
