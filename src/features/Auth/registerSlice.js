import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: null,
  loading: true,
  user: null,
  movieSelected: {
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
  },
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      console.log(action);
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.token = localStorage.getItem("token");
    },

    success: (state, action) => {
      localStorage.setItem("token", action.payload.token);

      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    failure: (state, action) => {
      console.error("Failure Condition: " + action.payload.type);
      console.log("Failure Condition: " + action.payload.type);
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    addMovie: (state, action) => {
      if (!state.user?.preferredMovies.includes(action.payload.index)) {
        state.user?.preferredMovies.push(action.payload.index);
      }
    },
    removeMovie: (state, action) => {
      state.user.preferredMovies = state.user?.preferredMovies.filter(
        (item) => item !== action.payload.index
      );
    },
    selectMovie: (state, action) => {
      state.movieSelected = action.payload.movieSelected;
    },
  },
});

export const {
  success,
  failure,
  userLoaded,
  addMovie,
  removeMovie,
  selectMovie,
} = registerSlice.actions;

export const selectRegister = (state) => state.register;
export const selectUser = (state) => state.register.user;
export const selectToken = (state) => state.register.token;
export const selectPreferredMovies = (state) =>
  state.register.user?.preferredMovies;
export const selectIsAuthenticated = (state) => state.register.isAuthenticated;
export const selectMovieSelected = (state) => state.register.movieSelected;

export default registerSlice.reducer;
