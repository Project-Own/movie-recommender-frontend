import React, { useEffect, useState } from "react";
import {
  TextField,
  CircularProgress,
  Typography,
  Grid,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const AUTOCOMPLETE_API_ADDRESS =
  "https://api.themoviedb.org/3/search/movie?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&query=";
const AUTOCOMPLETE_TOP_API_ADDRESS =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&page=1";

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&t=";

const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const MovieAutoComplete = ({ setMovieSelected }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    (async () => {
      let response;
      if (query !== "") {
        response = await fetch(
          `${AUTOCOMPLETE_API_ADDRESS} + ${query}+"&page=1&include_adult=false"`
        );
      } else {
        response = await fetch(AUTOCOMPLETE_TOP_API_ADDRESS);
      }
      await sleep(500);
      const movies = await response.json();
      // console.log(movies);
      if (active) {
        setOptions(movies.results);
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [query]);

  useEffect(() => {
    if (selected || typeof selected != "undefined") {
      // console.log(selected);

      Promise.all(
        [selected]?.map(async (movie, index) => {
          let omdbRes;
          try {
            omdbRes = await Axios.get(`${API_ADDRESS}${movie.title}`);
          } catch (err) {
            console.log(err);
          }

          try {
            const res = await Axios.get(
              "https://image.tmdb.org/t/p/w185" + movie.poster_path
            );
            if (res.data === "<h1>File not Found</h1>") throw Error;
            movie.posterPath =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } catch (err) {
            // console.log(res);
            movie.posterPath = omdbRes?.data?.Poster ?? "Unknown";
          }
          movie = { ...movie, ...omdbRes.data };

          return movie;
        })
      ).then((res) => {
        // console.log("INSIDE THEN");
        // console.log(res);

        setMovieSelected(res[0]);
      });
    }
  }, [selected, setMovieSelected]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`${AUTOCOMPLETE_TOP_API_ADDRESS}`);
  //     // await sleep(1e3);
  //     const movies = await response.json();
  //     // console.log(movies);

  //     setTop(movies.result);
  //   })();
  // }, []);
  // useEffect(() => {
  //   if (!open) {
  //     setOptions(top);
  //   }
  // }, [open, top]);
  const useStyles = makeStyles((theme) => ({
    searchBarStyle: {
      borderRadius: "24px",
      height: 48,
      alignItems: "center",
      margin: "16px",
      display: "flex",
      "&:hover": {
        boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.2)",
      },
      "&.MuiAutocomplete-input": {
        color: "white",
      },
      boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.2)",
      fontFamily: "Roboto Mono",

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(1,0,0,0)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(1,0,0,0)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(1,0,0,0)",
      },
    },
  }));
  const classes = useStyles();

  return (
    <Autocomplete
      className={classes.searchBarStyle}
      freeSolo
      id="autocomplete"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      inputValue={query}
      onChange={(event, newValue) => {
        if (newValue !== null) {
          setSelected(newValue);
          setQuery("");
        }
      }}
      renderOption={(option, { selected }) => {
        // console.log(option.poster_path);
        // console.log("https://image.tmdb.org/t/p/w200" + option.poster_path);
        return (
          <>
            <Grid container direction="row">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                item
                xs={8}
              >
                <Grid item>
                  <Typography>{option.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography>({option.vote_average})</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <img
                  style={{ objectFit: "cover", maxHeight: 200 }}
                  src={"https://image.tmdb.org/t/p/w200" + option.poster_path}
                  width="100%"
                  alt={options.title}
                />
              </Grid>
            </Grid>
          </>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Movie Search"
          variant="outlined"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          // onKeyPress={handleKeyPress}

          placeholder="Search Movie"
          InputProps={{
            style: {
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              color: "white",
            },
            ...params.InputProps,
            type: "search",
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default MovieAutoComplete;
