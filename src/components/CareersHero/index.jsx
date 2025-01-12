import React from 'react';

// Helper
import utils from 'utils';

// Styles


export default function CareersHero(props) {
  const {
    title,
    text,
  } = props;

  return (
    <div className="careers-hero slider-block slider-block-first-load">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row slider">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <h1 className="careers-hero__title">
                {title}
              </h1>
              <p
                className="careers-hero__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(text) }
                }
              />
            </div>
            <div className="col-1 col-0-sm" />
          </div>
          <img
            className="careers-hero__floater"
            src={'/assets/floaters/like-big.png'}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
