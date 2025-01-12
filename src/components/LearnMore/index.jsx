import React from "react";

// Helper
import utils from "utils";

// Components
import Button from "components/Button";

// Styles

export default function LearnMore(props) {
  const { title, text, items, buttonLabel, buttonLink, isLandingPage } = props;

  const columns = [];
  if (items) {
    [1, 2, 3].forEach((index) => {
      columns.push(
        <div
          className={`col-4 col-12-sm slider slider-delay-${index}`}
          key={index}
        >
          <div className="learn-more__item">
            <div
              className={`learn-more__item__image${
                index % 2 !== 0 ? "" : " learn-more__item__image--flipped"
              }`}
            >
              <div className="learn-more__item__image__main">
                <img
                  src={items[`image${index}`]}
                  alt={items[`title${index}`]}
                />
              </div>
              <div className="learn-more__item__image__background" />
            </div>
            <h3 className="learn-more__item__title">
              {items[`title${index}`]}
            </h3>
            <p
              className="learn-more__item__text"
              dangerouslySetInnerHTML={{
                __html: utils.cleanText(items[`text${index}`]),
              }}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <div className="learn-more slider-block">
      <div
        className={`full-width-outer${
          isLandingPage ? "" : " full-width-outer--diagonal"
        }`}
      >
        <div className="full-width-inner">
          {title && text && (
            <div className="row slider">
              <div className="col-1 col-0-sm" />
              <div className="col-6 col-12-sm">
                <h2 className="learn-more__title">{title}</h2>
                <div className="row">
                  <div className="col-8 col-12-sm">
                    <p
                      className="learn-more__text"
                      dangerouslySetInnerHTML={{
                        __html: utils.cleanText(text),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-5 col-0-sm" />
            </div>
          )}

          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <div className="row">{columns}</div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>

          <div className="row slider slider-delay-4">
            <div className="col-12">
              <div className="learn-more__button">
                <Button
                  label={buttonLabel}
                  link={buttonLink}
                  variant="transparent-blue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
