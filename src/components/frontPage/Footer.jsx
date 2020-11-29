import React from 'react';
import {Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const Footer = (props)=>{
    const useStyles = makeStyles(theme=>({
        footerStyle :{
            backgroundColor: "#F2F2F2",
            textAlign: "center",
            padding: "16px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "80px",
            width: "100%",
            
            
        },
        phantom :{
            display: 'block',
            padding: '16px',
            height: '80px',
            width: '100%',
            marginTop:'60'
          },

        buttonStyle:{
            fontFamily:'Trispace',
            borderRadius:24,
            width:240,
            height:48,
            backgroundColor:'#7986cb',
            color:'white',
            "&:hover":{
                backgroundColor:'#303f9f',
            },
        },
        textStyle:{
            fontFamily:'Lato',
        }
           
    
    }));
    const classes = useStyles();
       
    
        if(props.check){
            return (
                <div>
                <div className={classes.phantom} />
                <span className={classes.footerStyle}>
                    <Button  className={classes.buttonStyle} > Finished</Button>
                
                </span>
                </div>
            );

        }else {
            return (
                <div>
                <div className={classes.phantom} />
                <span className={classes.footerStyle}>
                     <Typography className={classes.textStyle}>Select at least one movie or use the search bar.</Typography>
            
                </span>
                </div>
                
            );
            
        }
        
            
        
   

}

 
export default Footer;
