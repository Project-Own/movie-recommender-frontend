import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  removeMovie,
  selectPreferredMovies,
  selectToken,
} from "../../features/Auth/registerSlice";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

const addToPreference = async (index, token = "", add = true) => {
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

const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { index = 0, height = 50, width = 50 } = props;

  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const preferredMovies = useSelector(selectPreferredMovies);

  useEffect(() => {
    if (preferredMovies?.includes(index)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [preferredMovies, index]);

  useEffect(() => {
    if (clicked) {
      liked
        ? dispatch(addMovie({ index: index }))
        : dispatch(removeMovie({ index: index }));

      addToPreference(index, token, liked);
    }
    setClicked(false);
  }, [liked]);
  const handleLike = () => {
    setClicked(true);

    setLiked(!liked);
  };

  return (
    <IconButton onClick={handleLike}>
      {liked ? (
        <Favorite color="secondary" style={{ height: height, width: width }} />
      ) : (
        <FavoriteBorder
          color="secondary"
          style={{ height: height, width: width }}
        />
      )}
    </IconButton>
  );
};
export default LikeButton;
