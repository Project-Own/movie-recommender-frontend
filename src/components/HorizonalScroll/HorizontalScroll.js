import React from "react";

import { Button, Fab, Grid, makeStyles } from "@material-ui/core";
import "../HorizonalScroll/horizontalScroll.css";
import { AddIcCallOutlined, ArrowBack, ArrowForward } from "@material-ui/icons";
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
      {/* <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={1}>
          <Fab onClick={() => handleNav("left")}>
            <ArrowBack />
          </Fab>
        </Grid>
        <Grid item xs={10}> */}
      <div className="navItems" ref={navRef}>
        {props.children}
      </div>
      {/* </Grid>
        <Grid item xs={1}>
          <Fab onClick={() => handleNav("right")}>
            <ArrowForward />
          </Fab>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default HorizonalScroll;
