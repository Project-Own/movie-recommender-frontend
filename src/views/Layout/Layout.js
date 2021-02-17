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
import { useSelector } from "react-redux";
import ImageSlider from "../../components/frontPage/ImageSlider";
import OscarList from "../../components/frontPage/oscar_data";
import ImdbList from "../../components/frontPage/imdbList";
import ScrollFollow from "../../components/ScrollFollow/ScrollFollow";
import ScrollTopIcon from "../../components/ScrollTop/ScrollTopIcon";
import MovieDetail from "../../components/MovieDetail/MovieDetail";
import { selectUser } from "../../features/Auth/registerSlice";
import Axios from "axios";
import Recommender from "../../components/Recommender/Recommender";
import HorizonalScroll from "../../components/HorizonalScroll/HorizontalScroll";
import {
  DeleteForeverTwoTone,
  DeleteOutline,
  DeleteOutlineTwoTone,
  RemoveCircleOutline,
} from "@material-ui/icons";

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
  const [movie, setMovie] = useState({
    Title: "The Shape of Water",
    Year: "2017",
    Rated: "R",
    Released: "22 Dec 2017",
    Runtime: "123 min",
    Genre: "Adventure, Drama, Fantasy, Romance, Sci-Fi, Thriller",
    Director: "Guillermo del Toro",
    Writer:
      "Guillermo del Toro (screenplay by), Vanessa Taylor (screenplay by), Guillermo del Toro (story by)",
    Actors: "Sally Hawkins, Michael Shannon, Richard Jenkins, Octavia Spencer",
    Plot:
      "At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.",
    Language: "English, American Sign Language, Russian, French",
    Country: "USA, Canada, Mexico",
    Awards: "Won 4 Oscars. Another 133 wins & 345 nominations.",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNGNiNWQ5M2MtNGI0OC00MDA2LWI5NzEtMmZiYjVjMDEyOWYzXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "7.3/10" },
      { Source: "Rotten Tomatoes", Value: "92%" },
      { Source: "Metacritic", Value: "87/100" },
    ],
    Metascore: "87",
    imdbRating: "7.3",
    imdbVotes: "372,534",
    imdbID: "tt5580390",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "$63,859,435",
    Production: "Double Dare You, TSG Entertainment",
    Website: "N/A",
    Response: "True",
  });

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
  ]);
  const user = useSelector(selectUser);
  const name = user?.name;
  const preferredMovies = user?.preferredMovies || undefined;

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

  return (
    <>
      <Toolbar />
      <Grid container>
        <Grid item xs={12}>
          {movie ? <MovieDetail movie={movie} /> : null}
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
                    movie={movie}
                    setMovie={setMovie}
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
