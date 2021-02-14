import React from "react";
import { Container, Grid } from "@material-ui/core";
import MovieCard from "./MovieCard";
import Footer from "./Footer";
// import movieList from './data'
// https://image.tmdb.org/t/p/w185
// import {useState} from 'react';
// import axios from 'axios';
import axios from "axios";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  selectIsAuthenticated,
  selectToken,
} from "../../features/Auth/registerSlice";
import { Redirect } from "react-router";

const addToPreferenceAPI = async (index, token = "", add = true) => {
  const operation = add ? "add" : "remove";
  try {
    await Axios.post(
      `https://vae-login.herokuapp.com/api/${operation}-movie`,
      {
        index: index,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};

const Contents = () => {
  const [movieList, setMovieList] = useState("");
  const [selectedMovieList, setSelectedMovieList] = useState([]);
  const [selectButtonClicked, setSelectButtonClicked] = useState(false);
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  console.log(isAuthenticated);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("https://movie-database-server.herokuapp.com/api/items")
        .then(async (res) => {
          const data = await res.data;
          setMovieList(data);
        })
        .catch((error) => alert(error.message));
    }
    fetchData();
  }, []);

  var movieasdf = [];
  Array.from(movieList).map((movie) => movieasdf.push(movie.index));
  console.log(movieasdf);

  const [check, setCheck] = useState(false);

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len) {
      throw new RangeError("getRandom: more elements taken than available");
    }
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  async function getAllDetails(detailsList) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: detailsList }),
    };

    return fetch(
      "https://movie-database-server.herokuapp.com/api/items/singleItem",
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        // console.log(data);
        return data;
      })

      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  async function getDetails(data, index) {
    // console.log(data);
    try {
      var detailsList = [];
      await Promise.all(
        data.map((Details) =>
          (async function () {
            let data = await getAllDetails(Details);
            // console.log(data)
            if (data[0] !== undefined) {
              detailsList.push(data[0]);
            }
          })()
        )
      );

      // console.log(det);
      // console.log(detailsList);

      var fourRndom = getRandom(detailsList, 4);
      console.log(fourRndom);

      movieList.splice(movieasdf.indexOf(index) + 1, 4, ...fourRndom);
      setMovieList(movieList);
      console.log(movieList); //kam lagcha after click
    } catch (error) {
      alert(error);
    }
  }

  const showHide = (selectedList) => {
    setSelectedMovieList(selectedList);
    console.log(selectedMovieList);

    if (selectedList === undefined || selectedList.length < 1) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };
  const getMovieCard = (movieObj) => {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <MovieCard {...movieObj} showHide={showHide} getDetails={getDetails} />
      </Grid>
    );
  };
  const addToPreference = async () => {
    console.log(selectedMovieList);
    try {
      dispatch(addMovie({ index: selectedMovieList }));

      addToPreferenceAPI(selectedMovieList, token, true);

      setSelectButtonClicked(true);
    } catch (e) {
      console.log(e);
    }
  };

  if (selectButtonClicked) {
    return (
      <Redirect
        from="/movie-recommender-frontend/select"
        to="/movie-recommender-frontend/"
      />
    );
  }

  return (
    <Container>
      <Grid
        direction="row"
        item
        justify="center"
        alignItems="center"
        container
        spacing={2}
      >
        {Array.from(movieList).map((movieObj) => getMovieCard(movieObj))}

        <Footer check={check} onClickFinished={addToPreference} />
      </Grid>
    </Container>
  );
};

export default Contents;
