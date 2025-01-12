import {
  CAREERS,
  DURATIONS,
  FUNDING_OPTIONS,
  HIGHLIGHTS,
  LANGUAGES,
  LOCATIONS,
  PROGRAM_TYPES,
} from "courseValidation";
import originalCourses from "../courses.json";

export type Course = {
  bootcamp_slug: string;
  description: LocaleString;
  course_name: LocaleString;
  location: FilterableLocaleArray;
  language: FilterableLocaleArray;
  duration: FilterableLocaleString;
  duration_time: LocaleString;
  program_type: FilterableLocaleString;
  funding_options: FilterableLocaleArray;
  massnahmennummber: string;
  price: LocaleString;
  career: FilterableLocaleString;
  requirements: LocaleArray;
  highlights: FilterableLocaleArray;
  course_slug: string;
};

export type LocaleString = {
  en: string;
  de: string;
};

export type FilterableLocaleString = {
  key: string;
  en: string;
  de: string;
};

export type LocaleArray = {
  en: string[];
  de: string[];
};

export type FilterableLocaleArray = {
  keys: string[];
  en: string[];
  de: string[];
};

const localeValuesFromKey = (
  valueList: {
    value: string;
    label: {
      en: string;
      de: string;
    };
  }[],
  keys: string[],
  locale: "en" | "de"
): string[] => {
  return valueList
    .filter((value) => keys.includes(value.value))
    .map((value) => value.label[locale]);
};

const localeValueFromKey = (
  valueList: {
    value: string;
    label: {
      en: string;
      de: string;
    };
  }[],
  key: string,
  locale: "en" | "de"
): string => {
  const value = valueList.find((value) => value.value === key);
  return value.label[locale];
};

const slugFromKey = (
  valueList: {
    value: string;
    label: {
      en: string;
      de: string;
    };
    slug?: string;
  }[],
  key: string
): string => {
  const value = valueList.find((value) => value.value === key);
  return value.slug || value.value.toLowerCase();
};

const slugsFromKey = (
  valueList: {
    value: string;
    label: {
      en: string;
      de: string;
    };
    slug?: string;
  }[],
  key: string[]
): string[] => {
  const values = valueList.filter((value) => key.includes(value.value));
  return values.map((value) => value.slug || value.value.toLowerCase());
};

class CourseService {
  private readonly courses: Course[];

  constructor(allCourses: typeof originalCourses) {
    this.courses = allCourses.map((course) => ({
      bootcamp_slug: course.bootcamp_slug,
      description: course.description,
      course_name: course.course_name,
      location: {
        keys: slugsFromKey(LOCATIONS, course.location),
        en: localeValuesFromKey(LOCATIONS, course.location, "en"),
        de: localeValuesFromKey(LOCATIONS, course.location, "de"),
      },
      language: {
        keys: slugsFromKey(LANGUAGES, course.language),
        en: localeValuesFromKey(LANGUAGES, course.language, "en"),
        de: localeValuesFromKey(LANGUAGES, course.language, "de"),
      },
      duration: {
        key: slugFromKey(DURATIONS, course.duration),
        en: localeValueFromKey(DURATIONS, course.duration, "en"),
        de: localeValueFromKey(DURATIONS, course.duration, "de"),
      },
      duration_time: course.duration_time,
      program_type: {
        key: slugFromKey(PROGRAM_TYPES, course.program_type),
        en: localeValueFromKey(PROGRAM_TYPES, course.program_type, "en"),
        de: localeValueFromKey(PROGRAM_TYPES, course.program_type, "de"),
      },
      funding_options: {
        keys: slugsFromKey(FUNDING_OPTIONS, course.funding_options),
        en: localeValuesFromKey(FUNDING_OPTIONS, course.funding_options, "en"),
        de: localeValuesFromKey(FUNDING_OPTIONS, course.funding_options, "de"),
      },
      massnahmennummber: course.massnahmennummber,
      price: course.price,
      career: {
        key: slugFromKey(CAREERS, course.career),
        en: localeValueFromKey(CAREERS, course.career, "en"),
        de: localeValueFromKey(CAREERS, course.career, "de"),
      },
      requirements: course.requirements,
      highlights: {
        keys: slugsFromKey(HIGHLIGHTS, course.highlights),
        en: localeValuesFromKey(HIGHLIGHTS, course.highlights, "en"),
        de: localeValuesFromKey(HIGHLIGHTS, course.highlights, "de"),
      },
      course_slug: course.course_slug,
    }));
  }

  getAll(): Course[] {
    return this.courses;
  }

  getByBootcampSlug(bootcampSlug: string): Course[] {
    return this.courses.filter(
      (course) => course.bootcamp_slug === bootcampSlug
    );
  }
}

export const courseService = new CourseService(originalCourses);
