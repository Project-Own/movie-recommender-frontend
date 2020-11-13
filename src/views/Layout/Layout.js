import React from "react";
import TopNavBar from "../../components/AppBar/TopNavBar";
import { Container, Grid, Button } from "@material-ui/core";
<<<<<<< HEAD
// import FadeInAnimation from "../../components/FadeIn/FadeIn";
=======
>>>>>>> fa33590b897e8d9e2f58c9df4365d8c85093d490
import DraggableComponent from "../../components/Draggable/Draggable";

import { setSnackbar } from "../../features/Snackbar/snackbarSlice";
import { useDispatch } from "react-redux";
import MovieSearchCard from "../../components/SearchComponent/MovieSearchCard";

export default function Layout() {
  const dispatch = useDispatch();

  return (
    <Container maxWidth={"lg"}>
      <TopNavBar />
      <Grid container direction="column" spacing={4}>
        <Grid item></Grid>

        <Grid item container>
          <Grid item container direction="row" spacing={4}>
            <Grid item sm={8}>
              <Grid item container direction="column">
                <Grid item>
                  <DraggableComponent />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <MovieSearchCard />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item container direction="row" spacing={4}>
            <Grid item sm={8}>
              <Grid item container direction="column">
                <Grid item>
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
                    Launch Snackbar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
