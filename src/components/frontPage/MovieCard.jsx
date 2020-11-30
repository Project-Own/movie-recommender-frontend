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
import FloatCard from '../FloatCard/FloatCard';
import LikeButton from '../LikeButton';


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
          color:'transparent',
          borderRadius:400,
            "&:hover":{
            color:'transparent'       
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
     

        async function getMovieTitle(selectedTitle){  //recommendation 
           
            const requestOptions={
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(selectedTitle)
            };
        
            

            return fetch('https://item-recommendation.herokuapp.com/recom', requestOptions)
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
                    <FloatCard>

                        <Box className={classes.divStyle} textAlign='center'>
                            
                            <img className={classes.image} src={posterUrl} alt=""></img>
                            
                            <Typography className={classes.textStyle} >{props.title}</Typography>
                            <FavoriteIcon className={classes.iconStyle} fontSize='large'></FavoriteIcon>
                            
                        </Box>
                    </FloatCard>
                
                </ButtonBase>
               
                </ThemeProvider>
                
    );
};

export default MovieCard;
