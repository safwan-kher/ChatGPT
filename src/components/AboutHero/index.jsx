import React from 'react';

// Helper
import utils from 'utils';

// Components
import ImageLoader from 'components/ImageLoader';

// Styles


export default function AboutHero(props) {
  const {
    title,
    heading,
    text,
    image,
  } = props;
  return (
    <div className="about-hero slider-block slider-block-first-load">
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm">
          <div className="about-hero__top">
            <h1 className="about-hero__title slider">
              {title}
            </h1>
            <div className="about-hero__image-wrapper slider slider-delay-1">
              <ImageLoader
                className="about-hero__image"
                src={image}
                alt={title}
              />
            </div>
          </div>
          <div className="about-hero__bottom">
            <div className="about-hero__background slider slider-delay-2">
              <div className="about-hero__background-wrapper">
                <h2 className="about-hero__heading">
                  {heading}
                </h2>
                <p
                  className="about-hero__text"
                  dangerouslySetInnerHTML={
                    { __html: utils.cleanText(text) }
                  }
                />
              </div>
            </div>
            <img
              className="about-hero__floater"
              src={'/assets/floaters/stairs3.png'}
              alt=""
            />
            <img
              className="about-hero__floater"
              src={'/assets/floaters/stairs-white3.png'}
              alt=""
            />
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>
    </div>
  );
}
