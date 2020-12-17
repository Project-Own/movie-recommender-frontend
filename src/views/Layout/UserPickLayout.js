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
          <MovieSearch />
        </Grid>

        <Grid item container>
          <Grid item xs={2} sm={2} md={2} />
          <Grid item xs={10} sm={8} md={8}>
            <Contents />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserPickLayout;
