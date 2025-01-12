import { FC, useContext } from "react";
import { AppContext } from "../../pages/_app";

export const TechMentorCoursePackage: FC<{
  tech_mentor_course_package: any;
}> = ({ tech_mentor_course_package }) => {
  const context = useContext(AppContext);

  return (
    <div className="max-w-2xl lg:max-w-7xl mx-auto w-full px-4 py-16">
      <div className="bg-indigo-700 rounded-lg py-9 px-12 flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <img
            className="w-[132px] h-[167px] object-cover rounded -ml-24 lg:-ml-0 -mt-24 -rotate-3"
            src={tech_mentor_course_package.image_1.sizes.medium}
          />
          <img
            className="w-[128px] h-[162px] object-cover rounded -mt-44 lg:-mt-20 ml-24 lg:-ml-20 rotate-6"
            src={tech_mentor_course_package.image_2.sizes.medium}
          />
          <div className="text-white">
            <p className="text-center lg:text-left font-bold-x text-3xl">
              {tech_mentor_course_package.title}
            </p>
            <p className="text-center lg:text-left mt-2 text-2xl">
              {tech_mentor_course_package.description}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => context.setIsDownloadOverlayVisible(true)}
            className="block mt-8 lg:mt-0 w-max bg-[#43E1BC] uppercase px-6 py-[11px] rounded-[4px] text-white font-[700] tracking-wider"
          >
            {tech_mentor_course_package.download_button}
          </button>
        </div>
      </div>
    </div>
  );
};
