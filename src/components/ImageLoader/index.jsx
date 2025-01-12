import React, { useState } from 'react';

// Styles


export default function ImageLoader(props) {
  const {
    className,
    alt,
    src,
  } = props;
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  // const image = new Image();

  // image.onload = () => {
  //   setIsImageLoaded(true);
  // }

  // image.src = src;

  if (isImageLoaded) {
    return (
      <img
        className={className}
        alt={alt}
        src={src}
      />
    );
  } else {
    return (
      <div className={`${className} imageloader`}>
        <div className="imageloader__dot"></div>
        <div className="imageloader__dot"></div>
        <div className="imageloader__dot"></div>
      </div>
    );
  }
}
