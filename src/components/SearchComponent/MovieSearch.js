import React from "react";
// import MovieCard from "./MovieCard";
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card} from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const API_ADDRESS = "https://www.omdbapi.com/?apikey=e4c29baa&t=";
// const style = {
//   width: 200,
//   height: 200,
//   borderRadius: 100,
//   objectFit: "cover",
// };



const MovieSearch =()=> {
  const [state,setState] = useState({ movieQuery: "", movie: "" });
  
  
  const updateMovieQuerry = (event) => {
    setState({ movieQuery: event.target.value });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovie();
    }
  };

  const searchMovie = () => {
    if (state.movieQuery !== "") {
      fetch(`${API_ADDRESS} + ${state.movieQuery}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.Response !== "False") {
            setState({ ...state, movie: json });
          }
        })
        .catch((error) => alert(error.message));
    }
  };
  // const componentDidMount=()=> {
  //   fetch(`${API_ADDRESS}avengers`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       setState({ movie: json });
  //     })
  //     .catch((error) => alert(error.message));
  // }
  const useStyles= makeStyles((theme) => ({
    searchBarStyle: {
      width:800,
      borderRadius: '24px',

      alignItems:'center',
      padding: '2px 4px',
      marginTop:16,
      marginBottom: 8,
      display: 'flex',
      '&:hover':{
        boxShadow:'0px 0px 8px 1px rgba(0,0,0,0.2)'
      },
      boxShadow:'0px 0px 0px 1px rgba(0,0,0,0.2)'
    },
    
    
    input: {
      marginLeft: theme.spacing(4),
      flex: 1,
     
    },
    iconButton: {
      padding: 10,
    },
  
  }));

  const classes =useStyles();
  
    
  
  
 
    console.log(state.movieQuery);
    return (
      // <>
      //   <Card>
      //     <CardContent>
      //       {/* <Typography variant="h5">Movie Search</Typography> */}
            
                
                
      <Card component="form" className={classes.searchBarStyle}>
      
      <InputBase
        className={classes.input}
        placeholder="Search Movie"
        
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton 
        type="submit" 
        className={classes.iconButton} 
        aria-label="search"
        onChange={updateMovieQuerry}
        onKeyPress={handleKeyPress}>
        <SearchIcon />
      </IconButton>
              
        </Card>
            //<TextField className={classes.searchBarStyle}
            //   variant="outlined"
            //   onChange={updateMovieQuerry}
            //   onKeyPress={handleKeyPress}
            //   placeholder="Search Movie"
            //   size="small"
            // />
            
            
          // </CardContent>

          // <CardActions>
            // <Button
            //   variant="contained"
            //   color="primary"
            //   onClick={this.searchMovie}
            // >
            //   Search
            // </Button>
      //     </CardActions>
      //   </Card>
      //   {/* {this.state.movie ? <MovieCard movie={this.state.movie} /> : null} */}
      // </>
    );
  
}

export default MovieSearch;
