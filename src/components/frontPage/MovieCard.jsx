import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
import FavoriteIcon from "@material-ui/icons/Favorite";

var selectedList = [];
const MovieCard = (props) => {
  const [icon, setIcon] = useState("false");
  const [posterOpacity, setposterOpacity] = useState("false");
  const [iconOpacity, setIconOpacity] = useState("false");

  function shoot() {
    setIcon(!icon);
    setposterOpacity(!posterOpacity);
    setIconOpacity(!iconOpacity);
    if (selectedList.includes(props.title)) {
      selectedList.splice(selectedList.indexOf(props.title), 1);
    } else {
      selectedList.push(props.title);
    }

    props.showHide(selectedList);
  }

  const useStyles = makeStyles((theme) => ({
    image: {
      maxWidth: "200px",
      maxHeight: "200px",
      minWidth: "200px",
      minHeight: "200px",
      borderRadius: 400,
      position: "absolute",
    },

    buttonbasestyle: {
      maxWidth: "200px",
      maxHeight: "200px",
      minWidth: "200px",
      minHeight: "200px",
      borderRadius: 400,
      "&:hover": {
        color: "red",
      },
      marginBottom: 24,
      marginTop: 16,
    },

    iconStyle: {
      opacity: iconOpacity ? 0 : 1,
      position: "absolute",
      color: "red",
    },
    divStyle: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: posterOpacity ? 1 : 0.7,
    },
    textStyle: {
      position: "absolute",
      top: 104,
      fontSize: 16,
      fontFamily: "Lato",
      color: icon ? theme.palette.text : "#8B0000",
    },
  }));

  const classes = useStyles();

  return (
    <ButtonBase className={classes.buttonbasestyle} onClick={shoot}>
      <Box className={classes.divStyle} textAlign="center">
        <img
          className={classes.image}
          src={"https://image.tmdb.org/t/p/w185" + props.poster_path}
          alt="rohit"
        ></img>
        <Typography
          variant="h6"
          color="textPrimary"
          className={classes.textStyle}
        >
          {props.title}
        </Typography>
        <FavoriteIcon
          className={classes.iconStyle}
          fontSize="large"
        ></FavoriteIcon>
      </Box>
    </ButtonBase>
  );
};

export default MovieCard;
