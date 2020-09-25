import React from "react";
import MovieSearch from "../../components/SearchComponent/MovieSearch";
import TopNavBar from "../../components/AppBar/TopNavBar";
import { Container, Grid } from "@material-ui/core";
import FadeInAnimation from "../../components/FadeIn/FadeIn";
import DraggableComponent from "../../components/Draggable/Draggable";

export default function Layout() {
  return (
    <Container maxWidth={"lg"}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <TopNavBar />
        </Grid>

        <Grid item container>
          <Grid item container direction="row" spacing={4}>
            <Grid item sm={8}>
              {/* dddsf */}
              <Grid item container direction="column">
                <Grid item>
                  <DraggableComponent />
                </Grid>
                <Grid item>
                  <DraggableComponent />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <FadeInAnimation wrapperElement="div" direction="right">
                <MovieSearch />
              </FadeInAnimation>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item container direction="row" spacing={4}>
            <Grid item sm={8}>
              {/* dddsf */}
              <Grid item container direction="column">
                <Grid item>
                  <DraggableComponent />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <FadeInAnimation wrapperElement="div" direction="right">
                <MovieSearch />
              </FadeInAnimation>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
