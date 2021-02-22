import { Typography, makeStyles, Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import LikeButton from "../LikeButton/LikeButton";
import Axios from "axios";
import ReactPlayer from "react-player";
// const style = {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     objectFit: 'cover'
// }
const useStyles = makeStyles((theme) => ({}));

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&i=";
const API2_ADDRESS = "https://imdb-api.com/en/API/YouTubeTrailer/k_dspqpo2c/";
const MovieDetail = (props) => {
  const { movie, loading = false } = props;
  const classes = useStyles();
  const [movieDetail, setMovieDetail] = useState(movie);
  const [youtubeURL, setYoutubeURL] = useState(null);

  console.log("MOVIEEE");
  console.log(movieDetail);
  console.log(movie.imdbId);
 


  



    
  


  useEffect(() => {
    //poster
   
    (async () => {
      let omdbRes;
      let posterPath;
      let updatedMovie;
      updatedMovie = movie;
      if (movie?.Poster) {
        posterPath = movie?.Poster;
      } else {
        try {
          omdbRes = await Axios.get(`${API_ADDRESS}${movie.imdbId}`);
        } catch (err) {
          console.log(err);
        }
        updatedMovie = { ...movie, ...omdbRes.data };

        try {
          const res = await Axios.get(
            "https://image.tmdb.org/t/p/w185" + movie.posterPath
          );
          if (res.data === "<h1>File not Found</h1>") throw Error;
          posterPath = "https://image.tmdb.org/t/p/w185" + movie.posterPath;
        } catch (err) {
          // console.log(res);
          posterPath = omdbRes?.data?.Poster ?? "Unknown";
        }
      }
      // console.log("updated movie");
      // updatedMovie.posterPath = posterPath;
      // console.log(updatedMovie);
      setMovieDetail(updatedMovie);
    })();


  }, [movie]);


useEffect(() => {
  (async () => {
    let url;
    try {

      fetch(`${API2_ADDRESS}${movie?.imdbId ?? movie?.imdbID}`).
      then(response => response.json()).
      then(data => {
        setYoutubeURL(data.videoUrl);
        console.log(data.videoUrl);
      });

      // const youtube = Axios.get(`${API2_ADDRESS}${movie.imdbId}`);
      // url = youtube.data.videoUrl;
      // console.log(url);
    } catch (err) {
      console.log(err);
    }
    console.log(url);
    setYoutubeURL(url);
  })();
},[movie]);



  return (
    <Paper>
      <Grid container justify="center" alignItems="center">
      <Grid item container xs={12} justify="center" alignItems="center" style={{marginTop:10}}>
                  <Grid item>
                    <Typography variant="h3">
                      {movieDetail?.Title ?? movieDetail?.title ?? "Unknown"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <LikeButton
                      index={movieDetail?.index ?? 0}
                      height={40}
                      width={40}
                    />
                  </Grid>
                </Grid>
        <Grid item container md={4} lg={2} alignItems="center" justify="center">
          {loading ? (
            <Skeleton animation="wave" variant="rect" />
          ) : (
            <Grid item>
              <img
                alt="Movie Poster"
                className={classes.media}
                src={movieDetail?.Poster ?? movieDetail?.posterPath}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAMFBMVEXd3d2xsbHFxcWzs7PMzMza2tq+vr7W1ta2travr6/R0dG7u7vExMTZ2dnT09POzs7+TBqqAAAEmUlEQVR4nO2cDZeqIBCGF/mQBOT//9uLmQqold3QofM+5+yeLdv2aXaYAbT+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwD0V5t8BG9bq5W+IiG6asVPqE1jHVXS3yA4IzZqyXewsnoRqsYY9pdJvMushVKROJeB28mrhN6B9n6xnDul3vcEG7GjNz/pcuRfaNCMjMVZcUYbqb767Re0AprBmvGo6Rw9q7NONES7kJ+jJFNw92bx52GYs+UIiT1QzAJrWymu7Xf//XLaGfpwTCKbGvmV0PRu7lF3nGPEcurITgwnY7DHQku4U6Sngoi0l7CLXs7vR7OLcFh6Uykzcdwy16oKem5aWgkSeiKsYiPR6Uajy+hNpbIssF1oVRHE1Op4nB3w/Ep1FyrpifR4YdWrtktHmVdPCpVL6werW8hPzyN0Rj+//dWHjcRaaM04cbMjYZKfshubuUqMkrCPRfDMBSJhFooPReIaOK0dPLI2naORFYPHSTSM1E16U3qfOOKSH7ciTt5MicVabg1kVL9oN3t5HER1IpIUs/4yI7bWS608jnnuRHEpANxEk9FcGjl+jbVjzAUr1XcootTWN1LhYtauVaeVFbPJJ08hNtFs6ahlRMM9UCfTJxCftipKoZZkydU9TJsMiqbpZWHUk2kv2yRFEE+dU1ONz8eNGyNtp5KK9+jNbl0KNWU8+NB1slv2tJYCrwgDTe3FPdBthDzqAytvKkgP0acmpPaEll1vcW4nOHES/UKae+hbijOmnKkc7Nlp/mwwK0h1G2j1JzKnRLEu+KEH3camjHEsg7pZbOP053mbdJPbZHoCZk95pWkGm+3IiNb2UifHc9PacdP4MuNb3/LvM0txaTioVCmx/MTIr2ODxb7L85rm+kv5Bs7TKXizmYbVjqNqhTJ9L3YiePHbHs5b9er1IuZV+Liibgq5e2sDqgnW2n8fyJuSnn/yd77LqmCecS5Sgefy/c2n0S8nPcG+ZLndcR3xU/1/mLEz/VeD87XEU+Oz+Ine39QVdI6Pomf7b2u49kVDutU2RQ/3fu1eB5xviV+vne6R7+VKnnE+UaOX+B9XHyjAV3hHcQzsbyqNNlJwXU5LOLdds/pxWqS5ZPjPn9hWqTPYIt4N/oOn75xntwafsi8efSg8YGrByzHh29FvC0rThnv9bnfKrw3zlnDG94ras3vWr1PyJMib3WoNb9r9a41v2v1rjVPfs6bq4NsXVRYzns3v7WTx9idEZ8bb31ww33f+9y+c9R7fwVycrz79hj5yr+s925+c32Q3cKEvhPxc/Ub3sjvH/CuNU9q9a41T2r1/sF9CD5c98jvX9MP6a3k7n3vk9c7tjmEJbPeOfZEJ6939r2/tt6hvU4js97Jrw57xepa96Le+/WbH4WI99dA34lAvM/1rjXetXrXmifwhvc7iPLeRa5HPsG7yCe1yd1t629R6IPausIBL3a5fdlM4bbUGzNkp/bPFfyndNlPNHD+2NL9fQi/Yx0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDf4R8EwD9rYeMzawAAAABJRU5ErkJggg==";
                }}
              />
            </Grid>
          )}
        </Grid>

        <Grid
          container
          direction="row"
          item
          md={8}
          lg={10}
          style={{ padding: 20 }}
        >
          <Grid
            container
            item
            sm={5}
            md={3}
            alignItems="center"
            justify="center"
            direction="row"
            spacing={8}
            style={{ padding: 20 }}
          >
            {loading ? (
              <>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              </>
            ) : (
              <Grid item>
                <Grid item>
                  <Typography variant="h6">Release Date:</Typography>
                  <Typography variant="body2">
                    {movieDetail?.Year ??
                      movieDetail?.release_date ??
                      "Unknown"}
                  </Typography>
                  <Grid item>
                    <Typography variant="h6">Runtime:</Typography>

                    <Typography variant="body2">
                      {movieDetail?.Runtime ?? "Unknown"}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="h6">Genre:</Typography>
                    <Typography variant="body2">
                      {movieDetail?.Genre ?? "Unknown"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Typography variant="h6">Ratings:</Typography>
                  {movieDetail?.Ratings?.map((Ratings, index) => {
                    return (
                      <Grid item xs={12} key={Ratings?.Source ?? index}>
                        <Typography variant="body2">
                          {Ratings?.Source ?? "Unknown"}:{" "}
                          {Ratings?.Value ?? index}
                        </Typography>
                      </Grid>
                    );
                  }) ?? (
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          {movieDetail?.vote_average}
                        </Typography>
                      </Grid>
                    ) ?? (
                      <Grid item xs={12}>
                        <Typography variant="body2">"Unknown"</Typography>
                      </Grid>
                    )}
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid
            container
            item
            sm={7}
            md={6}
            alignItems="center"
            justify="center"
            spacing={8}
          >
            {loading ? (
              <Grid item>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              </Grid>
            ) : (
              <Grid item container>
               
                <Grid item xs={6}>
                  <Typography variant="h6">Actors:</Typography>
                  <Typography variant="body2">
                    {movieDetail?.Actors ?? "Unknown"}
                  </Typography>
                </Grid>

                <Grid item xs={7}>
                  <Typography variant="h6">Box Office:</Typography>
                  <Typography variant="body2">
                    {movieDetail?.BoxOffice ?? "Unknown"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h6">Plot:</Typography>
                  <Typography variant="body2" align="justify">
                    {movieDetail?.Plot ?? movieDetail?.overview ?? "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container  sm={12} alignItems="center" justify="center"
            md={3} >
            <Grid item> 
             <ReactPlayer
                url= {youtubeURL}
                controls
                playbackRate = {1}
                width = "500px"
                height = "300px"
              />

            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieDetail;
