<<<<<<< HEAD
import React from 'react';
import { Grid} from '@material-ui/core';
import Header from '../../components/frontPage/Header';
import Contents from '../../components/frontPage/Contents';
import MovieSearch from '../../components/SearchComponent/MovieSearch';
// import axios from 'axios';
// import {useState,useEffect} from 'react';
=======
import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Header from "../../components/frontPage/Header";
import Contents from "../../components/frontPage/Contents";
import MovieSearch from "../../components/SearchComponent/MovieSearch";
import Axios from "axios";
>>>>>>> 52bf4465fafab4a8b32c01f446d7f0f61efd5c64

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

<<<<<<< HEAD
const UserPickLayout = () =>{
  // const [movie,setMovie] = useState('');

  //   useEffect(() => {
  //     async function fetchData(){
        
  //       await axios
  //      .get('/api/items')
  //      .then(async res=>{
  //            const data = await res.data;
  //            setMovie(data);
  //       })
  //      .catch((error) => alert(error.message));
     
  //     }
  //  fetchData();
  // },[]);

  return (
    <Grid container direction='column'>
      <Grid item xs={12} > 
        <Header/>
      </Grid>
      
      <Grid item align='center'>
          <MovieSearch/>
      
      </Grid>
      <Grid item container>
        <Grid item xs={2} sm={2} md={2}/>
        <Grid item xs={10} sm={8} md={8}>
          <Contents/>
=======
        <Grid item container>
          <Contents />
        </Grid>

        <Grid item xs={12}>
          <Box height={100}></Box>
>>>>>>> 52bf4465fafab4a8b32c01f446d7f0f61efd5c64
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPickLayout;
