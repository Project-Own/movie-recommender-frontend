import * as React from "react";
import { Slide, useScrollTrigger } from "@material-ui/core";
const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });
  // console.log(window.pageYOffset);
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
export default HideOnScroll;
