import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { FC, useEffect, useRef, useState } from "react";
import { IGetLayout } from "../src/components/DefaultLayout";
import { getBlogIndexLayout } from "../src/components/BlogIndexLayout";
import { useRouter } from "next/router";
import api from "../src/api";
import BootcampsHero from "../src/components/BootcampsHero";
import { CourseCard } from "../src/components/CourseCard";
import { CourseDialog } from "../src/components/CourseDialog";
import { CourseApplicationFormDialog } from "../src/components/CourseApplicationFormDialog";
import { NewMultiSelectDropdown } from "../src/components/NewMultiSelectDropdown";
import {
  CAREERS,
  DURATIONS,
  FUNDING_OPTIONS,
  getLocaleLabel,
  HIGHLIGHTS,
  LANGUAGES,
  LOCATIONS,
  PROGRAM_TYPES,
} from "../src/courseValidation";
import { UrlObject } from "url";
import { Course, courseService } from "../src/CourseService";
import { getBootcampData } from "../src/getBootcampData";
import { shuffleArray } from "../src/shuffle";
import { courseFinderPage } from "../src/i18n";
import { CompassWidget } from "../src/components/CompassWidget";
import { NextSeo } from "next-seo";

const queryStringKeys = [
  "career",
  "program_type",
  "duration",
  "location",
  "language",
  "funding_option",
  "highlight",
] as const;

const filterInformations = [
  {
    key: "career",
    valueList: CAREERS,
  },
  {
    key: "program_type",
    valueList: PROGRAM_TYPES,
  },
  {
    key: "duration",
    valueList: DURATIONS,
    color: "bg-filterYellow",
  },
  {
    key: "location",
    valueList: LOCATIONS,
    color: "bg-filterBlue",
  },
  {
    key: "language",
    valueList: LANGUAGES,
    color: "bg-filterGreen",
  },
  {
    key: "funding_option",
    valueList: FUNDING_OPTIONS,
    color: "bg-filterPink",
  },
  {
    key: "highlight",
    valueList: HIGHLIGHTS,
    color: "bg-filterPurple",
  },
];

const removeValue = (
  query: string | string[] | undefined,
  value: string
): string[] => {
  if (typeof query === "string") {
    return [];
  } else if (query === undefined) {
    return [];
  } else if (Array.isArray(query)) {
    return query.filter((val) => val !== value);
  } else {
    return [];
  }
};

const filterSingleValue = (filter: string[], value: string): boolean => {
  return filter.length > 0 ? filter.includes(value) : true;
};

const filterMultipleValues = (filter: string[], value: string[]): boolean => {
  return filter.length > 0 ? filter.some((item) => value.includes(item)) : true;
};

