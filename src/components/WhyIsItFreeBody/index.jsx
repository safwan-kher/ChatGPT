import React from 'react';

// Helper
import utils from 'utils';

// Styles


export default function WhyIsItFreeBody(props) {
  const {
    title,
    text,
  } = props;

  return (
    <div className="whyisitfree-body slider-block">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row slider">
            <div className="col-3 col-0-sm" />
            <div className="col-6 col-12-sm">
              <h2 className="whyisitfree-body__title">
                {title}
              </h2>
            </div>
            <div className="col-3 col-0-sm" />
          </div>
          <div className="row slider">
            <div className="col-2 col-0-sm" />
            <div className="col-8 col-12-sm">
              <p
                className="whyisitfree-body__text"
                dangerouslySetInnerHTML={
                  { __html: utils.cleanText(text) }
                }
              />
            </div>
            <div className="col-2 col-0-sm" />
          </div>
          <img
            className="whyisitfree-body__floater"
            src={'/assets/floaters/shapes2.png'}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
