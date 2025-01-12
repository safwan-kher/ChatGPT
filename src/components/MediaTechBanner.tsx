import { FC } from "react";
import { Style } from "./style";
import { TalentAcceleratorStartStepsBanner } from "./TalentAcceleratorStartStepsBanner";

export const MediaTechBanner: FC<{ logo: any; style: Style }> = ({
  logo,
  style,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <img className="max-h-[26px]" src={logo.sizes.medium} alt={logo.alt} />
        <p className={`text-[19px] mt-2 pb-24 text-center`}>
          <span className={`${style.fontTitle1} ${style.secondaryColor}`}>
            ·
          </span>
          <span className={style.fontTitle1}>&nbsp;Full-Stack</span>
          <span className={`${style.fontTitle2}`}>
            {" "}
            Media Tech Program&nbsp;
          </span>
          <span className={`${style.fontTitle1} ${style.secondaryColor}`}>
            ·
          </span>
        </p>
        <div className="-mb-[33px] lg:-mb-[44px]">
          <TalentAcceleratorStartStepsBanner />
        </div>
      </div>
    </div>
  );
};
