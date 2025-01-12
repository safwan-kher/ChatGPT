import { FC } from "react";
import { Style } from "./style";
import { ApplyNowButton } from "./ApplyNowButton";
import Link from "next/link";
import { useRouter } from "next/router";

export const TalentAcceleratorCourseInfo: FC<{
  talent_accelerator_course_info_title_1: string;
  talent_accelerator_course_info_title_2: string;
  talent_accelerator_course_info_content: string;
  talent_accelerator_course_info_course_info: any;
  style: Style;
  openForm: () => void;
}> = ({
  talent_accelerator_course_info_title_1,
  talent_accelerator_course_info_title_2,
  talent_accelerator_course_info_content,
  talent_accelerator_course_info_course_info,
  style,
  openForm,
}) => {
  const { locale } = useRouter();
  return (
    <section className={`${style.secondaryBgLg} my-20`}>
      <div className="lg:max-w-6xl relative lg:px-4 mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className={`${style.secondaryBg} w-full lg:w-auto`}>
          <div className="max-w-2xl lg:max-w-none mx-auto px-8 lg:px-0">
            <div
              className={`relative border -my-6 bg-white flex flex-col lg:flex-row items-center lg:items-start justify-between rounded-2xl ${style.mainBorder} pr-6 pl-6 lg:pr-0 py-6 lg:py-12 lg:pl-9`}
            >
              <div className="lg:pr-5 text-center lg:text-left">
                <p className={`${style.fontTitle1} text-4xl text-[40px]`}>
                  {talent_accelerator_course_info_title_1}
                </p>
                <p className={`${style.fontTitle2} mt-2 text-4xl`}>
                  {talent_accelerator_course_info_title_2}
                </p>
              </div>
              <Link
                href={talent_accelerator_course_info_course_info.url}
                className="block"
                target="_blank"
              >
                <div
                  className={`h-[90px] w-[90px] -mb-20 mt-4 lg:my-0 lg:-mr-[45px] rounded-full flex items-center justify-center ${style.mainBg}`}
                >
                  <img src="/assets/icons/download.png" alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 pt-28 mx-4 lg:mx-0 lg:pt-0">
          <div className="flex flex-col items-center">
            <p
              className={`text-center text-lg mb-4 ${
                style.style === "zalando" ? "" : "lg:text-white"
              }`}
            >
              {talent_accelerator_course_info_content}
            </p>
            <ApplyNowButton
              style={style}
              dark={true}
              special={true}
              onClick={openForm}
              text={locale === "en" ? "Apply now" : "Bewirb dich jetzt"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
