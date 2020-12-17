import React from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Footer = (props) => {
  const useStyles = makeStyles((theme) => ({
    footerStyle: {
      textAlign: "center",

      padding: "16px",
      position: "fixed",
      left: "0",
      bottom: "0",
      height: "80px",
      width: "100%",
    },
    buttonStyle: {
      fontFamily: "Trispace",
      borderRadius: 24,
      width: 240,
      height: 48,
      backgroundColor: "#7986cb",
      color: "white",
      "&:hover": {
        backgroundColor: "#303f9f",
      },
    },
    textStyle: {
      fontFamily: "Lato",
    },
  }));
  const classes = useStyles();

  return props.check ? (
    <Paper className={classes.footerStyle}>
      <Button className={classes.buttonStyle} onClick={props.onClickFinished}>
        Finished
      </Button>
    </Paper>
  ) : (
    <Paper className={classes.footerStyle}>
      <Typography>Select at least one movie or use the search bar.</Typography>
    </Paper>
  );

  // if(props.check){
  //     return (
  //         <span className={classes.footerStyle}>
  //             <Button  className={classes.buttonStyle} > Finished</Button>

  //         </span>
  //     );

  // }else {
  //     return (
  //         <span className={classes.footerStyle}>
  //              <Typography className={classes.textStyle}>Select at least one movie or use the search bar.</Typography>

  //         </span>
  //     );

  // }
};

export default Footer;
