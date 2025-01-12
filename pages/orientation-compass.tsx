import { getCompassCourseLayout } from "../src/components/CompassCourseLayout";
import { OrientationStudents } from "components/OrientationStudents";
import { DiscoverCareer } from "components/DiscoverCareer";
import { BootcampsDoubleCarousel } from "components/BootcampsDoubleCarousel";
import { FirstSteps } from "components/FirstSteps";
import { OrientationCourseBenefits } from "components/OrientationCourseBenefits";
import { OrientationCourseFeatures } from "../src/components/OrientationCourseFeatures";
import { OrientationCourseHeader } from "../src/components/OrientationCourseHeader";
import { OrientationCourseNav } from "components/OrientationCourseNav";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import api from "../src/api";
import { OrientationCompassCourseSteps } from "../src/components/OrientationCompassCourseSteps";
import { OrientationCourseFAQ } from "components/OrientationCourseFAQ";
import Head from "next/head";
import Script from "next/script";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { FooterAlt2 } from "components/FooterAlt2";

const LandingPageCompassCourse: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ content, title, description }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  return (
    <div>
      <Head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: `https://startsteps.org/${locale}${router.asPath}`,
          title: `${title}`,
          description: description,
          locale: locale === "en" ? "en_US" : "de_DE",
        }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" />
      <OrientationCourseNav />
      <section>
        <OrientationCourseHeader
          orientation_compass_course_header={
            content.orientation_compass_course_header
          }
        />
      </section>
      <section className="bg-gray-100">
        <OrientationCourseFeatures
          title={content.orientation_compass_course_features.title}
          subtitle={content.orientation_compass_course_features.subtitle}
          features={content.orientation_compass_course_features.features}
          formTitle={content.orientation_compass_course_features.form_title}
          extra_dropdowns={content.form_extra_dropdowns}
          pipedrive_lead_source={
            content.orientation_compass_course_features.pipedrive_lead_source
          }
          pipedrive_stage_id={Number(
            content.orientation_compass_course_features.pipedrive_stage_id
          )}
          form_submit_button={
            content.orientation_compass_course_features.form_submit_button
          }
          form_success_title={
            content.orientation_compass_course_features.form_success_title
          }
          form_success_message={
            content.orientation_compass_course_features.form_success_message
          }
          form_success_image={
            content.orientation_compass_course_features.form_success_image
          }
          form_consultation_call={
            content.orientation_compass_course_features.form_consultation_call
          }
        />
      </section>
      <section>
        <OrientationCompassCourseSteps
          orientation_compass_course_steps={
            content.orientation_compass_course_steps
          }
        />
      </section>
      <section>
        <OrientationStudents
          title={content.orientation_students.title}
          subtitle={content.orientation_students.subtitle}
          students={content.orientation_students.students}
        />
      </section>
      <section>
        <DiscoverCareer
          title={content.discover_career.title}
          subtitle={content.discover_career.content}
          courseLink={content.discover_career.course_download_button}
          courseDownloadLink={content.discover_career.course}
          consultationCall={content.discover_career.consultation_call}
          roles={content.discover_career.roles}
        />
      </section>
      <section>
        <BootcampsDoubleCarousel
          title={content.bootcamps_double_carousel.title}
          subtitle={content.bootcamps_double_carousel.subtitle}
          bootcamps1={content.bootcamps_double_carousel["bootcamp-logos-first"]}
          bootcamps2={content.bootcamps_double_carousel.bootcamp_logos_second}
        />
      </section>
      <section>
        <FirstSteps
          title={content.orientation_course_first_steps.title}
          subtitle={content.orientation_course_first_steps.subtitle}
          steps={content.orientation_course_first_steps.steps}
          consultingButton={
            content.orientation_course_first_steps.consulting_button
          }
        />
      </section>
      <section>
        <OrientationCourseBenefits
          title={content.orientation_course_benefits.title}
          benefits={content.orientation_course_benefits.benefits}
        />
      </section>
      <section>
        <OrientationCourseFAQ
          talent_accelerator_faq_title={content.talent_accelerator_faq_title}
          talent_accelerator_faq_faqs={content.talent_accelerator_faq_faqs}
        />
      </section>
      <FooterAlt2 />
    </div>
  );
};

LandingPageCompassCourse.defaultProps = {
  getLayout: getCompassCourseLayout,
} as any;

export const getStaticProps: GetStaticProps<{
  content: any;
  title: any;
  description: any;
}> = async (context) => {
  const locale = context.locale === "en" ? "en" : "de";

  const content = (await api.getContent(
    "orientation-compass-course",
    locale
  )) as any;

  return {
    props: {
      content: content.content,
      title: content.title,
      description: content.description,
      locale: locale,
    },
  };
};

export default LandingPageCompassCourse;
