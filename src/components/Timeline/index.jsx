import React from "react";

// Helper
import utils from "utils";

// Styles

export default function Timeline(props) {
  const { title, text, items } = props;

  return (
    <div className="timeline slider-block">
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row slider">
            <div className="col-1 col-0-sm" />
            <div className="col-5 col-12-sm">
              <h2 className="timeline__title">{title}</h2>
              <div
                className="timeline__text"
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(text, true),
                }}
              ></div>
              <img
                className="timeline__floater"
                src={"/assets/floaters/clock-large.png"}
                alt=""
              />
            </div>
            <div className="col-5 col-12-sm">
              <div className="timeline__items">
                {items.map((item, index) => (
                  <div className="timeline__item" key={index}>
                    <div className="timeline__item__title">{item.title}</div>
                    <div
                      className="timeline__item__text"
                      dangerouslySetInnerHTML={{
                        __html: utils.cleanText(item.text, true),
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
