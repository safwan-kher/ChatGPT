import { FC, Fragment } from "react";
import utils from "utils";
import { PortalWithState } from "react-portal";

type VideoContentProps = {
  heading: string;
  content: string;
  youtube_video_id: string;
  thumbnail: string;
  steps: [{ title: string; content: string }];
};

export const VideoContent: FC<VideoContentProps> = ({
  heading,
  content,
  youtube_video_id,
  thumbnail,
  steps,
}) => {
  const freezeBody = () => {
    const bodyTags = document.getElementsByTagName("body");
    const bodyTag = bodyTags.item(0);
    if (!bodyTag.classList.contains("overflow-hidden")) {
      bodyTag.classList.add("overflow-hidden");
    } else {
      bodyTag.classList.remove("overflow-hidden");
    }
  };
  return (
    <section className="md:my-24 relative">
      <div className="h-full absolute right-0 left-1/4 bg-gray-100 hidden md:block"></div>
      <div className="max-w-6xl mx-auto w-full md:px-4 md:py-24 flex flex-col md:flex-row relative items-center">
        <div className="md:w-1/2 md:mr-8">
          <div className="bg-indigo-700 md:rounded-xl p-8">
            <h2 className="text-white text-3xl md:text-5xl font-bold">
              {heading}
            </h2>
            <p className="md:text-xl text-white mt-2">{content}</p>
            <PortalWithState
              onOpen={freezeBody}
              onClose={freezeBody}
              closeOnOutsideClick
              closeOnEsc
            >
              {({ openPortal, closePortal, isOpen, portal }) => (
                <Fragment>
                  <div className="relative md:-mb-20 mt-8">
                    <img
                      className="absolute z-10 top-16 -left-8"
                      src="/assets/floaters/stairs.png"
                      alt=""
                    />
                    <img
                      className="absolute z-10 bottom-0 -right-4"
                      src="/assets/floaters/cube.png"
                      alt=""
                    />
                    <div
                      onClick={openPortal}
                      className="relative cursor-pointer"
                    >
                      <img
                        style={{ clipPath: "url(#image-mask-small)" }}
                        src={thumbnail}
                        alt=""
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          version="1.1"
                          id="YouTube_Icon"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 1024 721"
                          enable-background="new 0 0 1024 721"
                          className="w-16"
                        >
                          <path
                            id="Triangle"
                            fill="#FFFFFF"
                            d="M407,493l276-143L407,206V493z"
                          />
                          <g id="Lozenge">
                            <g>
                              <linearGradient
                                id="SVGID_1_"
                                gradientUnits="userSpaceOnUse"
                                x1="512.5"
                                y1="719.7"
                                x2="512.5"
                                y2="1.2"
                                gradientTransform="matrix(1 0 0 -1 0 721)"
                              >
                                <stop
                                  offset="0"
                                  style={{ stopColor: "#E52D27" }}
                                />
                                <stop
                                  offset="1"
                                  style={{ stopColor: "#BF171D" }}
                                />
                              </linearGradient>
                              <path
                                fill="url(#SVGID_1_)"
                                d="M1013,156.3c0,0-10-70.4-40.6-101.4C933.6,14.2,890,14,870.1,11.6C727.1,1.3,512.7,1.3,512.7,1.3    h-0.4c0,0-214.4,0-357.4,10.3C135,14,91.4,14.2,52.6,54.9C22,85.9,12,156.3,12,156.3S1.8,238.9,1.8,321.6v77.5    C1.8,481.8,12,564.4,12,564.4s10,70.4,40.6,101.4c38.9,40.7,89.9,39.4,112.6,43.7c81.7,7.8,347.3,10.3,347.3,10.3    s214.6-0.3,357.6-10.7c20-2.4,63.5-2.6,102.3-43.3c30.6-31,40.6-101.4,40.6-101.4s10.2-82.7,10.2-165.3v-77.5    C1023.2,238.9,1013,156.3,1013,156.3z M407,493V206l276,144L407,493z"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {portal(
                    <div
                      style={{ zIndex: 201 }}
                      onClick={closePortal}
                      className="fixed bg-gray-900/80 inset-0 flex items-center justify-center"
                    >
                      <iframe
                        width="1280"
                        height="720"
                        src={`https://www.youtube-nocookie.com/embed/${youtube_video_id}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen={true}
                      ></iframe>
                    </div>
                  )}
                </Fragment>
              )}
            </PortalWithState>
          </div>
        </div>
        <div className="md:w-1/2 py-10 px-4 md:p-0 bg-gray-100 md:ml-8">
          <div className="timeline">
            <div className="timeline__items">
              {steps.map((item, index) => (
                <div className="timeline__item" key={index}>
                  <div className="timeline__item__title">{item.title}</div>
                  <div
                    className="timeline__item__text"
                    dangerouslySetInnerHTML={{
                      __html: utils.cleanText(item.content, true),
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
