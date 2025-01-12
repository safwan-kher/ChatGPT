import React, { FC } from "react"
import utils from "utils"



export const VideoBlock: FC<{ title?: string, subtitle?: string, youtubeVideoId?: string, image?: string }> = ({ title, subtitle, youtubeVideoId, image }) => {
  return (
    <div className="video-block full-width-outer">
      <div className="full-width-inner">
        <div className="row">
          <div className="col-1 col-0-sm" />
          <div className="col-6 col-12-sm video-block-header">
            <h2 className="video-block-title">
              {title}
            </h2>
            <div
              className="video-block-subtitle"
              dangerouslySetInnerHTML={
                { __html: utils.cleanText(subtitle, true) }
              }
            >
            </div>
            <img src={image} className="video-block-image" alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-1 col-0-sm" />
          <div className="col-10 col-12-sm">
            <div className="video-wrapper">
              <iframe
                width="1920"
                height="1080"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}