import React from "react";

import { makeStyles } from "@material-ui/core";
import "../VerticalScroll/VerticalScroll.css";
const useStyles = makeStyles((theme) => ({
  menuContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

const VerticalScroll = (props) => {
  const classes = useStyles();

  
  // const handleNav = (direction) => {
  //   if (direction === "left") {
  //     navRef.current.scrollLeft -= 200;
  //   } else {
  //     navRef.current.scrollLeft += 200;
  //   }
  // };

  return (
    <div className={classes.menuContainer}>
      {/* <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={1}>
          <Fab onClick={() => handleNav("left")}>
            <ArrowBack />
          </Fab>
        </Grid>
        <Grid item xs={10}> */}
      <div className="navItems1" >
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

export default VerticalScroll;
