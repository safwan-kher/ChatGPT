import React from "react";

// Helper
import utils from "utils";

// Styles

export default function Curriculum(props) {
  const { title, text, items } = props;

  const accordionItems = [];
  if (items) {
    [1, 2, 3, 4].forEach((index) => {
      accordionItems.push(
        <div className="curriculum__item" key={index}>
          <div className="curriculum__item__holder">
            <div className="curriculum__item__title">
              {items[`label${index}`]}
            </div>
            <div className="curriculum__item__heading">
              {items[`heading${index}`]}
            </div>
            <div className="curriculum__item__text">
              <div
                dangerouslySetInnerHTML={{
                  __html: utils.cleanText(items[`text${index}`], true),
                }}
              ></div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="curriculum slider-block">
      <div className="row slider">
        <div className="col-1 col-0-sm" />
        <div className="col-4 col-12-sm">
          <h2 className="curriculum__title">{title}</h2>
          {/* This one */}
          <div
            className="curriculum__text"
            dangerouslySetInnerHTML={{ __html: utils.cleanText(text) }}
          />
        </div>
        <div className="col-7 col-0-sm" />
      </div>
      <div className="row slider">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm">
          <div className="curriculum__items">
            {accordionItems}

            <img
              className="curriculum__floater"
              src={"/assets/floaters/clock.png"}
              alt=""
            />
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>
    </div>
  );
}
