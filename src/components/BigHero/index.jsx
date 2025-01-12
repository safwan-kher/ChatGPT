import React from 'react';

// Helper
import utils from 'utils';

// Components
import ImageLoader from 'components/ImageLoader';

// Styles


export default function BigHero(props) {
  const {
    image,
    imageText,
    title,
    text,
  } = props;

  return (
    <div className="big-hero slider-block slider-block-first-load">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row slider">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <div className="big-hero__top">
                <ImageLoader
                  src={image}
                  alt={imageText}
                  className="big-hero__top__image"
                />
                <div className="big-hero__top__overlay" />
                <h1 className="big-hero__top__text">
                  {imageText}
                </h1>
                <img
                  className="big-hero__top__floater"
                  src={'/assets/floaters/stairs2.png'}
                  alt=""
                />
              </div>

            </div>
            <div className="col-1 col-0-sm" />
          </div>
          <div className="row slider slider-delay-1">
            <div className="col-2 col-0-sm" />
            <div className="col-8 col-12-sm">
              <h2 className="big-hero__title">
                {title}
              </h2>
              <p
                className="big-hero__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(text) }
                }
              />
            </div>
            <div className="col-2 col-0-sm" />
          </div>
          <img
            className="big-hero__floater"
            src={'/assets/floaters/shapes2.png'}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
