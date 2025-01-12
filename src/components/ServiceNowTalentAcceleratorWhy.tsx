import { FC } from "react";
import { Style } from "./style";
import { ApplyNowButton } from "./ApplyNowButton";
import { useRouter } from "next/router";

export const ServiceNowTalentAcceleratorWhy: FC<{
  talent_accelerator_why_title_1: string;
  talent_accelerator_why_title_2: string;
  talent_accelerator_why_content: string;
  talent_accelerator_why_image: any;
  logo: any;
  talent_accelerator_why_button_text: string;
  style: Style;
  openForm: () => void;
}> = ({
  talent_accelerator_why_title_1,
  talent_accelerator_why_title_2,
  talent_accelerator_why_content,
  talent_accelerator_why_image,
  talent_accelerator_why_button_text,
  logo,
  style,
  openForm,
}) => {
  const { locale } = useRouter();
  return (
    <section className="max-w-2xl lg:max-w-6xl relative px-4 mx-auto py-16 flex flex-col lg:flex-row gap-x-6">
      <div className="lg:w-1/2">
        <h2
          className={`${style.fontTitle1} ${
            style.style === "zalando" ? style.mainColor : "text-black"
          } text-5xl`}
        >
          {talent_accelerator_why_title_1}
        </h2>
        <p className={`mt-2 ${style.fontTitle2} text-4xl`}>
          {talent_accelerator_why_title_2}
        </p>
        <div
          className={`mt-4 ${style.fontText} text-lg space-y-3`}
          dangerouslySetInnerHTML={{
            __html: talent_accelerator_why_content,
          }}
        ></div>
      </div>
      <div className="mt-6 lg:mt-0 lg:w-1/2">
        <img
          className="rounded-3xl"
          src={talent_accelerator_why_image.sizes.medium}
          alt=""
        />
        <div className="flex flex-col lg:flex-row gap-y-6 mt-7 items-center justify-center">
          <img className="max-h-[30px] mr-8" src={logo.sizes.medium} alt="" />
          <ApplyNowButton
            style={style}
            dark={false}
            onClick={openForm}
            text={locale === "en" ? "Apply now" : "Bewirb dich jetzt"}
          />
        </div>
      </div>
    </section>
  );
};
