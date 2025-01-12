import React from 'react';

// Components
import Button from 'components/Button';

// Styles


export default function Team(props) {
  const {
    title,
    items,
    buttonLabel,
    buttonLink,
  } = props;

  const faces = [];
  if (items) {
    items.forEach((item, index) => {
      faces.push(
        <div
          className={`team__item slider slider-delay-${index}`}
          key={index}
        >
          <div className={`team__item__image${index % 2 === 0 ? ' team__item__image--flipped' : ''}`}>
            <div className="team__item__image__main">
              <img
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="team__item__image__background" />
            <div className="team__item__image__content">
              <div className="team__item__image__content-wrapper">
                <div className="team__item__image__content__name">
                  {item.name}
                </div>
                <div className="team__item__image__content__description">
                  {item.description}
                </div>
              </div>
              <a
                className="team__item__image__content__link"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={'/assets/icons/linkedin.svg'}
                  alt="LinkedIn"
                />
              </a>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="team slider-block">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row slider">
            <div className="col-1 col-0-sm" />
            <div className="col-6 col-12-sm">
              <h2 className="team__title">
                {title}
              </h2>
            </div>
            <div className="col-5 col-0-sm" />
          </div>

          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <div className="team__items">
                {faces}
              </div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>

          <div className="row slider">
            <div className="col-12">
              <div className="team__button-wrapper">
                <div className="team__button">
                  <Button
                    label={buttonLabel}
                    link={buttonLink}
                    variant="transparent-blue"
                  />
                  <img
                    className="team__button__floater"
                    src={'/assets/floaters/cup.png'}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
