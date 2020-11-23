import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxListSecondary() {
  const classes = useStyles();
  
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
    
  
  
 
  
  


  

  return (
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
  );
}


