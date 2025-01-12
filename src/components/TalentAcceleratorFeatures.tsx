import { FC } from "react";
import { Style } from "./style";

export const TalentAcceleratorFeatures: FC<{
  talent_accelerator_features: {
    icon: any;
    title: string;
    description: string;
  }[];
  style: Style;
}> = ({ talent_accelerator_features, style }) => {
  return (
    <section className="max-w-2xl lg:max-w-6xl relative px-4 mx-auto">
      <ul className="flex flex-col lg:flex-row items-center lg:items-start list-none gap-y-14 gap-x-16 py-16">
        {talent_accelerator_features.map((feature, index) => (
          <li
            className="flex-1 flex items-center lg:items-start flex-col"
            key={index}
          >
            <img src={feature.icon.sizes.medium} className="h-[74px]" alt="" />
            <h2
              className={`mt-8 ${style.fontTitle1} ${
                style.style === "media-tech"
                  ? style.secondaryColor
                  : style.mainColor
              } text-center lg:text-left text-4xl lg:text-xl`}
            >
              {feature.title}
            </h2>
            <p
              className={`mt-4 ${style.fontText} text-center lg:text-left text-2xl lg:text-lg`}
            >
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
