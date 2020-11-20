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
        maxWidth: "200px",
        maxHeight: "200px",
        minWidth: "200px",
        minHeight: "200px",
        borderRadius: 10,
        "&:hover": {
            color: "red"
        },
        marginBottom: 24,
        marginTop: 16
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
        Paper className = { classes.control } >
        <
        Grid container >
        <
        Grid item >
        <
        FormLabel > Recommendation
        for { movie } < /FormLabel> <
        /Grid> <
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
                <
                h5 textAlign = "center"
                className = { classes.textStyle } > { movie.title } <
                /h5> <
                img className = { classes.image }
                src = { "https://image.tmdb.org/t/p/w185" + movie.posterPath }
                alt = "rohitjoey" >
                < /img> <
                /ButtonBase> <
                /Grid>
            ))
        } <
        /Grid> <
        /Grid> <
        /Grid>
    );
}