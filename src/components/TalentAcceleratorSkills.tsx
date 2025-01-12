import { FC } from "react";
import { Style } from "./style";
import { TalentAcceleratorStartStepsBanner } from "./TalentAcceleratorStartStepsBanner";
import { useRouter } from "next/router";

export const TalentAcceleratorSkills: FC<{
  talent_accelerator_skills_title_1: string;
  talent_accelerator_skills_title_2: string;
  talent_accelerator_skills_content: string;
  talent_accelerator_skills_image: any;
  talent_accelerator_skills_skills: any[];
  style: Style;
}> = ({
  talent_accelerator_skills_title_1,
  talent_accelerator_skills_title_2,
  talent_accelerator_skills_content,
  talent_accelerator_skills_image,
  talent_accelerator_skills_skills,
  style,
}) => {
  const { locale } = useRouter();
  return (
    <section className="relative max-w-2xl lg:max-w-6xl px-4 mx-auto flex flex-col-reverse lg:flex-row mb-32">
      <img
        src={talent_accelerator_skills_image.sizes.large}
        className="max-h-[287px] lg:max-h-full rounded-b-3xl lg:rounded-l-3xl lg:rounded-br-none lg:w-4/12 object-cover"
        alt=""
      />
      <div
        className={`lg:relative static border-l border-b-0 lg:border-l-0 border-t lg:w-8/12 border-r lg:border-b rounded-tl-3xl rounded-tr-3xl lg:rounded-l-none lg:rounded-3xl px-4 lg:px-24 pt-8 lg:pt-9 pb-8 lg:pb-16 ${
          style.style === "media-tech"
            ? "border-mediatechMain"
            : style.mainBorder
        }`}
      >
        <h2
          className={`${style.fontTitle1} ${
            style.style === "zalando" ? style.mainColor : "text-black"
          } text-5xl`}
        >
          {talent_accelerator_skills_title_1}
        </h2>
        <p className={`mt-2 ${style.fontTitle2} text-4xl`}>
          {talent_accelerator_skills_title_2}
        </p>
        <div
          className={`mt-6 ${style.fontText} text-lg`}
          dangerouslySetInnerHTML={{
            __html: talent_accelerator_skills_content,
          }}
        ></div>
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-[23px] gap-y-[21px] list-none mt-6 text-sm">
          {talent_accelerator_skills_skills
            .map(({ skill }, index) => (
              <li
                className={`bg-zalandoSecondary flex items-center justify-center text-center rounded h-[40px] ${style.fontTitle1}`}
                key={index}
              >
                {skill}
              </li>
            ))
            .concat([
              <li
                className={`flex items-center justify-center text-center rounded h-[40px] ${style.fontTitle1} ${style.mainBg} text-white`}
                key="special"
              >
                <span
                  className={`${
                    style.style === "media-tech" ? "hidden sm:block" : ""
                  }`}
                >
                  {locale === "en"
                    ? style.style === "media-tech"
                      ? "Receive a Macbook: Graduate and keep it!"
                      : "💻 Macbook Included"
                    : "💻 Inklusive MacBook"}
                </span>
                <span
                  className={`${
                    style.style === "media-tech" ? "block sm:hidden" : "hidden"
                  }`}
                >
                  Macbook Incl.
                </span>
              </li>,
              <li
                key="education"
                className={`${
                  style.style === "media-tech" ? `hidden lg:flex` : `flex`
                } col-span-2 items-center justify-center`}
              >
                <p className={`${style.fontTitle1}`}>
                  {locale === "en"
                    ? "EDUCATION QUALITY CERTIFIED BY"
                    : "Bildungsqualität zertifiziert durch"}
                </p>
                <img
                  className="h-[50px] ml-2"
                  src="/assets/certificate.png"
                  alt=""
                />
              </li>,
            ])}
        </ul>
        <div className="absolute inset-x-0 bottom-0 top-auto flex justify-center w-full">
          <div className="-mb-[33px] lg:-mb-[44px]">
            <TalentAcceleratorStartStepsBanner />
          </div>
        </div>
      </div>
    </section>
  );
};
