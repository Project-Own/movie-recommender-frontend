import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import {
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  Paper,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import { Skeleton } from "@material-ui/lab";
import FloatCard from "../FloatCard/FloatCard";
import CustomGrid from "../Grid/CustomGrid";

import data from "./data";
import { config } from "react-spring/renderprops";
import Cell from "./Cell";
import FlipCard from "../FlipCard/FlipCard";
const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&t=";
const RECOMMEND_API_ADDRESS =
  "https://vae-movie-recommender.herokuapp.com/predict/10";

const useStyles = makeStyles((theme) => ({
  bar: {
    borderRadius: "0px 0px 10px 10px",
  },
  image: {
    borderRadius: "10px",
    width: 200,
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

  const { movie, setMovie, colSize = {}, height = 300, breadth = 200 } = props;
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

  let state = { data };
  return (
    <>
      <Container>
        {/* <FloatCard>
        <FlipCard
          height={height}
          width={breadth}
          front={<p>Front</p>}
          back={<p>Back</p>}
        />z
      </FloatCard> */}

        {loading ? (
          <GridList cols={cols} height={height} spacing={32}>
            {new Array(10).fill(0).map((value, index) => (
              <GridListTile>
                <Skeleton
                  animation="wave"
                  height={height}
                  width="100%"
                  variant="rect"
                />
                <GridListTileBar
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  actionIcon={
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      height={20}
                      width={20}
                      style={{ margin: 20 }}
                    />
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        ) : (
          <CustomGrid
            style={{ width: "100%" }}
            // Arbitrary data, should contain keys, possibly heights, etc.
            data={recommendedMovieList}
            // Key accessor, instructs grid on how to fet individual keys from the data set
            keys={(d) => d.index}
            // Can be a fixed value or an individual data accessor
            heights={height}
            // Number of columns
            columns={cols}
            // Space between elements
            margin={100}
            // Removes the possibility to scroll away from a maximized element
            lockScroll={false}
            // Delay when active elements (blown up) are minimized again
            closeDelay={500}
            // Regular react-spring configs
            config={config.slow}
          >
            {(data, active, toggle) => (
              <Cell
                active={active}
                toggle={toggle}
                {...data}
                height={height}
                width={breadth}
              />
            )}
          </CustomGrid>
        )}
        {/* <GridList
        cellHeight={height}
        cols={cols}
        spacing={32}
        className={classes.root}
      >
        {loading
          ? new Array(10).fill(0).map((value, index) => (
              <GridListTile cols={movie?.cols || 1}>
                <Skeleton
                  animation="wave"
                  height={height}
                  width={breadth}
                  variant="rect"
                />
                <GridListTileBar
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  actionIcon={
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      height={20}
                      width={20}
                      style={{ margin: 20 }}
                    />
                  }
                />
              </GridListTile>
            ))
          : recommendedMovieList.map((movie, index) => (
              <GridListTile
                key={index}
                cols={movie?.cols ?? 1}
                // component={FloatCard}
              >
                <FlipCard
                  height={height}
                  width={breadth}
                  front={
                    <img
                      onClick={() => {
                        searchMovie(movie);
                      }}
                      style={{ height: height, width: breadth }}
                      src={movie?.posterPath}
                      alt="Poster"
                    />
                  }
                  back={
                    <div style={{ height: height, width: breadth }}>
                      <Typography>{movie?.title}</Typography>
                    </div>
                  }
                />

                <GridListTileBar
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
                />
              </GridListTile>
            ))}
      </GridList> */}
      </Container>
    </>
  );
};

export default withWidth()(Recommender);
