import { FC } from "react";
import { Style } from "./style";

export const EducateTalentAcceleratorVision: FC<{
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
  return (
    <section className="max-w-2xl lg:max-w-6xl mx-auto px-4 relative my-16 flex flex-col lg:flex-row gap-x-16 gap-y-16">
      <div className="lg:w-5/12">
        <div className="h-full">
          <div className="relative cursor-pointer h-full">
            <img
              src={talent_accelerator_vision_image.sizes.large}
              className="w-full aspect-video lg:aspect-auto lg:w-auto lg:h-full rounded-3xl object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="lg:w-7/12">
        <h2 className={`${style.fontTitle1} text-educateSecondary text-5xl`}>
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
