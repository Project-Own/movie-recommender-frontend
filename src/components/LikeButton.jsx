import React, { useEffect, useMemo, useRef, useState } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import likeAnimation from "../assets/lottie/like.json";
import heartLoveAnimation from "../assets/lottie/heart-love.json";
import heartsLikeAnimation from "../assets/lottie/hearts-like.json";
import starAniamtion from "../assets/lottie/star.json";
import starDarkAniamtion from "../assets/lottie/star-dark.json";
import { IconButton } from "@material-ui/core";

const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
  const { index, data, height = 50, width = 50 } = props;
  console.log(index);
  console.log(data);
  const [animation, setAnimation] = useState(null);

  const container = useRef(null);

  console.log(container);

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
  }, [index]);
  useEffect(() => {
    if (!animation) return;

    if (liked) {
      lottie.setSpeed(1);
      lottie.setDirection(1);
      lottie.play(index);
    } else {
      lottie.setDirection(-1);
      lottie.setSpeed(2);
      lottie.play(index);
    }
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
