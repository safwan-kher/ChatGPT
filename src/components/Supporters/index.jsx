import React, { useCallback, useEffect, useState } from "react";

// Styles

export default function Supporters(props) {
  const { title, items } = props;

  const [autoScrolling, setAutoScrolling] = useState(false);
  const scrollElem = React.createRef();
  const timeoutId = React.createRef(0);
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
        setAutoScrolling(viewportBottom > elemTop && viewportTop < elemTop);
      });
    }
  }, [parentElem]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
  useEffect(() => {
    const scroller = () => {
      if (scrollElem.current) {
        const maxLeft =
          scrollElem.current.scrollWidth - scrollElem.current.clientWidth;
        if (autoScrolling) {
          let left = scrollElem.current.scrollLeft + 1;
          if (left < maxLeft) {
            timeoutId.current = setTimeout(scroller, 20);
          }
          scrollElem.current.scrollTo(left, 0);
        }
      }
    };
    timeoutId.current = setTimeout(scroller, 20);

    return () => clearTimeout(timeoutId);
  }, [autoScrolling, scrollElem, timeoutId]);

  return (
    <div className="supporters slider-block" ref={parentElem}>
      <div className="full-width-outer">
        <div className="slider">
          <h2 className="supporters__title">{title}</h2>
        </div>
        <div className="slider slider-delay-1">
          <div
            className="supporters__logos__wrapper"
            onMouseOver={() => {
              setAutoScrolling(false);
            }}
            onMouseOut={() => {
              setAutoScrolling(true);
            }}
          >
            <div className="supporters__logos" ref={scrollElem}>
              {items.map((item, index) => (
                <a
                  key={index}
                  className="supporters__logos__item"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.image} alt={item.name} title={item.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
