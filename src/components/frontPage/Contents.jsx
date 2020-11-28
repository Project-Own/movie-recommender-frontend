import React from "react";
import { Grid } from "@material-ui/core";
import MovieCard from "./MovieCard";
import Footer from "./Footer";
import movieList from "./data";
// https://image.tmdb.org/t/p/w185
import { useState } from "react";

const Contents = () => {
  const [check, setCheck] = useState(false);

  const showHide = (selectedList) => {
    console.log(selectedList);
    if (selectedList === undefined || selectedList.length < 1) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  return (
    <Grid item container spacing={4}>
      {movieList.map((movieObj, index) => (
        <Grid
          item
          key={index}
          container
          xs={12}
          sm={6}
          md={3}
          justify="center"
          alignItems="center"
        >
          <MovieCard {...movieObj} showHide={showHide} />
        </Grid>
      ))}
      <Footer check={check} />
    </Grid>
  );
};

export default Contents;
