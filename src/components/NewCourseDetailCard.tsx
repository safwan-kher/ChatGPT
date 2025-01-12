import { Course } from "CourseService";
import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { courseFinderPage } from "i18n";

export const NewCourseDetailCard: FC<{
  course: Course;
  bootcampName: string;
  bootcampLogo: string;
  bootcampSlug: string;
  openForm: () => void;
}> = ({ course, bootcampName, bootcampLogo, bootcampSlug, openForm }) => {
  const router = useRouter();
  const locale = router.locale !== "en" ? "de" : "en";

  return (
    <div className="p-4 sm:pl-16 sm:pt-14 sm:pr-24 sm:pb-7 bg-white">
      <div className="flex justify-between sm:mt-6 items-start">
        <h2 className="text-2xl font-[700]">{course.course_name[locale]}</h2>
        <div>
          <img src={bootcampLogo} className="max-w-full max-h-10 ml-2" alt="" />
        </div>
      </div>
      <div className="sm:w-4/5">
        <p className="font-[700] text-xl mt-6">{bootcampName}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: course.description[locale].split("\n").join("</br>"),
          }}
          className="text-gray-700 mt-4"
        ></p>
        <dl className="flex sm:flex-row flex-col flex-wrap justify-between gap-y-6 mt-6">
          <div className="sm:w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.duration[locale]}
            </dt>
            <dd className="text-gray-700">{course.duration_time[locale]}</dd>
          </div>
          <div className="sm:w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.price[locale]}
            </dt>
            <dd className="text-gray-700">{course.price[locale]}</dd>
          </div>
          <div className="sm:w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.fundingOptions[locale]}
            </dt>
            {course.funding_options[locale].map((fundingOption) => (
              <dd
                className="text-gray-700 list-item list-disc list-inside ml-2"
                key={fundingOption}
              >
                {fundingOption}
              </dd>
            ))}
          </div>
          <div className="sm:w-[47.5%]">
            <dt className="mb-3 font-[700] text-xl">
              {courseFinderPage.requirements[locale]}
            </dt>
            {course.requirements[locale].map((requirement) => (
              <dd
                className="text-gray-700 list-item list-disc list-inside ml-2"
                key={requirement}
              >
                {requirement}
              </dd>
            ))}
          </div>
          <div className="sm:w-[47.5%]">
            <dt className="mb-1 font-[700] text-gray-700">Maßnahmennummer</dt>
            <dd className="text-gray-700">{course.massnahmennummber}</dd>
          </div>
          <div className="sm:w-[47.5%]">
            <dt className="mb-1 font-[700] text-xl h-6"></dt>
            {course.highlights[locale].map((highlight) => (
              <dd
                key={highlight}
                className="text-gray-700 list-item list-star marker:text-xs list-outside pl-1 ml-2"
              >
                {highlight}
              </dd>
            ))}
          </div>
        </dl>
      </div>
      <div className="flex flex-wrap gap-y-4 justify-center sm:justify-start gap-x-8 mt-7">
        {!router.asPath.startsWith("/partner") && (
          (<Link
            href={`/partner/${bootcampSlug}`}
            className="text-indigo-700 bg-indigo-300 rounded font-[700] px-4 py-1 uppercase tracking-widest">

            {courseFinderPage.visitBootcampPage[locale]}

          </Link>)
        )}
        <button
          onClick={openForm}
          type="button"
          className="text-white bg-indigo-700 rounded font-[700] px-4 py-1 uppercase tracking-widest"
        >
          {courseFinderPage.applyNow[locale]}
        </button>
      </div>
    </div>
  );
};
