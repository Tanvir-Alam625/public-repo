import React from "react";
import PropTypes from "prop-types";
import "./Skeleton.css";

const Skeleton = ({ type, width, height, style }) => {
  const getClassName = () => {
    switch (type) {
      case "text":
        return "skeleton-text";
      case "circle":
        return "skeleton-circle";
      default:
        return "skeleton-rectangle";
    }
  };

  const getStyle = () => {
    const customStyle = { width, height };
    return { ...customStyle, ...style };
  };

  return <div className={`skeleton ${getClassName()}`} style={getStyle()} />;
};

Skeleton.propTypes = {
  type: PropTypes.oneOf(["text", "circle", "rectangle"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

Skeleton.defaultProps = {
  type: "text",
  width: "100%",
  height: "100%",
  style: {},
};

export default Skeleton;
