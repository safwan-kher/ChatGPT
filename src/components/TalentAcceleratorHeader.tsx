import { FC } from "react";
import { Style } from "./style";
import { ApplyNowButton } from "./ApplyNowButton";
import { TalentAcceleratorStartStepsBanner } from "./TalentAcceleratorStartStepsBanner";

export const TalentAcceleratorHeader: FC<{
  logo: any;
  title: string;
  subtitle: string;
  content: string;
  image: any;
  style: Style;
  openForm: () => void;
}> = ({ logo, title, subtitle, content, image, style, openForm }) => {
  return (
    <header
      className={`relative pt-20 lg:py-24 ${
        style.style === "servicenow" ? "text-white" : "text-black"
      }`}
    >
      <div
        className={`absolute inset-y-0 right-0 ${
          style.style === "media-tech" ? "bg-mediatechGray" : style.secondaryBg
        } lg:left-[calc(50%-400px)] left-0`}
      ></div>

      {/* Updated layout to fix spacing and alignment */}
      <div className="max-w-2xl lg:max-w-6xl relative mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 lg:px-8">

        {/* Text Container */}
        <div className="flex-1 w-full lg:w-auto text-left px-4 lg:px-0">
          <h1 className={`${style.fontTitle1} text-5xl mt-8`}>{title}</h1>
          <p className={`${style.fontTitle2} text-3xl mt-2`}>{subtitle}</p>
          <div
            className={`${style.fontText} text-lg mt-4 mb-6 leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 mb-8">
            <p className={`${style.fontTitle3} font-[700]`}>in collaboration with</p>
            <div className="flex-shrink-0">
              <img className="max-h-[24px]" src={logo.sizes.medium} alt="Partner logo" />
            </div>
          </div>
          <ApplyNowButton
            style={style}
            dark={style.style === "media-tech"}
            special={style.style === "media-tech"}
            onClick={openForm}
            text="Apply now"
          />
        </div>

        {/* Image Container */}
        <div className="relative flex-1 w-full lg:w-auto mt-12 lg:mt-0">
          <img
            className="lg:rounded-3xl h-[381px] w-full lg:w-auto lg:h-auto min-h-[381px] object-cover"
            src={image.sizes.large}
            alt="Promotional banner for Talent Accelerator"
          />
          <div className="absolute inset-x-0 top-0 bottom-auto lg:bottom-0 lg:top-auto flex justify-center w-full">
            <div className="mb-0 -mt-[33px] lg:mt-0 lg:-mb-[44px]">
              <TalentAcceleratorStartStepsBanner />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
