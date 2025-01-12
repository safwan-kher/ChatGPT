import { Course } from "CourseService";
import { FC } from "react";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import { courseFinderPage } from "i18n";

export const CourseCard: FC<{
  course: Course;
  bootcampName: string;
  bootcampLogo: string;
  openForm: () => void;
}> = ({ course, bootcampName, bootcampLogo, openForm }) => {
  const router = useRouter();
  const locale = router.locale !== "en" ? "de" : "en";

  const select = (): void => {
    const newUrl: UrlObject = {
      query: { ...router.query, selected_course: course.course_slug },
    };
    router.push(newUrl, undefined, { shallow: true });
  };

  return (
    <div className="border border-indigo-700 bg-white rounded-xl p-4 pb-5 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-indigo-700 font-[700] text-2xl">
          {course.course_name[locale]}
        </h3>
        <div className="flex justify-between mt-6">
          <p className="text-xl font-[700]">{bootcampName}</p>
          <div>
            <img
              src={bootcampLogo}
              className="max-w-full max-h-8 ml-2"
              alt=""
            />
          </div>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: course.description[locale].split("\n").join("</br>"),
          }}
          className="text-gray-700 mt-4 line-clamp-5"
        ></p>
        <dl className="flex flex-wrap justify-between gap-y-6 mt-6">
          <div className="w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.career[locale]}
            </dt>
            <dd className="text-gray-700">{course.career[locale]}</dd>
          </div>
          <div className="w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.location[locale]}
            </dt>
            <dd className="text-gray-700">
              {course.location[locale].join(", ")}
            </dd>
          </div>
          <div className="w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.languages[locale]}
            </dt>
            <dd className="text-gray-700">
              {course.language[locale].join(", ")}
            </dd>
          </div>
          <div className="w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.duration[locale]}
            </dt>
            <dd className="text-gray-700">{course.duration_time[locale]}</dd>
          </div>
          <div className="w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.programType[locale]}
            </dt>
            <dd className="text-gray-700">{course.program_type[locale]}</dd>
          </div>
          <div className="w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl h-7"></dt>
            {course.highlights[locale].map((highlight) => (
              <dd className="text-gray-700 list-item list-star  marker:text-xs list-outside pl-1 ml-2">
                {highlight}
              </dd>
            ))}
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        <button
          type="button"
          onClick={select}
          className="text-white bg-indigo-700 rounded font-[700] px-2 py-1 uppercase tracking-widest"
        >
          {courseFinderPage.learnMore[locale]}
        </button>
        <div className="relative">
          <div className="absolute inset-0 translate-y-1.5 translate-x-1.5 border rounded border-indigo-700"></div>
          <button
            onClick={openForm}
            className="text-white relative bg-indigo-700 rounded font-[700] px-2 py-1 uppercase tracking-widest"
          >
            {courseFinderPage.applyNow[locale]}
          </button>
        </div>
      </div>
    </div>
  );
};
