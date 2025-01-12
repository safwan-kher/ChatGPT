import React, { useEffect } from 'react';

// Helper
import utils from 'utils';

// Components
import Button from 'components/Button';

// Styles


export default function CompassBlock(props) {
  const {
    title,
    listHeading,
    listItems,
    directionLabels,
    bottomLeftTitle,
    bottomLeftBody,
    bottomLeftInfo,
    bottomLeftButtonLabel,
    bottomLeftButtonLink,
    bottomRightTitle,
    bottomRightBody,
    bottomRightInfo,
    bottomRightButtonLabel,
    bottomRightButtonLink,
  } = props;

  const list = [];
  if (listItems) {
    listItems.forEach((item, index) => {
      list.push(
        <li
          className="compass-block__list__item"
          key={index}
        >
          {item.item}
        </li>
      );
    });
  }
  useEffect(() => {

    document.documentElement.style.setProperty('--list-items', `${listItems.length * 2}s`);
  }, [])

  const directions = [];
  if (directionLabels) {
    Object.keys(directionLabels).forEach((key) => {
      directions.push(
        <div
          className="compass-block__compass__direction"
          key={key}
        >
          {directionLabels[key]}
        </div>
      );
    });
  }
  return (
    <div className="compass-block slider-block">
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-7 col-12-sm">
          <h2 className="compass-block__title slider">
            {title}
          </h2>
        </div>
        <div className="col-4 col-0-sm" />
      </div>
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm">
          <div className="row">
            <div className="col-4 col-12-sm">
              <div className="compass-block__compass slider">
                {directions}
              </div>
            </div>
            <div className="col-8 col-12-sm compass-block__list-holder slider slider-delay-2">
              <div className="compass-block__list">
                <ul className="compass-block__list-wrapper">
                  <div className="compass-block__list__heading">
                    {listHeading}
                  </div>
                  {list}
                </ul>
              </div>
              <img
                className="compass-block__floater"
                src={'/assets/floaters/stairs-white.png'}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>
      <div className="compass-block__bottom-wrapper">
        <div className="row">
          <div className="col-1 col-0-sm" />

          <div className="col-5 col-12-sm">
            <div className="compass-block__bottom">
              <div className="row">
                <div className="col-8">
                  <div className="compass-block__bottom__floaters">
                    <img
                      className="compass-block__bottom__floater"
                      src={'/assets/floaters/compass.png'}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 col-12-sm">
                  <div className="compass-block__bottom__button">
                    <Button
                      label={bottomLeftButtonLabel}
                      link={bottomLeftButtonLink}
                      variant="transparent-white"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="compass-block__bottom__title">{bottomLeftTitle}</div>
                  <div
                    className="compass-block__bottom__body"
                    dangerouslySetInnerHTML={
                      { __html: utils.cleanText(bottomLeftBody, true) }
                    }
                  />
                  <div className="compass-block__bottom__info">{bottomLeftInfo}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-5 col-12-sm">
            <div className="compass-block__bottom compass-block__bottom--alt">
              <div className="row">
                <div className="col-8">
                  <div className="compass-block__bottom__floaters">
                    <img
                      className="compass-block__bottom__floater"
                      src={'/assets/floaters/illustration.png'}
                      alt=""
                    />
                    <img
                      className="compass-block__bottom__floater"
                      src={'/assets/floaters/pop-out.png'}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 col-12-sm">
                  <div className="compass-block__bottom__button">
                    <Button
                      label={bottomRightButtonLabel}
                      link={bottomRightButtonLink}
                      variant="transparent-white"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="compass-block__bottom__title">{bottomRightTitle}</div>
                  <div
                    className="compass-block__bottom__body"
                    dangerouslySetInnerHTML={
                      { __html: utils.cleanText(bottomRightBody, true) }
                    }
                  />
                  <div className="compass-block__bottom__info">{bottomRightInfo}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-1 col-0-sm" />
        </div>
      </div>
    </div>
  );
}
