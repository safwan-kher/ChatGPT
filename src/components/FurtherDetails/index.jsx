import React from 'react';

// Styles


export default function FurtherDetails(props) {
  const {
    title,
    items,
  } = props;

  const blocks = [];
  if (items) {
    items.forEach((item, index) => {
      const blockItems = [];
      item.items.forEach((subitem, subindex) => {
        blockItems.push(
          <div
            className="further-details__block"
            key={subindex}
          >
            <div className="further-details__block__value">
              {subitem.value}
            </div>
            <div className="further-details__block__label">
              {subitem.label}
            </div>
          </div>
        );
      });
      blocks.push(
        <div
          key={index}
          className={`slider slider-delay-${index + 1}`}
        >
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-5 col-12-sm">
              <div className="further-details__heading">
                {item.heading}
              </div>
            </div>
            <div className="col-6 col-0-sm" />
          </div>
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <div className="further-details__blocks">
                {blockItems}
              </div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>
        </div>
      );
    });
  }
  return (
    <div className="further-details slider-block">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-8 col-12-sm">
              <h2 className="further-details__title slider">
                {title}
              </h2>
              <img
                className="further-details__floater"
                src={'/assets/floaters/stairs-white2.png'}
                alt=""
              />
            </div>
            <div className="col-3 col-0-sm" />
          </div>
          {blocks}
        </div>
      </div>
    </div>
  );
}
