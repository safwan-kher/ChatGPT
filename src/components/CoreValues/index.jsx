import React from 'react';

// Helper
import utils from 'utils';

// Styles


export default function CoreValues(props) {
  const {
    title,
    topLeftHeading,
    topLeftText,
    topRightHeading,
    topRightText,
    bottomLeftHeading,
    bottomLeftText,
    bottomRightHeading,
    bottomRightText,
  } = props;

  return (
    <div className="core-values slider-block">

      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-6 col-12-sm">
          <h2 className="core-values__title slider">
            {title}
          </h2>
        </div>
        <div className="col-5 col-0-sm" />
      </div>

      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-5 col-12-sm">
          <div className="core-values__blocks-left slider slider-delay-1">
            <img
              className="core-values__blocks-left__floater"
              src={'/assets/floaters/loupe.png'}
              alt=""
            />
            <div className="core-values__block">
              <h3 className="core-values__block__heading">{topLeftHeading}</h3>
              <p
                className="core-values__block__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(topLeftText) }
                }
              />
            </div>
            <div className="core-values__block">
              <h3 className="core-values__block__heading">{bottomLeftHeading}</h3>
              <p
                className="core-values__block__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(bottomLeftText) }
                }
              />
            </div>
          </div>
        </div>
        <div className="col-5 col-12-sm">
          <div className="core-values__blocks-right slider slider-delay-2">
            <div className="core-values__block">
              <h3 className="core-values__block__heading">{topRightHeading}</h3>
              <p
                className="core-values__block__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(topRightText) }
                }
              />
            </div>
            <div className="core-values__block">
              <h3 className="core-values__block__heading">{bottomRightHeading}</h3>
              <p
                className="core-values__block__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(bottomRightText) }
                }
              />
            </div>
            <img
              className="core-values__blocks-right__floater"
              src={'/assets/floaters/home.png'}
              alt=""
            />
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>

    </div>
  );
}
