import React from 'react';
import {Grid} from '@material-ui/core';
import MovieCard  from './MovieCard';
import Footer from './Footer';
// import movieList from './data'
// https://image.tmdb.org/t/p/w185
// import {useState} from 'react';
// import axios from 'axios';
import axios from 'axios';
import {useState,useEffect} from 'react';




const Contents=()=>{

    const [movieList,setMovieList] = useState('');

    useEffect(() => {
      async function fetchData(){
        
        await axios
       .get('/api/items')
       .then(async res=>{
             const data = await res.data;
             setMovieList(data);
        })
       .catch((error) => alert(error.message));
     
      }
   fetchData();
  },[]);
    
    

    var movieasdf=[];
    Array.from(movieList).map(movie=>movieasdf.push(movie.index));
    console.log(movieasdf);
        
    
    const [check,setCheck] = useState(false);
   
    function getRandom(arr,n) {
        var result = new Array(n),
            len = arr.length,
            
            taken = new Array(len);
        if (n > len){
            
            throw new RangeError("getRandom: more elements taken than available");}
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
    
    
    async function getAllDetails(detailsList){
        const requestOptions={
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({title:detailsList})
    };
        
        
        
    return fetch('http://localhost:4000/api/items/singleItem', requestOptions)
        .then(async response => {
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
                
        .catch(error => {
                
            console.error('There was an error!', error);
        });
    }
    
    
    async function getDetails(data,index){
        // console.log(data);
        try{
            
            var detailsList=[];
            await Promise.all(data.map(Details=>(async function(){
                            let data = await getAllDetails(Details)
                            // console.log(data)
                            if(data[0]!==undefined){
                                detailsList.push(data[0]);
                            }
                            })()))
            
            
            // console.log(det);
            // console.log(detailsList);
            
            var fourRndom = getRandom(detailsList,4);
            console.log(fourRndom);
            
            movieList.splice(movieasdf.indexOf(index)+1,4,...fourRndom);
            setMovieList(movieList);
            console.log(movieList); //kam lagcha after click
        }
        catch(error){
            alert(error);
        }
        
    }    
    
    
    
    
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
                getDetails={getDetails}
            />
        </Grid>
       );
   }
    
    return(
        <Grid item container spacing={2}>
     
            {Array.from(movieList).map(movieObj=>getMovieCard(movieObj))}
            
            <Footer check={check}/>
        </Grid>
        

    );
}

export default Contents;




