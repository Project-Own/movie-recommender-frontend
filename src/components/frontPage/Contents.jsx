import React from 'react';
import {Grid} from '@material-ui/core';
import MovieCard  from './MovieCard';
import Footer from './Footer';
import movieList from './data'
// https://image.tmdb.org/t/p/w185
import {useState} from 'react';


const Contents=()=>{

    const [check,setCheck] = useState(false);
    
    const showHide=(selectedList)=>{
        
        console.log(selectedList);
        if (selectedList === undefined || selectedList.length <1) {
           setCheck(false);
        }else{
            setCheck(true);
        }
        
    }
    
   const getMovieCard = movieObj=>{
       return (
        <Grid item xs={12} sm={6} md={3}>
            <MovieCard 
                {...movieObj}
                showHide={showHide}
            />
        </Grid>
       );
   }
    
    return(
        <Grid item container spacing={2}>
           
            {movieList.map(movieObj=>getMovieCard(movieObj))}
            
            <Footer check={check}/>
        </Grid>
        

    );
}

export default Contents;




