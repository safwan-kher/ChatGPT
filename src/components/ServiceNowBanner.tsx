import { FC } from "react";
import { Style } from "./style";
import { TalentAcceleratorStartStepsBanner } from "./TalentAcceleratorStartStepsBanner";

export const ServiceNowBanner: FC<{
  logo: any;
  logo_2: any;
  logo_3: any;
  logo_4: any;
  text: string;
  style: Style;
}> = ({ logo, logo_2, logo_3, logo_4, text, style }) => {
  return (
    <div>
      <div className="max-w-4xl px-4 mx-auto flex flex-col lg:flex-row justify-between gap-y-12 pb-12">
        <div className="flex flex-col items-center">
          <img className="max-w-[225px]" src={logo.sizes.medium} alt="" />
          <p className={`text-[19px] mt-2 ${style.fontText}`}>
            <span className={`${style.fontTitle2}`}>Career </span>
            <span className={`${style.mainColor} ${style.fontTitle2}`}>
              Accelerator
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className={style.fontText}>{text}</p>
          <div className="flex flex-col lg:flex-row items-center gap-y-6 lg:items-start gap-x-4 mt-2">
            <div>
              <img
                className="max-h-[50px]"
                alt={logo_2.alt}
                src={logo_2.sizes.medium}
              />
            </div>
            <div>
              <img
                className="max-h-[50px]"
                alt={logo_3.alt}
                src={logo_3.sizes.medium}
              />
            </div>
            <div>
              <img
                className="max-h-[50px]"
                alt={logo_4.alt}
                src={logo_4.sizes.medium}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="-mb-[33px] lg:-mb-[44px]">
          <TalentAcceleratorStartStepsBanner />
        </div>
      </div>
    </div>
  );
};
