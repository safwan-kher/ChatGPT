import React from "react";
import Image from "next/legacy/image";
// Helper
import utils from "utils";

// Components
import Button from "components/Button";

// Styles

export default function Providers(props) {
  const { title, text, items, tooltipButtonLabel, isCourse, isStatic } = props;

  const x = Array.from(Object.entries(items)).reduce(
    (acc, [key, value], index) => {
      const n = Math.floor(index / 4);
      const [realKey] = key.match(/[A-z]+/);
      if (n >= acc.length) {
        return acc.concat({ [realKey]: value } as any);
      } else {
        return acc.map((i, ind) => {
          if (ind === n) {
            return { ...i, [realKey]: value };
          } else {
            return i;
          }
        });
      }
    },
    [] as {
      description: string;
      link: string;
      image: string | Object;
      title: string;
    }[]
  );
  const logos = x.map((value, index) => {
    let tooltip = undefined;
    if (value.description && value.link) {
      tooltip = (
        <div className="providers__logos__item__tooltip">
          <div className="providers__logos__item__tooltip-wrapper">
            <div
              dangerouslySetInnerHTML={{
                __html: utils.cleanText(value.description, true),
              }}
              className="providers__logos__item__tooltip__description"
            ></div>
            <div className="providers__logos__item__tooltip__button">
              <Button
                label={tooltipButtonLabel}
                link={value.link}
                variant="transparent-white"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="col-3 col-6-sm" key={index}>
        <div className="providers__logos__item">
          {typeof value.image === "string" ? (
            <img src={value.image} alt={value.title} />
          ) : (
            <div
              style={{ position: "relative", height: "80px", width: "100%" }}
            >
              <Image
                src={(value.image as any).url}
                // width={items[`image${index}`].width}
                // height={items[`image${index}`].height}
                layout="fill"
                objectFit="contain"
                sizes="287px"
                alt={(value.image as any).url}
              />
            </div>
          )}
          {/* <img
            src={items[`image${index}`]}
            alt={items[`title${index}`]}
          /> */}
          {!isStatic && tooltip}
        </div>
      </div>
    );
  });
  let classes = "providers slider-block";
  if (isCourse) {
    classes += " providers-alt";
  }
  return (
    <div className={classes}>
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-6 col-12-sm slider">
              <h2 className="providers__title">{title}</h2>
              <div
                className="providers__text"
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(text, true),
                }}
              ></div>
            </div>
            <div className="col-5 col-0-sm" />
          </div>
          <div className="row">
            <div className="col-2 col-0-sm" />
            <div className="col-7 col-12-sm slider slider-delay-1">
              <div className="providers__logos">
                <div className="row">{logos}</div>
              </div>
            </div>
            <div className="col-3 col-0-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
