import React, { FC, useState } from "react";

// Components
import PartnerHero from "../../src/components/PartnerHero";

import api from "../../src/api";
import { CompassWidget } from "../../src/components/CompassWidget";
import { IGetLayout } from "../../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Course, courseService } from "../../src/CourseService";
import { NewCourseDetailCard } from "../../src/components/NewCourseDetailCard";
import { CourseApplicationFormDialog } from "../../src/components/CourseApplicationFormDialog";
import { NextSeo } from "next-seo";
const Partner: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content, courses, slug }) => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<{
    showForm: boolean;
    slug?: string;
  }>({ slug: undefined, showForm: false });
  const locale = router.locale !== "en" ? "de" : "en";

  const closeForm = (): void => {
    setSelectedCourse((cur) => ({ ...cur, showForm: false }));
  };

  const openForm = (slug: string): void => {
    setSelectedCourse({ slug, showForm: true });
  };

  return (
    <div className={`partner`}>
      <NextSeo
        canonical={
          locale === "en"
            ? `https://startsteps.org/en/partner/${slug}`
            : `https://startsteps.org/de/partner/${slug}`
        }
      />
      <CompassWidget language={router.locale as "de" | "en"} />

      <PartnerHero
        name={content.partner_name}
        text={content.partner_text}
        logo={content.partner_logo}
        link={content.partner_link}
        linkLabel={content.partner_link_label}
        image={content.partner_image}
      />

      <ul className="course-list full-width-outer">
        <div className="gray-box"></div>
        <div className="relative flex flex-col gap-y-8 max-w-5xl mx-auto">
          {courses.map((course) => (
            <li key={course.course_slug} className="shadow-xl list-none">
              <NewCourseDetailCard
                course={course}
                bootcampName={content.partner_name}
                bootcampLogo={content.partner_logo}
                bootcampSlug={"/"}
                openForm={() => openForm(course.course_slug)}
              />
            </li>
          ))}
        </div>
      </ul>

      <CourseApplicationFormDialog
        course={courses.find(
          (course) => course.course_slug === selectedCourse.slug
        )}
        bootcampName={content.partner_name}
        isOpen={selectedCourse.showForm}
        closeForm={closeForm}
      />

      <div className="gray-container full-width-outer">
        <div className="button-container"></div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: string[] = await api.getBootcampSlugs();
  const dePaths = slugs.map((slug: string) => ({
    params: {
      slug: slug,
    },
    locale: "de",
  }));

  const enPaths = slugs.map((slug: string) => ({
    params: {
      slug: slug,
    },
    locale: "en",
  }));

  return {
    paths: dePaths.concat(enPaths),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{
  content: any;
  courses: Course[];
  slug: string;
}> = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  const slug = context?.params?.slug;

  if (typeof slug !== "string") {
    throw new Error(`No slug found`);
  }

  try {
    const content = (await api.getContent(slug, locale)) as any;
    const courses = courseService.getByBootcampSlug(slug);
    return {
      props: {
        content: content.content,
        title: content.title.replaceAll(`&#8211;`, "-"),
        description: content.description,
        locale: context.locale,
        courses,
        slug: slug,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

export default Partner;
