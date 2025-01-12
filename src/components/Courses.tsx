import Link from "next/link";
import { FC } from "react";
import Button from "./Button";

interface CoursesProps {
  courses: any[];
}

export const Courses: FC<CoursesProps> = ({ courses }) => {
  return (
    <section className="mt-16 mb-16 max-w-6xl mx-auto px-4 w-full">
      <ul className="w-full flex flex-col lg:flex-row gap-y-32 rounded lg:divide-x divide-indigo-700 list-none">
        {courses.map(({ course }) => {
          return (
            <li className="w-full flex flex-col justify-start items-center p-6 bg-indigo-100">
              <img
                src={course.image.sizes.medium}
                className="h-[200px] w-[200px] -mt-[100px]"
                alt=""
              />
              <h3 className="font-bold text-4xl uppercase text-center mt-6 mb-6">
                {course.name}
              </h3>
              <Link
                href={course.link_path}
                locale={course.link_path.startsWith("/de/") ? "de" : "en"}
                className="button button--transparent-blue">

                {course.link_name}

              </Link>
              <ul className="flex flex-wrap justify-center mt-6 gap-3 list-none">
                {course.perks.map(({ perk }) => (
                  <li className="bg-indigo-700 rounded-full px-2 py-0.5 text-white text-sm">
                    {perk}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
