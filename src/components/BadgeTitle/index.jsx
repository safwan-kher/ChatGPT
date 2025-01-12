import React, { useCallback, useEffect, useState } from "react";

// Helper
import utils from "utils";

// Styles

export default function BadgeTitle(props) {
  const { title, badge } = props;

  const [badgePositionLeft, setBadgePositionLeft] = useState(0);
  const [badgePositionTop, setBadgePositionTop] = useState(0);
  const titleElem = React.createRef();
  const onResize = useCallback(() => {
    let firstRowLastElem = -1;
    let secondRowLastElem = -1;
    let secondRowTop = -1;
    if (titleElem.current && titleElem.current.children.length) {
      for (const node of titleElem.current.children) {
        if (
          node.offsetTop <= 0 &&
          node.offsetLeft + node.offsetWidth > firstRowLastElem
        ) {
          firstRowLastElem = node.offsetLeft + node.offsetWidth;
        } else if (node.offsetLeft + node.offsetWidth > secondRowLastElem) {
          secondRowLastElem = node.offsetLeft + node.offsetWidth;
          secondRowTop = node.offsetTop - node.offsetHeight;
        } else if (firstRowLastElem < secondRowLastElem) {
          setBadgePositionLeft(secondRowLastElem);
          setBadgePositionTop(secondRowTop + 20);
          break;
        } else {
          setBadgePositionLeft(firstRowLastElem);
          setBadgePositionTop(20);
          break;
        }
      }
    }
  }, [titleElem]);
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

  const badgeClass = `badge-title__badge${
    badge.length > 6 ? " badge-title__badge--small" : ""
  }`;
  const titleSpans = `<span>${title.split(" ").join("</span> <span>")}</span>`;
  return (
    <div className="badge-title">
      <h1
        className="badge-title__text"
        ref={titleElem}
        dangerouslySetInnerHTML={{
          __html: utils.cleanText(titleSpans, true, false, ["span"]),
        }}
      />
      {badge && (
        <span
          className={badgeClass}
          style={{
            left: badgePositionLeft - 20,
            top: badgePositionTop,
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}
