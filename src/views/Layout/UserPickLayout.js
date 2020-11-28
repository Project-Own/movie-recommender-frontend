import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Header from "../../components/frontPage/Header";
import Contents from "../../components/frontPage/Contents";
import MovieSearch from "../../components/SearchComponent/MovieSearch";
import Axios from "axios";

const UserPickLayout = () => {
  return (
    <Container>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item align="center">
          <MovieSearch />
        </Grid>

        <Grid item container>
          <Contents />
        </Grid>

        <Grid item xs={12}>
          <Box height={100}></Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPickLayout;
