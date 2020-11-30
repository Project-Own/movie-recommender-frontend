import React, { useEffect, useMemo, useRef, useState } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import starDarkAniamtion from "../../assets/lottie/star-dark.json";
import { IconButton } from "@material-ui/core";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  removeMovie,
  selectPreferredMovies,
} from "../../features/Auth/registerSlice";

const addToPreference = async (index, add = true) => {
  const operation = add ? "add" : "remove";

  await Axios.post(
    `https://vae-login.herokuapp.com/api/${operation}-movie`,
    {
      index: index,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZjMjc0MDJkNjdhNzgwMDE3ZTlhNzcyIn0sImlhdCI6MTYwNjczOTc0OCwiZXhwIjoxNjA3MDk5NzQ4fQ.0QkyMcx42t-vrvPhyGXc_EKCOpbLUgBDFArWq4g_2Ck",
      },
    }
  );
};

const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
  const { index, height = 50, width = 50 } = props;

  const [animation, setAnimation] = useState(null);
  const dispatch = useDispatch();
  const container = useRef(null);
  const preferredMovies = useSelector(selectPreferredMovies);

  useEffect(() => {
    const loadAnimation = () =>
      lottie.loadAnimation({
        container: container.current,
        name: index,
        animationData: starDarkAniamtion,
        renderer: "svg",
        loop: false,
        autoplay: false,
      });
    setAnimation(loadAnimation());
  }, []);

  useEffect(() => {
    if (index in preferredMovies) setLiked(true);
  }, [preferredMovies, index]);

  useEffect(() => {
    if (!animation) return;

    if (liked) {
      lottie.setSpeed(1);
      lottie.setDirection(1);
      lottie.play(index);
      dispatch(addMovie({ index: index }));
    } else {
      lottie.setDirection(-1);
      lottie.setSpeed(2);
      lottie.play(index);
      dispatch(removeMovie({ index: index }));
    }
    addToPreference(index, liked);
  }, [liked, index, animation]);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <IconButton onClick={handleLike}>
      <div ref={container} style={{ height: height, width: width }} />
    </IconButton>
  );
};
export default React.memo(LikeButton);
