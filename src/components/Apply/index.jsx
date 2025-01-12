import React, { useContext } from 'react';

// Helper
import utils from 'utils';

// Components
import Button from 'components/Button';
import { AppContext } from '../../../pages/_app';

// Styles


export default function Apply(props) {
  const {
    title,
    text,
    items,
    buttonLabel,
    buttonLink,
    bottomTitle,
    bottomButtonLabel,
  } = props;
  const context = useContext(AppContext)

  const itemColumns = [];
  if (items) {
    [1, 2, 3, 4].forEach((index) => {
      itemColumns.push(
        <div
          className={`col-3 col-12-sm slider slider-delay-${index}`}
          key={index}
        >
          <div className="apply-now__item">
            <div className={`apply-now__item__image${index % 2 === 0 ? '' : ' apply-now__item__image--flipped'}`}>
              <div className="apply-now__item__image__main">
                <img
                  src={items[`image${index}`]}
                  alt={items[`title${index}`]}
                />
              </div>
              <div className="apply-now__item__image__background" />
            </div>
            <div className="apply-now__item__title">
              {items[`title${index}`]}
            </div>
            <p
              className="apply-now__item__text"
              dangerouslySetInnerHTML={
                { __html: utils.cleanText(items[`text${index}`]) }
              }
            />
          </div>
        </div>
      );
    });
  }

  return (
    <div className="apply-now slider-block">
      <div className="row slider">
        <div className="col-1 col-0-sm" />
        <div className="col-6 col-12-sm">
          <h2 className="apply-now__title">
            {title}
          </h2>
          <p
            className="apply-now__text"
            dangerouslySetInnerHTML={
              { __html: utils.cleanText(text) }
            }
          />
        </div>
        <div className="col-5 col-0-sm" />
      </div>

      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm">
          <div className="row">
            {itemColumns}
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>

      {(buttonLabel && buttonLink) && (
        <div className="row slider slider-delay-4">
          <div className="col-12">
            <div className="apply-now__button">
              <Button
                label={buttonLabel}
                link={buttonLink}
                variant="wide"
              />
            </div>
          </div>
        </div>
      )}
      {(bottomTitle && bottomButtonLabel) && (
        <div className="row">
          <div className="col-1 col-0-sm" />
          <div className="col-10 col-12-sm">
            <div className="apply-now__bottom slider slider-delay-3">
              <div className="row">
                <div className="col-3 col-12-sm">
                  <img
                    className="apply-now__bottom__floater"
                    src={'/assets/floaters/book.png'}
                    alt=""
                  />
                </div>
                <div className="col-4 col-12-sm">
                  <div className="apply-now__bottom__title">{bottomTitle}</div>
                </div>
                <div className="col-5 col-12-sm">
                  <div className="apply-now__bottom__button">
                    <Button
                      label={bottomButtonLabel}
                      onClick={() => {
                        context.setIsDownloadOverlayVisible(true)
                      }}
                      variant="transparent-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1 col-0-sm" />
        </div>
      )}
    </div>
  );
}
