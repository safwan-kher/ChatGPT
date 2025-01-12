import React from 'react';

// Helper
import utils from 'utils';

// Styles


export default function PartnerHero(props) {
  const {
    name,
    text,
    logo,
    image,
  } = props;
  return (
    <div className="partner-hero slider-block slider-block-first-load">
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-6 col-12-sm partner-hero__image-wrapper">
          <div className="partner-hero__image slider slider-delay-1">
            <div className="partner-hero__image__main">
              <img
                src={image}
                alt={name}
              />
            </div>
            <div className="partner-hero__image__background" />
          </div>
        </div>
        <div className="col-4 col-12-sm slider">
          <img
            className="partner-hero__logo"
            src={logo}
            alt={name}
          />
          <h1 className="partner-hero__name">
            {name}
          </h1>
          <p
            className="partner-hero__text"
            dangerouslySetInnerHTML={
              { __html: utils.cleanText(text) }
            }
          />
        </div>
      </div>
    </div>
  );
}
