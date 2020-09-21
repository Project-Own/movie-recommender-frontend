import React from "react";
import { Paper, Grid } from "@material-ui/core";

export default function TestGrid() {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Paper>xs</Paper>
      </Grid>
      <Grid item xs>
        <Paper>xs</Paper>
      </Grid>
      <Grid item xs>
        <Paper>xs</Paper>
      </Grid>
       <Grid item xs>
        <Paper>xs</Paper>
      </Grid>
    </Grid>
  );
}
