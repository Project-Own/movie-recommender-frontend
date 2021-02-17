import React from "react";
import PropTypes from "prop-types";

const ScrollTop = (props) => {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.

  const handleClick = (event) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth", block: "center" });
  };

  return (
    <div onClick={handleClick} role="presentation">
      {children}
    </div>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ScrollTop;
