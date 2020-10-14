import React from "react";
import MovieSearch from "../../components/SearchComponent/MovieSearch";
import TopNavBar from "../../components/AppBar/TopNavBar";
import { Container, Grid, Button } from "@material-ui/core";
import FadeInAnimation from "../../components/FadeIn/FadeIn";
import DraggableComponent from "../../components/Draggable/Draggable";

import { setSnackbar } from "../../features/Snackbar/snackbarSlice";
import { useDispatch } from "react-redux";

export default function Layout() {
  const dispatch = useDispatch();

  return (
    <Container maxWidth={"lg"}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <TopNavBar />
        </Grid>

        <Grid item container>
          <Grid item container direction="row" spacing={4}>
            <Grid item sm={8}>
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
              <Grid item container direction="column">
                <Grid item>
                  <DraggableComponent />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(
                        setSnackbar({
                          snackbarOpen: true,
                          snackbarType: "success",
                          snackbarMessage: "Snackbar launched",
                        })
                      );
                    }}
                  >
                    Launch Snackbat
                  </Button>
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
