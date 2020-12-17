import React, { useEffect, useState } from "react";
import { Container, Grid, Button, Toolbar } from "@material-ui/core";
import DraggableComponent from "../../components/Draggable/Draggable";
// import DraggableComponent from "../../components/Draggable/Draggable";
import Recommender from "../../components/Recommender/Recommender";
import { setSnackbar } from "../../features/Snackbar/snackbarSlice";
import { useDispatch } from "react-redux";
import MovieSearchCard from "../../components/SearchComponent/MovieSearchCard";
import { Link } from "react-router-dom";
import ImageSlider from "../../components/frontPage/ImageSlider";
import OscarList from "../../components/frontPage/oscar_data";
import ImdbList from "../../components/frontPage/imdbList";
// import ReactScrollableList from '../../dist/index'
import ScrollFollow from "../../components/ScrollFollow/ScrollFollow";
import ScrollTop from "../../components/ScrollTop/ScrollTop";

export default function Layout(props) {
  const dispatch = useDispatch();

  const imgList = OscarList.map((data) => data.poster_path);
  const oscTitle = OscarList.map((t) => t.title);
  const oscDate = OscarList.map((d) => d.date);

  const [movie, setMovie] = useState("");

  return (
    <>
      <Toolbar />
      <Container>
        <p className="lead">
          Alright!Alright!Alright!You come to a fine place if you are confused
          on what to watch next ? We will help you to take the decision.
        </p>
        <div className="buttons">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Link
                to="/movie-recommender-frontend/register"
                // className="btn btn-primary"
              >
                <Button color="secondary" variant="contained">
                  Register
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/movie-recommender-frontend/login"
                // className="btn btn-light"
              >
                <Button color="primary" variant="contained">
                  Login
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/movie-recommender-frontend/select"
                // className="btn btn-light"
              >
                <Button color="primary" variant="contained">
                  Selection
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/movie-recommender-frontend/"
                // className="btn btn-light"
              >
                <Button color="primary" variant="contained">
                  Home
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/movie-recommender-frontend/profile"
                // className="btn btn-light"
              >
                <Button color="primary" variant="contained">
                  Profile
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>

        {/* <Grid container>
          <Grid item>
            <MovieCard movie={movie} />
          </Grid>
          <Grid item>
            <Recommender
              movie={movie}
              setMovie={setMovie}
              cols={{ lg: 8, md: 6, sm: 4, xs: 2 }}
            />
          </Grid>
        </Grid> */}
        <Container maxWidth={"lg"}>
          <Grid container direction="column" spacing={4}>
            <Grid item> </Grid>
            <Grid item container>
              <Grid item container direction="row" spacing={4}>
                <Grid item md={8} sm={12}>
                  <Grid item container direction="column" spacing={4}>
                    <Grid item>
                      <Recommender
                        movie={movie}
                        setMovie={setMovie}
                        colSize={{ lg: 3, md: 3, sm: 3, xs: 1 }}
                      />
                    </Grid>
                    <Grid item>
                      <DraggableComponent />
                    </Grid>
                    <Grid item>
                      <ImageSlider
                        imgList={imgList}
                        title={oscTitle}
                        date={oscDate}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container spacing={2} md={4} sm={12}>
                  <Grid item sm={6} md={12}>
                    <MovieSearchCard movie={movie} setMovie={setMovie} />
                  </Grid>
                  <Grid item sm={6} md={12}>
                    <ImdbList />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container direction="row" spacing={4}>
                <Grid item md={8} sm={12}>
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

          <ScrollTop {...props}>
            {/* <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab> */}
            <ScrollFollow style={{ width: 50 }} />
          </ScrollTop>
        </Container>
      </Container>
    </>
  );
}
