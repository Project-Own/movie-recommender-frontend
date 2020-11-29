import { Grid, Typography } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import React, { Component, lazy } from "react";
import { Slug, Fade } from "../../components/Grid/Primitives";
import FlipCard from "../FlipCard/FlipCard";
import FloatCard from "../FloatCard/FloatCard";
import LikeButton from "../LikeButton";
import "./grid.css";
const Cell = (props) => {
  const { index, title, height, width, posterPath } = props;
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
        back={<p style={{ height: height, width: width }}>{title}</p>}
      />

      <Grid
        container
        style={{
          width: width + 20,
          background: "black",
          position: "absolute",
          marginTop: -50,
          marginLeft: -5,

          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Grid item xs={8}>
          <Typography style={{ padding: 20 }}>{title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <LikeButton index={index} />
        </Grid>
      </Grid>
    </FloatCard>
  );
};

export default Cell;
