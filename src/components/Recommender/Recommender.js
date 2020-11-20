import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";

import data from "./data";
import ButtonBase from "@material-ui/core/CardActionArea";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    image: {
        maxWidth: "200px",
        maxHeight: "200px",
        minWidth: "200px",
        minHeight: "200px",
        borderRadius: 20,
        position: "absolute"
    },

    buttonbasestyle: {
        // maxWidth: "200px",
        maxHeight: "20px",
        minWidth: "150px",
        minHeight: "20px",
        borderRadius: 10,
        "&:hover": {
            color: "red"
        },
        marginBottom: 10,
        marginTop: 10
    },
    textStyle: {
        position: "absolute",
        top: 104,
        fontSize: 16,
        fontFamily: "Lato"
    }
}));

function shoot() {
    console.log("I am shoot");
}
export default function Recommender() {
    const [movie, recommendMovie] = React.useState("guarded bayou");
    const classes = useStyles();

    return ( <
        Grid container className = { classes.root }
        spacing = { 2 } >
        <
        Grid item xs = { 12 } >
        <
        Paper style = {
            { width: 300, height: 20 } } >
        <
        Grid item >
        <
        FormLabel > Recommendation
        for { movie } < /FormLabel> <
        /Grid> <
        /Paper> <
        /Grid>

        <
        Grid item xs = { 12 } >
        <
        Grid container justify = "center"
        spacing = { 1 } > {
            data.map((movie) => ( <
                Grid item >
                <
                ButtonBase className = { classes.buttonbasestyle }
                onClick = { shoot } >

                { movie.title }

                {
                    /* <img
                                      className={classes.image}
                                      src={"https://image.tmdb.org/t/p/w185" + movie.posterPath}
                                      alt="rohitjoey"
                                    ></img> */
                } <
                /ButtonBase> <
                /Grid>
            ))
        } <
        /Grid> <
        /Grid> <
        /Grid>
    );
}