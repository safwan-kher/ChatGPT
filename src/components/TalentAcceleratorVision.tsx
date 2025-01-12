import { FC, Fragment } from "react";
import { Style } from "./style";
import { PortalWithState } from "react-portal";

export const TalentAcceleratorVision: FC<{
  talent_accelerator_vision_title_1: string;
  talent_accelerator_vision_title_2: string;
  talent_accelerator_vision_content: string;
  talent_accelerator_vision_image: any;
  style: Style;
}> = ({
  talent_accelerator_vision_title_1,
  talent_accelerator_vision_title_2,
  talent_accelerator_vision_content,
  talent_accelerator_vision_image,
  style,
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
    <section className="max-w-2xl lg:max-w-6xl mx-auto px-4 relative my-16 flex flex-col lg:flex-row gap-x-16 gap-y-16">
      <div className="lg:w-5/12">
        <div className="h-full">
          <PortalWithState
            onOpen={freezeBody}
            onClose={freezeBody}
            closeOnOutsideClick
            closeOnEsc
          >
            {({ openPortal, closePortal, isOpen, portal }) => (
              <Fragment>
                <div
                  onClick={openPortal}
                  className="relative cursor-pointer group h-full"
                >
                  <img
                    src={talent_accelerator_vision_image.sizes.large}
                    className="w-full aspect-video lg:aspect-auto lg:w-auto lg:h-full rounded-3xl object-cover group-hover:brightness-50 transition-all duration-300"
                    alt=""
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border-4 boarder-white filter-none w-24 h-24 rounded-full flex items-center justify-center opacity-90 transition-all duration-300 group-hover:opacity-100">
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
      <div className="lg:w-7/12">
        <h2
          className={`${style.fontTitle1} ${
            style.style === "zalando" ? style.mainColor : "text-black"
          } text-5xl`}
        >
          {talent_accelerator_vision_title_1}
        </h2>
        <p className={`mt-2 ${style.fontTitle2} text-4xl`}>
          {talent_accelerator_vision_title_2}
        </p>
        <div
          className={`mt-5 ${style.fontText} text-lg space-y-3`}
          dangerouslySetInnerHTML={{
            __html: talent_accelerator_vision_content,
          }}
        ></div>
      </div>
    </section>
  );
};
