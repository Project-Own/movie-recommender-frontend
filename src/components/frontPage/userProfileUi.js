import { Grid, List } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import UserProfile from './userProfile'
import Avatar from '@material-ui/core/Avatar';
import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  space:{
    marginLeft:100,
    marginTop:100,

  },
  paper: {
    padding: theme.spacing(1),
    
    color: theme.palette.text.primary,
  },
  
  
}));

 

 
function App() {
  const [data, setData] = useState([]);



  useEffect(()=>{
    setTitle();
    
    
  },[]);
   async function setTitle(){
    const api=`https://api.themoviedb.org/3/movie/top_rated?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&page=1&fbclid=IwAR18OladL8C8b1moaQTUsdyAMo7ES3GZY0mvi3hbP-1pgKr2J4JOp_K8fBU`
    const result=await fetch(api)
    const getResult=await result.json()
    const finalResult=getResult.results
    
    setData(finalResult)
    
    }
  
  
    const classes=useStyles();
    
 
    return (
      <div className="ima">
        <Grid item container direction="column" >
          <Grid item xs={1}  >                
            
            <Avatar
              alt="profile"
              src="https://image.tmdb.org/t/p/w185/zmYNtzq3B17DSpDYkF3JUHBa8Yx.jpg"
              className={classes.large}/>
              </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
              
              <UserProfile 
            
              username={"Nirajan"}
              gmail={"prajapatinirajan0@gmail.com"}/>
              </Paper>
              </Grid>
              
        
        
        </Grid>
        <div className="full" direction="column">
              {/* <List className={classes.root}>
              <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
              <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
              </ListItem>
              <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
            </List> */}
                    <List dense className={classes.root}>
              {data.map((value,index) => {
                
                return (
                  <ListItem key={index} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`https://image.tmdb.org/t/p/w185${value.poster_path}`}
                      />
                    </ListItemAvatar>
                    
                    <ListItemText  primary={value.title} />
                    <ListItemSecondaryAction>
                      <ListItemText  primary={value.vote_average} />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
        
        </div>
      </div>
      
      
      
    )
  
}
 
export default App