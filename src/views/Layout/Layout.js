import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Toolbar,
  Card,
  Typography,
  makeStyles,
} from "@material-ui/core";
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
import ScrollTopIcon from "../../components/ScrollTop/ScrollTopIcon";
import MovieCard from "../../components/SearchComponent/MovieCard";

const useStyles = makeStyles((theme) => ({
  genreTitle: {
    paddingLeft: theme.spacing() * 4,
  },
}));
export default function Layout(props) {
  const dispatch = useDispatch();

  const imgList = OscarList.map((data) => data.poster_path);
  const oscTitle = OscarList.map((t) => t.title);
  const oscDate = OscarList.map((d) => d.date);

  const classes = useStyles();
  const [movie, setMovie] = useState("");

  return (
    <>
      <Toolbar />
      <Grid container>
        <Grid item> {movie ? <MovieCard movie={movie} /> : null}</Grid>
      </Grid>

      <Grid container direction="row" justify="center">
        <Grid item container md={10} sm={12}>
          <Grid item>
            <Typography className={classes.genreTitle}>Action</Typography>
          </Grid>
          <Grid item xs={12}>
            <Recommender
              genre="action"
              movie={movie}
              setMovie={setMovie}
              colSize={{ lg: 6, md: 3, sm: 3, xs: 1 }}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.genreTitle}>Comedy</Typography>
          </Grid>
          <Grid item xs={12}>
            <Recommender
              genre="comedy"
              movie={movie}
              setMovie={setMovie}
              colSize={{ lg: 6, md: 3, sm: 3, xs: 1 }}
            />
          </Grid>

          <Grid item>
            <Typography className={classes.genreTitle}>Drama</Typography>
          </Grid>
          <Grid item xs={12}>
            <Recommender
              genre="drama"
              movie={movie}
              setMovie={setMovie}
              colSize={{ lg: 6, md: 3, sm: 3, xs: 1 }}
            />
          </Grid>

          <Grid item>
            <Typography className={classes.genreTitle}>Thriller</Typography>
          </Grid>
          <Grid item xs={12}>
            <Recommender
              genre="thriller"
              movie={movie}
              setMovie={setMovie}
              colSize={{ lg: 6, md: 3, sm: 3, xs: 1 }}
            />
          </Grid>

          <Grid item>
            <Typography className={classes.genreTitle}>Crime</Typography>
          </Grid>
          <Grid item xs={12}>
            <Recommender
              genre="crime"
              movie={movie}
              setMovie={setMovie}
              colSize={{ lg: 6, md: 3, sm: 3, xs: 1 }}
            />
          </Grid>

          <Grid item>
            <Typography className={classes.genreTitle}>Sci-Fi</Typography>
          </Grid>
          <Grid item xs={12}>
            <Recommender
              genre="sci-fi"
              movie={movie}
              setMovie={setMovie}
              colSize={{ lg: 6, md: 3, sm: 3, xs: 1 }}
            />
          </Grid>

          <Grid item>
            <Typography className={classes.genreTitle}>Adventure</Typography>
          </Grid>
          <Grid item xs={12}>
            <Recommender
              genre="adventure"
              movie={movie}
              setMovie={setMovie}
              colSize={{ lg: 6, md: 3, sm: 3, xs: 1 }}
            />
          </Grid>
        </Grid>
        <Grid item container md={2} sm={12} spacing={2}>
          <Grid item sm={4} md={12}>
            <MovieSearchCard movie={movie} setMovie={setMovie} />
          </Grid>
          <Grid item sm={4} md={12}>
            <ImdbList />
          </Grid>
          <Grid item sm={4} md={12}>
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
