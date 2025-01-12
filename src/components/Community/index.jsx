import React, { useContext } from "react";

// Helper
import utils from "utils";

// Components
import Button from "components/Button";
import { AppContext } from "../../../pages/_app";

// Styles

export default function Community(props) {
  const {
    title,
    text,
    items,
    bottomTitle,
    bottomTitleSub,
    bottomButtonLabel,
    image,
    fileDownloadOnClick,
    onlyFileDownload,
  } = props;
  const context = useContext(AppContext);

  const itemColumns = [];
  if (items) {
    [1, 2, 3, 4].forEach((index) => {
      itemColumns.push(
        <div
          className={`col-6 col-12-sm slider slider-delay-${index}`}
          key={index}
        >
          <div className="community__item">
            <div
              className="community__item__image"
              style={{
                backgroundImage: `url(${items[`image${index}`]})`,
              }}
            />
            <div className="community__item__title">
              {items[`title${index}`]}
            </div>
            <div
              className="community__item__text"
              dangerouslySetInnerHTML={{
                __html: utils.cleanText(items[`text${index}`], true),
              }}
            ></div>
          </div>
        </div>
      );
    });
  }

  if (onlyFileDownload === true) {
    return (
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm">
          <div className="community__bottom slider slider-delay-3">
            <div className="row">
              <div className="col-3 col-12-sm">
                <img
                  className="community__bottom__floater"
                  src={image ? image : `/assets/floaters/book.png`}
                  alt=""
                />
              </div>
              <div className="col-4 col-12-sm">
                <div className="community__bottom__title">{bottomTitle}</div>
                <div className="community__bottom__title-sub">
                  {bottomTitleSub}
                </div>
              </div>
              <div className="col-5 col-12-sm">
                <div className="community__bottom__button">
                  <Button
                    label={bottomButtonLabel}
                    onClick={
                      fileDownloadOnClick
                        ? () => fileDownloadOnClick()
                        : () => {
                            context.setIsDownloadOverlayVisible(true);
                          }
                    }
                    variant="transparent-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>
    );
  }

  return (
    <div className="community slider-block">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row slider">
            <div className="col-1 col-0-sm" />
            <div className="col-6 col-12-sm">
              <h2 className="community__title">{title}</h2>
              <div
                className="community__text"
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(text, true),
                }}
              ></div>
            </div>
            <div className="col-5 col-0-sm" />
          </div>

          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <div className="row">{itemColumns}</div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>

          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-10 col-12-sm">
              <div className="community__bottom slider slider-delay-3">
                <div className="row">
                  <div className="col-3 col-12-sm">
                    <img
                      className="community__bottom__floater"
                      src={image ? image : `/assets/floaters/book.png`}
                      alt=""
                    />
                  </div>
                  <div className="col-4 col-12-sm">
                    <div className="community__bottom__title">
                      {bottomTitle}
                    </div>
                    <div className="community__bottom__title-sub">
                      {bottomTitleSub}
                    </div>
                  </div>
                  <div className="col-5 col-12-sm">
                    <div className="community__bottom__button">
                      <Button
                        label={bottomButtonLabel}
                        onClick={
                          fileDownloadOnClick
                            ? () => fileDownloadOnClick()
                            : () => {
                                context.setIsDownloadOverlayVisible(true);
                              }
                        }
                        variant="transparent-white"
                      />
                    </div>
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
