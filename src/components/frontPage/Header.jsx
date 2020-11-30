import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    headerStyle: {
        textAlign:'center',
        fontSize:40,
        fontFamily:'Trispace'
    },
    subHeaderStyle:{
        textAlign:'center',
        fontFamily:'Lato'
    },
    
  }));
  

const Header = ()=>{
    const classes = useStyles();
    return(
        <div>
            <Typography className={classes.headerStyle} >
                Let us Recommend!
            </Typography>
            <Typography className={classes.subHeaderStyle}>
                What are your favorite movies? The more you select, the better our recommendations!
            </Typography>
        </div>
        
        
    );
    
}

export default Header;