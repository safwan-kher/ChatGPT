import React from 'react';

// Helper
import utils from 'utils';

// Components
import Button from 'components/Button';

// Styles


export default function PreFooterBlocks(props) {
  const {
    titleLeft,
    textLeft,
    textButtonLinkLeft,
    textButtonLabelLeft,
    titleRight,
    textRight,
    textButtonLinkRight,
    textButtonLabelRight,
  } = props;

  return (
    <div className="prefooterblocks slider-block">
      <div className="full-width-outer">
        <div className="full-width-inner">

          <div className="row">
            <div className="col-1 col-0-sm" />

            <div className="col-10 col-12-sm">
              <div className="prefooterblocks__blocks">
                <div className="prefooterblocks__block">
                  <img
                    className="prefooterblocks__block__floater"
                    src={'/assets/floaters/compass.png'}
                    alt=""
                  />
                  <div className="prefooterblocks__block__title">{titleLeft}</div>
                  <div
                    className="prefooterblocks__block__text"
                    dangerouslySetInnerHTML={
                      { __html: utils.cleanText(textLeft, true) }
                    }
                  />
                  <div className="prefooterblocks__block__button">
                    <Button
                      label={textButtonLabelLeft}
                      onClick={textButtonLinkLeft}
                      variant="wide"
                    />
                  </div>
                </div>

                <div className="prefooterblocks__block prefooterblocks__block--alt">
                  <img
                    className="prefooterblocks__block__floater"
                    src={'/assets/floaters/hands.png'}
                    alt=""
                  />
                  <div className="prefooterblocks__block__title">{titleRight}</div>
                  <div
                    className="prefooterblocks__block__text"
                    dangerouslySetInnerHTML={
                      { __html: utils.cleanText(textRight, true) }
                    }
                  />
                  <div className="prefooterblocks__block__button">
                    <Button
                      label={textButtonLabelRight}
                      onClick={textButtonLinkRight}
                      variant="transparent-blue-alt2 wide"
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="col-1 col-0-sm" />
          </div>

        </div>
      </div>
    </div>
  );
}
