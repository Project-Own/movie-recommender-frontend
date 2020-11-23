import React, { useState } from "react";

import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 250,
    margin: 50,
  },
  input: {
    width: 42,
  },
  imge: {
    height: 250,
    width: 250,
  },
  Slider: {
    marginTop: 300,
    marginLeft: 50,
  },
});

const ImageSlider = ({ imgList,title }) => {
  // takes in images as props
  const classes = useStyles();
  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
  const handleSliderChange = (event, newValue) => {
    if (newValue < 92) {
      setIndex(newValue);
    }
  };

  
  
  return (
    imgList.length > 0 && (
      <div className={classes.root}>
        <img className={classes.imge} src={imgList[index]} alt={index} />
        <div>{title[index]}</div>
        <Slider
          value={index}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
      </div>
    )
  );
};

export default ImageSlider;
