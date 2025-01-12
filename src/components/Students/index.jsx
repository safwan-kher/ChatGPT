import React, { useCallback, useEffect, useState } from "react";

// Helper
import utils from "utils";

// Components
import Button from "components/Button";

// Styles

export default function Students(props) {
  const { title, text, buttonLabel, buttonLink, items, showOnlyStudents } =
    props;
  const [itemsPerScroll, setItemsPerScroll] = useState(1);
  const [offsetIndex, setOffsetIndex] = useState(0);
  const [scrollerTransform, setScrollerTransform] = useState(0);
  const onResize = useCallback(() => {
    if (window.innerWidth >= 1280) {
      setItemsPerScroll(3);
    } else {
      setItemsPerScroll(1);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    setTimeout(() => {
      onResize();
    }, 50);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
  useEffect(() => {
    let scrollPosition = offsetIndex * itemsPerScroll;
    const limit = 0 - items.length + itemsPerScroll;
    if (scrollPosition < limit) {
      scrollPosition = limit;
    }
    setScrollerTransform(scrollPosition * 350);
  }, [items, itemsPerScroll, offsetIndex, setScrollerTransform]);

  if (showOnlyStudents === true) {
    return (
      <div>
        <div className="slider slider-delay-1">
          <div className="students__items">
            <div
              className="students__items__item-scroller"
              style={{
                transform: `translate3d(${scrollerTransform}px, 0, 0)`,
              }}
            >
              {items.map((item, index) => (
                <div key={index} className="students__items__item">
                  <img
                    className="students__items__item__image"
                    src={item.image}
                    alt={item.name}
                    title={item.name}
                  />
                  <div className="students__items__item__name">{item.name}</div>
                  <div className="students__items__item__quote">
                    {item.quote}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="full-width-inner">
          <div className="row">
            <div className="col-11 col-12-sm">
              <div className="slider slider-delay-2">
                <div className="students__arrows">
                  <div
                    className="students__arrow"
                    onClick={() => {
                      if (offsetIndex < 0) {
                        setOffsetIndex(offsetIndex + 1);
                      }
                    }}
                  />
                  <div
                    className="students__arrow"
                    onClick={() => {
                      if (
                        offsetIndex >
                        0 - (items.length / itemsPerScroll - 1)
                      ) {
                        setOffsetIndex(offsetIndex - 1);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-1 col-0-sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="students slider-block">
      <img
        className="students__floater"
        src={"/assets/floaters/pin.png"}
        alt=""
      />
      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-1 col-0-sm" />
            <div className="col-6 col-12-sm">
              <div className="slider">
                <h2 className="students__title">{title}</h2>
                <p
                  className="students__text"
                  dangerouslySetInnerHTML={{ __html: utils.cleanText(text) }}
                />
                <Button
                  label={buttonLabel}
                  link={buttonLink}
                  variant="transparent-blue-alt"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="slider slider-delay-1">
          <div className="students__items">
            <div
              className="students__items__item-scroller"
              style={{
                transform: `translate3d(${scrollerTransform}px, 0, 0)`,
              }}
            >
              {items.map((item, index) => (
                <div key={index} className="students__items__item">
                  <img
                    className="students__items__item__image"
                    src={item.image}
                    alt={item.name}
                    title={item.name}
                  />
                  <div className="students__items__item__name">{item.name}</div>
                  <div className="students__items__item__quote">
                    {item.quote}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="full-width-inner">
          <div className="row">
            <div className="col-11 col-12-sm">
              <div className="slider slider-delay-2">
                <div className="students__arrows">
                  <div
                    className="students__arrow"
                    onClick={() => {
                      if (offsetIndex < 0) {
                        setOffsetIndex(offsetIndex + 1);
                      }
                    }}
                  />
                  <div
                    className="students__arrow"
                    onClick={() => {
                      if (
                        offsetIndex >
                        0 - (items.length / itemsPerScroll - 1)
                      ) {
                        setOffsetIndex(offsetIndex - 1);
                      }
                    }}
                  />
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
