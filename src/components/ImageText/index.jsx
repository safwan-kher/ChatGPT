import React from "react";

// Helper
import utils from "utils";

// Components
import ImageLoader from "components/ImageLoader";
import { useRouter } from "next/router";

// Styles

export default function ImageText(props) {
  const router = useRouter();
  const { title, text, image } = props;
  return (
    <div className="image-text slider-block">
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-5 col-12-sm">
          <div className="image-text__image slider slider-delay-1">
            <ImageLoader
              className="image-text__image__main"
              src={image}
              alt={title}
            />
            <div className="image-text__image__background" />
          </div>
        </div>
        <div className="col-5 col-12-sm slider">
          {router.asPath === "/career-mentor" ? (
            <h2 className="image-text__title">{title}</h2>
          ) : (
            <h1 className="image-text__title">{title}</h1>
          )}

          <p
            className="image-text__text"
            dangerouslySetInnerHTML={{ __html: utils.cleanText(text) }}
          />
        </div>
      </div>
    </div>
  );
}
