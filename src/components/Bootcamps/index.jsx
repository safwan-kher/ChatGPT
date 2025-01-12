import React from 'react';

// Styles


export default function Bootcamps(props) {
  const {
    title,
    items,
  } = props;

  return (
    <div className="bootcamps slider-block">
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm slider">
          <h2 className="bootcamps__title">
            {title}
          </h2>
          <div className="slider slider-delay-1">
            <div className="bootcamps__logos">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bootcamps__logos__item"
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
        <div className="col-1 col-0-sm" />
      </div>
    </div>
  );
}