const CompassOrientatePage: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content, courses, bootcampNamesAndLogos }) => {
  const router = useRouter();
  const leftHalfContainerRef = useRef<HTMLDivElement | null>(null);
  const [randomCourses, setRandomCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<{
    show: boolean;
    showForm: boolean;
    slug?: string;
  }>({ show: false, slug: undefined, showForm: false });

  useEffect(() => {
    setRandomCourses(shuffleArray(courses));
  }, [courses]);

  const [filter, setFilter] = useState<{
    [key in (typeof queryStringKeys)[number]]: string[];
  }>({
    career: [],
    program_type: [],
    duration: [],
    location: [],
    language: [],
    funding_option: [],
    highlight: [],
  });

  useEffect(() => {
    queryStringKeys.forEach((queryStringKey) => {
      const query = router.query[queryStringKey];
      if (typeof query === "string") {
        setFilter((cur) => ({ ...cur, [queryStringKey]: [query] }));
      } else if (query === undefined) {
        setFilter((cur) => ({ ...cur, [queryStringKey]: [] }));
      } else if (Array.isArray(query)) {
        setFilter((cur) => ({ ...cur, [queryStringKey]: query }));
      }
    });

    const selectedCourse = router.query.selected_course;
    if (typeof selectedCourse === "string") {
      setSelectedCourse({ show: true, slug: selectedCourse, showForm: false });
    } else {
      setSelectedCourse((cur) => ({ ...cur, show: false }));
    }
  }, [router.query]);

  const closeForm = (): void => {
    setSelectedCourse((cur) => ({ ...cur, showForm: false }));
  };

  const openForm = (): void => {
    setSelectedCourse((cur) => ({ ...cur, showForm: true }));
  };

  const openFormFromCourse =
    (courseSlug: string, bootcampSlug: string) => (): void => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "apply_now_button_click",
        bootcamp_slug: bootcampSlug,
        course_slug: courseSlug,
        locale: locale,
      });
      setSelectedCourse((cur) => ({
        ...cur,
        showForm: true,
        slug: courseSlug,
      }));
    };

  const removeQueryString = (queryStringKey: string, value: string): void => {
    const currentValues = router.query[queryStringKey];
    const newValues = removeValue(currentValues, value);
    const newUrl: UrlObject = {
      query: {
        ...router.query,
        [queryStringKey]: newValues,
      },
    };
    router.push(newUrl, undefined, { shallow: true });
  };

  const locale = router.locale !== "en" ? "de" : "en";

  return (
    <div className="">
      <NextSeo
        canonical={
          locale === "en"
            ? "https://startsteps.org/en/bootcamps-we-work-with"
            : "https://startsteps.org/de/bootcamps"
        }
      />
      <CompassWidget language={locale} />
      <div className="pt-24 lg:pt-32">
        <BootcampsHero
          title1={content.new_title}
          title2={content.new_title_2}
          subtitle1={content.subtitle}
          subtitle2={content.subtitle_2}
          description={content.new_content}
          image={content.new_image}
        />
      </div>
      <div className="bootcamps_background">
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div ref={leftHalfContainerRef} className="w-1/2">
            <div className="w-[200%] flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 ">
              <NewMultiSelectDropdown
                label={courseFinderPage.career[locale]}
                options={CAREERS.map((career) => ({
                  value: career.slug,
                  label: career.label[locale],
                }))}
                queryStringKey={`career`}
                selectedOptions={filter.career}
                leftHalfContainerRef={leftHalfContainerRef}
              />
              <NewMultiSelectDropdown
                label={courseFinderPage.programType[locale]}
                options={PROGRAM_TYPES.map((programType) => ({
                  value: programType.value.toLowerCase(),
                  label: programType.label[locale],
                }))}
                queryStringKey={`program_type`}
                selectedOptions={filter.program_type}
                leftHalfContainerRef={leftHalfContainerRef}
              />
              <NewMultiSelectDropdown
                label={courseFinderPage.duration[locale]}
                options={DURATIONS.map((duration) => ({
                  value: duration.slug,
                  label: duration.label[locale],
                }))}
                queryStringKey={`duration`}
                selectedOptions={filter.duration}
                leftHalfContainerRef={leftHalfContainerRef}
              />
              <NewMultiSelectDropdown
                label={courseFinderPage.location[locale]}
                options={LOCATIONS.map((location) => ({
                  value: location.value.toLowerCase(),
                  label: location.label[locale],
                }))}
                queryStringKey={`location`}
                selectedOptions={filter.location}
                leftHalfContainerRef={leftHalfContainerRef}
              />
              <NewMultiSelectDropdown
                label={courseFinderPage.languages[locale]}
                options={LANGUAGES.map((language) => ({
                  value: language.value.toLowerCase(),
                  label: language.label[locale],
                }))}
                queryStringKey={`language`}
                selectedOptions={filter.language}
                leftHalfContainerRef={leftHalfContainerRef}
              />
              <NewMultiSelectDropdown
                label={courseFinderPage.fundingOptions[locale]}
                options={FUNDING_OPTIONS.map((fundingOption) => ({
                  value: fundingOption.value.toLowerCase(),
                  label: fundingOption.label[locale],
                }))}
                queryStringKey={`funding_option`}
                selectedOptions={filter.funding_option}
                leftHalfContainerRef={leftHalfContainerRef}
              />
              <NewMultiSelectDropdown
                label={courseFinderPage.highlights[locale]}
                options={HIGHLIGHTS.map((highlight) => ({
                  value: highlight.value.toLowerCase(),
                  label: highlight.label[locale],
                }))}
                queryStringKey={`highlight`}
                selectedOptions={filter.highlight}
                leftHalfContainerRef={leftHalfContainerRef}
              />
            </div>
          </div>

          <ul className="flex flex-wrap gap-3 pt-4">
            {filterInformations
              .reduce((acc, cur) => {
                return acc.concat(
                  filter[cur.key].map((filterValue) => ({
                    label: getLocaleLabel(cur.valueList, filterValue, locale),
                    key: cur.key,
                    value: filterValue,
                    ...(cur.color && { color: cur.color }),
                  }))
                );
              }, [] as { label: string; key: string; value: string; color?: string }[])
              .map((value) => (
                <li
                  className={`list-none flex items-center py-1 px-2 rounded-lg tracking-widest text-sm uppercase font-[700] ${
                    value.color
                      ? `${value.color} text-white`
                      : "bg-gray-100 text-gray-700"
                  } `}
                  key={value.value}
                >
                  {value.label}
                  <button
                    onClick={() => removeQueryString(value.key, value.value)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </li>
              ))}
          </ul>
          <ul className="grid pt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-3 items-stretch">
            {randomCourses
              .filter((course) => {
                if (!Object.values(filter).flat().length) {
                  return true;
                }
                if (
                  filterSingleValue(filter.career, course.career.key) &&
                  filterSingleValue(filter.duration, course.duration.key) &&
                  filterSingleValue(
                    filter.program_type,
                    course.program_type.key
                  ) &&
                  filterMultipleValues(
                    filter.funding_option,
                    course.funding_options.keys
                  ) &&
                  filterMultipleValues(
                    filter.highlight,
                    course.highlights.keys
                  ) &&
                  filterMultipleValues(filter.location, course.location.keys) &&
                  filterMultipleValues(filter.language, course.language.keys)
                ) {
                  return true;
                }
                return false;
              })
              .map((course) => (
                <li className="list-none" key={course.course_slug}>
                  <CourseCard
                    course={course}
                    bootcampName={
                      bootcampNamesAndLogos.find(
                        (bootcamp) => bootcamp.slug === course.bootcamp_slug
                      )?.name
                    }
                    bootcampLogo={
                      bootcampNamesAndLogos.find(
                        (bootcamp) => bootcamp.slug === course.bootcamp_slug
                      )?.logo
                    }
                    openForm={openFormFromCourse(
                      course.course_slug,
                      course.bootcamp_slug
                    )}
                  />
                </li>
              ))}
          </ul>
        </div>
        <CourseDialog
          isOpen={selectedCourse.show}
          course={courses.find(
            (course) => course.course_slug === selectedCourse.slug
          )}
          bootcampName={
            bootcampNamesAndLogos.find(
              (bootcamp) =>
                bootcamp.slug ===
                courses.find(
                  (course) => course.course_slug === selectedCourse.slug
                )?.bootcamp_slug
            )?.name
          }
          bootcampLogo={
            bootcampNamesAndLogos.find(
              (bootcamp) =>
                bootcamp.slug ===
                courses.find(
                  (course) => course.course_slug === selectedCourse.slug
                )?.bootcamp_slug
            )?.logo
          }
          bootcampSlug={
            courses.find((course) => course.course_slug === selectedCourse.slug)
              ?.bootcamp_slug
          }
          openForm={openForm}
        />
        <CourseApplicationFormDialog
          course={courses.find(
            (course) => course.course_slug === selectedCourse.slug
          )}
          bootcampName={
            bootcampNamesAndLogos.find(
              (bootcamp) =>
                bootcamp.slug ===
                courses.find(
                  (course) => course.course_slug === selectedCourse.slug
                )?.bootcamp_slug
            )?.name
          }
          isOpen={selectedCourse.showForm}
          closeForm={closeForm}
        />
      </div>
    </div>
  );
};

CompassOrientatePage.defaultProps = { getLayout: getBlogIndexLayout };

export const getStaticProps: GetStaticProps<{
  content: any;
  courses: Course[];
  bootcampNamesAndLogos: { name: string; logo: string; slug: string }[];
}> = async (props) => {
  const locale = props.locale === "en" ? "en" : "de";
  const content = (await api.getContent("course-finder", locale)) as any;
  const courses = courseService.getAll();

  const uniqueBootcampSlugs = Array.from(
    new Set(courses.map((course) => course.bootcamp_slug)).values()
  );

  const bootcampNamesAndLogos = await Promise.all(
    uniqueBootcampSlugs.map((bootcampSlug) =>
      getBootcampData(bootcampSlug, locale)
    )
  );

  return {
    props: {
      title: content.title,
      description: content.description.trim(),
      locale,
      content: content.content,
      courses,
      bootcampNamesAndLogos,
    },
  };
};

export default CompassOrientatePage;
