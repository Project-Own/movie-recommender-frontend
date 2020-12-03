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
  const { data, height, width, searchMovie } = props;
  const theme = useTheme();
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
              src={data?.posterPath}
              alt="Poster"
            />
          </>
        }
        back={
          <Card style={{ height: height, width: width - 20 }}>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  {data?.genres.split("|").map((value, key) => (
                    <Typography key={key}> {value}</Typography>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.voteAverage}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.voteCount}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.popularity}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.imdbRating}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.Genre}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.Director}</Typography>
                </Grid>
              </Grid>
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
              searchMovie(data);
            }}
            style={{ padding: 20, cursor: "pointer" }}
          >
            <Link color="textPrimary">{data?.title ?? "Unknown"}</Link>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LikeButton index={data?.index ?? 70000} />
        </Grid>
      </Grid>
    </FloatCard>
  );
};

export default Cell;
