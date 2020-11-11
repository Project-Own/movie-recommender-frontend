import React, { useEffect, useState } from "react";
import {
  TextField,
  CircularProgress,
  Typography,
  Grid,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const AUTOCOMPLETE_API_ADDRESS =
  "https://api.themoviedb.org/3/search/movie?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&query=";
const AUTOCOMPLETE_TOP_API_ADDRESS =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&page=1";

const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const MovieAutoComplete = ({ setMovieSelected }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
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
    if (selected !== null) {
      console.log(selected);
      setMovieSelected(selected);
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

  return (
    <Autocomplete
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
                  style={{ objectFit: "cover" }}
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
