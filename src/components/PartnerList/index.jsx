import React from 'react';

// Styles


export default function PartnerList(props) {
  const {
    title,
    items,
  } = props;

  return (
    <div className="partner-list slider-block">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm slider">
              <h2 className="partner-list__title">
                {title}
              </h2>
            </div>
            <div className="col-1 col-0-sm" />
          </div>
          <div className="slider slider-delay-1">
            <div className="partner-list__logos">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="partner-list__logos__item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
