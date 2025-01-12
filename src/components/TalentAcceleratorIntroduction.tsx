import { FC } from "react";
import { Style } from "./style";

export const TalentAcceleratorIntroduction: FC<{
  talent_accelerator_introcution_title_1: string;
  talent_accelerator_introcution_title_2: string;
  talent_accelerator_introcution_content: string;
  talent_accelerator_introcution_features: any[];
  talent_accelerator_introcution_image: any;
  style: Style;
}> = ({
  talent_accelerator_introcution_title_1,
  talent_accelerator_introcution_title_2,
  talent_accelerator_introcution_content,
  talent_accelerator_introcution_features,
  talent_accelerator_introcution_image,
  style,
}) => {
  const heading = {
    zalando: style.mainColor,
    "media-tech": "text-white",
    servicenow: "text-black",
    educate: "text-educateSecondary",
  };
  const text = {
    zalando: "text-black",
    "media-tech": "text-white",
    servicenow: "text-black",
  };

  return (
    <section
      className={`${
        style.style === "media-tech" ? "bg-mediatechMain" : "bg-gray-100"
      }`}
    >
      <div className="max-w-2xl lg:max-w-7xl lg:px-4 mx-auto flex flex-col-reverse lg:flex-row">
        <div className="h-[523px] lg:h-auto lg:w-4/12 flex">
          <div className="flex-1">
            <img
              className="h-full w-full object-cover"
              src={talent_accelerator_introcution_image.sizes.large}
              alt={talent_accelerator_introcution_image.alt}
            />
          </div>
          <div className={`h-full w-[60px] lg:w-[90px] ${style.mainBg}`}></div>
        </div>
        <div
          className={`${
            text[style.style]
          } lg:w-8/12 py-8 lg:pl-24 px-4 lg:px-0`}
        >
          <h2
            className={`${style.fontTitle1} ${
              heading[style.style]
            } text-5xl hyphens-auto`}
          >
            {talent_accelerator_introcution_title_1}
          </h2>
          <p className={`mt-2 ${style.fontTitle2} text-4xl`}>
            {talent_accelerator_introcution_title_2}
          </p>
          <div
            className={`mt-4 ${style.fontText} text-lg`}
            dangerouslySetInnerHTML={{
              __html: talent_accelerator_introcution_content,
            }}
          ></div>
          <dl className="grid lg:grid-cols-2 gap-9 mt-6">
            {talent_accelerator_introcution_features.map((feature, index) => (
              <div key={index}>
                <dt className={`${style.fontTitle1} text-xl`}>
                  {feature.title}
                </dt>
                <dd
                  className={`mt-4 ${style.fontText} text-lg`}
                  dangerouslySetInnerHTML={{ __html: feature.content }}
                ></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
