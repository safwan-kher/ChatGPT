import { FC } from "react";
import { Style } from "./style";
import { EducateApplyNowButton } from "./EducateApplyNowButton";
import { SmallTalentAcceleratorStartStepsBanner } from "./SmallTalentAcceleratorStartStepsBanner";
import { useRouter } from "next/router";

export const EducateTalentAcceleratorHeader: FC<{
  logo: any;
  title: string;
  subtitle: string;
  content: string;
  image: any;
  style: Style;
  openForm: () => void;
}> = ({ logo, title, subtitle, content, image, style, openForm }) => {
  const { locale } = useRouter();
  return (
    <header className={`relative pt-20 lg:py-24 text-black`}>
      <div
        className={`absolute inset-y-0 left-0 ${style.secondaryBg} lg:right-[calc(50%-400px)] right-0`}
      ></div>
      <div className="max-w-2xl lg:max-w-6xl relative lg: mx-auto flex flex-col lg:flex-row justify-between gap-x-32 px-0 lg:px-4 items-center">
        <div className="flex-1 px-4 lg:px-0 w-full">
          <h1 className={`${style.fontTitle1} text-5xl mt-8`}>{title}</h1>
          <p className={`${style.fontTitle2} text-3xl mt-2`}>{subtitle}</p>
          <div
            className={`${style.fontText} text-lg mt-4 mb-7`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="max-w-fit mb-7">
            <SmallTalentAcceleratorStartStepsBanner />
          </div>
          <EducateApplyNowButton
            style={style}
            dark={false}
            onClick={openForm}
            text={locale === "en" ? "Apply now" : "Bewirb dich jetzt"}
          />
        </div>
        <div className="relative w-full lg:w-auto flex-1 mt-20 lg:mt-0">
          <img
            className="lg:rounded-3xl h-[381px] w-full lg:w-auto lg:h-auto min-h-[381px] object-cover"
            src={image.sizes.large}
            alt=""
          />
          <div className="absolute left-6 top-0 bottom-auto lg:bottom-0 lg:top-auto">
            <div className="mb-0 -mt-[33px] lg:mt-0 lg:-mb-[44px]">
              <div className="bg-white rounded px-6 py-1.5">
                <img
                  className="max-h-[100px] lg:max-h-[47px]"
                  src={logo.sizes.large}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
