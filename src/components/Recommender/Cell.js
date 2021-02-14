import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import Axios from "axios";
import React, { Component, lazy } from "react";
import { Slug, Fade } from "../../components/Grid/Primitives";
import FlipCard from "../FlipCard/FlipCard";
import FloatCard from "../FloatCard/FloatCard";
import LikeButton from "../LikeButton/LikeButton";

const Cell = (props) => {
  const { data, height, width, searchMovie } = props;
  const theme = useTheme();
  return (
    <FloatCard height={height} width={width}>
      <FlipCard
        height={height}
        width={width}
        front={
          <>
            <img
              // onClick={() => {
              //   searchMovie(movie);
              // }}
              style={{ height: height, width: width }}
              src={data?.posterPath}
              alt="Poster"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAMFBMVEXd3d2xsbHFxcWzs7PMzMza2tq+vr7W1ta2travr6/R0dG7u7vExMTZ2dnT09POzs7+TBqqAAAEmUlEQVR4nO2cDZeqIBCGF/mQBOT//9uLmQqold3QofM+5+yeLdv2aXaYAbT+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwD0V5t8BG9bq5W+IiG6asVPqE1jHVXS3yA4IzZqyXewsnoRqsYY9pdJvMushVKROJeB28mrhN6B9n6xnDul3vcEG7GjNz/pcuRfaNCMjMVZcUYbqb767Re0AprBmvGo6Rw9q7NONES7kJ+jJFNw92bx52GYs+UIiT1QzAJrWymu7Xf//XLaGfpwTCKbGvmV0PRu7lF3nGPEcurITgwnY7DHQku4U6Sngoi0l7CLXs7vR7OLcFh6Uykzcdwy16oKem5aWgkSeiKsYiPR6Uajy+hNpbIssF1oVRHE1Op4nB3w/Ep1FyrpifR4YdWrtktHmVdPCpVL6werW8hPzyN0Rj+//dWHjcRaaM04cbMjYZKfshubuUqMkrCPRfDMBSJhFooPReIaOK0dPLI2naORFYPHSTSM1E16U3qfOOKSH7ciTt5MicVabg1kVL9oN3t5HER1IpIUs/4yI7bWS608jnnuRHEpANxEk9FcGjl+jbVjzAUr1XcootTWN1LhYtauVaeVFbPJJ08hNtFs6ahlRMM9UCfTJxCftipKoZZkydU9TJsMiqbpZWHUk2kv2yRFEE+dU1ONz8eNGyNtp5KK9+jNbl0KNWU8+NB1slv2tJYCrwgDTe3FPdBthDzqAytvKkgP0acmpPaEll1vcW4nOHES/UKae+hbijOmnKkc7Nlp/mwwK0h1G2j1JzKnRLEu+KEH3camjHEsg7pZbOP053mbdJPbZHoCZk95pWkGm+3IiNb2UifHc9PacdP4MuNb3/LvM0txaTioVCmx/MTIr2ODxb7L85rm+kv5Bs7TKXizmYbVjqNqhTJ9L3YiePHbHs5b9er1IuZV+Liibgq5e2sDqgnW2n8fyJuSnn/yd77LqmCecS5Sgefy/c2n0S8nPcG+ZLndcR3xU/1/mLEz/VeD87XEU+Oz+Ine39QVdI6Pomf7b2u49kVDutU2RQ/3fu1eB5xviV+vne6R7+VKnnE+UaOX+B9XHyjAV3hHcQzsbyqNNlJwXU5LOLdds/pxWqS5ZPjPn9hWqTPYIt4N/oOn75xntwafsi8efSg8YGrByzHh29FvC0rThnv9bnfKrw3zlnDG94ras3vWr1PyJMib3WoNb9r9a41v2v1rjVPfs6bq4NsXVRYzns3v7WTx9idEZ8bb31ww33f+9y+c9R7fwVycrz79hj5yr+s925+c32Q3cKEvhPxc/Ub3sjvH/CuNU9q9a41T2r1/sF9CD5c98jvX9MP6a3k7n3vk9c7tjmEJbPeOfZEJ6939r2/tt6hvU4js97Jrw57xepa96Le+/WbH4WI99dA34lAvM/1rjXetXrXmifwhvc7iPLeRa5HPsG7yCe1yd1t629R6IPausIBL3a5fdlM4bbUGzNkp/bPFfyndNlPNHD+2NL9fQi/Yx0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDf4R8EwD9rYeMzawAAAABJRU5ErkJggg==";
              }}
            />
          </>
        }
        back={
          <Card style={{ height: height, width: width - 20 }}>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  {data?.genres.split("|").map((value, key) => (
                    <Typography key={key}> {value}</Typography>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.voteAverage}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.voteCount}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.popularity}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.imdbRating}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.Genre}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data?.Director}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        }
      />

      <Grid
        container
        style={{
          width: width + 20,
          background: theme.palette.primary.main,
          position: "absolute",
          marginTop: -50,
          marginLeft: -5,

          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Grid item xs={8}>
          <Typography
            onClick={() => {
              searchMovie(data);
            }}
            style={{ padding: 20, cursor: "pointer" }}
          >
            <Link color="textPrimary">{data?.title ?? "Unknown"}</Link>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LikeButton index={data?.index ?? 70000} />
        </Grid>
      </Grid>
    </FloatCard>
  );
};

export default Cell;