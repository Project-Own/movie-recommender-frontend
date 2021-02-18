import React, { useEffect, useState } from "react";
import {
  Grid,
  Toolbar,
  Card,
  Typography,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ImageSlider from "../../components/frontPage/ImageSlider";
import OscarList from "../../components/frontPage/oscar_data";
import ImdbList from "../../components/frontPage/imdbList";
import ScrollFollow from "../../components/ScrollFollow/ScrollFollow";
import ScrollTopIcon from "../../components/ScrollTop/ScrollTopIcon";
import MovieDetail from "../../components/MovieDetail/MovieDetail";
import {
  selectIsAuthenticated,
  selectMovie,
  selectMovieSelected,
  selectUser,
} from "../../features/Auth/registerSlice";
import Axios from "axios";
import Recommender from "../../components/Recommender/Recommender";
import HorizonalScroll from "../../components/HorizonalScroll/HorizontalScroll";
import { DeleteOutlineTwoTone } from "@material-ui/icons";
import { Redirect } from "react-router";

const recommendAPIAddressGenerator = (items, genre = "genre") => {
  return (
    "https://vae-movie-recommender.herokuapp.com/predict/" + genre + "/" + items
  );
};

const useStyles = makeStyles((theme) => ({
  genreTitle: {
    paddingLeft: theme.spacing() * 4,
    paddingTop: theme.spacing(),
  },
  margin: { margin: theme.spacing() * 2 },
}));

export default function Layout(props) {
  const imgList = OscarList.map((data) => data.poster_path);
  const oscTitle = OscarList.map((t) => t.title);
  const oscDate = OscarList.map((d) => d.date);

  const classes = useStyles();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [recommendedMovieList, setRecommendedMovieList] = useState({});
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState(["action", "adventure"]);

  const [availableGenres, setAvailableGenres] = useState([
    "thriller",
    "drama",
    "crime",
    "romance",
    "mystery",
    "comedy",
    "fantasy",
    "war",
    "children",
    "musical",
    "animation",
    "sci-fi",
    "horror",
  ]);
  const user = useSelector(selectUser);
  const name = user?.name;
  const preferredMovies = user?.preferredMovies || undefined;

  const dispatch = useDispatch();

  const movieSelected = useSelector(selectMovieSelected);
  const setMovieSelected = (movie) => {
    dispatch(
      selectMovie({
        movieSelected: movie,
      })
    );
  };
  const items = 10;

  const searchRecommendation = (genres) => {
    if (
      preferredMovies?.length !== 0 &&
      preferredMovies &&
      typeof preferredMovies !== "undefined"
    ) {
      Axios.post(
        recommendAPIAddressGenerator(items),
        {
          preferred_movies: preferredMovies,
          genres: genres,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          console.log(response);
          // setState({ ...state, movie: json });

          setRecommendedMovieList(response?.data);

          setLoading(false);
        })
        .catch((error) => alert(error.message));
    }
  };

  const searchRecommendationForSingleGenre = (genre) => {
    if (
      preferredMovies?.length !== 0 &&
      preferredMovies &&
      typeof preferredMovies !== "undefined"
    ) {
      Axios.post(
        recommendAPIAddressGenerator(items, genre),
        {
          preferred_movies: preferredMovies,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          console.log(response);
          // setState({ ...state, movie: json });

          let data = {};
          data[genre] = response.data.movie;

          setRecommendedMovieList({ ...data, ...recommendedMovieList });

          setLoading(false);
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    setLoading(true);
    searchRecommendation(genres);
  }, [name]);

  if (!isAuthenticated) {
    return (
      <Redirect
        from="/movie-recommender-frontend/"
        to="/movie-recommender-frontend/login"
      />
    );
  }
  return (
    <>
      <Toolbar />
      <Grid container>
        <Grid item xs={12}>
          {movieSelected ? <MovieDetail movie={movieSelected} /> : null}
        </Grid>
      </Grid>

      <Grid container direction="row" alignItems="flex-start" justify="center">
        <Grid item xs={12} style={{ margin: 10 }}>
          <HorizonalScroll>
            {availableGenres.map((genre) => (
              <Button
                style={{ margin: 4, minWidth: 100 }}
                variant="outlined"
                onClick={() => {
                  searchRecommendationForSingleGenre(genre);
                  setGenres([genre, ...genres]);
                  setAvailableGenres(
                    availableGenres.filter((genreName) => {
                      return genreName !== genre;
                    })
                  );
                }}
              >
                {genre}
              </Button>
            ))}
          </HorizonalScroll>
        </Grid>
        <Grid item container md={10} sm={12}>
          {genres.map((genre) => {
            return (
              <Grid item container key={genre}>
                <Grid item>
                  <Typography className={classes.genreTitle} variant="h6">
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </Typography>
                </Grid>
                <IconButton
                  onClick={() => {
                    // Remove This to keep storing movie details after genre removal
                    const { [genre]: omit, ...rest } = recommendedMovieList;
                    setRecommendedMovieList(rest);

                    setAvailableGenres([...availableGenres, genre]);

                    setGenres(
                      genres.filter((genreName) => {
                        return genreName !== genre;
                      })
                    );
                  }}
                >
                  <DeleteOutlineTwoTone
                    style={{ height: 20 }}
                    color="secondary"
                  />
                </IconButton>

                <Grid item xs={12}>
                  <Recommender
                    loading={loading}
                    recommendedMovieList={recommendedMovieList[genre]}
                    movie={movieSelected}
                    setMovie={setMovieSelected}
                  />
                </Grid>
              </Grid>
            );
          })}
          {/* <Grid item>
            <Typography className={classes.genreTitle}>Action</Typography>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Recommender
              genre="action"
              movie={movie}
              setMovie={setMovie}
              colSize={{ lg: 6, md: 3, sm: 3, xs: 1 }}
            />
          </Grid> */}
        </Grid>
        <Grid item container md={2} sm={12} style={{ paddingTop: 20 }}>
          <Grid item sm={6} md={12} className={classes.margin}>
            <ImdbList />
          </Grid>
          <Grid item sm={6} md={12} className={classes.margin}>
            <Typography variant="h5">Best Picture Oscar Winners</Typography>
            <Card>
              <ImageSlider imgList={imgList} title={oscTitle} date={oscDate} />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <ScrollTopIcon {...props}>
        {/* <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab> */}
        <ScrollFollow style={{ width: 50 }} />
      </ScrollTopIcon>
    </>
  );
}
