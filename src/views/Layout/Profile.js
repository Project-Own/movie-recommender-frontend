import {
  Avatar,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cell from "../../components/Recommender/Cell";
import { loadUser } from "../../features/Auth/loadUser";
import { selectToken, selectUser } from "../../features/Auth/registerSlice";

const preferredMoviesURI =
  "https://vae-login.herokuapp.com/api/profile/preferred_movies";
const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
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
    if (!user) {
      loadUser(dispatch);
    }
  }, []);

  useEffect(() => {
    func();
  }, []);
  return (
    <>
      <Toolbar />
      <Container>
        <Avatar alt="Name" src={user?.avatar ?? "Unknown"} />
        <Typography>{user?.name ?? "Unknown"}</Typography>
        <Typography>{user?.email ?? "Unknown"}</Typography>
        <Grid container>
          {typeof movieList !== "undefined"
            ? movieList.map((movie, index) => (
                <Grid item>
                  <Cell
                    key={index}
                    data={movie}
                    height={300}
                    width={200}
                    style={{ margin: 10 }}
                    searchMovie={() => {}}
                  />
                </Grid>
              ))
            : null}
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
