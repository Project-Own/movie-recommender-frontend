import { Avatar, Container, Toolbar, Typography } from "@material-ui/core";
import { SignalCellularNull } from "@material-ui/icons";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../features/Auth/loadUser";
import { selectToken, selectUser } from "../../features/Auth/registerSlice";

const preferredMoviesURI =
  "https://vae-login.herokuapp.com/api/profile/preferred_movies";
const Profile = () => {
  const user = useSelector(selectUser);

  const token = useSelector(selectToken);
  const [movieList, setMovieList] = useState();
  const func = async () => {
    const res = await Axios.get(preferredMoviesURI, {
      headers: {
        "x-auth-token": token,
      },
    });

    setMovieList(res.data);
  };

  useEffect(() => {
    func();
  }, []);
  return (
    <>
      <Toolbar />
      <Container>
        <Avatar alt="Name" src={user.avatar} />
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
        {typeof movieList !== "undefined"
          ? movieList.map((movie) => <Typography>{movie.title}</Typography>)
          : null}
      </Container>
    </>
  );
};

export default Profile;
