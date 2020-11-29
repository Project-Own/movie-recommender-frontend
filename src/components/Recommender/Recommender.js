import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import {
  Avatar,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import Axios from "axios";
import LikeButton from "../LikeButton";
import { Skeleton } from "@material-ui/lab";
import FloatCard from "../FloatCard";

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&t=";
const RECOMMEND_API_ADDRESS =
  "https://vae-movie-recommender.herokuapp.com/predict/10";

const useStyles = makeStyles((theme) => ({
  bar: {
    borderRadius: "0px 0px 10px 10px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },

  buttonbasestyle: {
    // maxWidth: "200px",
    maxHeight: "20px",
    minWidth: "150px",
    minHeight: "30px",
    borderRadius: 5,
    "&:hover": {
      color: "pink",
    },
    marginBottom: 10,
    marginTop: 10,
  },
  textStyle: {
    position: "absolute",
    top: 104,
    fontSize: 16,
    fontFamily: "Lato",
  },
  root: {
    padding: theme.spacing() * 2,
  },
}));

const Recommender = (props) => {
  const [recommendedMovieList, setRecommendedMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { movie, setMovie, colSize = {}, height = 300 } = props;
  const classes = useStyles();

  function getCols(screenWidth) {
    if (isWidthUp("lg", screenWidth)) {
      return colSize?.lg ?? 6;
    }

    if (isWidthUp("md", screenWidth)) {
      return colSize?.md ?? 4;
    }
    if (isWidthUp("sm", screenWidth)) {
      return colSize?.sm ?? 3;
    }

    return colSize?.xs ?? 2;
  }

  const cols = getCols(props.width); // width is associated when using withWidth()

  const searchMovie = (movie) => {
    if (movie !== "") {
      fetch(`${API_ADDRESS} + ${movie.title}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.Response !== "False") {
            // setState({ ...state, movie: json });
            json.index = movie.index;
            setMovie(json);
            // setQuery("");
          }
        })
        .catch((error) => alert(error.message));
    }
  };
  const searchRecommendation = (movie) => {
    if (movie !== "") {
      fetch(`${RECOMMEND_API_ADDRESS}`)
        .then((response) => response.json())
        .then(async (json) => {
          if (json.Response !== "False") {
            // setState({ ...state, movie: json });
            console.log(json);
            const movies = await Promise.all(
              json.movies.map(async (movie, index) => {
                try {
                  const res = await Axios.get(
                    "https://image.tmdb.org/t/p/w185" + movie.posterPath
                  );
                  if (res.data === "<h1>File not Found</h1>") throw Error;
                  movie.posterPath =
                    "https://image.tmdb.org/t/p/w185" + movie.posterPath;
                } catch (err) {
                  const res = await Axios.get(
                    `${API_ADDRESS} + ${movie.title}`
                  );
                  // console.log(res);
                  movie.posterPath = res.data.Poster;
                }
                return movie;
              })
            );

            setRecommendedMovieList(movies);
            setLoading(false);
            // setQuery("");
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    setLoading(true);
    searchRecommendation();
  }, []);

  return (
    <Grid container spacing={2} className={classes.root}>
      {loading
        ? new Array(10).fill(0).map((value, index) => (
            <Grid
              item
              key={index}
              sm={colSize?.sm ?? 4}
              lg={colSize?.lg ?? 2}
              md={colSize?.md ?? 3}
              xs={colSize?.xs ?? 6}
            >
              <Skeleton animation="wave" height={height} variant="rect" />

              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                variant="circle"
                height={20}
                width={20}
                style={{ margin: 20 }}
              />
            </Grid>
          ))
        : recommendedMovieList.map((movie, index) => (
            <Grid
              key={index}
              item
              sm={colSize?.sm ?? 4}
              lg={colSize?.lg ?? 2}
              md={colSize?.md ?? 3}
              xs={colSize?.xs ?? 6}
            >
              <FloatCard>
                <img
                  onClick={() => {
                    searchMovie(movie);
                  }}
                  height={height}
                  className={classes.image}
                  src={movie?.posterPath}
                  alt="Poster"
                />
              </FloatCard>

              {/* <GridListTileBar
                className={classes.bar}
                title={
                  loading ? (
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  ) : (
                    movie?.title ?? "Unknown"
                  )
                }
                actionIcon={
                  <LikeButton data={movie} index={movie?.index ?? 69} />
                }
              /> */}
            </Grid>
          ))}
    </Grid>
  );
};

export default withWidth()(Recommender);
