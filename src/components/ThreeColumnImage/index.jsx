import React, { useCallback, useEffect, useState } from "react";

// Helper
import utils from "utils";

// Images
import PlanePath from "assets/plane-path-reskil.svg";

// Styles

export default function ThreeColumnImage(props) {
  const { title, text, items } = props;

  const [percentage, setPercentage] = useState(0);
  const offset = 400;
  const parentElem = React.createRef();
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
    items.forEach((item, index) => {
      let itemClass = "three-column-image__item";
      if (percentage > 0.3 * (index + 1)) {
        itemClass += " three-column-image__item--active";
      }
      itemColumns.push(
        <div className="col-4 col-12-sm" key={index}>
          <div className={itemClass}>
            <div className="three-column-image__item__image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="three-column-image__item__title">{item.title}</div>
            <p
              className="three-column-image__item__text"
              dangerouslySetInnerHTML={{ __html: utils.cleanText(item.text) }}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <div className="three-column-image slider-block" ref={parentElem}>
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="three-column-image__content">
            <div className="row slider">
              <div className="col-1 col-0-sm" />
              <div className="col-6 col-12-sm">
                <h2 className="text-3xl lg:text-5xl font-bold mb-4">{title}</h2>
                <p
                  className="three-column-image__text"
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
            className="three-column-image__plane"
            src={"/assets/plane.png"}
            style={{
              motionOffset: `${95 * percentage}%`,
              offsetDistance: `${95 * percentage}%`,
            }}
            alt=""
          />
          <PlanePath className="three-column-image__plane-path" />
        </div>
      </div>
    </div>
  );
}
