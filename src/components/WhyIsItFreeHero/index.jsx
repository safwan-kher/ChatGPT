import React from 'react';

// Helper
import utils from 'utils';

// Styles


export default function WhyIsItFreeHero(props) {
  const {
    title,
    text,
    bottomText,
    image,
  } = props;

  return (
    <div className="whyisitfree-hero slider-block slider-block-first-load">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row slider">
            <div className="col-2 col-0-sm" />
            <div className="col-8 col-12-sm">
              <h1 className="whyisitfree-hero__title">
                {title}
              </h1>
              <p
                className="whyisitfree-hero__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(text) }
                }
              />
            </div>
            <div className="col-2 col-0-sm" />
          </div>
          <img
            className="whyisitfree-hero__floater"
            src={'/assets/floaters/stairs3.png'}
            alt=""
          />
        </div>
      </div>
      <div className="row slider slider-delay-1">
        <div className="col-1 col-0-sm" />
        <div className="col-6 col-12-sm">
          <p
            className="whyisitfree-hero__bottom-text"
            dangerouslySetInnerHTML={
              { __html: utils.cleanText(bottomText) }
            }
          />
        </div>
        <div className="col-4 col-12-sm">
          <img
            className="whyisitfree-hero__image"
            src={image}
            alt=""
          />
        </div>
        <div className="col-1 col-0-sm" />
      </div>
    </div>
  );
}
