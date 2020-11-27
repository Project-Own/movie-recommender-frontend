import React from "react";
import { Container, Grid, Button, Typography} from "@material-ui/core";
import DraggableComponent from "../../components/Draggable/Draggable";
import Recommender from "../../components/Recommender/Recommender";
import { setSnackbar } from "../../features/Snackbar/snackbarSlice";
import { useDispatch } from "react-redux";
import MovieSearchCard from "../../components/SearchComponent/MovieSearchCard";
import { Link } from "react-router-dom";
import ImageSlider from "../../components/frontPage/ImageSlider";
import OscarList from "../../components/frontPage/oscar_data";
import CheckboxListSecondary from "../../components/frontPage/imdbList"

export default function Layout() {
  const dispatch = useDispatch();

  const imgList = OscarList.map((data) => data.poster_path);
  const oscTitle=OscarList.map(t=>t.title)
  const oscDate=OscarList.map(d=>d.date)
  return (
    <>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large"> Movie Recommender </h1>{" "}
            <p className="lead">
              Alright!Alright!Alright!You come to a fine place if you are
              confused on what to watch next ? We will help you to take the
              decision.{" "}
            </p>{" "}
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
                      Register{" "}
                    </Button>{" "}
                  </Link>{" "}
                </Grid>{" "}
                <Grid item>
                  <Link
                    to="/movie-recommender-frontend/login"
                    // className="btn btn-light"
                  >
                    <Button color="primary" variant="contained">
                      Login{" "}
                    </Button>{" "}
                  </Link>{" "}
                </Grid>{" "}
                <Grid item>
                  <Link
                    to="/movie-recommender-frontend/select"
                    // className="btn btn-light"
                  >
                    <Button color="primary" variant="contained">
                      Selection{" "}
                    </Button>{" "}
                  </Link>{" "}
                </Grid>{" "}
                <Grid item>
                  <Link
                    to="/movie-recommender-frontend/"
                    // className="btn btn-light"
                  >
                    <Button color="primary" variant="contained">
                      Home{" "}
                    </Button>{" "}
                  </Link>{" "}
                </Grid>{" "}
              </Grid>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
      <Container maxWidth={"lg"}>
        <Grid container direction="column" spacing={4}>
          <Grid item> </Grid>
          <Grid item container>
            <Grid item container direction="row" spacing={4}>
              <Grid item sm={8}>
                <Grid item container direction="column">
                  <Grid item>
                    <Recommender />
                    <DraggableComponent />
                    <ImageSlider imgList={imgList} title={oscTitle} date={oscDate} />{" "}
                  </Grid>{" "}
                </Grid>{" "}
              </Grid>{" "}
              <Grid item sm={4}>
                <MovieSearchCard />
                <Typography>TOP IMDB LIST</Typography>
                <CheckboxListSecondary/>
              </Grid>{" "}
            </Grid>{" "}
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
                      Launch Snackbar{" "}
                    </Button>{" "}
                  </Grid>{" "}
                </Grid>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </Grid>{" "}
      </Container>{" "}
    </>
  );
}
