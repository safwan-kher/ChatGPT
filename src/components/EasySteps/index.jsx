import React, { useCallback, useEffect, useState, useRef } from "react";

// Helper
import utils from "utils";

// Images
import PlanePath from "assets/plane-path.svg";

// Styles

export default function EasySteps(props) {
  const { title, text, items } = props;

  const [percentage, setPercentage] = useState(0);
  const offset = 400;
  const parentElem = useRef();
  const onScroll = useCallback(() => {
    if (
      parentElem &&
      parentElem.current &&
      parentElem.current.classList.contains("slider-block--visible")
    ) {
      window.requestAnimationFrame(() => {
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;
        const elemTop = parentElem.current.offsetTop;

        if (viewportBottom > elemTop + offset && viewportTop < elemTop) {
          let percentage = 1 - (elemTop - viewportTop) / window.innerHeight;
          percentage = (percentage - 0.6) * 2.5;
          setPercentage(Math.min(percentage, 1));
        }
      });
    }
  }, [parentElem]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
  const itemColumns = [];
  if (items) {
    Object.keys(items).forEach((key, index) => {
      const item = items[key];
      let itemClass = "easy-steps__item";
      if (percentage > 0.25 * (index + 1)) {
        itemClass += " easy-steps__item--active";
      }
      itemColumns.push(
        <div className="col-4 col-12-sm" key={index}>
          <div className={itemClass}>
            <div className="easy-steps__item__number">{index + 1}</div>
            <div className="easy-steps__item__title">{item}</div>
            {index === 0 && <div className="easy-steps__item__logo" />}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="easy-steps slider-block" ref={parentElem}>
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="easy-steps__content">
            <div className="row slider">
              <div className="col-1 col-0-sm" />
              <div className="col-6 col-12-sm">
                <h2 className="easy-steps__title">{title}</h2>
                <p
                  className="easy-steps__text"
                  dangerouslySetInnerHTML={{ __html: utils.cleanText(text) }}
                />
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
          </div>
          <img
            className="easy-steps__plane"
            src={"/assets/plane.png"}
            style={{
              motionOffset: `${95 * percentage}%`,
              offsetDistance: `${95 * percentage}%`,
            }}
            alt=""
          />
          <PlanePath className="easy-steps__plane-path" />
          <div className="easy-steps__plane-path-fader" />
        </div>
      </div>
    </div>
  );
}
