import { FC, Fragment } from "react";
import utils from "utils";
import { PortalWithState } from "react-portal";

type B2BCaseStudyProps = {
  case_study_heading_start: string;
  case_study_heading_end: string;
  case_study_content: string;
  case_study_youtube_video_id: string;
  case_study_video_thumbnail: any;
};

export const B2BCaseStudy: FC<B2BCaseStudyProps> = ({
  case_study_heading_start,
  case_study_heading_end,
  case_study_content,
  case_study_youtube_video_id,
  case_study_video_thumbnail,
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
    <section className="my-24 mb-32 relative">
      <div className="max-w-xl md:max-w-7xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-[40px] font-[700]">
            <span>{case_study_heading_start}</span>
            <span className="text-orange-600">{case_study_heading_end}</span>
          </h2>
          <div
            className="text-xl mt-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: case_study_content }}
          ></div>
        </div>

        <div className="">
          <PortalWithState
            onOpen={freezeBody}
            onClose={freezeBody}
            closeOnOutsideClick
            closeOnEsc
          >
            {({ openPortal, closePortal, isOpen, portal }) => (
              <Fragment>
                <div className="relative">
                  <img
                    className="absolute z-10 -top-8 left-4"
                    src="/assets/floaters/stairs.png"
                    alt=""
                  />
                  <img
                    className="absolute z-10 -bottom-8 right-16"
                    src="/assets/floaters/cube.png"
                    alt=""
                  />
                  <div
                    onClick={openPortal}
                    className="relative cursor-pointer group "
                  >
                    <img
                      style={{ clipPath: "url(#image-mask-small)" }}
                      src={case_study_video_thumbnail.sizes.large}
                      className="aspect-[6/4] w-full h-auto object-cover group-hover:brightness-50 transition-all duration-300"
                      alt=""
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-orange-500 filter-none w-24 h-24 rounded-full flex items-center justify-center opacity-90 transition-all duration-300 group-hover:opacity-100">
                        <svg
                          viewBox="0 0 32 32"
                          className="fill-current text-white w-12"
                          aria-label="Play Video"
                          fill="#fff"
                          focusable="false"
                          role="img"
                        >
                          <title>Play Video</title>
                          <path
                            id="play"
                            data-testid="play"
                            d="M6.484 4.094l20.75 11.225c0.226 0.121 0.41 0.427 0.41 0.683s-0.184 0.563-0.41 0.683l-20.75 11.222c-0.095 0.051-0.26 0.093-0.367 0.093-0.427 0-0.774-0.346-0.774-0.773v-22.451c0-0.428 0.347-0.774 0.774-0.774 0.108 0 0.272 0.042 0.367 0.093z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {portal(
                  <div
                    style={{ zIndex: 10001 }}
                    onClick={closePortal}
                    className="fixed bg-gray-900/80 inset-0 flex items-center justify-center p-4"
                  >
                    <div className="max-w-7xl w-full aspect-video">
                      <iframe
                        className="w-full h-full"
                        src="https://play.vidyard.com/oLqrWu3fomC67HaNRqzm5K?autoplay=1&muted=0"
                        allowFullScreen={true}
                        scrolling="no"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </div>
                )}
              </Fragment>
            )}
          </PortalWithState>
        </div>
      </div>
    </section>
  );
};
