import React from "react";
import { Container, Grid, Toolbar } from "@material-ui/core";
import Header from "../../components/frontPage/Header";
import Contents from "../../components/frontPage/Contents";
import MovieSearch from "../../components/SearchComponent/MovieSearch";
// import axios from 'axios';
// import {useState,useEffect} from 'react';

const UserPickLayout = () => {
  return (
    <>
      <Toolbar />
      <Grid container direction="column">
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item align="center">
          {/* TO DO --> */}
          {/* <MovieSearch /> */}
        </Grid>

        <Grid item container>
          <Grid item xs={12}>
            <Contents />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserPickLayout;
