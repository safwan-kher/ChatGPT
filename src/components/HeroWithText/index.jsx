import React from 'react';
import Script from "next/script"

// Helper
import utils from 'utils';

// Components
import Button from 'components/Button';
import ImageLoader from 'components/ImageLoader';

// Styles


export default function HeroWithText(props) {
  const {
    title,
    text,
    buttonLabel,
    buttonLink,
    buttonOnClick,
    image,
    videoThumbnail,
    language
  } = props;
  return (
    <div className="hero-with-text slider-block slider-block-first-load">
      <Script src="https://fast.wistia.com/embed/medias/ihf4chukfq.jsonp" />
      <Script src="https://fast.wistia.com/assets/external/E-v1.js" />
      {language === "en" ?
        <Script src="https://fast.wistia.com/embed/medias/ngofqwuag4.jsonp" /> :
        <Script src="https://fast.wistia.com/embed/medias/w2hgmhquh5.jsonp" />
      }
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-6 col-12-sm hero-with-text__image-wrapper">
          {videoThumbnail ?
            <div className="slider slider-delay-1">
              <img
                className="hero-with-text__image__floater"
                src={'/assets/floaters/stairs.png'}
                alt=""
              />
              <img
                className="hero-with-text__image__floater"
                src={'/assets/floaters/cube.png'}
                alt=""
              />
              <img
                className="hero-with-text__image__floater"
                src={'/assets/floaters/cube-blur.png'}
                alt=""
              />
              <div className="video-player-container">
                <div className="wistia_responsive_padding" style={{ padding: '66.66% 0 0 0', position: 'relative' }}>
                  <div className="wistia_responsive_wrapper clip-thumbnail" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                    <div className={`wistia_embed ${language === "de" ? "wistia_async_w2hgmhquh5" : "wistia_async_ngofqwuag4"} popover=true popoverAnimateThumbnail=false videoFoam=true popoverContent=html`} style={{ display: 'inline-block', height: '100%', position: 'relative', width: '100%' }}>
                      <div
                        className="video-thumbnail"
                        style={{ backgroundImage: `url(${videoThumbnail})` }}
                        id="wistia_13.thumb_container"
                      >
                        <img
                          className="video-thumbnail-play-button"
                          src={'/assets/play-button.png'}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="hero-with-text__image slider slider-delay-1">
              <img
                className="hero-with-text__image__floater"
                src={'/assets/floaters/stairs.png'}
                alt=""
              />
              <img
                className="hero-with-text__image__floater"
                src={'/assets/floaters/cube.png'}
                alt=""
              />
              <img
                className="hero-with-text__image__floater"
                src={'/assets/floaters/cube-blur.png'}
                alt=""
              />
              <ImageLoader
                className="hero-with-text__image__main"
                src={image}
                alt={title}
              />
            </div>
          }
        </div>
        <div className="col-5 col-12-sm slider">
          <h1 className="hero-with-text__title">
            {title}
          </h1>
          <p
            className="hero-with-text__text"
            dangerouslySetInnerHTML={
              { __html: utils.cleanText(text) }
            }
          />
          <Button
            label={buttonLabel}
            link={buttonLink}
            onClick={buttonOnClick}
            variant="transparent-blue"
          />
        </div>
      </div>
    </div >
  );
}
