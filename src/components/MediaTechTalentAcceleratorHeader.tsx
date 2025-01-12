import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { Style } from "./style";
import { ApplyNowButton } from "./ApplyNowButton";
import { TalentAcceleratorStartStepsBanner } from "./TalentAcceleratorStartStepsBanner";

export const MediaTechTalentAcceleratorHeader: FC<{
  logo: any;
  title: string;
  subtitle: string;
  content: string;
  image: any;
  style: Style;
  internship: string;
  youtube_video_id?: string;
  openForm: () => void;
}> = ({
  logo,
  title,
  subtitle,
  content,
  image,
  style,
  internship,
  youtube_video_id,
  openForm,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openVideo = () => {
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`relative pt-20 lg:py-24 ${
        style.style === "servicenow" ? "text-white" : "text-black"
      }`}
    >
      <div
        className={`absolute inset-y-0 left-0 ${
          style.style === "media-tech" ? "bg-mediatechGray" : style.secondaryBg
        } lg:right-[calc(50%-400px)] right-0`}
      ></div>
      <div className="max-w-2xl lg:max-w-6xl relative mx-auto flex flex-col lg:flex-row justify-between gap-x-32 px-0 lg:px-4 items-center">
        <div className="flex-1 w-full lg:w-auto px-4 lg:px-0">
          <h1 className={`${style.fontTitle1} text-5xl mt-8`}>{title}</h1>
          <p className={`${style.fontTitle2} text-3xl mt-2`}>
            {subtitle.split("|").map((x, index, arr) => (
              <>
                {x}
                {arr.length === 2 && index === 0 && (
                  <span className="font-gilroy">|</span>
                )}
              </>
            ))}
          </p>
          <div
            className={`${style.fontText} text-lg mt-4 mb-6`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="flex flex-col lg:flex-row items-start lg:items-baseline gap-2">
            <p className={`${style.fontTitle3} font-[700]`}>
              in collaboration with
            </p>
            <div className="flex-shrink-0">
              <img
                className="h-[38px] lg:max-h-[27px]"
                src={logo.sizes.medium}
                alt={logo.alt}
              />
            </div>
          </div>
          <div className="mb-8 mt-6 bg-mediatechMain text-white uppercase font-black font-mont text-sm tracking-wider py-2 pr-5 flex items-baseline w-max relative">
            <div className="inset-y-0 w-0 absolute bg-red-500 left-0">
              <div className="relative h-full">
                <div className="w-[9999px] bg-mediatechMain inset-y-0 right-0 absolute"></div>
              </div>
            </div>
            {internship}
            <svg
              width="15"
              height="4"
              viewBox="0 0 15 4"
              fill="none"
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.265625 3.30868H15.0004V0H0.265625V1.65434V3.30868Z"
                fill="#00FF00"
              />
            </svg>
          </div>
          <ApplyNowButton
            style={style}
            dark={style.style === "media-tech"}
            special={style.style === "media-tech"}
            onClick={openForm}
            text="Apply now"
          />
        </div>
        <div className="relative w-full lg:w-auto flex-1 mt-20 lg:mt-0">
          <div
            className="relative cursor-pointer group h-full"
            onClick={openVideo}
          >
            <img
              className="lg:rounded-3xl h-[381px] w-full lg:w-auto lg:h-auto min-h-[381px] object-cover group-hover:brightness-50 transition-all duration-300"
              src={image.sizes.large}
              alt={image.alt}
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
          <div className="absolute inset-x-0 top-0 bottom-auto lg:bottom-0 lg:top-auto flex justify-center w-full">
            <div className="mb-0 -mt-[33px] lg:mt-0 lg:-mb-[44px]">
              <TalentAcceleratorStartStepsBanner />
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeVideo}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-2 py-6 sm:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-32"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-32"
              >
                <Dialog.Panel
                  className={`w-full relative max-w-7xl aspect-video transform bg-gray-900/50 shadow-lg transition-all`}
                >
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${youtube_video_id}?autoplay=1&modestbranding=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
};
