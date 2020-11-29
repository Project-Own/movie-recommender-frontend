<<<<<<< HEAD
import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import ButtonBase from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import theme from '../../themes/theme';
import {ThemeProvider} from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import defaultMoviePoster from '../../assets/images/defaultMoviePoster.png';
import {useEffect} from 'react';

var selectedList=[];

const MovieCard =(props)=>{
    // console.log(props);
    const [icon,setIcon] = useState('false');
    const [posterOpacity,setposterOpacity] = useState('false');
    const [iconOpacity,setIconOpacity] = useState('false');

    
    function shoot() {
            // console.log(props.title);
            
            (async function(){
                let data = await getMovieTitle(props.index);
                await props.getDetails(data,props.index);//get details of predicted list here data is the predicted top 20
              })();
              setIcon(!icon);
              setposterOpacity(!posterOpacity);
              setIconOpacity(!iconOpacity);
              if(selectedList.includes(props.title)){
                  selectedList.splice(selectedList.indexOf(props.title),1);
              }else{
                  selectedList.push(props.title);
              }
              
              props.showHide(selectedList);
            
    }  
    
    const useStyles = makeStyles(theme=>({
        image: {
          maxWidth: '200px', 
          maxHeight: '200px', 
          minWidth: '200px', 
          minHeight: '200px',
          borderRadius:400,
          position:'absolute'
        },
        
        buttonbasestyle:{
            maxWidth: '200px', 
          maxHeight: '200px', 
          minWidth: '200px', 
          minHeight: '200px',
          borderRadius:400,
            "&:hover":{
            color:'red'
            },
            marginBottom:24,
            marginTop:16,
        },
        
        iconStyle:{
            opacity:iconOpacity?0:1,
            position:'absolute',
            color:'red'
           
        },
        divStyle:{
            position:'relative',
            display: 'flex',
            alignItems:'center',
            justifyContent:'center',
            opacity: posterOpacity?1:0.7,
            
        },
        textStyle:{
            position: 'absolute',
            top:104,
            fontSize:16,
            fontFamily:'Lato',
            color: icon?"Black":'#8B0000',
        }
      }));
      
      const classes = useStyles();
      const[posterUrl,setPosterUrl] = useState('');
      
      useEffect(() => {  //poster
      const getImage=(path)=>{
          let ppath = "https://image.tmdb.org/t/p/w185"+path;
          if (path===""){
              setPosterUrl('https://img.omdbapi.com/?apikey=e4c29baa&i='+props.imdbId);
              
            }
        
        fetch(ppath, { method: 'HEAD' })
        .then(res => {
            if (res.ok) {
                
                setPosterUrl(res.url);
            } else {
                
                setPosterUrl('https://img.omdbapi.com/?apikey=e4c29baa&i='+ props.imdbId);
            }
        }).catch(err => console.log('Error:', err));
         
        }
        getImage(props.posterPath);
    }, [props.posterPath,props.imdbId]);
     

        async function getMovieTitle(selectedTitle){
           
            const requestOptions={
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(selectedTitle)
            };
        
            

            return fetch('http://127.0.0.1:5000/recom', requestOptions)
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
               
            
        

           
      return(
            <ThemeProvider theme={theme}>
                <ButtonBase 
                    className={classes.buttonbasestyle} 
                    onClick={shoot}
                >
                        <Box className={classes.divStyle} textAlign='center'>
                            
                            <img className={classes.image} src={posterUrl} alt=""></img>
                            
                            <Typography className={classes.textStyle} >{props.title}</Typography>
                            <FavoriteIcon className={classes.iconStyle} fontSize='large'></FavoriteIcon>
                        </Box>
                </ButtonBase>
               
                </ThemeProvider>
    );
=======
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
>>>>>>> 52bf4465fafab4a8b32c01f446d7f0f61efd5c64
};

export default MovieCard;
