import React from "react";
import MovieSearch from '../../components/SearchComponent/MovieSearch';
import TopNavBar from "../../components/AppBar/TopNavBar";
import { Container, Typography, Grid, Paper } from "@material-ui/core";

export default function Layout() {
  return (
    <Container maxWidth={"lg"}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <TopNavBar />
        </Grid>

        <Grid container direction="row" spacing ={4}>
            <Grid item sm = {8}>

            </Grid>
            <Grid item sm={4}>
            <MovieSearch />
             </Grid>
        </Grid>
    </Grid>
    </Container>
  );
}
