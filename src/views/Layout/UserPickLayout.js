import React from 'react';
import { Grid} from '@material-ui/core';
import Header from '../../components/frontPage/Header';
import Contents from '../../components/frontPage/Contents'



const UserPickLayout = () =>{
  return (
    <Grid container direction='column'>
      <Grid item > 
        <Header/>
      </Grid>
      <Grid item align='center'>
        Yeta nirjal ko search bar rakhne
      </Grid>
      <Grid item container>
        <Grid item xs={2} sm={2} md={2}/>
        <Grid item xs={10} sm={8} md={8}>
          <Contents/>
        </Grid>
        <Grid item  xs={2} sm={2} md={2}/>

      </Grid>
     
    </Grid>
    
    
  );
}

export default UserPickLayout;
