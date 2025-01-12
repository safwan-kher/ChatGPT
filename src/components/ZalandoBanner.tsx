import { FC } from "react";
import { Style } from "./style";
import { TalentAcceleratorStartStepsBanner } from "./TalentAcceleratorStartStepsBanner";

export const ZalandoBanner: FC<{ logo: any; style: Style }> = ({
  logo,
  style,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <img className="max-w-[177px]" src={logo.sizes.medium} alt="" />
        <p className={`text-[19px] mt-2 pb-24 ${style.fontText}`}>
          <span className={`${style.mainColor}`}>·</span> Future{" "}
          <span className={`${style.mainColor} ${style.fontTitle2}`}>
            Women ·
          </span>
        </p>
        <div className="-mb-[33px] lg:-mb-[44px]">
          <TalentAcceleratorStartStepsBanner />
        </div>
      </div>
    </div>
  );
};
