import React from "react";
import { Grid } from "@material-ui/core";
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
  selectMovieSelected,
  selectToken,
} from "../../features/Auth/registerSlice";
import { Redirect } from "react-router";
import { Skeleton } from "@material-ui/lab";

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&i=";

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

async function getMovieTitle(selectedTitle) {
  //recommendation

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedTitle),
  };

  return fetch(
    "https://item-recommendation.herokuapp.com/recom",
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

const Contents = () => {
  const [movieList, setMovieList] = useState([]);
  const [movieIndex, setMovieIndex] = useState([]);
  const [selectedMovieList, setSelectedMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectButtonClicked, setSelectButtonClicked] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const movieSelected = useSelector(selectMovieSelected);

  const FIND_INDEX_API_ADDRESS =
    "https://vae-movie-recommender.herokuapp.com/findIndex";
  useEffect(() => {
    try {
      if (movieSelected || typeof movieSelected != "undefined") {
        console.log("MOVIE SELECED");
        console.log(movieSelected);
        Axios.post(
          FIND_INDEX_API_ADDRESS,
          {
            title: movieSelected.title,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        ).then((res) => {
          console.log("INDEXXX");
          console.log(res.data);

          let response = res?.data["index"][0];
          response = response["index"];
          console.log(response);
          if (response !== 0) {
            if (selectedMovieList.includes(response)) {
              selectedMovieList.splice(selectedMovieList.indexOf(res), 1);
            } else {
              selectedMovieList.push(response);
              (async function () {
                let data = await getMovieTitle(response);

                await getDetails(data, response, movieSelected); //get details of predicted list here data is the predicted top 20
              })();
            }

            showHide(selectedMovieList);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [movieSelected]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("https://movie-database-server.herokuapp.com/api/items")
        .then(async (res) => {
          const movies = await Promise.all(
            res.data.map(async (movie, index) => {
              let omdbRes;
              try {
                omdbRes = await Axios.get(`${API_ADDRESS}${movie.imdbId}`);
              } catch (err) {
                console.log(err);
              }

              try {
                const res = await Axios.get(
                  "https://image.tmdb.org/t/p/w185" + movie.posterPath
                );
                if (res.data === "<h1>File not Found</h1>") throw Error;
                movie.posterPath =
                  "https://image.tmdb.org/t/p/w185" + movie.posterPath;
              } catch (err) {
                // console.log(res);
                movie.posterPath = omdbRes?.data?.Poster ?? "Unknown";
              }
              movie = { ...movie, ...omdbRes.data };

              return movie;
            })
          );

          // console.log("TEST MOVIE");
          // console.table(movies);

          setMovieList(movies);
          setMovieIndex(
            movies.map((movie) => {
              return movie.index;
            })
          );

          setLoading(false);
          // console.log(res.data);
        })
        .catch((error) => alert(error.message));
    }
    fetchData();
  }, []);

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

  async function getDetails(data, index, movieSelected = " ") {
    console.log("DATA");
    console.log(data);
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

      // console.log("DETAILS LIST");
      // console.log(detailsList);
      var fourRndom = getRandom(detailsList, 4);
      // console.log(fourRndom);

      // const movies = await Promise.all(
      //   fourRndom.map(async (movie, index) => {
      //     let omdbRes;
      //     try {
      //       omdbRes = await Axios.get(`${API_ADDRESS}${movie.imdbId}`);
      //     } catch (err) {
      //       console.log(err);
      //     }

      //     try {
      //       const res = await Axios.get(
      //         "https://image.tmdb.org/t/p/w185" + movie.posterPath
      //       );
      //       if (res.data === "<h1>File not Found</h1>") throw Error;
      //       movie.posterPath =
      //         "https://image.tmdb.org/t/p/w185" + movie.posterPath;
      //     } catch (err) {
      //       // console.log(res);
      //       movie.posterPath = omdbRes?.data?.Poster ?? "Unknown";
      //     }
      //     movie = { ...movie, ...omdbRes.data };

      //     return movie;
      //   })
      // );

      const movieListFront = movieList.slice(0, movieIndex.indexOf(index) + 1);
      const movieListBack = movieList.slice(movieIndex.indexOf(index) + 1);

      let updatedMovieList = [];
      updatedMovieList = movieListFront.concat(fourRndom);
      updatedMovieList = updatedMovieList.concat(movieListBack);
      if (movieSelected !== " ") {
        updatedMovieList = [movieSelected].concat(updatedMovieList);
      }
      // console.log("Updated Movie List");
      // console.log(updatedMovieList);
      // updatedMovieList.splice(movieIndex.indexOf(index) + 1, 4, ...fourRndom);

      setMovieList(updatedMovieList);

      setMovieIndex(
        updatedMovieList.map((movie) => {
          return movie.index;
        })
      );
    } catch (error) {
      alert(error);
    }
  }

  const showHide = (selectedList) => {
    setSelectedMovieList(selectedList);
    console.log("Selected Movie List" + selectedMovieList);

    if (typeof selectedList === "undefined" || selectedList.length < 1) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };
  const getMovieCard = (movieObj) => {
    return (
      <Grid item xs={12} sm={4} md={2} align="center">
        <MovieCard
          {...movieObj}
          showHide={showHide}
          selectedList={selectedMovieList}
          setSelectedList={setSelectedMovieList}
          getDetails={getDetails}
        />
      </Grid>
    );
  };

  const addToPreference = async () => {
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

  // console.log("Movie List:");
  // console.table(movieList);

  // console.log("Movie List" + movieList);
  // console.log("Movie Index" + movieIndex);

  return (
    <>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        container
      >
        {loading
          ? new Array(50).fill(0).map(() => (
              <Grid item>
                <Skeleton
                  animation="wave"
                  variant="circle"
                  height={200}
                  width={200}
                  style={{ margin: 4 }}
                />
              </Grid>
            ))
          : movieList?.map((movieObj) => getMovieCard(movieObj))}
      </Grid>
      <Footer check={check} onClickFinished={addToPreference} />
    </>
  );
};

export default Contents;
