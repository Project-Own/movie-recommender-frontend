import React, { useRef } from "react";

import { Button, makeStyles } from "@material-ui/core";
import "../HorizonalScroll/horizontalScroll.css";
const useStyles = makeStyles((theme) => ({
  menuContainer: {
    display: "flex",
    flexDirection: "row",
  },
}));

const HorizonalScroll = (props) => {
  const classes = useStyles();

  const navRef = React.createRef();
  const handleNav = (direction) => {
    if (direction === "left") {
      navRef.current.scrollLeft -= 200;
    } else {
      navRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className={classes.menuContainer}>
      <Button onClick={() => handleNav("left")}>Prev</Button>
      <div className="navItems" ref={navRef}>
        {props.children}
      </div>
      <Button onClick={() => handleNav("right")}>Next</Button>
    </div>
  );
};

export default HorizonalScroll;
