import React, { useState } from "react";

import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  slider: {
    padding: theme.spacing() * 2,
  },
  imge : {
    height: "210px",
    
  },
  sliderWidth: {
    width: "100%"
  }
}));

const ImageSlider = ({ imgList, title, date }) => {
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
        <div className={classes.slider}>
          <Typography>{title[index]}</Typography>
          <Typography>{date[index]}</Typography>

          <Slider
            value={index}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={92}
            className={classes.sliderWidth}
          />
        </div>
      </div>
    )
  );
};

export default ImageSlider;
