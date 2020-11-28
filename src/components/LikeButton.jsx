import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import likeAnimation from "../assets/lottie/like.json";
import heartLoveAnimation from "../assets/lottie/heart-love.json";
import heartsLikeAnimation from "../assets/lottie/hearts-like.json";
import starAniamtion from "../assets/lottie/star.json";
import starDarkAniamtion from "../assets/lottie/star-dark.json";
import { IconButton } from "@material-ui/core";

const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
  const { data } = props;

  const [animation, setAnimation] = useState(null);

  const container = useRef(null);
  const loadAnimation = () =>
    lottie.loadAnimation({
      container: container.current,
      animationData: starDarkAniamtion,
      renderer: "svg",
      loop: false,
      autoplay: false,
    });
  useEffect(() => {
    setAnimation(loadAnimation());
  }, []);
  useEffect(() => {
    if (!animation) return;

    if (liked) {
      lottie.setSpeed(1);
      lottie.setDirection(1);
      lottie.play();
    } else {
      lottie.setDirection(-1);
      lottie.setSpeed(2);
      lottie.play();
    }
  }, [liked, animation]);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <IconButton onClick={handleLike}>
      <div ref={container} style={{ height: 150, width: 150 }} />
    </IconButton>
  );
};
export default LikeButton;
