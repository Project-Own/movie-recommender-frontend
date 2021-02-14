import React, { useRef } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
import theme from "../../themes/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import defaultMoviePoster from '../../assets/images/defaultMoviePoster.png';
import { useEffect } from "react";
import FloatCard from "../FloatCard/FloatCard";
import defaultImage from "../../assets/images/defaultMoviePoster.png";
async function getMovieTitle(selectedTitle) {
  //recommendation

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedTitle),
  };

  return fetch(
    "https://item-recommendation.herokuapp.com/recom",
    requestOptions
  )
    .then(async (response) => {
      const data = await response.json();
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      // console.log(data);
      return data;
    })

    .catch((error) => {
      console.error("There was an error!", error);
    });
}
const MovieCard = (props) => {
  // console.log(props);
  const [icon, setIcon] = useState(true);
  const [posterOpacity, setposterOpacity] = useState(true);
  const [iconOpacity, setIconOpacity] = useState(true);
  const [posterUrl, setPosterUrl] = useState("");

  const imageRef = useRef(null);

  let selectedList = props.selectedList;

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
      color: "transparent",
      borderRadius: 400,
      "&:hover": {
        color: "transparent",
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
      color: icon ? theme.palette.text.primary : theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  function onButtonClicked() {
    // console.log(props.title);

    setIcon(!icon);
    setposterOpacity(!posterOpacity);
    setIconOpacity(!iconOpacity);

    if (selectedList.includes(props.index)) {
      selectedList.splice(selectedList.indexOf(props.index), 1);
    } else {
      selectedList.push(props.index);
      (async function () {
        let data = await getMovieTitle(props.index);
        await props.getDetails(data, props.index); //get details of predicted list here data is the predicted top 20
      })();
    }

    props.showHide(selectedList);
  }

  // useEffect(() => {
  //   //poster
  //   const getImage = (path) => {
  //     let ppath = "https://image.tmdb.org/t/p/w185" + path;
  //     if (path === "") {
  //       setPosterUrl(
  //         "https://img.omdbapi.com/?apikey=e4c29baa&i=" + props.imdbId
  //       );
  //     }

  //     fetch(ppath, { method: "HEAD" })
  //       .then((res) => {
  //         if (res.ok) {
  //           setPosterUrl(res.url);
  //         } else {
  //           setPosterUrl(
  //             "https://img.omdbapi.com/?apikey=e4c29baa&i=" + props.imdbId
  //           );
  //         }
  //       })
  //       .catch((err) => console.log("Error:", err));
  //   };
  //   getImage(props.posterPath);
  // }, [props.posterPath, props.imdbId]);

  useEffect(() => {
    if (selectedList.includes(props.index)) {
      setIcon(false);
      setposterOpacity(false);
      setIconOpacity(false);
    } else {
      setIcon(true);
      setposterOpacity(true);
      setIconOpacity(true);
    }
  }, [props.index]);
  return (
    <ThemeProvider theme={theme}>
      <ButtonBase className={classes.buttonbasestyle} onClick={onButtonClicked}>
        <FloatCard>
          <Box className={classes.divStyle} textAlign="center">
            <img
              className={classes.image}
              src={props.posterPath}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAMFBMVEXd3d2xsbHFxcWzs7PMzMza2tq+vr7W1ta2travr6/R0dG7u7vExMTZ2dnT09POzs7+TBqqAAAEmUlEQVR4nO2cDZeqIBCGF/mQBOT//9uLmQqold3QofM+5+yeLdv2aXaYAbT+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwD0V5t8BG9bq5W+IiG6asVPqE1jHVXS3yA4IzZqyXewsnoRqsYY9pdJvMushVKROJeB28mrhN6B9n6xnDul3vcEG7GjNz/pcuRfaNCMjMVZcUYbqb767Re0AprBmvGo6Rw9q7NONES7kJ+jJFNw92bx52GYs+UIiT1QzAJrWymu7Xf//XLaGfpwTCKbGvmV0PRu7lF3nGPEcurITgwnY7DHQku4U6Sngoi0l7CLXs7vR7OLcFh6Uykzcdwy16oKem5aWgkSeiKsYiPR6Uajy+hNpbIssF1oVRHE1Op4nB3w/Ep1FyrpifR4YdWrtktHmVdPCpVL6werW8hPzyN0Rj+//dWHjcRaaM04cbMjYZKfshubuUqMkrCPRfDMBSJhFooPReIaOK0dPLI2naORFYPHSTSM1E16U3qfOOKSH7ciTt5MicVabg1kVL9oN3t5HER1IpIUs/4yI7bWS608jnnuRHEpANxEk9FcGjl+jbVjzAUr1XcootTWN1LhYtauVaeVFbPJJ08hNtFs6ahlRMM9UCfTJxCftipKoZZkydU9TJsMiqbpZWHUk2kv2yRFEE+dU1ONz8eNGyNtp5KK9+jNbl0KNWU8+NB1slv2tJYCrwgDTe3FPdBthDzqAytvKkgP0acmpPaEll1vcW4nOHES/UKae+hbijOmnKkc7Nlp/mwwK0h1G2j1JzKnRLEu+KEH3camjHEsg7pZbOP053mbdJPbZHoCZk95pWkGm+3IiNb2UifHc9PacdP4MuNb3/LvM0txaTioVCmx/MTIr2ODxb7L85rm+kv5Bs7TKXizmYbVjqNqhTJ9L3YiePHbHs5b9er1IuZV+Liibgq5e2sDqgnW2n8fyJuSnn/yd77LqmCecS5Sgefy/c2n0S8nPcG+ZLndcR3xU/1/mLEz/VeD87XEU+Oz+Ine39QVdI6Pomf7b2u49kVDutU2RQ/3fu1eB5xviV+vne6R7+VKnnE+UaOX+B9XHyjAV3hHcQzsbyqNNlJwXU5LOLdds/pxWqS5ZPjPn9hWqTPYIt4N/oOn75xntwafsi8efSg8YGrByzHh29FvC0rThnv9bnfKrw3zlnDG94ras3vWr1PyJMib3WoNb9r9a41v2v1rjVPfs6bq4NsXVRYzns3v7WTx9idEZ8bb31ww33f+9y+c9R7fwVycrz79hj5yr+s925+c32Q3cKEvhPxc/Ub3sjvH/CuNU9q9a41T2r1/sF9CD5c98jvX9MP6a3k7n3vk9c7tjmEJbPeOfZEJ6939r2/tt6hvU4js97Jrw57xepa96Le+/WbH4WI99dA34lAvM/1rjXetXrXmifwhvc7iPLeRa5HPsG7yCe1yd1t629R6IPausIBL3a5fdlM4bbUGzNkp/bPFfyndNlPNHD+2NL9fQi/Yx0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDf4R8EwD9rYeMzawAAAABJRU5ErkJggg==";
              }}
            />

            <Typography className={classes.textStyle}>{props.title}</Typography>
            <FavoriteIcon
              className={classes.iconStyle}
              fontSize="large"
            ></FavoriteIcon>
          </Box>
        </FloatCard>
      </ButtonBase>
    </ThemeProvider>
  );
};

export default MovieCard;
