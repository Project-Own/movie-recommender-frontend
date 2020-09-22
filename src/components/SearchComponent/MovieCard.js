import { Card, Typography} from '@material-ui/core';
import React from 'react';

const style = {
    width: 200,
    height: 200,
    borderRadius: 100,
    objectFit: 'cover'
}

const MovieCard = ({movie}) => {
    return (
        <div>
            <Card align = 'center' marginTop = '10' width={100}>
               <Typography align = 'center' color= 'textPrimary' variant = 'h3' >{movie.Title}</Typography>
               <img align = 'center' style = {style} src={movie.Poster} />
               <Typography align = 'center' >{movie.Year} {movie.Genre} {movie.Runtime} </Typography>
                {
                    movie.Ratings.map((Ratings) => {
                       return  <Typography align = 'center'> {Ratings.Source} : {Ratings.Value} </Typography>
                    } )
                }
                <Typography align = 'center'>{movie.Actors}</Typography>
                <Typography align = 'center'> BoxOffice: {movie.BoxOffice}</Typography>
                <p>{movie.Plot}</p>
            </Card>
           
        </div>
        )

}

export default MovieCard;
